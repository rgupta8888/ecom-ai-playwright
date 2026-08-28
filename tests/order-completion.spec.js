const { test, expect } = require('@playwright/test');
const LoginPage = require('./Page/LoginPage');
const InventoryPage = require('./Page/InventoryPage');
const CartPage = require('./Page/CartPage');
const CheckoutPage = require('./Page/CheckoutPage');

test.describe('Core Ecommerce Journeys', () => {
  test('Complete a purchase and verify confirmation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // 1. Start from a fresh browser state, log in, add products, complete checkout information, and reach the overview.
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addProducts(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation('Ada', 'Lovelace', '10001');
    await checkoutPage.continueToOverview();
    await expect(checkoutPage.overview).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light', { exact: true })).toBeVisible();
    await expect(checkoutPage.total).toBeVisible();

    // 2. Select Finish.
    await checkoutPage.finishOrder();
    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(page.getByText('Thank you for your order!', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: /Back Home/ })).toBeVisible();

    // 3. Select Back Home.
    await page.getByRole('button', { name: /Back Home/ }).click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.productsHeading).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });
});
