import { logger } from '@michess/be-utils';
import { EventEmitter, Maybe } from '@michess/common-utils';
import { TimeControlClassification } from '@michess/core-game';
import { MatchmakingRepository, QueueEntry } from '@michess/infra-db';
import { Job, Queue, Worker } from 'bullmq';
import Redis from 'ioredis';
import { GamesService } from '../../games/service/GamesService';
import { LockService } from '../../lock/service/LockService';
import { RatingsService } from '../../user/service/RatingsService';

type MatchFoundEvent = {
  type: 'match_found';
  data: {
    player1Id: string;
    player2Id: string;
    gameId: string;
  };
};

type MatchmakingEvent = MatchFoundEvent;

type MatchmakingJobData = Record<string, never>;

export class MatchmakingService extends EventEmitter<MatchmakingEvent> {
  private matchmakingQueue: Queue<MatchmakingJobData>;
  private matchmakingWorker: Worker<MatchmakingJobData>;

  constructor(
    private redis: Redis,
    private gamesService: GamesService,
    private ratingsService: RatingsService,
    private lockService: LockService,
    private matchmakingRepository: MatchmakingRepository,
  ) {
    super();

    const connectionOptions = { connection: redis };

    this.matchmakingQueue = new Queue('matchmaking', connectionOptions);
    this.matchmakingWorker = new Worker(
      'matchmaking',
      this.processMatchmaking.bind(this),
      connectionOptions,
    );
  }

  async initialize(): Promise<void> {
    // Run matchmaking every 2 seconds
    await this.matchmakingQueue.upsertJobScheduler('find-matches', {
      every: 2000,
    });
  }

  async close(): Promise<void> {
    logger.info('Closing matchmaking service');
    await this.matchmakingWorker.close();
    await this.matchmakingQueue.close();
  }

  async joinQueue(
    playerId: string,
    playerName: Maybe<string>,
    options: {
      variant: 'standard';
      timeControlClassification: TimeControlClassification;
      timeControl?: {
        initialSec: number;
        incrementSec: number;
      };
    },
  ): Promise<void> {
    // Get player rating
    const rating = await this.ratingsService.getRatingByPlayerId(
      playerId,
      options.variant,
      options.timeControlClassification,
    );

    const entry: QueueEntry = {
      playerId,
      playerName: playerName ?? 'Anonymous',
      rating: rating.value,
      variant: options.variant,
      timeControlClassification: options.timeControlClassification,
      timeControl: options.timeControl,
      joinedAt: Date.now(),
    };

    await this.matchmakingRepository.joinQueue(entry);

    logger.info(
      {
        playerId,
        rating: rating.value,
        timeControl: options.timeControlClassification,
      },
      'Player joined matchmaking queue',
    );
  }

  async leaveQueue(playerId: string): Promise<boolean> {
    const removed = await this.matchmakingRepository.leaveQueue(playerId);

    if (removed) {
      logger.info({ playerId }, 'Player left matchmaking queue');
    }

    return removed;
  }

  async getQueueEntry(playerId: string): Promise<Maybe<QueueEntry>> {
    return this.matchmakingRepository.getQueueEntry(playerId);
  }

  private async processMatchmaking(
    _job: Job<MatchmakingJobData>,
  ): Promise<void> {
    await using lock = await this.lockService.acquireLock(
      'matchmaking',
      'global',
    );

    const playerIds = new Set(
      await this.matchmakingRepository.getAllPlayerIds(),
    );

    for (const playerId of playerIds) {
      if (!playerIds.has(playerId)) {
        continue;
      }

      const opponentId = await this.attemptMatch(playerId);
      if (opponentId) {
        playerIds.delete(playerId);
        playerIds.delete(opponentId);
      }
    }
  }

  private async attemptMatch(playerId: string): Promise<string | undefined> {
    const opponent = await this.matchmakingRepository.findMatch(playerId, 200);

    if (!opponent) {
      return undefined;
    }

    const playerEntry =
      await this.matchmakingRepository.getQueueEntry(playerId);

    if (!playerEntry) {
      return undefined;
    }

    logger.info(
      {
        player1: playerId,
        player2: opponent.playerId,
        ratingDiff: Math.abs(playerEntry.rating - opponent.rating),
      },
      'Match found',
    );

    try {
      // Create game
      const gameDetails = await this.gamesService.createGame({
        variant: playerEntry.variant,
        isPrivate: false,
        timeControl: playerEntry.timeControl
          ? {
              type: 'realtime',
              initialSec: playerEntry.timeControl.initialSec,
              incrementSec: playerEntry.timeControl.incrementSec,
            }
          : undefined,
      });

      // Remove both from queue
      await this.matchmakingRepository.leaveQueue(playerId);
      await this.matchmakingRepository.leaveQueue(opponent.playerId);

      // Emit match found event
      this.emit({
        type: 'match_found',
        data: {
          player1Id: playerId,
          player2Id: opponent.playerId,
          gameId: gameDetails.id,
        },
      });

      logger.info(
        {
          player1: playerId,
          player2: opponent.playerId,
          gameId: gameDetails.id,
        },
        'Match created successfully',
      );

      return opponent.playerId;
    } catch (error) {
      logger.error(
        {
          error,
          player1: playerId,
          player2: opponent.playerId,
        },
        'Failed to create match',
      );
      return undefined;
    }
  }
}
