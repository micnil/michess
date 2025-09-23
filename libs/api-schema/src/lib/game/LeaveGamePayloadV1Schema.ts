import z from 'zod';

export const LeaveGamePayloadV1Schema = z.object({
  gameId: z.uuid(),
});
