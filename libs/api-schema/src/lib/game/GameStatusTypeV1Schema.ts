import z from 'zod';

export const GameStatusTypeV1Schema = z.enum([
  'EMPTY',
  'WAITING',
  'READY',
  'IN_PROGRESS',
  'ENDED',
]);
