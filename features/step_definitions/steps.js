const { When, Then, Given } = require('@cucumber/cucumber');
const { POManager } = require('../../pageObjects/POManager');
const { expect} = require('@playwright/test');
const playwright = require('@playwright/test');

Given('a login to Ecommerce applicatoin with {string} and {string}',{timeout: 100*1000}, async function (email, password) {

    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
   this.poManager = new POManager(page);
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(email, password);

    
});

When('Add {string} to cart', async function (productName) {
   this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
    
});

Then('Verfiy {string} is displayed in the cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
    
});

When('Enter valid details and Place the Order', async function () {
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    this.orderId = orderId;                    // ← ADD THIS LINE
    console.log(this.orderId);                 // ← Now it will show correct value
});

Then('Verify order in present in the OrderHistory', async function () {
    this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);   // Now this.orderId exists
    
    expect(this.orderId).toContain(await ordersHistoryPage.getOrderId());
});