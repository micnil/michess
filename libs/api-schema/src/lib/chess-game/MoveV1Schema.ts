import z from 'zod';

export const MoveV1Schema = z.object({
  from: z.string().length(2),
  to: z.string().length(2),
  promotion: z.enum(['queen', 'rook', 'bishop', 'knight']).optional(),
});
