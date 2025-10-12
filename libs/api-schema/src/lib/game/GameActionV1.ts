import z from 'zod';
import { GameActionV1Schema } from './GameActionV1Schema';

export type GameActionV1 = z.infer<typeof GameActionV1Schema>;
