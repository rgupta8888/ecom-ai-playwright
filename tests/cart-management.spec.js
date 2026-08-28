const { test, expect } = require('@playwright/test');
const LoginPage = require('./Page/LoginPage');
const InventoryPage = require('./Page/InventoryPage');
const CartPage = require('./Page/CartPage');

test.describe('Core Ecommerce Journeys', () => {
  test('Add, review, and remove cart items', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // 1. Start from a fresh browser state, log in as `standard_user`, and add Backpack and Bike Light.
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addProducts(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    await expect(inventoryPage.cartBadge).toHaveText('2');

    // 2. Open the shopping cart.
    await inventoryPage.openCart();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(cartPage.cartItems).toHaveCount(2);
    await expect(cartPage.item('Sauce Labs Backpack')).toBeVisible();
    await expect(cartPage.item('Sauce Labs Bike Light')).toBeVisible();
    await expect(cartPage.checkoutButton).toBeVisible();
    await expect(cartPage.continueShoppingButton).toBeVisible();

    // 3. Remove one cart item using its product-specific Remove control.
    await cartPage.removeProduct('Sauce Labs Backpack');
    await expect(cartPage.item('Sauce Labs Backpack')).toHaveCount(0);
    await expect(cartPage.item('Sauce Labs Bike Light')).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // 4. Select Continue Shopping, add the removed item again, and reopen the cart.
    await cartPage.continueShopping();
    await inventoryPage.addProduct('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await expect(cartPage.cartItems).toHaveCount(2);
    await expect(cartPage.item('Sauce Labs Backpack')).toBeVisible();
    await expect(cartPage.item('Sauce Labs Bike Light')).toBeVisible();
  });
});
