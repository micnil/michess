import { Maybe } from '@michess/common-utils';
import { anonymousClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { authClient } from './infra/authClient';
import { AuthState } from './model/AuthState';

type AuthClient = ReturnType<
  typeof createAuthClient<{ plugins: [ReturnType<typeof anonymousClient>] }>
>;

type BetterAuthSessionData = typeof authClient.$Infer.Session;

export class AuthService {
  toAuthState(sessionData: BetterAuthSessionData): AuthState {
    return {
      session: {
        userId: sessionData.user.id,
        id: sessionData.session.id,
        token: sessionData.session.token,
        createdAt: sessionData.session.createdAt,
        updatedAt: sessionData.session.updatedAt,
        expiresAt: sessionData.session.expiresAt,
      },
      user: {
        id: sessionData.user.id,
        email: sessionData.user.email,
        name: sessionData.user.name,
        isAnonymous: sessionData.user.isAnonymous ?? false,
        createdAt: sessionData.user.createdAt,
        updatedAt: sessionData.user.updatedAt,
        emailVerified: sessionData.user.emailVerified ?? false,
        image: sessionData.user.image ?? undefined,
      },
    };
  }

  constructor(private authClient: AuthClient) {}

  async getSession(): Promise<Maybe<AuthState>> {
    const { data, error } = await this.authClient.getSession();
    if (data) {
      return this.toAuthState(data);
    } else if (error) {
      throw new Error('Failed to retrieve session data', { cause: error });
    } else {
      return undefined;
    }
  }

  async signInAnonymously() {
    try {
      await this.authClient.signIn.anonymous();
      return this.getSession() as Promise<AuthState>;
    } catch (error) {
      console.error('Failed to sign in anonymously:', error);
      throw error;
    }
  }

  async signOut() {
    try {
      const result = await this.authClient.signOut();
      return result;
    } catch (error) {
      console.error('Failed to sign out:', error);
      throw error;
    }
  }

  async ensureAnonymousSession(): Promise<AuthState> {
    const session = await this.getSession();

    if (!session) {
      return this.signInAnonymously();
    } else {
      return session;
    }
  }
}
