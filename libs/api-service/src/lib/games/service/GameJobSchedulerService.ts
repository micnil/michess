import { logger } from '@michess/be-utils';
import { CacheRepository, GameRepository } from '@michess/infra-db';
import { Queue, Worker } from 'bullmq';
import { BULLMQ_JOB_OPTIONS } from '../../jobs/BullMqJobOptions';

export class GameJobSchedulerService {
  private gameCleanupQueue: Queue;
  private gameCleanupWorker: Worker;

  constructor(
    private gameRepository: GameRepository,
    private cacheRepo: CacheRepository,
  ) {
    const connectionOptions = { connection: this.cacheRepo.client };
    const queueOptions = {
      ...connectionOptions,
      defaultJobOptions: BULLMQ_JOB_OPTIONS,
    };
    this.gameCleanupQueue = new Queue(`game-cleanup`, queueOptions);
    this.gameCleanupWorker = new Worker(
      `game-cleanup`,
      this.cleanupGames.bind(this),
      connectionOptions,
    );
  }

  async close(): Promise<void> {
    logger.info('Closing game job scheduler service');
    await this.gameCleanupWorker.close();
    await this.gameCleanupQueue.close();
  }

  async initialize(): Promise<void> {
    await this.gameCleanupQueue.upsertJobScheduler(
      'cleanup-games',
      {
        pattern: '0 3 * * *',
      },
      {
        name: 'cleanup-games',
        opts: BULLMQ_JOB_OPTIONS,
      },
    );
  }

  private async cleanupGames(): Promise<void> {
    logger.info('Cleaning up empty games...');
    const cutoffDate = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
    await this.gameRepository.deleteGames({
      status: 'EMPTY',
      olderThan: cutoffDate,
    });
  }
}
