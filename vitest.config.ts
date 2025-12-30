import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    globals: true, // describe/it/expect をグローバルで使用
    environment: 'jsdom', // Next.js + React コンポーネント用
    setupFiles: [path.resolve(dirname, '.storybook/vitest.setup.ts')],
    include: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'], // テストファイルパターン
    clearMocks: true, // テストごとにモックをクリア
    coverage: {
      reporter: ['text', 'lcov'],
      include: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
    },
  },
});