import { timestamp } from 'drizzle-orm/pg-core';

export const updatedAt = timestamp('updated_at')
  .defaultNow()
  .$onUpdate(() => /* @__PURE__ */ new Date())
  .notNull();
