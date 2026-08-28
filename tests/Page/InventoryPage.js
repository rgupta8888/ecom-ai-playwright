class InventoryPage {
  constructor(page) {
    this.page = page;
    this.productsHeading = page.getByText('Products', { exact: true });
    this.productCards = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.productImages = page.locator('.inventory_item_img img');
    this.addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
    this.sortDropdown = page.getByRole('combobox');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  productCard(productName) {
    return this.page.locator('.inventory_item').filter({ hasText: productName });
  }

  async sortBy(value) {
    await this.sortDropdown.selectOption(value);
  }

  async openProduct(productName) {
    await this.productCard(productName).locator('.inventory_item_name').click();
  }

  async addProduct(productName) {
    await this.productCard(productName).getByRole('button', { name: 'Add to cart' }).click();
  }

  async addProducts(productNames) {
    for (const productName of productNames) {
      await this.addProduct(productName);
    }
  }

  async openCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
}

module.exports = InventoryPage;
