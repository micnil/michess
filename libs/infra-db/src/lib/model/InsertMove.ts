import { InferInsertModel } from 'drizzle-orm';
import { moves } from '../schema/moves';

export type InsertMove = InferInsertModel<typeof moves>;
