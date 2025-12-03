import { betterAuth } from 'better-auth';
import { admin, anonymous, username } from 'better-auth/plugins';
import postgres from 'postgres';
import { createDrizzleAdapter } from './lib/auth/drizzleAdapter';
import { Drizzle } from './lib/Drizzle';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const client = Drizzle.from(postgres(process.env.DATABASE_URL!));

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: createDrizzleAdapter(client),
  plugins: [anonymous(), username(), admin()],
  secondaryStorage: {
    get: async () => {},
    set: async () => {},
    delete: async () => {},
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
  },
});
