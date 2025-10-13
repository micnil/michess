import { InferSelectModel } from 'drizzle-orm';
import { actions } from '../schema/actions';

export type SelectAction = InferSelectModel<typeof actions>;
