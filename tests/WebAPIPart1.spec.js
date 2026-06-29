const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

const loginPayload = { userEmail: "sriram.b.joshi@gmail.com", userPassword: "Adishankara123#" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };

let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

});



test('ClientApp Login and Place Order', async ({ page }) => {


    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");

    // ─── Step 2: Find & Add Product to Cart ──────────────────
    // const productName = "ZARA COAT 3";
    // const products = page.locator(".card-body");
    // const productTitles = await page.locator(".card-body b").allTextContents();
    // console.log("Product Titles:", productTitles);

    // const count = await products.count();
    // for (let i = 0; i < count; i++) {
    //     if (await products.nth(i).locator("b").textContent() == productName) {
    //         await products.nth(i).locator("text= Add To Cart").click();
    //         break;
    //     }
    // }

    // // ─── Step 3: Go to Cart & Verify Product ─────────────────
    // await page.locator("[routerlink*='cart']").click();
    // await page.locator("div li").first().waitFor();
    // const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    // expect(bool).toBeTruthy();

    //     // ─── Step 4: Proceed to Checkout ─────────────────────────
    //     const checkout = page.locator('[type="button"]').nth(1);
    //     await checkout.click();

    //     // ─── Step 5: Fill Payment Details ────────────────────────
    //     await page.locator("div.field input.text-validated").fill("1236 5478 6666");

    //     // Expiry Month
    //     await page.locator("select.ddl").nth(0).selectOption("02");
    //     await expect(page.locator("select.ddl").nth(0)).toHaveValue("02");

    //     // Expiry Year
    //     await page.locator("select.ddl").nth(1).selectOption("17");
    //     await expect(page.locator("select.ddl").nth(1)).toHaveValue("17");

    //     // CVV & Name
    //     await page.locator("div.field.small").filter({ hasText: "CVV Code" }).locator("input").fill("456");
    //     await page.locator("div.field").filter({ hasText: "Name on Card" }).locator("input").fill("Sriram");

    //     // ─── Step 6: Select Shipping Country ─────────────────────
    //     await page.locator('[placeholder="Select Country"]').pressSequentially("ind", { delay: 100 });
    //     const dropdown = page.locator(".ta-results");
    //     await dropdown.waitFor({ timeout: 10000 });

    //     const optionsCount = await dropdown.locator("button").count();
    //     for (let i = 0; i < optionsCount; i++) {
    //         const text = await dropdown.locator("button").nth(i).textContent();
    //         if (text.trim() === "India") {
    //             await dropdown.locator("button").nth(i).click();
    //             break;
    //         }
    //     }

    //        expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    //    await page.locator(".action__submit").click(); //Place Order

    //    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    //    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    //    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderID.includes(rowOrderId)) {          // ← Fixed
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    
    expect(response.orderID.includes(orderIdDetails)).toBeTruthy();   // ← Fixed
});