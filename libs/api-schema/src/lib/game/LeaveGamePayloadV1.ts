import z from 'zod';
import { LeaveGamePayloadV1Schema } from './LeaveGamePayloadV1Schema';

export type LeaveGamePayloadV1 = z.infer<typeof LeaveGamePayloadV1Schema>;
