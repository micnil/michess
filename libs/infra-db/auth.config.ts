import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { anonymous } from 'better-auth/plugins/anonymous';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { createClient } from 'redis';
import * as schema from './src/lib/schema';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const client = postgres(process.env.DATABASE_URL!);
const db = drizzle<typeof schema>({ client });
const redisClient = createClient();

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
    usePlural: true,
  }),
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
