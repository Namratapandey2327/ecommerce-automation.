import { test, expect } from '../fixtures/testFixture';
import { loginData } from '../test-data/loginData';

test.describe('Login Page Test Suite', () => {

  test.beforeEach(async ({ loginPage }) => {
    await test.step('Navigate to the login portal', async () => {
      await loginPage.navigate();
    });
  });

  // ==========================================
  // 1. POSITIVE TEST CASES
  // ==========================================

  test('User can log in successfully with standard credentials', async ({
    loginPage,
    productsPage,
  }) => {
    const creds = loginData.validUsers.standard;

    await test.step('Submit standard login credentials', async () => {
      await loginPage.login(creds.username, creds.password);
    });

    await test.step('Verify navigation to the products catalog page', async () => {
      await expect(productsPage.getHeaderTitle()).toBeVisible();
      await expect(productsPage.getHeaderTitle()).toHaveText('Products');
      expect(await productsPage.getUrl()).toContain('/inventory.html');
    });
  });

  test('User can log in successfully with performance glitch user credentials', async ({
    loginPage,
    productsPage,
  }) => {
    const creds = loginData.validUsers.performanceGlitch;

    await test.step('Submit performance glitch login credentials', async () => {
      await loginPage.login(creds.username, creds.password);
    });

    await test.step('Verify page navigates to catalog despite potential delay', async () => {
      await expect(productsPage.getHeaderTitle()).toBeVisible();
      expect(await productsPage.getUrl()).toContain('/inventory.html');
    });
  });

  // ==========================================
  // 2. NEGATIVE TEST CASES
  // ==========================================

  test('Should display error when logging in with invalid credentials', async ({
    loginPage,
  }) => {
    const creds = loginData.invalidUser;

    await test.step('Submit invalid credentials', async () => {
      await loginPage.login(creds.username, creds.password);
    });

    await test.step('Verify credential mismatch error message', async () => {
      const errorMsg = loginPage.getErrorMessage();
      await expect(errorMsg).toBeVisible();
      await expect(errorMsg).toHaveText(loginData.expectedErrors.invalidCredentials);
    });
  });

  test('Should display error when logging in as a locked out user', async ({
    loginPage,
  }) => {
    const creds = loginData.lockedOutUser;

    await test.step('Submit locked out user credentials', async () => {
      await loginPage.login(creds.username, creds.password);
    });

    await test.step('Verify locked-out user error message', async () => {
      const errorMsg = loginPage.getErrorMessage();
      await expect(errorMsg).toBeVisible();
      await expect(errorMsg).toHaveText(loginData.expectedErrors.lockedOut);
    });
  });

  test('Should display error when username is omitted', async ({
    loginPage,
  }) => {
    await test.step('Enter password only and submit', async () => {
      await loginPage.enterPassword(loginData.validUsers.standard.password);
      await loginPage.clickSubmitButton();
    });

    await test.step('Verify empty username error message', async () => {
      const errorMsg = loginPage.getErrorMessage();
      await expect(errorMsg).toBeVisible();
      await expect(errorMsg).toHaveText(loginData.expectedErrors.usernameRequired);
    });
  });

  test('Should display error when password is omitted', async ({
    loginPage,
  }) => {
    await test.step('Enter username only and submit', async () => {
      await loginPage.enterUsername(loginData.validUsers.standard.username);
      await loginPage.clickSubmitButton();
    });

    await test.step('Verify empty password error message', async () => {
      const errorMsg = loginPage.getErrorMessage();
      await expect(errorMsg).toBeVisible();
      await expect(errorMsg).toHaveText(loginData.expectedErrors.passwordRequired);
    });
  });

  // ==========================================
  // 3. OTHER / UI / LIFECYCLE TEST CASES
  // ==========================================

  test('Verify input field placeholders on login form', async ({
    loginPage,
  }) => {
    await test.step('Check placeholders for Username and Password fields', async () => {
      await expect(loginPage.getUsernameInput()).toHaveAttribute('placeholder', loginData.placeholders.username);
      await expect(loginPage.getPasswordInput()).toHaveAttribute('placeholder', loginData.placeholders.password);
    });
  });

  test('Verify password input field masking for security', async ({
    loginPage,
  }) => {
    await test.step('Assert password input uses secure type attributes', async () => {
      await expect(loginPage.getPasswordInput()).toHaveAttribute('type', 'password');
    });
  });

  test('Verify successful logout redirects user back to login page', async ({
    loginPage,
    productsPage,
  }) => {
    const creds = loginData.validUsers.standard;

    await test.step('Log in and verify dashboard landing', async () => {
      await loginPage.login(creds.username, creds.password);
      await expect(productsPage.getHeaderTitle()).toBeVisible();
    });

    await test.step('Perform logout action', async () => {
      await productsPage.logout();
    });

    await test.step('Verify redirection back to login page', async () => {
      expect(await loginPage.getUrl()).toBe('https://www.saucedemo.com/');
      await expect(loginPage.getUsernameInput()).toBeVisible();
      await expect(loginPage.getPasswordInput()).toBeVisible();
    });
  });

});
