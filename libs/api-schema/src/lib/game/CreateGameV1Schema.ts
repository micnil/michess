import { z } from 'zod';

export const CreateGameV1Schema = z.object({
  isPrivate: z.boolean().optional(),
  // timeControl
  // variant
});
