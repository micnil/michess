import z from 'zod';
import { PlayerInfoV1Schema } from './PlayerInfoV1Schema';

export type PlayerInfoV1 = z.infer<typeof PlayerInfoV1Schema>;
