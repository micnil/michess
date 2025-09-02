import { InferInsertModel } from 'drizzle-orm';
import { games } from '../schema';

export type InsertGame = InferInsertModel<typeof games>;
