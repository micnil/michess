import {
  boolean,
  pgSequence,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { updatedAt } from './shared/updatedAt';

export const usernameSequence = pgSequence('username_seq');

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt,
  isAnonymous: boolean('is_anonymous'),
  username: text('username').unique(),
  displayUsername: text('display_username'),
});
