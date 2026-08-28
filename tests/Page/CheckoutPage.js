class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.postalCodeInput = page.getByRole('textbox', { name: 'Zip/Postal Code' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.cancelButton = page.getByRole('button', { name: /Cancel/ });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.errorMessage = page.getByRole('heading', { level: 3 });
    this.overview = page.getByText('Checkout: Overview', { exact: true });
    this.itemTotal = page.getByText('Item total: $39.98', { exact: true });
    this.tax = page.getByText('Tax: $3.20', { exact: true });
    this.total = page.getByText('Total: $43.18', { exact: true });
  }

  async fillInformation(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }
}

module.exports = CheckoutPage;
