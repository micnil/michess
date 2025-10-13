import z from 'zod';
import { GameActionInV1Schema } from './GameActionInV1Schema';

export type GameActionInV1 = z.infer<typeof GameActionInV1Schema>;
