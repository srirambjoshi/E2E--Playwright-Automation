// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
//  * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: './tests',
   
    /* Run tests in files in parallel */
    timeout: 30 * 1000,
    expect:
    {
        timeout: 5000

    },
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('')`. */
        // baseURL: 'http://localhost:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'safari execution',
            use: {

                browserName: 'webkit',
                ...devices['iPhone 15 Pro Max'],
                ignoreHTTPSErrors: true,
                screenshot: 'on',
                trace: 'on-first-retry',
                video : 'retain-on-failure',
                headless: true,
                permissions: ['Geolocation'],
                viewport : {width :720, height: 720}
            }
        },


    ],


});

