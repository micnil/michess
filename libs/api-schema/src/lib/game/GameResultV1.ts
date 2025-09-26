import z from 'zod';
import { GameResultV1Schema } from './GameResultV1Schema';

export type GameResultV1 = z.infer<typeof GameResultV1Schema>;
