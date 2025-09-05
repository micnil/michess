import { pgEnum } from 'drizzle-orm/pg-core';

export const resultReasonEnum = pgEnum('result_reason', [
  'checkmate',
  'stalemate',
  'timeout',
  'resignation',
  'abandoned',
]);
