const { test, expect } = require('@playwright/test');

test('ClientApp Login', async ({ page }) => {

    // ─── Constants ───────────────────────────────────────────
    const productName = "ZARA COAT 3";
    const loginUrl = "https://rahulshettyacademy.com/client/#/auth/login";
    const email = "sriram.b.joshi@gmail.com";
    const password = "Adishank456@;
    const products = page.locator(".card-body");

    // ─── Step 1: Login ───────────────────────────────────────
    await page.goto(loginUrl);
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill(password);
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForLoadState('networkidle');

    // ─── Step 2: Find & Add Product to Cart ──────────────────
    await page.locator(".card-body b").first().waitFor();
    const productTitles = await page.locator(".card-body b").allTextContents();
    console.log("Product Titles:", productTitles);

    await page.locator(".card-body").filter({ hasText: productName })
        .getByRole("button", { name: "Add to Cart" }).click();

    // ─── Step 3: Go to Cart & Verify Product ─────────────────
    await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText(productName)).toBeVisible();

    // ─── Step 4: Proceed to Checkout ─────────────────────────
    await page.getByRole("button", { name: "Checkout" }).click();

    // ─── Step 5: Fill Payment Details ────────────────────────
    await page.locator("div.field input.text-validated").fill("1236 5478 6666");

    // Expiry Month
    await page.locator("select.ddl").nth(0).selectOption("02");
    await expect(page.locator("select.ddl").nth(0)).toHaveValue("02");

    // Expiry Year
    await page.locator("select.ddl").nth(1).selectOption("17");
    await expect(page.locator("select.ddl").nth(1)).toHaveValue("17");

    // CVV & Name
    await page.locator("div.field.small").filter({ hasText: "CVV Code" }).locator("input").fill("456");
    await page.locator("div.field").filter({ hasText: "Name on Card" }).locator("input").fill("Sriram");

    // ─── Step 6: Select Shipping Country ─────────────────────
    await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 100 });
    await page.getByRole("button", { name: "India" }).nth(1).click();

    // ─── Step 7: Place Order ──────────────────────────────────
    await page.getByText("PLACE ORDER").click();

    // ─── Step 8: Verify Order Confirmation ───────────────────
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("Order ID:", orderId);

    // ─── Step 9: Verify Order in My Orders ───────────────────
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
