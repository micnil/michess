import { defineConfig } from 'drizzle-kit';
import { join, relative } from 'path';

export default defineConfig({
  out: join(relative(process.cwd(), __dirname), './src/generated/migrations'),
  schema: join(__dirname, 'src/lib/schema'),
  dialect: 'postgresql',
  dbCredentials: {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    url: process.env.DATABASE_URL!,
  },
});
