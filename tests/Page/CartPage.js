class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: /Continue Shopping/ });
  }

  item(productName) {
    return this.page.locator('.cart_item').filter({ hasText: productName });
  }

  async removeProduct(productName) {
    await this.item(productName).getByRole('button', { name: /Remove/ }).click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = CartPage;
