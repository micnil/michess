import {
  CreateGameV1,
  GameDetailsV1,
  JoinGamePayloadV1,
  LeaveGamePayloadV1,
  LobbyPageResponseV1,
  MakeActionPayloadV1,
  MakeMovePayloadV1,
  MoveMadeV1,
  PaginationQueryV1,
  PlayerGameInfoPageResponseV1,
  PlayerGameInfoQueryV1,
} from '@michess/api-schema';
import { logger } from '@michess/be-utils';
import { assertDefined, Maybe } from '@michess/common-utils';
import { Move, MoveRecord } from '@michess/core-board';
import {
  ChessGame,
  GameActionIn,
  TimeControlClassification,
} from '@michess/core-game';
import {
  ActionRepository,
  CacheRepository,
  GameRepository,
  InsertGame,
  MoveRepository,
  TimeControlJsonB,
} from '@michess/infra-db';
import { Job, Queue, Worker } from 'bullmq';
import { Session } from '../../auth/model/Session';
import { LockService } from '../../lock/service/LockService';
import { PageResponseMapper } from '../../mapper/PageResponseMapper';
import { RatingsService } from '../../user/service/RatingsService';
import { GameMapper } from '../mapper/GameMapper';

type TimeControlJobData = {
  gameId: string;
  flagTimestamp: number;
};

export class GamesService {
  private gameCleanupQueue: Queue;
  private gameCleanupWorker: Worker;
  private timeControlQueue: Queue<TimeControlJobData>;
  private timeControlWorker: Worker;

  private observers: Set<(data: GameDetailsV1) => void> = new Set();
  constructor(
    private gameRepository: GameRepository,
    private moveRepository: MoveRepository,
    private actionRepository: ActionRepository,
    private cacheRepo: CacheRepository,
    private ratingsService: RatingsService,
    private lockService: LockService,
  ) {
    const connectionOptions = { connection: this.cacheRepo.client };
    this.gameCleanupQueue = new Queue(`game-cleanup`, connectionOptions);
    this.gameCleanupWorker = new Worker(
      `game-cleanup`,
      this.cleanupGames.bind(this),
      connectionOptions,
    );

    this.timeControlQueue = new Queue(`time-control`, connectionOptions);
    this.timeControlWorker = new Worker<TimeControlJobData>(
      `time-control`,
      this.handleFlagTimeout.bind(this),
      connectionOptions,
    );
  }

  async close() {
    logger.info('Closing games service');
    await this.gameCleanupWorker.close();
    await this.gameCleanupQueue.close();
    await this.timeControlWorker.close();
    await this.timeControlQueue.close();
    this.observers.clear();
  }

  async initialize() {
    await this.gameCleanupQueue.upsertJobScheduler('cleanup-games', {
      pattern: '0 3 * * *',
    });
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

  async createGame(data: CreateGameV1): Promise<GameDetailsV1> {
    const {
      timeControlClassification,
      timeControl,
    }: {
      timeControlClassification: InsertGame['timeControlClassification'];
      timeControl: TimeControlJsonB | null;
    } =
      data.timeControl?.type === 'realtime'
        ? {
            timeControlClassification: TimeControlClassification.fromRealtime(
              data.timeControl.initialSec,
              data.timeControl.incrementSec,
            ),
            timeControl: {
              initial: data.timeControl.initialSec,
              increment: data.timeControl.incrementSec,
            },
          }
        : data.timeControl?.type === 'correspondence'
          ? {
              timeControlClassification: 'correspondence',
              timeControl: {
                daysPerMove: data.timeControl.daysPerMove,
              },
            }
          : {
              timeControlClassification: 'no_clock',
              timeControl: null,
            };
    const createdGame = await this.gameRepository.createGame({
      variant: data.variant,
      isPrivate: data.isPrivate ?? false,
      timeControlClassification,
      timeControl,
    });

    const chessGame = GameMapper.fromSelectGame(createdGame);
    return GameMapper.toGameDetailsV1(chessGame);
  }

  async queryLobby(query: PaginationQueryV1): Promise<LobbyPageResponseV1> {
    const { page, limit } = query;
    const { games, totalCount } = await this.gameRepository.queryGames({
      page: {
        page,
        pageSize: limit,
      },
      status: ['WAITING'],
      private: false,
    });
    const chessGames = games.map(GameMapper.fromSelectGameWithRelations);

    return PageResponseMapper.toPageResponse({
      data: chessGames.map((game) => GameMapper.toLobbyGameItemV1(game)),
      limit,
      totalItems: totalCount,
      page,
    });
  }

  async queryPlayerGames(
    userId: string,
    query: PlayerGameInfoQueryV1,
  ): Promise<PlayerGameInfoPageResponseV1> {
    const { page, limit } = query;
    const { games, totalCount } = await this.gameRepository.queryGames({
      page: {
        page,
        pageSize: limit,
      },
      playerId: userId,
      status: query.status ? [query.status] : ['ENDED', 'IN_PROGRESS'],
    });
    const gameDetails = games.map(GameMapper.fromSelectGameWithRelations);

    return PageResponseMapper.toPageResponse({
      data: gameDetails.map((game) =>
        GameMapper.toPlayerGameInfoV1(game, userId),
      ),
      limit,
      totalItems: totalCount,
      page,
    });
  }

  subscribe(observer: (data: GameDetailsV1) => void): () => void {
    this.observers.add(observer);
    return () => {
      this.observers.delete(observer);
    };
  }
  notifyObservers(data: GameDetailsV1): void {
    this.observers.forEach((observer) => observer(data));
  }

  async joinGame(
    session: Session,
    data: JoinGamePayloadV1,
  ): Promise<GameDetailsV1> {
    const { chessGame } = await this.loadChessGame(data.gameId);
    const gameState = chessGame.getState();
    if (data.side === 'spectator') {
      return GameMapper.toGameDetailsV1(chessGame, true);
    }

    const gameRating = await this.ratingsService.getRatingByPlayerId(
      session.userId,
      gameState.variant,
      gameState.timeControl.classification,
    );

    const updatedGame = chessGame.joinGame(
      {
        id: session.userId,
        name: session.name ?? 'Anonymous',
        rating: gameRating,
      },
      data.side,
    );

    await this.gameRepository.updateGame(
      updatedGame.id,
      GameMapper.toInsertGame(updatedGame),
    );
    return GameMapper.toGameDetailsV1(updatedGame);
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
    session: Session,
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
      const updatedGame = chessGame.play(session.userId, moveToPlay);
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

    if (gameStateUpdated) {
      await this.handleGameEnd(updatedGame);
      return {
        gameDetails: GameMapper.toGameDetailsV1(updatedGame),
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

  async cleanupGames(): Promise<void> {
    logger.info('Cleaning up empty games...');
    const cutoffDate = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
    await this.gameRepository.deleteGames({
      status: 'EMPTY',
      olderThan: cutoffDate,
    });
  }

  async handleFlagTimeout(job: Job<TimeControlJobData>): Promise<void> {
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
      this.notifyObservers(GameMapper.toGameDetailsV1(chessGame));
    }
  }
}
