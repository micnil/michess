import { Sql } from 'postgres';
import { DatabaseClient } from '../DatabaseClient';
import * as schema from '../schema';

type Schema = typeof schema;
export class BaseRepository {
  protected db: DatabaseClient;
  protected schema: Schema;

  constructor(pgClient: Sql) {
    this.db = DatabaseClient.from(pgClient);
    this.schema = schema;
  }
}
