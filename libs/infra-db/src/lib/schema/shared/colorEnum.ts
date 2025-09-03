import { pgEnum } from 'drizzle-orm/pg-core';

export const colorEnum = pgEnum('color', ['white', 'black']);
