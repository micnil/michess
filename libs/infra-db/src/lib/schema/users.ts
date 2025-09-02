import { pgTable, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  userId: uuid('user_id').primaryKey().defaultRandom(),
});
