import { relations } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { moves } from './moves';
import { gameStatusEnum } from './shared/gameStatusEnum';
import { resultEnum } from './shared/resultEnum';
import { resultReasonEnum } from './shared/resultReasonEnum';
import { updatedAt } from './shared/updatedAt';
import { variantEnum } from './shared/variantEnum';
import { users } from './users';

export const games = pgTable('games', {
  gameId: uuid('game_id').primaryKey().defaultRandom(),
  variant: variantEnum().default('standard').notNull(),
  isPrivate: boolean('is_private').default(false).notNull(),

  whitePlayerId: text('white_player_id').references(() => users.id),
  blackPlayerId: text('black_player_id').references(() => users.id),

  status: gameStatusEnum().default('empty').notNull(),
  result: resultEnum().default('0-0').notNull(),
  resultReason: resultReasonEnum(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt,
  startedAt: timestamp('started_at'),
  endedAt: timestamp('ended_at'),
});

export const gamesRelations = relations(games, ({ many, one }) => ({
  moves: many(moves),
  whitePlayer: one(users, {
    fields: [games.whitePlayerId],
    references: [users.id],
  }),
  blackPlayer: one(users, {
    fields: [games.blackPlayerId],
    references: [users.id],
  }),
}));
