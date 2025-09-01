import z from 'zod';
import { CreateGameV1Schema } from './CreateGameV1Schema';

export type CreateGameV1 = z.infer<typeof CreateGameV1Schema>;
