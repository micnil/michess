import z from 'zod';

export const JoinGamePayloadV1Schema = z.object({
  gameId: z.uuid(),
  side: z.enum(['white', 'black', 'spectator']).optional(),
});
