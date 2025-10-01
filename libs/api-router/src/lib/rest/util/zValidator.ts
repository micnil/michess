import { zValidator as zv } from '@hono/zod-validator';
import { ApiErrorData } from '@michess/api-schema';
import { ValidationTargets } from 'hono';
import { HTTPException } from 'hono/http-exception';
import z, { ZodSchema } from 'zod';
import { RestContext } from '../../model/RestContext';

export const zValidator = <
  T extends ZodSchema,
  Target extends keyof ValidationTargets
>(
  target: Target,
  schema: T
) =>
  zv<T, Target, RestContext, string>(target, schema, (result, c) => {
    if (!result.success) {
      const apiError: ApiErrorData = {
        code: 'VALIDATION_ERROR',
        message: z.prettifyError(result.error),
        details: result.error.issues,
      };
      throw new HTTPException(400, {
        cause: result.error,
        res: Response.json(apiError, { status: 400 }),
        message: result.error.message,
      });
    }
  });
