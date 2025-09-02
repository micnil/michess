import { InferSelectModel } from 'drizzle-orm';
import { users } from '../schema';

export type SelectUser = InferSelectModel<typeof users>;
