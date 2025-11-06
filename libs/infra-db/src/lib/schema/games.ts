import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  check,
  jsonb,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';
import { TimeControlJsonB } from '../model/TimeControlJsonB';
import { actions } from './actions';
import { moves } from './moves';
import { gameStatusEnum } from './shared/gameStatusEnum';
import { resultEnum } from './shared/resultEnum';
import { resultReasonEnum } from './shared/resultReasonEnum';
import { timeControlClassificationEnum } from './shared/timeControlClassificationEnum';
import { updatedAt } from './shared/updatedAt';
import { variantEnum } from './shared/variantEnum';
import { users } from './users';

export const games = pgTable(
  'games',
  {
    gameId: uuid('game_id').primaryKey().defaultRandom(),
    variant: variantEnum().default('standard').notNull(),
    isPrivate: boolean('is_private').default(false).notNull(),

    whitePlayerId: text('white_player_id').references(() => users.id, {
      onDelete: 'set null',
    }),
    blackPlayerId: text('black_player_id').references(() => users.id, {
      onDelete: 'set null',
    }),
    timeControlClassification: timeControlClassificationEnum(
      'time_control_classification',
    )
      .notNull()
      .default('no_clock'),
    timeControl: jsonb('time_control').$type<TimeControlJsonB>(),
    status: gameStatusEnum().default('empty').notNull(),
    result: resultEnum().default('0-0').notNull(),
    resultReason: resultReasonEnum('result_reason'),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt,
    startedAt: timestamp('started_at'),
    endedAt: timestamp('ended_at'),
  },
  (table) => [
    check(
      'time_control_standard_check',
      sql`(
        ${table.timeControlClassification} NOT IN ('bullet', 'blitz', 'rapid')
        OR (
          ${table.timeControl} IS NOT NULL
          AND ${table.timeControl}->>'initial' IS NOT NULL
          AND ${table.timeControl}->>'increment' IS NOT NULL
        )
      )`,
    ),
    check(
      'time_control_correspondence_check',
      sql`(
        ${table.timeControlClassification} != 'correspondence'
        OR (
          ${table.timeControl} IS NOT NULL
          AND ${table.timeControl}->>'daysPerMove' IS NOT NULL
        )
      )`,
    ),
    check(
      'time_control_no_clock_check',
      sql`(
        ${table.timeControlClassification} != 'no_clock'
        OR ${table.timeControl} IS NULL
      )`,
    ),
    // Composite unique constraint for foreign key reference
    unique('game_variant_tc_unique').on(
      table.gameId,
      table.variant,
      table.timeControlClassification,
    ),
  ],
);

export const gamesRelations = relations(games, ({ many, one }) => ({
  moves: many(moves),
  actions: many(actions),
  whitePlayer: one(users, {
    fields: [games.whitePlayerId],
    references: [users.id],
  }),
  blackPlayer: one(users, {
    fields: [games.blackPlayerId],
    references: [users.id],
  }),
}));
