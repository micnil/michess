import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { Sql } from 'postgres';
import { DatabaseClient } from '../DatabaseClient';
import * as schema from '../schema';

export const createDrizzleAdapter = (db: Sql) => {
  const dbClient = DatabaseClient.from(db);
  return drizzleAdapter(dbClient, {
    provider: 'pg',
    schema,
    usePlural: true,
  });
};
