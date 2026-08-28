# Sauce Demo Core Priority Test Plan

## Application Overview

Functional test plan for the Sauce Demo ecommerce application at https://www.saucedemo.com/. Each test starts from a fresh browser state and uses the documented demo credentials. The five scenarios cover authentication, product discovery, cart management, checkout validation, and successful order completion.

## Test Scenarios

### 1. Core Ecommerce Journeys

**Seed:** `tests/seed.spec.ts`

#### 1.1. 1. Authenticate with valid and invalid user credentials

**File:** `tests/saucedemo-core-priority/authentication.spec.js`

**Steps:**
  1. Start from a fresh browser state and open https://www.saucedemo.com/.
    - expect: The Swag Labs login page is displayed with Username, Password, and Login controls.
  2. Enter username `standard_user` and password `secret_sauce`, then select Login.
    - expect: The user is authenticated and routed to `/inventory.html`.
    - expect: The Products inventory page is visible.
  3. Return to a fresh login state, enter `standard_user` and an incorrect password, then select Login.
    - expect: The login page remains displayed.
    - expect: An error states that the username and password do not match any user.
  4. Return to a fresh login state, enter `locked_out_user` and `secret_sauce`, then select Login.
    - expect: The user is not authenticated.
    - expect: A locked-out-user error is displayed and the inventory is not accessible.

#### 1.2. 2. Browse, sort, and inspect product details

**File:** `tests/saucedemo-core-priority/product-discovery.spec.js`

**Steps:**
  1. Start from a fresh browser state, log in as `standard_user` with password `secret_sauce`, and remain on the inventory page.
    - expect: Six products are displayed with names, descriptions, prices, product images, and Add to cart controls.
  2. Use the product sort dropdown to select `Price (low to high)`.
    - expect: Products are reordered from the lowest price to the highest price; Sauce Labs Onesie appears before Sauce Labs Fleece Jacket.
  3. Select the Sauce Labs Onesie product name or image.
    - expect: The product detail page opens.
    - expect: The page shows the Onesie image, name, description, price `$7.99`, Add to cart, and Back to products controls.
  4. Select Back to products.
    - expect: The inventory page is restored with the selected sort order retained or clearly reset according to the product behavior.

#### 1.3. 3. Add, review, and remove cart items

**File:** `tests/saucedemo-core-priority/cart-management.spec.js`

**Steps:**
  1. Start from a fresh browser state, log in as `standard_user`, and add Sauce Labs Backpack and Sauce Labs Bike Light from the inventory page.
    - expect: Each selected product changes to a removable cart state.
    - expect: The cart badge displays `2`.
  2. Open the shopping cart.
    - expect: The cart page is displayed.
    - expect: Backpack and Bike Light are listed with quantity `1` each and their correct product information.
    - expect: Checkout and Continue Shopping controls are available.
  3. Remove one cart item using its product-specific Remove control.
    - expect: The removed item disappears from the cart.
    - expect: The remaining item is still present.
    - expect: The cart badge updates from `2` to `1` or disappears when the cart becomes empty.
  4. Select Continue Shopping, add the removed item again, and reopen the cart.
    - expect: The item can be added again.
    - expect: The cart contains the expected two distinct products without unintended duplicate entries.

#### 1.4. 4. Validate checkout information and review order totals

**File:** `tests/saucedemo-core-priority/checkout-validation.spec.js`

**Steps:**
  1. Start from a fresh browser state, log in as `standard_user`, add Sauce Labs Backpack and Sauce Labs Bike Light, open the cart, and select Checkout.
    - expect: Checkout: Your Information is displayed with First Name, Last Name, Zip/Postal Code, Cancel, and Continue controls.
  2. Select Continue without entering any customer information.
    - expect: The page remains on checkout step one.
    - expect: A required-field error is displayed for First Name.
  3. Enter First Name `Ada`, Last Name `Lovelace`, and Zip/Postal Code `10001`, then select Continue.
    - expect: Checkout: Overview is displayed.
    - expect: The selected products and quantities match the cart.
    - expect: Payment information and shipping information are shown.
  4. Review the displayed price calculation.
    - expect: The item total is `$39.98`, tax is `$3.20`, and total is `$43.18` for the two selected products.
    - expect: Cancel and Finish controls are available.

#### 1.5. 5. Complete a purchase and verify confirmation

**File:** `tests/saucedemo-core-priority/order-completion.spec.js`

**Steps:**
  1. Start from a fresh browser state, log in as `standard_user`, add Sauce Labs Backpack and Sauce Labs Bike Light, complete checkout information with `Ada`, `Lovelace`, and `10001`, and reach Checkout: Overview.
    - expect: The overview contains the intended products, quantities, payment, shipping, and calculated total.
  2. Select Finish.
    - expect: The order is submitted successfully.
    - expect: The checkout-complete page is displayed with a clear order confirmation, such as `Thank you for your order!`.
    - expect: A Back Home control is available.
  3. Select Back Home.
    - expect: The user returns to the Products inventory page.
    - expect: The completed order no longer appears as an active cart.
    - expect: The cart badge is empty or absent.
