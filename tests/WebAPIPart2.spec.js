const { test, expect } = require('@playwright/test');
let webContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill("sriram.b.joshi@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Adishankara123#");
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });
});

test('Test case 2', async () => {
    const productName = "ZARA COAT 3";
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");

    await page.locator(".card-body b").first().waitFor();
    const productTitles = await page.locator(".card-body b").allTextContents();
    console.log("Product Titles:", productTitles);

    await page.locator(".card-body").filter({ hasText: productName })
        .getByRole("button", { name: "Add to Cart" }).click();

    await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText(productName)).toBeVisible();

    await page.getByRole("button", { name: "Checkout" }).click();

    await page.locator("div.field input.text-validated").fill("1236 5478 6666");

    await page.locator("select.ddl").nth(0).selectOption("02");
    await expect(page.locator("select.ddl").nth(0)).toHaveValue("02");

    await page.locator("select.ddl").nth(1).selectOption("17");
    await expect(page.locator("select.ddl").nth(1)).toHaveValue("17");

    await page.locator("div.field.small").filter({ hasText: "CVV Code" }).locator("input").fill("456");
    await page.locator("div.field").filter({ hasText: "Name on Card" }).locator("input").fill("Sriram");

    await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 100 });
    await page.getByRole("button", { name: "India" }).nth(1).click();

    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("Order ID:", orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});