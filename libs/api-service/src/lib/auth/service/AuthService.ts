import { Maybe } from '@michess/common-utils';
import { AuthClient, CacheRepository, DatabaseClient } from '@michess/infra-db';
import { EmailClient } from '@michess/infra-email';
import {
  ResetPasswordEmailTemplate,
  VerifyEmailTemplate,
} from '@michess/react-emails';
import { Sql } from 'postgres';
import { AuthConfig } from '../model/AuthConfig';
import { Session } from '../model/Session';

export class AuthService {
  auth;
  constructor(
    sql: Sql,
    cacheRepo: CacheRepository,
    emailClient: EmailClient,
    config: AuthConfig
  ) {
    const db = DatabaseClient.from(sql);
    this.auth = AuthClient.from(
      db,
      {
        get: (key) => cacheRepo.get(key),
        set: (key, value, ttl) => cacheRepo.set(key, value, ttl),
        delete: async (key) => {
          await cacheRepo.delete(key);
        },
      },
      {
        verification: async ({ user, url }, _) => {
          const { html, text } = await VerifyEmailTemplate.compile({ url });
          await emailClient.sendEmail({
            subject: 'Verify your email',
            to: user.email,
            text,
            html,
          });
        },
        resetPassword: async ({ user, url }, _) => {
          const { html, text } = await ResetPasswordEmailTemplate.compile({
            url,
          });
          await emailClient.sendEmail({
            subject: 'Reset your password',
            to: user.email,
            text,
            html,
          });
        },
      },
      {
        google: {
          clientId: config.google.clientId,
          clientSecret: config.google.clientSecret,
        },
      }
    );
  }

  async handle(req: Request) {
    return this.auth.handler(req);
  }

  async getSession(headers: Headers): Promise<Maybe<Session>> {
    const sessionResponse = await this.auth.api.getSession({ headers });

    if (sessionResponse) {
      const { user, session } = sessionResponse;
      return {
        userId: user.id,
        sessionId: session.id,
        token: session.token,
        expiresAt: session.expiresAt,
        userAgent: session.userAgent ?? undefined,
        ipAddress: session.ipAddress ?? undefined,
        isAnonymous: user.isAnonymous ?? false,
      };
    }
  }
}
