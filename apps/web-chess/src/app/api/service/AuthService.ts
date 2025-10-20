import { assertDefined, Maybe } from '@michess/common-utils';
import { AuthClient } from '../infra/AuthClient';
import { SocketClient } from '../infra/SocketClient';
import { AuthState } from '../model/AuthState';
import { SignInInput } from '../model/SignInInput';
import { SignUpInput } from '../model/SignUpInput';
import { UpdateUsernameInput } from '../model/UpdateUserInput';

type BetterAuthSessionData = AuthClient['$Infer']['Session'];

export class AuthService {
  private currentAuthState: Maybe<AuthState> = undefined;

  constructor(
    private authClient: AuthClient,
    private socketClient: SocketClient,
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
        username: sessionData.user.username ?? undefined,
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

  async isUsernameAvailable(username: string): Promise<boolean> {
    if (username.length < 3) {
      return true;
    }
    const { data, error } = await this.authClient.isUsernameAvailable({
      username,
    });

    if (error) {
      throw new Error(
        error.message || 'Failed to check username availability',
        { cause: error },
      );
    }

    return data?.available ?? false;
  }

  async updateUser(input: UpdateUsernameInput): Promise<AuthState> {
    const { error } = await this.authClient.updateUser(input);

    if (error) {
      throw new Error(error.message || 'Failed to update user', {
        cause: error,
      });
    }

    // Clear cached session to force refresh
    this.currentAuthState = undefined;
    const authState = await this.getSession();
    assertDefined(authState, 'Failed to refresh session after user update');
    return authState;
  }

  async signUp(credentials: SignUpInput): Promise<AuthState> {
    const { data, error } = await this.authClient.signUp.email({
      email: credentials.email,
      password: credentials.password,
      name: credentials.name,
      username: credentials.username,
      callbackURL: '/email-verification',
    });

    if (data) {
      this.socketClient.connect();

      // After sign up, get fresh session data
      this.currentAuthState = undefined; // Clear cached session
      const sessionResult = await this.getSession();
      assertDefined(sessionResult, 'Failed to get session after sign up');

      return sessionResult;
    } else if (error) {
      throw new Error(error.message, { cause: error });
    } else {
      throw new Error('Sign up failed: No data returned');
    }
  }

  async signIn(credentials: SignInInput): Promise<AuthState> {
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
  }

  async signInAnonymously(): Promise<AuthState> {
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
  }

  async signOut(): Promise<void> {
    const { error } = await this.authClient.signOut();

    if (!error) {
      this.currentAuthState = undefined;
      this.socketClient.disconnect();
    } else {
      throw error;
    }
  }

  async signInWithGoogle(): Promise<void> {
    const { data, error } = await this.authClient.signIn.social({
      provider: 'google',
      callbackURL: '/',
    });
    if (error) {
      throw new Error(error.message || 'Google sign-in failed', {
        cause: error,
      });
    }

    if (data?.url) {
      window.location.href = data.url;
    } else {
      throw new Error('Google sign-in failed: No URL returned');
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

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const { error } = await this.authClient.resetPassword({
      newPassword,
      token,
    });

    if (error) {
      throw new Error(error.message || 'Failed to reset password', {
        cause: error,
      });
    }
  }

  async requestPasswordReset(email: string): Promise<void> {
    const { error } = await this.authClient.requestPasswordReset({
      email,
      redirectTo: '/reset-password',
    });

    if (error) {
      throw new Error(error.message || 'Failed to reset password', {
        cause: error,
      });
    }
  }

  clearCurrentSession(): void {
    this.currentAuthState = undefined;
  }
}
