import { z } from 'zod';

export const PlayerInfoV1Schema = z.object({
  name: z.string().min(1).max(100),
});
