import { z } from 'zod';
import { TimeControlInV1Schema } from '../game/TimeControlInSchemaV1';

export const JoinMatchmakingQueueV1Schema = z.object({
  variant: z.literal('standard').optional().default('standard'),
  timeControl: TimeControlInV1Schema.optional(),
});
