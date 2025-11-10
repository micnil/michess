import { relations } from 'drizzle-orm';
import {
  foreignKey,
  index,
  pgTable,
  real,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { games } from './games';
import { timeControlClassificationEnum } from './shared/timeControlClassificationEnum';
import { variantEnum } from './shared/variantEnum';
import { users } from './users';

export const ratings = pgTable(
  'ratings',
  {
    id: serial('id').primaryKey().notNull(),
    playerId: text('player_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
      }),
    gameId: uuid('game_id').references(() => games.gameId, {
      onDelete: 'set null',
    }),
    variant: variantEnum().notNull(),
    timeControlClassification: timeControlClassificationEnum(
      'time_control_classification',
    ).notNull(),
    rating: real('rating').notNull(),
    deviation: real('deviation').notNull(),
    volatility: real('volatility').notNull(),
    timestamp: timestamp('timestamp').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    index('idx_ratings_player_variant_tc_created').on(
      table.playerId,
      table.variant,
      table.timeControlClassification,
      table.timestamp.desc(),
    ),
    // Composite foreign key constraint
    foreignKey({
      columns: [table.gameId, table.variant, table.timeControlClassification],
      foreignColumns: [
        games.gameId,
        games.variant,
        games.timeControlClassification,
      ],
      name: 'ratings_game_variant_tc_fk',
    }),
  ],
);

export const ratingsRelations = relations(ratings, ({ one }) => ({
  player: one(users, {
    fields: [ratings.playerId],
    references: [users.id],
  }),
  game: one(games, {
    fields: [
      ratings.gameId,
      ratings.variant,
      ratings.timeControlClassification,
    ],
    references: [games.gameId, games.variant, games.timeControlClassification],
  }),
}));
