import {
  GameDetailsV1,
  JoinGamePayloadV1,
  LeaveGamePayloadV1,
  MakeActionPayloadV1,
  MakeMovePayloadV1,
  MoveMadeV1,
} from '@michess/api-schema';
import { logger } from '@michess/be-utils';
import { assertDefined, Maybe } from '@michess/common-utils';
import { Color, Move, MoveRecord } from '@michess/core-board';
import { ChessGame, GameActionIn } from '@michess/core-game';
import {
  ActionRepository,
  CacheRepository,
  GameRepository,
  MoveRepository,
} from '@michess/infra-db';
import { Job, Queue, Worker } from 'bullmq';
import { Session } from '../../auth/model/Session';
import { EventEmitter } from '../../common/EventEmitter';
import { LockService } from '../../lock/service/LockService';
import { RatingsService } from '../../user/service/RatingsService';
import { GameMapper } from '../mapper/GameMapper';
import { GameEvent } from '../model/GameEvent';
import { PlayerInfoIn } from '../model/PlayerInfoIn';

type TimeControlJobData = {
  gameId: string;
  flagTimestamp: number;
};

export class GameplayService extends EventEmitter<GameEvent> {
  private timeControlQueue: Queue<TimeControlJobData>;
  private timeControlWorker: Worker;

  constructor(
    private gameRepository: GameRepository,
    private moveRepository: MoveRepository,
    private actionRepository: ActionRepository,
    private cacheRepo: CacheRepository,
    private ratingsService: RatingsService,
    private lockService: LockService,
  ) {
    super();
    const connectionOptions = { connection: this.cacheRepo.client };

    this.timeControlQueue = new Queue(`time-control`, connectionOptions);
    this.timeControlWorker = new Worker<TimeControlJobData>(
      `time-control`,
      this.handleFlagTimeout.bind(this),
      connectionOptions,
    );
  }

  async close(): Promise<void> {
    logger.info('Closing gameplay service');
    await this.timeControlWorker.close();
    await this.timeControlQueue.close();
    this.clearSubscribers();
  }

  private async loadChessGame(gameId: string): Promise<{
    chessGame: ChessGame;
  }> {
    const dbGame = await this.gameRepository.findGameWithRelationsById(gameId);
    assertDefined(dbGame, `Game '${gameId}' not found`);

    const chessGame = GameMapper.fromSelectGameWithRelations(dbGame);
    return { chessGame };
  }

  private async updateFlagTimeoutJob(chessGame: ChessGame): Promise<void> {
    const state = chessGame.getState();

    // If there is an existing flag_timeout job for this game, find it's ID
    const jobId = await this.timeControlQueue.getDeduplicationJobId(state.id);
    if (jobId) {
      logger.debug(
        {
          jobId,
        },
        'Removing flag job',
      );
      // If a job was found, remove it from the queue
      const result = await this.timeControlQueue.remove(jobId);
      if (result === 0) {
        logger.info(
          {
            result,
            jobId,
            gameId: state.id,
          },
          'Failed to remove flag job. Removing deduplication key instead.',
        );
        // If the job couldnt be removed it must have been active and locked
        // (or already executed). Remove the deduplication key so we can add
        // a new flag timeout job
        this.timeControlQueue.removeDeduplicationKey(state.id);
      }
    }

    const newFlag = chessGame.clock?.flag;
    if (newFlag) {
      logger.debug(
        {
          gameId: state.id,
          color: newFlag.color,
          flagTimestamp: new Date(newFlag.timestamp).toISOString(),
          timeLeftSec: newFlag.timeLeftMs / 1000,
        },
        'Scheduling new flag timeout job',
      );
      this.timeControlQueue.add(
        'flag_timeout',
        {
          gameId: state.id,
          flagTimestamp: newFlag.timestamp,
        },
        {
          deduplication: {
            id: state.id,
          },
          delay: newFlag.timeLeftMs,
        },
      );
    }
  }

  private async handleGameEnd(
    chessGame: ChessGame,
    previousGame?: ChessGame,
  ): Promise<void> {
    const state = chessGame.getState();
    // If previous game was not provided assume that it was IN_PROGRESS.
    const previousStatus = previousGame?.getState().status ?? 'IN_PROGRESS';
    if (previousStatus !== 'ENDED' && state.status === 'ENDED') {
      await this.ratingsService.queueRatingUpdateForGame(state);
    }
  }

  async joinGame(
    player: PlayerInfoIn,
    data: JoinGamePayloadV1,
  ): Promise<GameDetailsV1> {
    const { chessGame } = await this.loadChessGame(data.gameId);
    const gameState = chessGame.getState();
    if (data.side === 'spectator') {
      return GameMapper.toGameDetailsV1(chessGame, true);
    }

    const gameRating = await this.ratingsService.getRatingByPlayerId(
      player.id,
      gameState.variant,
      gameState.timeControl.classification,
    );

    const isBot = player.role === 'bot';

    const updatedGame = chessGame.joinGame(
      {
        id: player.id,
        name: player.name ?? 'Anonymous',
        rating: gameRating,
        isBot,
      },
      data.side,
    );

    await this.gameRepository.updateGame(
      updatedGame.id,
      GameMapper.toInsertGame(updatedGame),
    );
    const gameDetails = GameMapper.toGameDetailsV1(updatedGame);

    this.emit({
      type: 'game_joined',
      data: gameDetails,
    });

    return gameDetails;
  }

