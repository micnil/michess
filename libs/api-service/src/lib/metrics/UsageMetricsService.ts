import { UsageMetricsV1 } from '@michess/api-schema';
import { CacheRepository, GameRepository } from '@michess/infra-db';
import { Queue, Worker } from 'bullmq';

export class UsageMetricsService {
  processTrackerQueue: Queue<{ processId: string }>;
  processTrackerWorker: Worker;
  metricCleanupQueue: Queue;
  metricCleanupWorker: Worker;

  // gameStatsQueue: Queue;
  // gameStatsWorker: Worker;
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

    // this.gameStatsQueue = new Queue('game-stats', connectionOptions);
    // this.gameStatsWorker = new Worker(
    //   'game-stats',
    //   this.trackGameStats.bind(this),
    //   connectionOptions
    // );
  }

  async initialize() {
    await this.processTrackerQueue.upsertJobScheduler(
      'process-heartbeat',
      {
        every: 5000,
      },
      { data: { processId: this.processId } }
    );

    await this.metricCleanupQueue.upsertJobScheduler('cleanup-metrics', {
      every: 5000,
    });
  }

  async shutdown() {
    await this.processTrackerQueue.close();
  }

  private async cleanupMetrics() {
    const processStates = await this.cacheRepo.getProcessStates();

    for (const { processId, isUp } of processStates) {
      if (isUp) {
        continue;
      }

      await this.cacheRepo.removeProcess(processId);
      await this.cacheRepo.clearClientCount(processId);
    }
  }

  private async trackProcess() {
    await this.cacheRepo.setProcessUp(this.processId, 10);
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
    const totalClients = parseInt(
      (await this.cacheRepo.client.get('total-clients')) || '0'
    );

    this.gameRepo.
  }
}
