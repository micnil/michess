import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { updatedAt } from './shared/updatedAt';

export const verifications = pgTable('verifications', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt,
});
