const { test, expect } = require('@playwright/test');
const LoginPage = require('./Page/LoginPage');
const InventoryPage = require('./Page/InventoryPage');
const ProductPage = require('./Page/ProductPage');

test.describe('Core Ecommerce Journeys', () => {
  test('Browse, sort, and inspect product details', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const productPage = new ProductPage(page);

    // 1. Start from a fresh browser state, log in as `standard_user` with password `secret_sauce`, and remain on the inventory page.
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(inventoryPage.productsHeading).toBeVisible();
    await expect(inventoryPage.productCards).toHaveCount(6);
    await expect(inventoryPage.addToCartButtons).toHaveCount(6);
    await expect(inventoryPage.productImages).toHaveCount(6);

    // 2. Use the product sort dropdown to select `Price (low to high)`.
    await inventoryPage.sortBy('lohi');
    await expect(inventoryPage.sortDropdown).toHaveValue('lohi');
    await expect(inventoryPage.productNames).toHaveText([
      'Sauce Labs Onesie',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Backpack',
      'Sauce Labs Fleece Jacket',
    ]);

    // 3. Select the Sauce Labs Onesie product name or image.
    await inventoryPage.openProduct('Sauce Labs Onesie');
    await expect(page).toHaveURL(/\/inventory-item\.html\?id=2$/);
    await expect(productPage.productName).toHaveText('Sauce Labs Onesie');
    await expect(productPage.productDescription).toContainText('Rib snap infant onesie');
    await expect(productPage.productPrice).toHaveText('$7.99');
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.backToProductsButton).toBeVisible();

    // 4. Select Back to products.
    await productPage.backToProducts();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.productsHeading).toBeVisible();
  });
});
