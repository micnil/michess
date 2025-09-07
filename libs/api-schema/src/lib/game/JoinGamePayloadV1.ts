import z from 'zod';
import { JoinGamePayloadV1Schema } from './JoinGamePayloadV1Schema';

export type JoinGamePayloadV1 = z.infer<typeof JoinGamePayloadV1Schema>;
