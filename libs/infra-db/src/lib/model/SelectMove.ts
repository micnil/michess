import { InferSelectModel } from 'drizzle-orm';
import { moves } from '../schema/moves';

export type SelectMove = InferSelectModel<typeof moves>;
