import z from 'zod';
import { PlayerInfoV1Schema } from '../player/PlayerInfoV1Schema';

export const GamePlayersV1Schema = z.object({
  white: PlayerInfoV1Schema.optional(),
  black: PlayerInfoV1Schema.optional(),
});
