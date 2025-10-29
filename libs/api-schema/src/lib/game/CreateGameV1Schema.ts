import { z } from 'zod';
import { GameVariantV1Schema } from './GameVariantV1Schema';
import { TimeControlInV1Schema } from './TimeControlInSchemaV1';

export const CreateGameV1Schema = z.object({
  isPrivate: z.boolean().optional(),
  variant: GameVariantV1Schema.optional().default('standard'),
  timeControl: TimeControlInV1Schema.optional(),
});
