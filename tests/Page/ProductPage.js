class ProductPage {
  constructor(page) {
    this.page = page;
    this.productName = page.locator('.inventory_details_name');
    this.productDescription = page.locator('.inventory_details_desc');
    this.productPrice = page.locator('.inventory_details_price');
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.backToProductsButton = page.getByRole('button', { name: /Back to products/ });
  }

  async backToProducts() {
    await this.backToProductsButton.click();
  }
}

module.exports = ProductPage;
