import { anonymousClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export type AuthClient = ReturnType<
  typeof createAuthClient<{ plugins: [ReturnType<typeof anonymousClient>] }>
>;

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3000', // The base URL of your auth server
  plugins: [anonymousClient()],
});
