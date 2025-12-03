import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../schema';

type Schema = typeof schema;

export const createDrizzleAdapter = (db: PostgresJsDatabase<Schema>) => {
  return drizzleAdapter(db, {
    provider: 'pg',
    schema,
    usePlural: true,
  });
};
