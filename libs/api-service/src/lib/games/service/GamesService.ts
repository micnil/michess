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
import { Move } from '@michess/core-board';
import { ChessGame, ChessGameError, GameActionIn } from '@michess/core-game';
import {
  ActionRepository,
  CacheRepository,
  GameRepository,
  InsertGame,
  MoveRepository,
} from '@michess/infra-db';
import { Job, Queue, Worker } from 'bullmq';
import { TimeControlClassification } from 'libs/core-game/src/lib/model/TimeControlClassification';
import { TimeControlJsonB } from 'libs/infra-db/src/lib/model/TimeControlJsonB';
import { Session } from '../../auth/model/Session';
import { PageResponseMapper } from '../../mapper/PageResponseMapper';
import { GameDetailsMapper } from '../mapper/GameDetailsMapper';
import { GameError } from '../model/GameError';

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
    const chessGame = ChessGame.fromGameState(
      GameDetailsMapper.fromSelectGame(createdGame),
    );
    const gameState = chessGame.getState();
    return GameDetailsMapper.toGameDetailsV1({
      game: gameState,
      clock: chessGame.clock.instant,
    });
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
    const gameDetails = games.map(
      GameDetailsMapper.fromSelectGameWithRelations,
    );

    return PageResponseMapper.toPageResponse({
      data: gameDetails.map((game) =>
        GameDetailsMapper.toLobbyGameItemV1(game),
      ),
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
    const gameDetails = games.map(
      GameDetailsMapper.fromSelectGameWithRelations,
    );

    return PageResponseMapper.toPageResponse({
      data: gameDetails.map((game) =>
        GameDetailsMapper.toPlayerGameInfoV1(game, userId),
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
    const dbGame = await this.gameRepository.findGameWithRelationsById(
      data.gameId,
    );
    assertDefined(dbGame, `Game '${data.gameId}' not found`);
    const gameDetails = GameDetailsMapper.fromSelectGameWithRelations(dbGame);
    const chessGame = ChessGame.fromGameState(gameDetails);

    if (data.side === 'spectator') {
      return GameDetailsMapper.toGameDetailsV1({
        game: gameDetails,
        clock: chessGame.clock.instant,
      });
    } else {
      const updatedGame = chessGame.joinGame(
        { id: session.userId, name: session.name ?? 'Anonymous' },
        data.side,
      );
      const updatedGameState = updatedGame.getState();
      await this.gameRepository.updateGame(
        gameDetails.id,
        GameDetailsMapper.toInsertGame(updatedGameState),
      );
      return GameDetailsMapper.toGameDetailsV1({
        game: updatedGameState,
        clock: updatedGame.clock.instant,
        availableActions: updatedGame.getAdditionalActions(),
      });
    }
  }

  async leaveGame(
    session: Session,
    data: LeaveGamePayloadV1,
  ): Promise<Maybe<GameDetailsV1>> {
    const dbGame = await this.gameRepository.findGameWithRelationsById(
      data.gameId,
    );
    assertDefined(dbGame, `Game '${data.gameId}' not found`);
    const gameDetails = GameDetailsMapper.fromSelectGameWithRelations(dbGame);
    const chessGame = ChessGame.fromGameState(gameDetails);
    if (chessGame.isPlayerInGame(session.userId)) {
      const updatedGame = chessGame.leaveGame(session.userId);
      const updatedGameState = updatedGame.getState();

      await this.gameRepository.updateGame(
        gameDetails.id,
        GameDetailsMapper.toInsertGame(updatedGameState),
      );
      return GameDetailsMapper.toGameDetailsV1({
        game: updatedGameState,
        availableActions: updatedGame.getAdditionalActions(),
        clock: updatedGame.clock.instant,
      });
    }
  }

  async makeMove(
    session: Session,
    data: MakeMovePayloadV1,
  ): Promise<{ gameDetails: Maybe<GameDetailsV1>; move: MoveMadeV1 }> {
    const dbGame = await this.gameRepository.findGameWithRelationsById(
      data.gameId,
    );
    assertDefined(dbGame, `Game '${data.gameId}' not found`);
    const moveToPlay = Move.fromUci(data.uci);
    const gameDetails = GameDetailsMapper.fromSelectGameWithRelations(dbGame);
    const chessGame = ChessGame.fromGameState(gameDetails);
    try {
      const job = await this.timeControlQueue.getJob(data.gameId);
      if (job) {
        await job.remove();
      }
    } catch (error) {
      // Error means job is active and locked.
      throw new GameError('game_is_over', 'Cannot make move, game is over', {
        cause: error,
      });
    }
    try {
      const updatedGame = chessGame.play(session.userId, moveToPlay);
      const updatedGameState = updatedGame.getState();
      const newMove = updatedGameState.movesRecord.at(-1);
      assertDefined(newMove, 'No move found after playing move');
      const selectMove = await this.moveRepository.createMove({
        gameId: gameDetails.id,
        uci: data.uci,
        movedAt: new Date(newMove.timestamp),
      });
      const newFlag = updatedGame.clock.flag;
      if (newFlag) {
        this.timeControlQueue.add(
          'flag_timeout',
          {
            gameId: data.gameId,
            flagTimestamp: newFlag.timestamp,
          },
          {
            delay: newFlag.duration,
          },
        );
      }

      if (
        chessGame.hasNewStatus(updatedGame) ||
        chessGame.hasNewActionOptions(updatedGame)
      ) {
        await this.gameRepository.updateGame(
          gameDetails.id,
          GameDetailsMapper.toInsertGame(updatedGameState),
        );
        return {
          gameDetails: GameDetailsMapper.toGameDetailsV1({
            game: updatedGameState,
            clock: updatedGame.clock.instant,
            availableActions: updatedGame.getAdditionalActions(),
          }),
          move: {
            gameId: selectMove.gameId,
            uci: selectMove.uci,
            clock: updatedGame.clock.instant,
          },
        };
      } else {
        return {
          move: {
            gameId: data.gameId,
            uci: data.uci,
            clock: updatedGame.clock.instant,
          },
          gameDetails: undefined,
        };
      }
    } catch (error) {
      if (error instanceof ChessGameError) {
        if (error.code === 'player_flagged') {
          const flag = chessGame.clock.flag;
          this.timeControlQueue.add(
            'flag_timeout',
            {
              gameId: data.gameId,
              flagTimestamp: flag?.timestamp ?? Date.now(),
            },
            {
              delay: 0,
            },
          );
        }
        throw error;
      } else {
        throw error;
      }
    }
  }

  async makeAction(
    session: Session,
    data: MakeActionPayloadV1,
  ): Promise<GameDetailsV1> {
    const dbGame = await this.gameRepository.findGameWithRelationsById(
      data.gameId,
    );
    const gameActionIn: GameActionIn = {
      type: data.action.type,
    };
    assertDefined(dbGame, `Game '${data.gameId}' not found`);
    const gameDetails = GameDetailsMapper.fromSelectGameWithRelations(dbGame);
    const chessGame = ChessGame.fromGameState(gameDetails);
    const updatedGame = chessGame.makeAction(session.userId, gameActionIn);
    const updatedGameState = updatedGame.getState();
    await this.gameRepository.updateGame(
      gameDetails.id,
      GameDetailsMapper.toInsertGame(updatedGameState),
    );
    const action = updatedGameState.actionRecord.at(-1);
    action &&
      (await this.actionRepository.createAction(gameDetails.id, action));
    return GameDetailsMapper.toGameDetailsV1({
      game: updatedGameState,
      availableActions: updatedGame.getAdditionalActions(),
      clock: updatedGame.clock.instant,
    });
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
    const dbGame = await this.gameRepository.findGameWithRelationsById(gameId);
    assertDefined(dbGame, `Game '${gameId}' not found`);
    const gameDetails = GameDetailsMapper.fromSelectGameWithRelations(dbGame);
    const chessGame = ChessGame.fromGameState(gameDetails);
    const updatedGameState = chessGame.getState();
    if (updatedGameState.result) {
      this.gameRepository.updateGame(
        gameDetails.id,
        GameDetailsMapper.toInsertGame(updatedGameState),
      );
      this.notifyObservers(
        GameDetailsMapper.toGameDetailsV1({
          game: updatedGameState,
          clock: chessGame.clock.instant,
          availableActions: chessGame.getAdditionalActions(),
        }),
      );
    }
  }
}
