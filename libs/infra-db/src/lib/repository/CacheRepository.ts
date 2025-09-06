import { Maybe } from '@michess/common-utils';
import { RedisClientType } from 'redis';

type CacheKey = string;
type CacheValue = string;
type CacheExpiration = number; // seconds

export class CacheRepository {
  constructor(private readonly redisClient: RedisClientType) {}

  async get(key: CacheKey): Promise<Maybe<CacheValue>> {
    const value = await this.redisClient.get(key);
    return value ?? undefined;
  }

  async set(
    key: CacheKey,
    value: CacheValue,
    expirationSeconds?: CacheExpiration
  ): Promise<void> {
    if (expirationSeconds) {
      await this.redisClient.setEx(key, expirationSeconds, value);
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
    await this.redisClient.flushAll();
  }
}
