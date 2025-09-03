import { timestamp } from 'drizzle-orm/pg-core';

export const updatedAt = timestamp('updated_at')
  .defaultNow()
  .$onUpdate(() => new Date())
  .notNull();
