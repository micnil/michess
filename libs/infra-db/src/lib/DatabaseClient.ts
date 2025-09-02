import { Sql } from 'postgres';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from './schema';

type Schema = typeof schema;

export type DatabaseClient = PostgresJsDatabase<Schema>;

const from = (pgClient: Sql): DatabaseClient => {
  const drizzleClient = drizzle<Schema>({ client: pgClient });

  return drizzleClient;
};

export const DatabaseClient = {
  from,
};
