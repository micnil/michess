import z from 'zod';
import { GameStatusTypeV1Schema } from './GameStatusTypeV1Schema';

export type GameStatusTypeV1 = z.infer<typeof GameStatusTypeV1Schema>;
