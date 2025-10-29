import Redis from 'ioredis';
import { Mutex } from 'redis-semaphore';
import { DisposableLock } from '../model/DisposableLock';
import { ResourceType } from '../model/ResourceType';

export class LockService {
  private redis: Redis;

  constructor(redis: Redis) {
    this.redis = redis;
  }

  async acquireLock(
    resource: ResourceType,
    id: string,
  ): Promise<DisposableLock> {
    const mutex = new Mutex(this.redis, `${resource}:${id}`);
    await mutex.acquire();
    return {
      release: async () => {
        await mutex.release();
      },
      [Symbol.asyncDispose]: async () => {
        await mutex.release();
      },
    };
  }
}
