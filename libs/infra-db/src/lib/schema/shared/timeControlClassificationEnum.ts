import { pgEnum } from 'drizzle-orm/pg-core';

export const timeControlClassificationEnum = pgEnum(
  'time_control_classification',
  ['correspondence', 'blitz', 'bullet', 'rapid', 'no_clock'],
);
