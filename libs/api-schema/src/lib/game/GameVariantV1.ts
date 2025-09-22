import z from 'zod';
import { GameVariantV1Schema } from './GameVariantV1Schema';

export type GameVariantV1 = z.infer<typeof GameVariantV1Schema>;
