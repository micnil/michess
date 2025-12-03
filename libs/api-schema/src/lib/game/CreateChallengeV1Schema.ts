import { z } from 'zod';
import { GameVariantV1Schema } from './GameVariantV1Schema';
import { TimeControlInV1Schema } from './TimeControlInSchemaV1';

export const CreateChallengeV1Schema = z.object({
  opponentId: z.string(),
  playerColor: z.enum(['white', 'black']).optional(),
  variant: GameVariantV1Schema.optional().default('standard'),
  timeControl: TimeControlInV1Schema.optional(),
});
