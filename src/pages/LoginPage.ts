import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ELEMENT_WAIT } from '@utils/timeouts';

/**
 * LoginPage - Page Object Model
 * 
 * A reusable, dynamic page object for login functionality.
 * Focuses on actions only - assertions belong in test files.
 * Extends BasePage for common functionality.
 */
export class LoginPage extends BasePage {
  
  // Login form elements
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  /**
   * Constructor - Initialize the LoginPage
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Fill username field
   * @param username - Username value
   */
  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /**
   * Fill password field
   * @param password - Password value
   */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Click submit/login button
   */
  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  /**
   * Perform complete login action
   * @param username - User's username
   * @param password - User's password
   */
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickSubmit();
    await this.waitForNavigation('networkidle');
  }

  async expectLockedOuterror(): Promise<void>{
    await expect(this.errorMessage).toBeVisible({timeout: ELEMENT_WAIT});
    await expect(this.errorMessage).toContainText('Sorry, this user has been locked out.');
};

}