  async leaveGame(
    session: Session,
    data: LeaveGamePayloadV1,
  ): Promise<Maybe<GameDetailsV1>> {
    const { chessGame } = await this.loadChessGame(data.gameId);

    if (!chessGame.isPlayerInGame(session.userId)) {
      return undefined;
    }

    const updatedGame = chessGame.leaveGame(session.userId);

    await this.gameRepository.updateGame(
      updatedGame.id,
      GameMapper.toInsertGame(updatedGame),
    );
    return GameMapper.toGameDetailsV1(updatedGame);
  }

  async makeMove(
    playerId: string,
    data: MakeMovePayloadV1,
  ): Promise<{ gameDetails: Maybe<GameDetailsV1>; move: MoveMadeV1 }> {
    const makeMoveWithLock = async (): Promise<{
      updatedGame: ChessGame;
      move: MoveRecord;
      gameStateUpdated: boolean;
    }> => {
      await using _ = await this.lockService.acquireLock('game', data.gameId);
      const { chessGame } = await this.loadChessGame(data.gameId);
      const moveToPlay = Move.fromUci(data.uci);
      const updatedGame = chessGame.play(playerId, moveToPlay);
      const updatedGameState = updatedGame.getState();
      const newMove = updatedGameState.movesRecord.at(-1);
      assertDefined(newMove, 'No move found after playing move');

      await this.moveRepository.createMove({
        gameId: updatedGame.id,
        uci: data.uci,
        movedAt: new Date(newMove.timestamp),
      });

      const gameStateUpdated =
        chessGame.hasNewStatus(updatedGame) ||
        chessGame.hasNewActionOptions(updatedGame);
      if (gameStateUpdated) {
        await this.gameRepository.updateGame(
          updatedGame.id,
          GameMapper.toInsertGame(updatedGame),
        );
      }
      return { updatedGame, move: newMove, gameStateUpdated };
    };

    const { updatedGame, move, gameStateUpdated } = await makeMoveWithLock();

    await this.updateFlagTimeoutJob(updatedGame);

    const clockInstant = updatedGame.clock?.instant;
    const moveMadeV1: MoveMadeV1 = {
      gameId: data.gameId,
      uci: Move.toUci(move),
      clock: clockInstant,
    };

    const gameDetailsV1 = GameMapper.toGameDetailsV1(updatedGame);
    const currentTurn = updatedGame.getPosition().turn;
    const moveColor = Color.opposite(currentTurn);

    // Emit move_made event to all subscribers
    this.emit({
      type: 'move_made',
      data: {
        moveMade: moveMadeV1,
        gameDetails: gameDetailsV1,
        statusChanged: gameStateUpdated,
        moveColor,
      },
    });

    if (gameStateUpdated) {
      await this.handleGameEnd(updatedGame);
      return {
        gameDetails: gameDetailsV1,
        move: moveMadeV1,
      };
    } else {
      return {
        move: moveMadeV1,
        gameDetails: undefined,
      };
    }
  }

  async makeAction(
    session: Session,
    data: MakeActionPayloadV1,
  ): Promise<GameDetailsV1> {
    const { chessGame } = await this.loadChessGame(data.gameId);
    const gameActionIn: GameActionIn = {
      type: data.action.type,
    };
    const updatedGame = chessGame.makeAction(session.userId, gameActionIn);
    const updatedGameState = updatedGame.getState();
    await this.gameRepository.updateGame(
      updatedGame.id,
      GameMapper.toInsertGame(updatedGame),
    );
    const action = updatedGameState.actionRecord.at(-1);
    action &&
      (await this.actionRepository.createAction(updatedGameState.id, action));

    await this.handleGameEnd(updatedGame, chessGame);

    return GameMapper.toGameDetailsV1(updatedGame);
  }

  private async handleFlagTimeout(job: Job<TimeControlJobData>): Promise<void> {
    const { gameId, flagTimestamp } = job.data;
    logger.info({ gameId, flagTimestamp }, 'Handling flag timeout');

    const handleFlagTimeoutWithLock = async (): Promise<Maybe<ChessGame>> => {
      await using _ = await this.lockService.acquireLock('game', gameId);
      const dbGame =
        await this.gameRepository.findGameWithRelationsById(gameId);
      assertDefined(dbGame, `Game '${gameId}' not found`);
      const chessGame = GameMapper.fromSelectGameWithRelations(dbGame);

      const insertGame = GameMapper.toInsertGame(chessGame);
      if (insertGame.result !== dbGame.result) {
        await this.gameRepository.updateGame(chessGame.id, insertGame);
        return chessGame;
      } else {
        return undefined;
      }
    };

    const chessGame = await handleFlagTimeoutWithLock();
    if (chessGame) {
      await this.handleGameEnd(chessGame);
      const gameDetailsV1 = GameMapper.toGameDetailsV1(chessGame);
      this.emit({
        type: 'flag_timeout',
        data: gameDetailsV1,
      });
    }
  }
}
