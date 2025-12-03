import { Maybe } from '@michess/common-utils';
import { TimeControlClassification } from '@michess/core-game';
import Redis from 'ioredis';
import { QueueEntry } from './QueueEntry';

type QueueKey = `matchmaking:${string}:${TimeControlClassification}:${string}`;

export class MatchmakingRepository {
  constructor(private redis: Redis) {}

  private getQueueKey(
    variant: 'standard',
    timeControlClassification: TimeControlClassification,
    timeControl: QueueEntry['timeControl'],
  ): QueueKey {
    const timeControlStr = timeControl
      ? `${timeControl.initialSec}+${timeControl.incrementSec}`
      : 'none';
    return `matchmaking:${variant}:${timeControlClassification}:${timeControlStr}`;
  }

  private getEntryKey(playerId: string): string {
    return `matchmaking:entry:${playerId}`;
  }

  async joinQueue(entry: QueueEntry): Promise<void> {
    const queueKey = this.getQueueKey(
      entry.variant,
      entry.timeControlClassification,
      entry.timeControl,
    );
    const entryKey = this.getEntryKey(entry.playerId);

    await this.redis.setex(entryKey, 300, JSON.stringify(entry));

    await this.redis.zadd(queueKey, entry.rating, entry.playerId);
    await this.redis.expire(queueKey, 300);
  }

  async leaveQueue(playerId: string): Promise<boolean> {
    const entryKey = this.getEntryKey(playerId);
    const entryData = await this.redis.get(entryKey);

    if (entryData) {
      const entry: QueueEntry = JSON.parse(entryData);
      const queueKey = this.getQueueKey(
        entry.variant,
        entry.timeControlClassification,
        entry.timeControl,
      );

      await this.redis.zrem(queueKey, playerId);
      await this.redis.del(entryKey);

      return true;
    } else {
      return false;
    }
  }

  async findMatch(
    playerId: string,
    ratingRange: number = 200,
  ): Promise<Maybe<QueueEntry>> {
    const entryKey = this.getEntryKey(playerId);
    const entryData = await this.redis.get(entryKey);

    if (!entryData) {
      return undefined;
    }

    const playerEntry: QueueEntry = JSON.parse(entryData);
    const queueKey = this.getQueueKey(
      playerEntry.variant,
      playerEntry.timeControlClassification,
      playerEntry.timeControl,
    );

    const minRating = playerEntry.rating - ratingRange;
    const maxRating = playerEntry.rating + ratingRange;

    const candidateIds = await this.redis.zrangebyscore(
      queueKey,
      minRating,
      maxRating,
    );

    // Find first candidate that isn't the player themselves
    for (const candidateId of candidateIds) {
      if (candidateId === playerId) {
        continue;
      }

      const candidateKey = this.getEntryKey(candidateId);
      const candidateData = await this.redis.get(candidateKey);

      if (!candidateData) {
        // Clean up stale entry
        await this.redis.zrem(queueKey, candidateId);
        continue;
      }

      const candidate: QueueEntry = JSON.parse(candidateData);

      return candidate;
    }

    return undefined;
  }

  async getQueueEntry(playerId: string): Promise<Maybe<QueueEntry>> {
    const entryKey = this.getEntryKey(playerId);
    const entryData = await this.redis.get(entryKey);

    if (!entryData) {
      return undefined;
    }

    return JSON.parse(entryData);
  }

  async getAllPlayerIds(): Promise<string[]> {
    const keys = await this.redis.keys('matchmaking:entry:*');
    return keys.map((key) => key.replace('matchmaking:entry:', ''));
  }
}
