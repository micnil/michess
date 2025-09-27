import { CacheRepository } from '@michess/infra-db';
import { Queue, Worker } from 'bullmq';

export class UsageMetricsService {
  processTrackerQueue: Queue<{ processId: string }>;
  processTrackerWorker: Worker;
  metricCleanupQueue: Queue;
  metricCleanupWorker: Worker;
  constructor(private processId: string, private cacheRepo: CacheRepository) {
    this.processTrackerQueue = new Queue('process-tracker');
    this.processTrackerWorker = new Worker(
      'process-tracker',
      this.trackProcess.bind(this)
    );
    // TODO: Add redis client
    this.metricCleanupQueue = new Queue('metric-cleanup');
    this.metricCleanupWorker = new Worker(
      'metric-cleanup',
      this.cleanupMetrics.bind(this)
    );
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
}
