import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { DatabaseClient } from '../DatabaseClient';
import * as schema from '../schema';

export const createDrizzleAdapter = (db: DatabaseClient) => {
  return drizzleAdapter(db, {
    provider: 'pg',
    schema,
    usePlural: true,
  });
};
