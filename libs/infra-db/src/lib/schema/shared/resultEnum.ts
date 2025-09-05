import { pgEnum } from 'drizzle-orm/pg-core';

export const resultEnum = pgEnum('result', [
  '1-0',
  '0-1',
  '1/2-1/2',
  '0-0', // Game in progress or not started
]);
