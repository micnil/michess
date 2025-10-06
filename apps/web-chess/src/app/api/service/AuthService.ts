import { Maybe } from '@michess/common-utils';
import { AuthClient } from '../infra/AuthClient';
import { SocketClient } from '../infra/SocketClient';
import { AuthState } from '../model/AuthState';
import { SignInInput } from '../model/SignInInput';
import { SignUpInput } from '../model/SignUpInput';

type BetterAuthSessionData = AuthClient['$Infer']['Session'];

export class AuthService {
  private currentAuthState: Maybe<AuthState> = undefined;

  constructor(
    private authClient: AuthClient,
    private socketClient: SocketClient
  ) {}

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

  async signUp(credentials: SignUpInput): Promise<AuthState> {
    try {
      const { data, error } = await this.authClient.signUp.email({
        email: credentials.email,
        password: credentials.password,
        name: credentials.name,
        callbackURL: '/email-verification',
      });

      if (data) {
        this.socketClient.connect();

        // After sign up, get fresh session data
        this.currentAuthState = undefined; // Clear cached session
        const sessionResult = await this.getSession();
        if (!sessionResult) {
          throw new Error('Failed to get session after sign up');
        }

        return sessionResult;
      } else if (error) {
        throw new Error(error.message, { cause: error });
      } else {
        throw new Error('Sign up failed: No data returned');
      }
    } catch (error) {
      console.error('Failed to sign up:', error);
      throw error;
    }
  }

  async signIn(credentials: SignInInput): Promise<AuthState> {
    try {
      const { data, error } = await this.authClient.signIn.email({
        email: credentials.email,
        password: credentials.password,
        callbackURL: '/',
      });
      if (data) {
        this.socketClient.connect();

        // After sign in, get fresh session data
        this.currentAuthState = undefined; // Clear cached session
        const sessionResult = await this.getSession();
        if (!sessionResult) {
          throw new Error('Failed to get session after sign in');
        }

        return sessionResult;
      } else if (error) {
        throw new Error(error.message || 'Sign in failed', { cause: error });
      } else {
        throw new Error('Sign in failed: No data returned');
      }
    } catch (error) {
      console.error('Failed to sign in:', error);
      throw error;
    }
  }

  async signInAnonymously(): Promise<AuthState> {
    try {
      const { data, error } = await this.authClient.signIn.anonymous();

      if (data) {
        this.socketClient.connect();

        // After anonymous sign in, get fresh session data
        this.currentAuthState = undefined; // Clear cached session
        const sessionResult = await this.getSession();
        if (!sessionResult) {
          throw new Error('Failed to get session after anonymous sign in');
        }

        return sessionResult;
      } else if (error) {
        throw error;
      } else {
        throw new Error('Anonymous sign in failed: No data or error returned');
      }
    } catch (error) {
      console.error('Failed to sign in anonymously:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      const { error } = await this.authClient.signOut();

      if (!error) {
        this.currentAuthState = undefined;
        this.socketClient.disconnect();
      } else {
        throw error;
      }
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

  clearCurrentSession(): void {
    this.currentAuthState = undefined;
  }
}
