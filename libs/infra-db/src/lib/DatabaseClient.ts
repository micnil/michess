import { logger } from '@michess/be-utils';
import { Logger } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { Sql } from 'postgres';
import { Drizzle } from './Drizzle';
import * as schema from './schema';

type Schema = typeof schema;

const dbLogger: Logger = {
  logQuery: (query: string, params: unknown[]) => {
    logger.trace(
      `Executing query: ${query}, with params: ${JSON.stringify(params)}`,
    );
  },
};

export type DatabaseClient = PostgresJsDatabase<Schema>;

const from = (pgClient: Sql): DatabaseClient => {
  const drizzleClient = Drizzle.from<Schema>(pgClient, dbLogger);
  return drizzleClient;
};

export const DatabaseClient = {
  from,
};
