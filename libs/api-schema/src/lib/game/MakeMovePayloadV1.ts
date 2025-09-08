import z from 'zod';
import { MakeMovePayloadV1Schema } from './MakeMovePayloadV1Schema';
export type MakeMovePayloadV1 = z.infer<typeof MakeMovePayloadV1Schema>;
