import { pgEnum } from 'drizzle-orm/pg-core';

export const variantEnum = pgEnum('variant', ['standard']);
