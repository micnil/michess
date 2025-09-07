import z from 'zod';
import { GamePlayersV1Schema } from './GamePlayersV1Schema';
import { MoveV1Schema } from './MoveV1Schema';

export const GameDetailsV1Schema = z.object({
  id: z.uuid(),
  isPrivate: z.boolean(),
  variant: z.enum(['standard']),
  players: GamePlayersV1Schema,
  initialPosition: z.string().optional(),
  moves: z.array(MoveV1Schema),
  startedAt: z.date().optional(),
});
