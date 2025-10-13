import z from 'zod';
import { GameActionInV1Schema } from './GameActionInV1Schema';

export const MakeActionPayloadV1Schema = z.object({
  gameId: z.uuid(),
  action: GameActionInV1Schema,
});
