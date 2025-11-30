import { Logger } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { Sql } from 'postgres';
import * as schema from './schema';

type Schema = typeof schema;

const from = <T>(pgClient: Sql, logger?: Logger) => {
  return drizzle<Schema>({
    client: pgClient,
    schema,
    logger,
    casing: 'snake_case',
  });
};

export const Drizzle = {
  from,
};
