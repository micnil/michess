import z from 'zod';
import { MakeActionPayloadV1Schema } from './MakeActionPayloadV1Schema';

export type MakeActionPayloadV1 = z.infer<typeof MakeActionPayloadV1Schema>;
