import { InferSelectModel } from 'drizzle-orm';
import { games } from '../schema';

export type SelectGame = InferSelectModel<typeof games>;
