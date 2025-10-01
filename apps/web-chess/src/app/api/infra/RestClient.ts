import { ApiErrorData } from '@michess/api-schema';
import ky, { HTTPError, KyInstance } from 'ky';
import z from 'zod';

export type RestClient = KyInstance;

const MessageObjectSchema = z.object({
  message: z.string(),
});

export const RestClient = {
  create: (baseUrl?: string): RestClient => {
    return ky.extend({
      prefixUrl: baseUrl ? baseUrl + '/api' : '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      hooks: {
        beforeError: [
          async (error) => {
            if (error instanceof HTTPError) {
              const errorData = await error.response.json();
              if (ApiErrorData.isApiErrorData(errorData)) {
                error.message = errorData.message;
                return error;
              } else {
                const parsed = MessageObjectSchema.safeParse(errorData);
                if (parsed.success) {
                  error.message = parsed.data.message;
                }
                return error;
              }
            }

            return error;
          },
        ],
      },
    });
  },
};
