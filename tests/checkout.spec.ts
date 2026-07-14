import { test, expect } from '../fixtures/testFixture';
import { checkoutData } from '../test-data/checkoutData';

test.describe('E-commerce Checkout Flow', () => {

  test('User can search, add item to cart, and complete purchase checkout', async ({
    loginPage,
    productsPage,
    cartPage,
    checkoutPage,
  }) => {
    // ----------------------------------------------------
    // 1. Arrange: Go to login page and fetch test data
    // ----------------------------------------------------
    const credentials = checkoutData.loginCredentials;
    const customer = checkoutData.customerDetails;
    const targetProduct = checkoutData.products.backpack;

    await test.step('Navigate to the login portal', async () => {
      await loginPage.navigate();
    });

    // ----------------------------------------------------
    // 2. Act: Execute checkout actions step-by-step
    // ----------------------------------------------------
    await test.step('Log in to the system', async () => {
      await loginPage.login(credentials.username, credentials.password);
      await expect(productsPage.getHeaderTitle()).toBeVisible();
      await expect(productsPage.getHeaderTitle()).toHaveText('Products');
    });

    await test.step('Add product to the shopping cart', async () => {
      await productsPage.addItemToCart(targetProduct);
    });

    await test.step('Open the cart list page', async () => {
      await productsPage.clickCartLink();
      await expect(cartPage.getHeaderTitle()).toBeVisible();
      await expect(cartPage.getHeaderTitle()).toHaveText('Your Cart');
    });

    await test.step('Verify item is present in the cart', async () => {
      const itemInCart = cartPage.getCartItemName(targetProduct);
      await expect(itemInCart).toBeVisible();
      await expect(itemInCart).toHaveText(targetProduct);
    });

    await test.step('Initiate checkout', async () => {
      await cartPage.clickCheckoutButton();
    });

    await test.step('Fill in checkout customer details', async () => {
      await checkoutPage.fillInformation(customer.firstName, customer.lastName, customer.postalCode);
    });

    await test.step('Confirm order summary', async () => {
      await checkoutPage.clickFinishButton();
    });

    // ----------------------------------------------------
    // 3. Assert: Verify order success header
    // ----------------------------------------------------
    await test.step('Verify order success confirmation', async () => {
      const completeHeader = checkoutPage.getCompleteHeader();
      await expect(completeHeader).toBeVisible();
      await expect(completeHeader).toHaveText(checkoutData.expectedResult.successMessage);
    });
  });
});
