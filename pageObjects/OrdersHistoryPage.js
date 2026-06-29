class OrdersHistoryPage
{
    constructor(page)
    {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderdIdDetails = page.locator(".col-text");
    }

    async searchOrderAndSelect(orderId)
    {
        await this.rows.first().waitFor();   // ← Minimal change: safer wait

        for(let i = 0; i < await this.rows.count(); ++i)
        {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            
            if (rowOrderId && orderId.includes(rowOrderId))   // ← Added null check
            {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

    async getOrderId()
    {
        return await this.orderdIdDetails.textContent();
    }
}

module.exports = {OrdersHistoryPage};