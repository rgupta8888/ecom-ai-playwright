const { test, expect } = require('@playwright/test');
const LoginPage = require('./Page/LoginPage');
const InventoryPage = require('./Page/InventoryPage');

test.describe('Core Ecommerce Journeys', () => {
  test('Authenticate with valid and invalid user credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // 1. Start from a fresh browser state and open https://www.saucedemo.com/.
    await loginPage.open();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();

    // 2. Enter username `standard_user` and password `secret_sauce`, then select Login.
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.productsHeading).toBeVisible();

    // 3. Return to a fresh login state, enter `standard_user` and an incorrect password, then select Login.
    await loginPage.open();
    await loginPage.login('standard_user', 'wrong_password');
    await expect(loginPage.loginError).toContainText('Username and password do not match any user');
    await expect(page).toHaveURL(/saucedemo\.com\/$/);

    // 4. Return to a fresh login state, enter `locked_out_user` and `secret_sauce`, then select Login.
    await loginPage.open();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.loginError).toContainText('locked out');
    await expect(page).not.toHaveURL(/\/inventory\.html$/);
  });
});
