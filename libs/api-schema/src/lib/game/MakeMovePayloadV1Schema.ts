import z from 'zod';

export const MakeMovePayloadV1Schema = z.object({
  gameId: z.uuid(),
  uci: z.string().min(4).max(5),
});
