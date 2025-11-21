import { z } from 'zod';
import { CreateChallengeV1Schema } from './CreateChallengeV1Schema';

export type CreateChallengeV1 = z.infer<typeof CreateChallengeV1Schema>;
