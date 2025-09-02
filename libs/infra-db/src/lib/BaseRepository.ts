import { Sql } from 'postgres';
import { DatabaseClient } from './DatabaseClient';
import * as schema from './schema';
import { PgInsertBuilder, PgUpdateBuilder } from 'drizzle-orm/pg-core';
import { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js';

type Schema = typeof schema;

export class BaseRepository {
  protected db: DatabaseClient;
  protected schema: typeof schema;

  constructor(pgClient: Sql) {
    this.db = DatabaseClient.from(pgClient);
    this.schema = schema;
  }
  protected insert<T extends keyof Schema>(
    table: T
  ): PgInsertBuilder<Schema[T], PostgresJsQueryResultHKT> {
    return this.db.insert(schema[table]);
  }

  protected update<T extends keyof Schema>(
    table: T
  ): PgUpdateBuilder<Schema[T], PostgresJsQueryResultHKT> {
    return this.db.update(schema[table]);
  }
}
