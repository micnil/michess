/// <reference types='vitest' />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'web-chess',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    setupFiles: ['./src/test/utils/setup-tests.ts'],
    coverage: {
      reportsDirectory: '../../coverage/apps/web-chess',
      provider: 'v8' as const,
    },
  },
});
