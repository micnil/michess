import Redis from 'ioredis';
import postgres from 'postgres';
import { AuthClient } from './lib/auth/AuthClient';
import { DatabaseClient } from './lib/DatabaseClient';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const client = DatabaseClient.from(postgres(process.env.DATABASE_URL!));
const redisClient = new Redis(
  process.env.REDIS_URL || 'redis://localhost:6379',
);

export const auth = AuthClient.from(client, {
  get: async (key) => {
    return await redisClient.get(key);
  },
  set: async (key, value, ttl) => {
    if (ttl) await redisClient.setex(key, ttl, value);
    else await redisClient.set(key, value);
  },
  delete: async (key) => {
    await redisClient.del(key);
  },
});
