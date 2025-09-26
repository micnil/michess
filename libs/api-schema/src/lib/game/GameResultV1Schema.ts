import z from 'zod';

export const GameResultV1Schema = z.object({
  type: z.enum(['white_win', 'black_win', 'draw']),
});
