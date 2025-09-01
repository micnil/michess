import { z } from 'zod';

export const CreateChessGameV1Schema = z.object({
  isPrivate: z.boolean().optional(),
  // timeControl
  // variant
});
