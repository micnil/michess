import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { updatedAt } from './shared/updatedAt';
import { users } from './users';

export const gameStatusEnum = pgEnum('game_status', [
  'empty', // before anyone has joined
  'waiting', // Waiting for players to join
  'ready', // Both players joined, ready to start
  'in-progress', // Game is actively being played
  'end', // Game has ended
]);

export const resultEnum = pgEnum('result', [
  '1-0',
  '0-1',
  '1/2-1/2',
  '0-0', // Game in progress or not started
]);
export const resultReasonEnum = pgEnum('result_reason', [
  'checkmate',
  'stalemate',
  'timeout',
  'resignation',
  'abandoned',
]);
export const variantEnum = pgEnum('variant', ['standard']);

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
