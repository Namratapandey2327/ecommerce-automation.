import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CheckoutPage represents the multi-step checkout workflow:
 * 1. Checkout Information Form (First Name, Last Name, Postal Code)
 * 2. Checkout Overview Summary (Total, finish order)
 * 3. Checkout Complete screen
 * 
 * Combining related pages into a single POM module keeps the framework clean
 * and easy to understand for beginners.
 */
export class CheckoutPage extends BasePage {
  // Step 1: Information Form Elements
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;

  // Step 2: Overview Elements
  private readonly finishButton: Locator;

  // Step 3: Complete Elements
  private readonly completeHeader: Locator;

  constructor(page: Page) {
    super(page);

    // Step 1 locators
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });

    // Step 2 locators
    this.finishButton = page.getByRole('button', { name: 'Finish' });

    // Step 3 locators
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }

  /**
   * Action: Completes the customer details form (Step 1)
   */
  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  /**
   * Action: Confirms the order summary (Step 2)
   */
  async clickFinishButton(): Promise<void> {
    await this.finishButton.click();
  }

  /**
   * Returns the final order completion success message header locator.
   */
  getCompleteHeader(): Locator {
    return this.completeHeader;
  }
}
