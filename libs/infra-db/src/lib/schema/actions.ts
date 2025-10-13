import { relations } from 'drizzle-orm';
import {
  jsonb,
  pgEnum,
  pgTable,
  serial,
  smallint,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { games } from './games';
import { colorEnum } from './shared/colorEnum';

export const actionTypeEnum = pgEnum('action_type', [
  'accept_draw',
  'offer_draw',
  'resign',
]);

export const actions = pgTable('actions', {
  actionId: serial('action_id').primaryKey().notNull(),
  gameId: uuid('game_id')
    .references(() => games.gameId, { onDelete: 'cascade' })
    .notNull(),
  color: colorEnum().notNull(),
  moveNumber: smallint('move_number').notNull(),
  type: actionTypeEnum().notNull(),
  payload: jsonb().$type<{
    reason: string;
  }>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const actionsRelations = relations(actions, ({ one }) => ({
  game: one(games, {
    fields: [actions.gameId],
    references: [games.gameId],
  }),
}));
