import z from 'zod';

export const MoveV1Schema = z.object({
  uci: z.string().length(4).or(z.string().length(5)),
});
