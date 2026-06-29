const { test, expect } = require("@playwright/test");

test("Calendar Validations", async ({ page }) => {

    // Test Data
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber, date, year];

    // Navigate to the application
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    // Open the calendar picker
    await page.locator(".react-date-picker__inputGroup").click();

    // Navigate to Year view (click twice)
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();

    // Select Year
    await page.getByText(year).click();

    // Select Month
    await page.locator(".react-calendar__year-view__months__month")
        .nth(Number(monthNumber - 1))
        .click();

    // Select Date
    await page.locator("//abbr[text()='" + date + "']").click();

    // Validate the selected date in all input fields
    const inputs = await page.locator(".react-date-picker__inputGroup__input");

    for (let i = 0; i < expectedList.length; i++) {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
    }

    console.log("Calendar validation completed successfully!");
});