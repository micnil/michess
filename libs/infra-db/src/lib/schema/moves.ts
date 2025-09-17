import { relations } from 'drizzle-orm';
import { pgTable, serial, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { games } from './games';

export const moves = pgTable('moves', {
  moveId: serial('move_id').primaryKey().notNull(),
  gameId: uuid('game_id')
    .references(() => games.gameId, { onDelete: 'cascade' })
    .notNull(),
  uci: varchar('uci', { length: 10 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const movesRelations = relations(moves, ({ one }) => ({
  game: one(games, {
    fields: [moves.gameId],
    references: [games.gameId],
  }),
}));
