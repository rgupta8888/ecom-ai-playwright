const { test, expect } = require('@playwright/test');
const LoginPage = require('./Page/LoginPage');
const InventoryPage = require('./Page/InventoryPage');
const CartPage = require('./Page/CartPage');
const CheckoutPage = require('./Page/CheckoutPage');

test.describe('Core Ecommerce Journeys', () => {
  test('Validate checkout information and review order totals', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // 1. Start from a fresh browser state, log in, add two products, open the cart, and select Checkout.
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addProducts(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(checkoutPage.firstNameInput).toBeVisible();
    await expect(checkoutPage.lastNameInput).toBeVisible();
    await expect(checkoutPage.postalCodeInput).toBeVisible();
    await expect(checkoutPage.continueButton).toBeVisible();

    // 2. Select Continue without entering any customer information.
    await checkoutPage.continueToOverview();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(checkoutPage.errorMessage).toContainText('First Name is required');

    // 3. Enter customer information and continue to the overview.
    await checkoutPage.fillInformation('Ada', 'Lovelace', '10001');
    await checkoutPage.continueToOverview();
    await expect(checkoutPage.overview).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light', { exact: true })).toBeVisible();
    await expect(page.getByText('Payment Information:', { exact: true })).toBeVisible();
    await expect(page.getByText('Shipping Information:', { exact: true })).toBeVisible();

    // 4. Review the displayed price calculation.
    await expect(checkoutPage.itemTotal).toBeVisible();
    await expect(checkoutPage.tax).toBeVisible();
    await expect(checkoutPage.total).toBeVisible();
    await expect(checkoutPage.cancelButton).toBeVisible();
    await expect(checkoutPage.finishButton).toBeVisible();
  });
});
