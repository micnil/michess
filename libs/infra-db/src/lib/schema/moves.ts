import { pgTable, serial, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { games } from './games';
import { colorEnum } from './shared/colorEnum';

export const moves = pgTable('moves', {
  moveId: serial('move_id').primaryKey().notNull(),
  gameId: uuid('game_id').references(() => games.gameId),
  uci: varchar('uci', { length: 10 }).notNull(),
  color: colorEnum().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
