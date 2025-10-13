import { InferInsertModel } from 'drizzle-orm';
import { actions } from '../schema/actions';

export type InsertAction = InferInsertModel<typeof actions>;
