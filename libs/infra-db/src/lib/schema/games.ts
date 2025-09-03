import { boolean, pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';

const gameStatusEnum = pgEnum('game_status', [
  'empty', // before anyone has joined
  'waiting', // Waiting for players to join
  'ready', // Both players joined, ready to start
  'in-progress', // Game is actively being played
  'end', // Game has ended
]);

const resultEnum = pgEnum('result', [
  '1-0',
  '0-1',
  '1/2-1/2',
  '0-0', // Game in progress or not started
]);
const resultReasonEnum = pgEnum('result_reason', [
  'checkmate',
  'stalemate',
  'timeout',
  'resignation',
  'abandoned',
]);
const variantEnum = pgEnum('variant', ['standard']);

export const games = pgTable('games', {
  gameId: uuid('game_id').primaryKey().defaultRandom(),
  variant: variantEnum().default('standard').notNull(),
  isPrivate: boolean('is_private').default(false).notNull(),

  whitePlayerId: uuid('white_player_id').references(() => users.userId),
  blackPlayerId: uuid('black_player_id').references(() => users.userId),

  status: gameStatusEnum().default('empty').notNull(),
  result: resultEnum().default('0-0').notNull(),
  resultReason: resultReasonEnum(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  startedAt: timestamp('started_at'),
  endedAt: timestamp('ended_at'),
});
