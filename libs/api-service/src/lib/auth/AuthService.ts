import { CacheRepository } from '@michess/infra-db';
import { betterAuth } from 'better-auth';
import { anonymous } from 'better-auth/plugins/anonymous';
import { Sql } from 'postgres';

export class AuthService {
  auth: ReturnType<typeof betterAuth>;
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
}
