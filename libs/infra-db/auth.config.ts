import { betterAuth } from 'better-auth';
import { anonymous } from 'better-auth/plugins/anonymous';
import Redis from 'ioredis';
import postgres from 'postgres';
import { createDrizzleAdapter } from './src/lib/auth/drizzleAdapter';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const client = postgres(process.env.DATABASE_URL!);
const redisClient = new Redis(
  process.env.REDIS_URL || 'redis://localhost:6379'
);

export const auth = betterAuth({
  database: createDrizzleAdapter(client),
  secondaryStorage: {
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
  },
  plugins: [anonymous()],
});
