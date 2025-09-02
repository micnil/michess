import { InferSelectModel } from 'drizzle-orm';
import { users } from '../schema';

export type InsertUser = InferSelectModel<typeof users>;
