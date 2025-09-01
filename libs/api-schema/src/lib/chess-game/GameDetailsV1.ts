import z from 'zod';
import { GameDetailsV1Schema } from './GameDetailsV1Schema';

export type GameDetailsV1 = z.infer<typeof GameDetailsV1Schema>;
