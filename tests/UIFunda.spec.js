const { test, expect } = require('@playwright/test');

test('Login validation - shows error on invalid credentials and allows login with valid credentials', async ({ page }) => {

    // Navigate to the login page
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    console.log(await page.title());

    // Locators for login form elements
    const username = page.locator('#username');
    const password = page.locator("[type='password']");
    const signInBtn = page.locator('#signInBtn');
    const errorMessage = page.locator("[style*='block']");
    const cardTitles = page.locator(".card-title a");

    // -------------------------------
    // Scenario 1: Invalid login attempt
    // -------------------------------

    await username.fill("rashulshetty");
    await password.fill("learning");
    await signInBtn.click();

    // Validate error message is displayed
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Incorrect');

    console.log("Error message displayed:", await errorMessage.textContent());

    // -------------------------------
    // Scenario 2: Valid login attempt
    // -------------------------------

    // Clear previous input before entering correct credentials
    await username.fill("");
    await password.fill("");

    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signInBtn.click();


    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(0).textContent());

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);


});


test('UI Controls', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // Locators
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    // 1. Dropdown Selection
    await dropdown.selectOption("consult");
    // 2. Radio Button
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    // 3. Checkbox - Check & Uncheck
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    // 4. Verify Attribute
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
});
// What is happening?
// This test demonstrates various UI controls: selecting from a dropdown, 
// choosing a radio button, handling a popup, checking/unchecking a checkbox, 
// and verifying an element's attribute.
// Why useful?
// It teaches how to interact with common form elements (Dropdown, Radio, Checkbox) and perform assertions on them.


test('child Window', async ({ browser }) => {

    // Create a new browser context and page
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // Locator for the link that opens in a new tab
    const documentLink = page.locator("[href*='documents-request']");
    // ------------------- Handle Child Window (New Tab) -------------------
    // Wait for new page to open and click the link simultaneously
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),     // Wait for new tab/window to open
        documentLink.click()              // Click the link that opens new tab
    ]);
    // Extract email domain from the new page
    const text = await newPage.locator(".im-para.red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    // Fill the extracted domain into username field on main page
    await page.locator('#username').fill(domain);
    // Verify the value was entered correctly
    console.log("Username filled with:", await page.locator("#username").inputValue());
});
// // What is happening?
// The test clicks a link that opens a new tab, catches that new page using waitForEvent('page'),
// extracts an email domain from the new tab,
//  and then pastes it into the username field on the original page.
// Why Promise.all?
// It waits for both events (new page opening + click) at the same time so Playwright doesn’t miss the new tab.