import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly headerTitle: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.headerTitle = page.locator('[data-test="title"]');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  getHeaderTitle(): Locator {
    return this.headerTitle;
  }

  /**
   * Returns a locator for the name of an item inside the cart.
   * Tests will use this to assert the item's presence in the cart list.
   */
  getCartItemName(itemName: string): Locator {
    return this.page.locator('.inventory_item_name').filter({ hasText: itemName });
  }

  /**
   * Action: Clicks the checkout button to start the purchase process.
   */
  async clickCheckoutButton(): Promise<void> {
    await this.checkoutButton.click();
  }
}
