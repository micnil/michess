import { pgEnum, pgTable, uuid } from 'drizzle-orm/pg-core';

const variantEnum = pgEnum('variant', ['standard']);

export const games = pgTable('games', {
  gameId: uuid('game_id').primaryKey().defaultRandom(),
  variant: variantEnum().default('standard'),
});
