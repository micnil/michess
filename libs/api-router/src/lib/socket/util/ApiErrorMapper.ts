import { ApiError } from '@michess/api-schema';
import { ZodError } from 'zod';

export const ApiErrorMapper = {
  from: (error: unknown): ApiError => {
    if (error instanceof ZodError) {
      return {
        code: 'INPUT_VALIDATION_ERROR',
        message: error.message,
      };
    } else {
      return {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred.',
      };
    }
  },
};
