import { Maybe } from '@michess/common-utils';
import { CacheRepository, DatabaseClient, schema } from '@michess/infra-db';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { anonymous } from 'better-auth/plugins/anonymous';
import { Sql } from 'postgres';
import { Session } from '../model/Session';

export class AuthService {
  auth;
  constructor(sql: Sql, cacheRepo: CacheRepository) {
    const db = DatabaseClient.from(sql);

    this.auth = betterAuth({
      database: drizzleAdapter(db, {
        provider: 'pg',
        schema,
        usePlural: true,
      }),
      plugins: [anonymous()],
      secondaryStorage: {
        get: (key) => cacheRepo.get(key),
        set: (key, value, ttl) => cacheRepo.set(key, value, ttl),
        delete: async (key) => {
          await cacheRepo.delete(key);
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
