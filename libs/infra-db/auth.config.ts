import { betterAuth } from 'better-auth';
import { anonymous } from 'better-auth/plugins/anonymous';
import postgres from 'postgres';
import { createClient } from 'redis';
import { createDrizzleAdapter } from './src/lib/auth/drizzleAdapter';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const client = postgres(process.env.DATABASE_URL!);
const redisClient = createClient();

export const auth = betterAuth({
  database: createDrizzleAdapter(client),
  secondaryStorage: {
    get: async (key) => {
      return await redisClient.get(key);
    },
    set: async (key, value, ttl) => {
      if (ttl) await redisClient.set(key, value, { EX: ttl });
      else await redisClient.set(key, value);
    },
    delete: async (key) => {
      await redisClient.del(key);
    },
  },
  plugins: [anonymous()],
});
