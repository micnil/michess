import { ApiErrorData } from '@michess/api-schema';
import { ZodError, prettifyError } from 'zod';

export const ApiErrorMapper = {
  from: (error: unknown): ApiErrorData => {
    if (error instanceof ZodError) {
      return {
        code: 'INPUT_VALIDATION_ERROR',
        message: prettifyError(error),
        details: error.issues,
      };
    } else {
      return {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred.',
      };
    }
  },
};
