import { UsageMetricsV1 } from '@michess/api-schema';
import { logger } from '@michess/be-utils';
import { CacheRepository, GameRepository } from '@michess/infra-db';
import { Queue, Worker } from 'bullmq';

export class UsageMetricsService {
  private processTrackerQueue: Queue<{ processId: string }>;
  private processTrackerWorker: Worker;
  private metricCleanupQueue: Queue;
  private metricCleanupWorker: Worker;

  constructor(
    private processId: string,
    private cacheRepo: CacheRepository,
    private gameRepo: GameRepository
  ) {
    const connectionOptions = { connection: this.cacheRepo.client };
    this.processTrackerQueue = new Queue(
      `process-tracker/${processId}`,
      connectionOptions
    );
    this.processTrackerWorker = new Worker(
      `process-tracker/${processId}`,
      this.trackProcess.bind(this),
      connectionOptions
    );
    this.metricCleanupQueue = new Queue('metric-cleanup', connectionOptions);
    this.metricCleanupWorker = new Worker(
      'metric-cleanup',
      this.cleanupMetrics.bind(this),
      connectionOptions
    );
  }

  async initialize() {
    await this.metricCleanupQueue.upsertJobScheduler('cleanup-metrics', {
      every: 5000,
    });
    await this.processTrackerQueue.upsertJobScheduler(
      'process-heartbeat',
      {
        every: 5000,
      },
      { data: { processId: this.processId } }
    );
  }

  async close() {
    logger.info({ processId: this.processId }, 'Closing usage metrics service');
    await this.processTrackerWorker.close();
    await this.metricCleanupWorker.close();
    await this.metricCleanupQueue.close();
    await this.processTrackerQueue.close();
  }

  private async cleanupMetrics() {
    const processStates = await this.cacheRepo.getProcessStates();
    let hasProcessStopped = false;

    for (const { processId, isUp } of processStates) {
      if (isUp) {
        continue;
      }
      logger.info(
        { processId: this.processId },
        'Cleaning up process client counts'
      );
      hasProcessStopped = true;
      await this.cacheRepo.removeProcess(processId);
    }

    if (hasProcessStopped) {
      await this.cacheRepo.calcTotalClients();
    }
  }

  private async trackProcess(job: { data: { processId: string } }) {
    logger.debug({ processId: job.data.processId }, 'Process heartbeat');
    await this.cacheRepo.setProcessUp(job.data.processId, 10);
  }

  async setClientCount(count: number) {
    await this.cacheRepo.setClientCount(this.processId, count);
    await this.cacheRepo.calcTotalClients();
  }

  async incrementClientCount() {
    await this.cacheRepo.incrementClientCount(this.processId);
  }

  async decrementClientCount() {
    await this.cacheRepo.decrementClientCount(this.processId);
  }

  async getTotalClientCount(): Promise<number> {
    const count = await this.cacheRepo.client.get('total-clients');
    return count ? parseInt(count) : 0;
  }

  async getUsageMetrics(): Promise<UsageMetricsV1> {
    const totalClients = await this.getTotalClientCount();
    const gameStats = await this.gameRepo.countGameStats();

    return {
      connectionCount: totalClients,
      activeGameCount: gameStats.activeCount,
      todaysCompletedGameCount: gameStats.todayCompletedCount,
    };
  }
}
