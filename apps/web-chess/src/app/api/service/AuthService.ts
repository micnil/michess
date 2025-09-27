import { Maybe } from '@michess/common-utils';
import { AuthClient } from '../infra/AuthClient';
import { SocketClient } from '../infra/SocketClient';
import { AuthState } from '../model/AuthState';

type BetterAuthSessionData = AuthClient['$Infer']['Session'];

export class AuthService {
  private currentAuthState: Maybe<AuthState> = undefined;
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

  constructor(
    private authClient: AuthClient,
    private socketClient: SocketClient
  ) {}

  async getSession(): Promise<Maybe<AuthState>> {
    if (this.currentAuthState) {
      return this.currentAuthState;
    } else {
      const { data, error } = await this.authClient.getSession();
      if (data) {
        this.socketClient.connect();
        this.currentAuthState = this.toAuthState(data);
        return this.currentAuthState;
      } else if (error) {
        throw new Error('Failed to retrieve session data', { cause: error });
      } else {
        return undefined;
      }
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
