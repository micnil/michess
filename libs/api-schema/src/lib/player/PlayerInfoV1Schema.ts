import { z } from 'zod';

export const PlayerInfoV1Schema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
});
