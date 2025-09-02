import { join, relative } from 'path';
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: relative(__dirname, './src/generated/migrations'),
  schema: join(__dirname, 'src/lib/schema'),
  dialect: 'postgresql',
  dbCredentials: {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    url: process.env.DATABASE_URL!,
  },
});
