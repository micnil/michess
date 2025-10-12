import z from 'zod';

export const GameActionV1Schema = z.object({
  type: z.enum(['resign', 'offer_draw', 'accept_draw']),
  payload: z.union([
    z.object({
      drawReason: z.enum([
        'threefold_repetition',
        'fifty_move_rule',
        'insufficient_material',
        'by_agreement',
      ]),
    }),
  ]),
});
