import { logger } from '@michess/be-utils';
import { betterAuth, LogLevel, SecondaryStorage, User } from 'better-auth';
import { anonymous } from 'better-auth/plugins/anonymous';
import { DatabaseClient } from '../DatabaseClient';
import { createDrizzleAdapter } from './drizzleAdapter';

type SendVerificationEmailCb = (
  data: {
    user: User;
    url: string;
    token: string;
  },
  request?: Request
) => Promise<void>;
type Emails = {
  verification: SendVerificationEmailCb;
};

export const AuthClient = {
  from(
    db: DatabaseClient,
    secondaryStorage: SecondaryStorage,
    emails?: Emails
  ) {
    return betterAuth({
      emailAndPassword: {
        enabled: true,
      },
      // TODO: Use app config
      trustedOrigins: process.env.CORS_ORIGINS?.split(',') || [],
      database: createDrizzleAdapter(db),
      plugins: [anonymous()],
      secondaryStorage,
      emailVerification: {
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
