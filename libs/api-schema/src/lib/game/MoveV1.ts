import z from 'zod';
import { MoveV1Schema } from './MoveV1Schema';

export type MoveV1 = z.infer<typeof MoveV1Schema>;
