import z from 'zod';

export const GameActionInV1Schema = z.object({
  type: z.enum(['resign', 'offer_draw', 'accept_draw']),
});
