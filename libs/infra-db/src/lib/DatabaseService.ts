import { Sql } from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

export class DatabaseService {
  constructor(pgClient: Sql) {
    const db = drizzle({ client: pgClient });
  }
}
