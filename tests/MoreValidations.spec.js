const { test, expect } = require('@playwright/test');

test("Popup Validations", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://google.com");
    await page.goBack();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    // Register dialog listener BEFORE clicking the button
    page.on("dialog", dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();
    await page.getByRole("link", { name: "Top" }).click();

    const framesPage = page.frameLocator("#courses-iframe");
    
    await expect(page.locator("#courses-iframe")).toBeVisible();


});

// test('visual testing',async({page})=>
// {
//     await page.goto("rahulshettyacademy.com");
//     expect(await page.screenshot()).toMatchSnapshot('landing.png');
// });