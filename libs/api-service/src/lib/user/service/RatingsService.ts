import { logger } from '@michess/be-utils';
import {
  GameState,
  GameVariantType,
  TimeControlClassification,
} from '@michess/core-game';
import { Rating, RatingCalculator } from '@michess/core-rating';
import {
  CacheRepository,
  GameRepository,
  RatingRepository,
} from '@michess/infra-db';
import { Job, Queue, Worker } from 'bullmq';
import { GameMapper } from '../../games/mapper/GameMapper';
import { LockService } from '../../lock/service/LockService';

type UpdateRatingJobData = {
  playerId: string;
  variant: GameVariantType;
  timeControlClassification: TimeControlClassification;
};

const STALE_RATING_DAYS = 5;

export class RatingsService {
  private ratingDecayQueue: Queue;
  private ratingDecayWorker: Worker;
  private updateRatingQueue: Queue<UpdateRatingJobData>;
  private updateRatingWorker: Worker<UpdateRatingJobData>;

  constructor(
    private readonly ratingRepository: RatingRepository,
    private readonly gameRepository: GameRepository,
    private readonly cacheRepository: CacheRepository,
    private readonly lockService: LockService,
  ) {
    const connectionOptions = { connection: this.cacheRepository.client };

    this.ratingDecayQueue = new Queue('rating-decay', connectionOptions);
    this.ratingDecayWorker = new Worker(
      'rating-decay',
      this.processStaleRatings.bind(this),
      connectionOptions,
    );

    this.updateRatingQueue = new Queue('update-rating', connectionOptions);
    this.updateRatingWorker = new Worker(
      'update-rating',
      this.updatePlayerRating.bind(this),
      connectionOptions,
    );
  }

  async initialize() {
    // Schedule job to check for stale ratings every day at 2 AM
    await this.ratingDecayQueue.upsertJobScheduler('check-stale-ratings', {
      pattern: '0 2 * * *',
    });
  }

  async close() {
    logger.info('Closing ratings service');
    await this.ratingDecayWorker.close();
    await this.ratingDecayQueue.close();
    await this.updateRatingWorker.close();
    await this.updateRatingQueue.close();
  }

  async queueRatingUpdate(
    playerId: string,
    variant: GameVariantType,
    timeControlClassification: TimeControlClassification,
  ): Promise<void> {
    const deduplicationId = `${playerId}-${variant}-${timeControlClassification}`;

    await this.updateRatingQueue.add(
      'update-rating',
      {
        playerId,
        variant,
        timeControlClassification,
      },
      {
        deduplication: {
          id: deduplicationId,
        },
      },
    );
  }

  async queueRatingUpdateForGame(gameState: GameState): Promise<void> {
    const whitePlayerId = gameState.players.white?.id;
    const blackPlayerId = gameState.players.black?.id;

    if (whitePlayerId) {
      await this.queueRatingUpdate(
        whitePlayerId,
        gameState.variant,
        gameState.timeControl.classification,
      );
    }

    if (blackPlayerId) {
      await this.queueRatingUpdate(
        blackPlayerId,
        gameState.variant,
        gameState.timeControl.classification,
      );
    }
  }

  private async processStaleRatings(): Promise<void> {
    logger.info('Processing stale ratings...');
    const cutoffDate = new Date(
      Date.now() - STALE_RATING_DAYS * 24 * 60 * 60 * 1000,
    );

    const staleRatings =
      await this.ratingRepository.getStaleRatings(cutoffDate);

    logger.info(
      { count: staleRatings.length, cutoffDate },
      'Found stale ratings',
    );

    for (const staleRating of staleRatings) {
      await this.queueRatingUpdate(
        staleRating.playerId,
        staleRating.variant,
        staleRating.timeControlClassification,
      );
    }
  }

  private async updatePlayerRating(
    job: Job<UpdateRatingJobData>,
  ): Promise<void> {
    const { playerId, variant, timeControlClassification } = job.data;

    logger.info(
      {
        playerId,
        variant,
        timeControlClassification,
      },
      'Updating player rating',
    );

    // Get the current rating to determine when it was last updated
    const currentRating = await this.ratingRepository.getRatingByPlayerId(
      playerId,
      variant,
      timeControlClassification,
    );

    if (!currentRating) {
      logger.warn(
        { playerId, variant, timeControlClassification },
        'No rating found for player, skipping update',
      );
      return;
    }

    // Remove deduplication key and acquire lock
    // This allows new jobs to be queued while we process, but they'll wait for the lock
    const deduplicationId = `${playerId}-${variant}-${timeControlClassification}`;
    await using _ = await this.lockService.acquireLock(
      'rating',
      deduplicationId,
    );
    await this.updateRatingQueue.removeDeduplicationKey(deduplicationId);

    // Capture the "until" timestamp at the start to define our processing window
    const processingEndTime = new Date();

    // Query for games in the window [lastRatingTimestamp, processingEndTime]
    const { games } = await this.gameRepository.queryGames(
      {
        playerId,
        variant,
        timeControlClassification,
        completedAfter: currentRating.timestamp,
        completedBefore: processingEndTime,
        status: ['ENDED'],
      },
      { sortBy: 'endedAt', sortOrder: 'asc' },
    );

    logger.info(
      {
        playerId,
        variant,
        timeControlClassification,
        gamesCount: games.length,
        lastRatingTimestamp: currentRating.timestamp,
        processingEndTime,
      },
      'Found games since last rating update',
    );

    let latestRating = currentRating;
    for (const game of games) {
      const chessGame = GameMapper.fromSelectGameWithRelations(game);
      const gameResult = chessGame.getPlayerGameResult(playerId);
      if (gameResult) {
        const { newRating } = RatingCalculator.compute(
          latestRating,
          gameResult,
        );
        const gameRating = await this.ratingRepository.createRating({
          playerId,
          variant,
          timeControlClassification,
          rating: newRating.value,
          deviation: newRating.deviation,
          volatility: newRating.volatility,
          timestamp: gameResult.timestamp,
        });
        latestRating = gameRating;
      }
    }

    const newRating = RatingCalculator.decay(latestRating, processingEndTime);
    await this.ratingRepository.createRating({
      playerId,
      variant,
      timeControlClassification,
      rating: newRating.value,
      deviation: newRating.deviation,
      volatility: newRating.volatility,
      timestamp: processingEndTime,
    });
  }

  getRatingByPlayerId(
    playerId: string,
    variant: GameVariantType,
    timeControl: TimeControlClassification,
  ) {
    const rating = this.ratingRepository.getRatingByPlayerId(
      playerId,
      variant,
      timeControl,
    );
    if (rating) {
      return rating;
    } else {
      const defaultRating = Rating.default();
      return this.ratingRepository.createRating({
        playerId,
        variant,
        timeControlClassification: timeControl,
        rating: defaultRating.value,
        deviation: defaultRating.deviation,
        volatility: defaultRating.volatility,
        timestamp: new Date(),
      });
    }
  }
}
