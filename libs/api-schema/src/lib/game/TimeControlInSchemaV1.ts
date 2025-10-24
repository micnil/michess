import z from 'zod';

export const TimeControlInV1Schema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('realtime'),
    initialSec: z.number(),
    incrementSec: z.number(),
  }),
  z.object({
    type: z.literal('correspondence'),
    daysPerMove: z.number(),
  }),
]);
