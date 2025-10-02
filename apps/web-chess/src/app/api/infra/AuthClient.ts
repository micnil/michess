import { anonymousClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export type AuthClient = ReturnType<
  typeof createAuthClient<{ plugins: [ReturnType<typeof anonymousClient>] }>
>;

export const AuthClient = {
  create: (baseUrl?: string): AuthClient => {
    return createAuthClient({
      baseURL: baseUrl,
      plugins: [anonymousClient()],
    });
  },
};
