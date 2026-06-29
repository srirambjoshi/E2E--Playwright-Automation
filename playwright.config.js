// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  timeout: 60 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: false,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 3:3,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use */
  reporter: [
    ['html'],
    ['allure-playwright']
  ],
  /* Shared settings for all the projects below. */
  use: {
    screenshot: 'on',
    trace: 'on-first-retry',
    headless: false
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});