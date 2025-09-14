import { anonymousClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

type AuthClient = ReturnType<
  typeof createAuthClient<{ plugins: [ReturnType<typeof anonymousClient>] }>
>;

export class AuthService {
  constructor(private authClient: AuthClient) {}

  signInAnonymously() {
    return this.authClient.signIn.anonymous();
  }

  signOut() {
    return this.authClient.signOut();
  }
}
