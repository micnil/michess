import { Maybe } from '@michess/common-utils';
import { AuthClient, CacheRepository, DatabaseClient } from '@michess/infra-db';
import { EmailClient } from '@michess/infra-email';
import { VerifyEmailTemplate } from '@michess/react-emails';
import { Sql } from 'postgres';
import { Session } from '../model/Session';

export class AuthService {
  auth;
  constructor(sql: Sql, cacheRepo: CacheRepository, emailClient: EmailClient) {
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
          emailClient.sendEmail({
            subject: 'Verify your email',
            to: user.email,
            text: `Please verify your email by clicking the following link: ${url}`,
            html: (await VerifyEmailTemplate.compile({ url })).html,
          });
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
