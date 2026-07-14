import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  private readonly headerTitle: Locator;
  private readonly cartLink: Locator;
  private readonly burgerMenuButton: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.headerTitle = page.locator('[data-test="title"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  /**
   * Returns the products header locator for assertions
   */
  getHeaderTitle(): Locator {
    return this.headerTitle;
  }

  /**
   * Action: Adds a specific item to the cart by its product name.
   * Demonstrates Playwright chaining and filtering:
   * 1. Finds all '.inventory_item' elements.
   * 2. Filters to find the one containing our item name (e.g. "Sauce Labs Backpack").
   * 3. Finds the "Add to cart" button inside that filtered container and clicks it.
   */
  async addItemToCart(itemName: string): Promise<void> {
    await this.page
      .locator('.inventory_item')
      .filter({ hasText: itemName })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  /**
   * Action: Clicks the shopping cart badge/icon in the header.
   */
  async clickCartLink(): Promise<void> {
    await this.cartLink.click();
  }

  /**
   * Action: Clicks the burger menu button and then the logout link to end the session.
   */
  async logout(): Promise<void> {
    await this.burgerMenuButton.click();
    await this.logoutLink.click();
  }
}
