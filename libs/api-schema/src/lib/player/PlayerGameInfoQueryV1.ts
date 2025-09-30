import z from 'zod';
import { PlayerGameInfoQueryV1Schema } from './PlayerGameInfoQueryV1Schema';

export type PlayerGameInfoQueryV1 = z.infer<typeof PlayerGameInfoQueryV1Schema>;
