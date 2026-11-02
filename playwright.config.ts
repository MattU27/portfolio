import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', testMatch: 'portfolio.spec.ts', workers: 1, timeout: 45000,
  reporter: [['list'], ['json', { outputFile: 'review/redesign/browser-results.json' }]],
  webServer: process.env.PORTFOLIO_URL ? undefined : { command: 'node scripts/serve-preview.mjs', url: 'http://127.0.0.1:4173/portfolio/', reuseExistingServer: false },
  use: { baseURL: process.env.PORTFOLIO_URL || 'http://127.0.0.1:4173/portfolio/',
    browserName: 'chromium', headless: true, trace: 'retain-on-failure',
    launchOptions: process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {} },
});
