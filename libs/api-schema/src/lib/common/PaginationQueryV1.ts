import z from 'zod';
import { PaginationQueryV1Schema } from './PaginationQueryV1Schema';

export type PaginationQueryV1 = z.infer<typeof PaginationQueryV1Schema>;
