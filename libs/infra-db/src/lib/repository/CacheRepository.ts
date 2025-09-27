import { Maybe } from '@michess/common-utils';
import Redis from 'ioredis';

type CacheKey = string;
type CacheValue = string;
type CacheExpiration = number; // seconds

export class CacheRepository {
  constructor(private readonly redisClient: Redis) {}

  get client(): Redis {
    return this.redisClient;
  }

  async get(key: CacheKey): Promise<Maybe<CacheValue>> {
    const value = await this.redisClient.get(key);
    return value ?? undefined;
  }

  async setProcessUp(
    processId: string,
    expirationSeconds: number
  ): Promise<void> {
    await this.redisClient
      .multi()
      .sadd('processes', processId)
      .setex(`${processId}:is-up`, expirationSeconds, '1')
      .exec();
  }

  async incrementClientCount(processId: string): Promise<void> {
    await this.redisClient
      .multi()
      .incr(`${processId}:total-clients`)
      .incr('total-clients')
      .exec();
  }

  async decrementClientCount(processId: string): Promise<void> {
    await this.redisClient
      .multi()
      .decr(`${processId}:total-clients`)
      .decr('total-clients')
      .exec();
  }

  async clearClientCount(processId: string): Promise<void> {
    const count = await this.redisClient.get(`${processId}:total-clients`);
    if (count) {
      await this.redisClient
        .multi()
        .del(`${processId}:total-clients}`)
        .decrby('total-clients', parseInt(count))
        .exec();
    }
  }

  async removeProcess(processId: string): Promise<void> {
    await this.redisClient
      .multi()
      .srem('processes', processId)
      .del(`${processId}:is-up`)
      .exec();
  }

  async getProcessStates(): Promise<{ processId: string; isUp: boolean }[]> {
    const processes = await this.redisClient.smembers('processes');
    const states = await this.redisClient.mget(
      processes.map((p: string) => `${p}:is-up`)
    );

    return processes.map((processId: string, index: number) => ({
      processId,
      isUp: states[index] === '1',
    }));
  }

  async set(
    key: CacheKey,
    value: CacheValue,
    expirationSeconds?: CacheExpiration
  ): Promise<void> {
    if (expirationSeconds) {
      await this.redisClient.setex(key, expirationSeconds, value);
      return;
    } else {
      await this.redisClient.set(key, value);
    }
  }

  async delete(key: CacheKey): Promise<boolean> {
    const result = await this.redisClient.del(key);
    return result > 0;
  }

  async exists(key: CacheKey): Promise<boolean> {
    const result = await this.redisClient.exists(key);
    return result > 0;
  }

  async setJson<T>(
    key: CacheKey,
    value: T,
    expirationSeconds?: CacheExpiration
  ): Promise<void> {
    const jsonValue = JSON.stringify(value);
    await this.set(key, jsonValue, expirationSeconds);
  }

  async getJson<T>(key: CacheKey): Promise<Maybe<T>> {
    const value = await this.get(key);
    if (!value) {
      return undefined;
    }

    const parsedValue = JSON.parse(value) as T;
    return parsedValue;
  }

  async increment(key: CacheKey): Promise<number> {
    return await this.redisClient.incr(key);
  }

  async decrement(key: CacheKey): Promise<number> {
    return await this.redisClient.decr(key);
  }

  async flush(): Promise<void> {
    await this.redisClient.flushall();
  }
}
