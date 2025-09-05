import { PgInsertBuilder, PgUpdateBuilder } from 'drizzle-orm/pg-core';
import { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js';
import { Sql } from 'postgres';
import { DatabaseClient } from '../DatabaseClient';
import * as schema from '../schema';
import * as tables from '../schema/tables';

type Tables = typeof tables;
type Schema = typeof schema;
export class BaseRepository {
  protected db: DatabaseClient;
  protected schema: Schema;

  constructor(pgClient: Sql) {
    this.db = DatabaseClient.from(pgClient);
    this.schema = schema;
  }
  protected insert<T extends keyof Tables>(
    table: T
  ): PgInsertBuilder<Tables[T], PostgresJsQueryResultHKT> {
    return this.db.insert(tables[table]);
  }

  protected update<T extends keyof Tables>(
    table: T
  ): PgUpdateBuilder<Tables[T], PostgresJsQueryResultHKT> {
    return this.db.update(tables[table]);
  }
}
