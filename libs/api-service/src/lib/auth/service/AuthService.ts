import { Maybe } from '@michess/common-utils';
import { CacheRepository } from '@michess/infra-db';
import { betterAuth } from 'better-auth';
import { anonymous } from 'better-auth/plugins/anonymous';
import { Sql } from 'postgres';
import { Session } from '../model/Session';

export class AuthService {
  auth;
  constructor(private sql: Sql, private cacheRepo: CacheRepository) {
    this.auth = betterAuth({
      database: this.sql,
      plugins: [anonymous()],
      secondaryStorage: {
        get: (key) => this.cacheRepo.get(key),
        set: (key, value, ttl) => this.cacheRepo.set(key, value, ttl),
        delete: async (key) => {
          await this.cacheRepo.delete(key);
        },
      },
    });
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
