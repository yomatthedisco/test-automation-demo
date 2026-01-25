import { Page, Locator } from '@playwright/test';

/**
 * BasePage - Base Page Object Model
 * 
 * Contains common methods shared across all page objects.
 * All page objects should extend this base class for consistency and reusability.
 */
export class BasePage {
  readonly page: Page;

  /**
   * Constructor - Initialize the BasePage
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param url - URL path to navigate to
   * @param waitUntil - Wait condition (default: 'domcontentloaded')
   */
  async goto(
    url: string, 
    waitUntil: 'load' | 'domcontentloaded' | 'networkidle' = 'domcontentloaded'
  ): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForLoadState(waitUntil);
  }

  /**
   * Get a dynamic locator by selector
   * @param selector - CSS selector or data-test attribute
   */
  getElement(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Click any element by selector
   * @param selector - CSS selector
   */
  async clickElement(selector: string): Promise<void> {
    await this.page.locator(selector).click();
  }

  /**
   * Fill input field with text
   * @param selector - CSS selector
   * @param text - Text to fill
   */
  async fillInput(selector: string, text: string): Promise<void> {
    await this.page.locator(selector).fill(text);
  }

  /**
   * Wait for element to be visible
   * @param selector - CSS selector
   * @param timeout - Optional timeout in milliseconds
   */
  async waitForElement(selector: string, timeout?: number): Promise<void> {
    await this.page.locator(selector).waitFor({ 
      state: 'visible', 
      timeout 
    });
  }

  /**
   * Wait for element to be hidden
   * @param selector - CSS selector
   * @param timeout - Optional timeout in milliseconds
   */
  async waitForElementHidden(selector: string, timeout?: number): Promise<void> {
    await this.page.locator(selector).waitFor({ 
      state: 'hidden', 
      timeout 
    });
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Check if element is visible
   * @param selector - CSS selector
   */
  async isVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  /**
   * Check if element is enabled
   * @param selector - CSS selector
   */
  async isEnabled(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isEnabled();
  }

  /**
   * Get text content of an element
   * @param selector - CSS selector
   */
  async getTextContent(selector: string): Promise<string | null> {
    return await this.page.locator(selector).textContent();
  }

  /**
   * Get attribute value of an element
   * @param selector - CSS selector
   * @param attribute - Attribute name
   */
  async getAttribute(selector: string, attribute: string): Promise<string | null> {
    return await this.page.locator(selector).getAttribute(attribute);
  }

  /**
   * Wait for navigation to complete
   * @param waitUntil - Wait condition
   */
  async waitForNavigation(
    waitUntil: 'load' | 'domcontentloaded' | 'networkidle' = 'networkidle'
  ): Promise<void> {
    await this.page.waitForLoadState(waitUntil);
  }

  /**
   * Reload the current page
   */
  async reload(): Promise<void> {
    await this.page.reload();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Check if URL contains text
   * @param text - Text to search for in URL
   */
  urlContains(text: string): boolean {
    return this.page.url().includes(text);
  }
}
