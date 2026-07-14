/**
 * Test data for the E-commerce checkout flow.
 */
export const checkoutData = {
  loginCredentials: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  products: {
    backpack: 'Sauce Labs Backpack',
    bikeLight: 'Sauce Labs Bike Light',
  },
  customerDetails: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
  },
  expectedResult: {
    successMessage: 'Thank you for your order!',
  },
} as const;
