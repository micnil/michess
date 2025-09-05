import { pgEnum } from 'drizzle-orm/pg-core';

export const gameStatusEnum = pgEnum('game_status', [
  'empty', // before anyone has joined
  'waiting', // Waiting for players to join
  'ready', // Both players joined, ready to start
  'in-progress', // Game is actively being played
  'end', // Game has ended
]);
