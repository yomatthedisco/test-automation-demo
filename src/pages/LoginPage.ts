import { Page, Locator, expect } from '@playwright/test';
import { URLS, EXPECTED_TEXT } from '@data/testData';
import { ELEMENT_WAIT } from '@utils/timeouts';

/**
 * LoginPage - Page Object Model
 * 
 * This class represents the Login Page and encapsulates all interactions
 * with the login functionality using the Page Object Model pattern.
 */
export class LoginPage {
  readonly page: Page;
  
  // Locators - Define all page elements
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  
  // Dashboard elements (post-login)
  readonly dashboardTitle: Locator;
  readonly dashboardMessage: Locator;
  readonly logoutButton: Locator;

  /**
   * Constructor - Initialize the LoginPage
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
    
    // Login page elements - Sauce Demo selectors
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
    
    // Dashboard elements (after successful login)
    this.dashboardTitle = page.locator('.title');
    this.dashboardMessage = page.locator('.app_logo');
    this.logoutButton = page.locator('#react-burger-menu-btn');
  }

  /**
   * Navigate to the login page
   */
  async navigate(): Promise<void> {
    await this.page.goto(URLS.LOGIN_PAGE);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Perform login action
   * 
   * @param username - User's username
   * @param password - User's password
   */
  async login(username: string, password: string): Promise<void> {
    // Fill in username
    await this.usernameInput.fill(username);
    
    // Fill in password
    await this.passwordInput.fill(password);
    
    // Click submit button
    await this.submitButton.click();
    
    // Wait for navigation after login
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify successful login by checking dashboard elements
   */
  async verifySuccessfulLogin(): Promise<void> {
    // Verify URL contains the dashboard path
    await expect(this.page).toHaveURL(new RegExp(URLS.DASHBOARD));
    
    // Verify dashboard title is visible and has correct text
    await expect(this.dashboardTitle).toBeVisible({ timeout: ELEMENT_WAIT });
    await expect(this.dashboardTitle).toHaveText(EXPECTED_TEXT.DASHBOARD_TITLE);
    
    // Verify app logo/message is displayed
    await expect(this.dashboardMessage).toBeVisible();
    await expect(this.dashboardMessage).toContainText(EXPECTED_TEXT.DASHBOARD_MESSAGE);
    
    // Verify hamburger menu button is present
    await expect(this.logoutButton).toBeVisible();
  }

  /**
   * Perform logout action
   */
  async logout(): Promise<void> {
    // Click the hamburger menu button
    await this.logoutButton.click();
    
    // Wait for menu to open and click logout link
    const logoutLink = this.page.locator('#logout_sidebar_link');
    await logoutLink.waitFor({ state: 'visible', timeout: ELEMENT_WAIT });
    await logoutLink.click();
    
    // Wait for navigation back to login page
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify successful logout by checking we're back on login page
   */
  async verifySuccessfulLogout(): Promise<void> {
    // Verify URL is back to login page
    await expect(this.page).toHaveURL(new RegExp(URLS.LOGIN_PAGE));
    
    // Verify login form elements are visible
    await expect(this.usernameInput).toBeVisible({ timeout: ELEMENT_WAIT });
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  /**
   * Complete Login-Logout Flow
   * 
   * This method performs a complete user flow:
   * 1. Login with provided credentials
   * 2. Verify dashboard access
   * 3. Logout
   * 4. Verify return to login page
   * 
   * @param username - User's username
   * @param password - User's password
   * @returns Object containing results of each step
   */
  async completeLoginLogoutFlow(username: string, password: string): Promise<{
    login: boolean;
    postLogin: boolean;
    logout: boolean;
  }> {
    try {
      // Step 1: Perform login
      await this.login(username, password);
      
      // Step 2: Verify successful login (dashboard access)
      await this.verifySuccessfulLogin();
      
      // Step 3: Perform logout
      await this.logout();
      
      // Step 4: Verify successful logout
      await this.verifySuccessfulLogout();
      
      // Return success results
      return {
        login: true,
        postLogin: true,
        logout: true,
      };
    } catch (error) {
      // If any step fails, throw the error
      throw error;
    }
  }
}
