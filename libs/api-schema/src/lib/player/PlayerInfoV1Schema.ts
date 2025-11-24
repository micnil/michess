import { z } from 'zod';

export const PlayerInfoV1Schema = z.object({
  id: z.string(),
  rating: z.number().min(0).optional(),
  ratingDiff: z.number().optional(),
  name: z.string().min(1).max(100),
  isBot: z.boolean(),
});
