import { logger } from '@michess/be-utils';
import { Maybe } from '@michess/common-utils';
import {
  AuthContext,
  betterAuth,
  LogLevel,
  SecondaryStorage,
  User,
} from 'better-auth';
import { admin, anonymous, username } from 'better-auth/plugins';
import { DatabaseClient } from '../DatabaseClient';
import { createDrizzleAdapter } from './drizzleAdapter';

type SendEmailCb = (
  data: {
    user: User;
    url: string;
    token: string;
  },
  request?: Request,
) => Promise<void>;
type Emails = {
  verification: SendEmailCb;
  resetPassword: SendEmailCb;
};

type OAuthConfig = {
  google: {
    clientId: string;
    clientSecret: string;
    redirectUri?: string;
  };
};

export const AuthClient = {
  from(
    db: DatabaseClient,
    secondaryStorage: SecondaryStorage,
    emails?: Emails,
    oauthConfig?: OAuthConfig,
  ) {
    return betterAuth({
      emailAndPassword: {
        enabled: true,
        sendResetPassword: emails?.resetPassword,
      },
      databaseHooks: {
        user: {
          create: {
            after: async (user, ctx): Promise<void> => {
              const context: Maybe<AuthContext> = ctx?.context;

              // There is a db trigger that updates the user after insert. This
              // is not picked up by better-auth, since it returns the user before
              // the trigger runs. So we need to manually fetch the updated user
              // and copy the properties over.
              const updatedUser = await context?.internalAdapter.findUserById(
                user.id,
              );
              Object.assign(user, updatedUser);
            },
          },
        },
      },
      // TODO: Use app config
      trustedOrigins: process.env.CORS_ORIGINS?.split(',') || [],
      database: createDrizzleAdapter(db),
      plugins: [anonymous(), username(), admin()],
      secondaryStorage,
      socialProviders: {
        google: oauthConfig
          ? {
              clientId: oauthConfig.google.clientId,
              clientSecret: oauthConfig.google.clientSecret,
              redirectURI: oauthConfig.google.redirectUri,
              accessType: 'offline',
              prompt: 'select_account consent',
            }
          : undefined,
      },

      emailVerification: {
        autoSignInAfterVerification: true,
        sendVerificationEmail: emails?.verification,
        sendOnSignUp: true,
      },
      logger: {
        level:
          (process.env.LOG_LEVEL as Exclude<LogLevel, 'success'>) || 'info',
        log: (level, message, ...args) => {
          if (typeof level === 'string' && level in logger) {
            logger[level](args, message);
          } else {
            logger.info(args, message);
          }
        },
      },
    });
  },
};
