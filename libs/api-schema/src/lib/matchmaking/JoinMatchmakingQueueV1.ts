import { z } from 'zod';
import { JoinMatchmakingQueueV1Schema } from './JoinMatchmakingQueueV1Schema';

export type JoinMatchmakingQueueV1 = z.infer<
  typeof JoinMatchmakingQueueV1Schema
>;
