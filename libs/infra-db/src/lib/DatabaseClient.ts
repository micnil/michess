import { logger } from '@michess/be-utils';
import { Logger } from 'drizzle-orm';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { Sql } from 'postgres';
import * as schema from './schema';

type Schema = typeof schema;

const dbLogger: Logger = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logQuery: (query: string, _: unknown[]) => {
    logger.debug(`Executing query: ${query}}`);
  },
};

export type DatabaseClient = PostgresJsDatabase<Schema>;

const from = (pgClient: Sql): DatabaseClient => {
  const drizzleClient = drizzle<Schema>({
    client: pgClient,
    schema,
    logger: dbLogger,
  });

  return drizzleClient;
};

export const DatabaseClient = {
  from,
};
