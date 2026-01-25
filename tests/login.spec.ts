import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { testUser } from '@data/testData';

/**
 * Login Test Suite
 * 
 * This test suite validates the login functionality using the Page Object Model pattern.
 * It includes setup, teardown, and organized test steps for better readability.
 */

test.describe('Login Functionality', () => {
  let loginPage: LoginPage;

  /**
   * Before Each Test
   * Setup that runs before each test case
   */
  test.beforeEach(async ({ page }: { page: Page }) => {
    // Initialize the LoginPage object
    loginPage = new LoginPage(page);
    
    // Navigate to the login page
    await loginPage.navigate();
  });

  /**
   * Test: Successful Login, Dashboard Verification, and Logout
   * 
   * This test follows the AAA (Arrange-Act-Assert) pattern:
   * - Arrange: Prepare test data and preconditions
   * - Act: Execute the login and logout actions
   * - Assert: Verify the expected outcomes
   */
  test('should successfully login, verify dashboard, and logout', async () => {
    // ARRANGE - Prepare test data and preconditions
    let username: string;
    let password: string;

    await test.step('Arrange - Get test credentials', async () => {
      const credentials = testUser.credentials;
      username = credentials.username;
      password = credentials.password;
    });

    // ACT - Perform login action
    await test.step('Act - Login with valid credentials', async () => {
      await loginPage.login(username, password);
    });

    // ASSERT - Verify successful login and dashboard access
    await test.step('Assert - Verify successful login and dashboard access', async () => {
      await loginPage.verifySuccessfulLogin();
    });

    // ACT - Perform logout action
    await test.step('Act - Logout from the application', async () => {
      await loginPage.logout();
    });

    // ASSERT - Verify successful logout
    await test.step('Assert - Verify successful logout and return to login page', async () => {
      await loginPage.verifySuccessfulLogout();
    });
  });

  /**
   * Alternative: Using the complete flow method
   * 
   * This is a more concise version that uses the completeLoginLogoutFlow method
   * from the LoginPage class. Uncomment to use this approach instead.
   */
  /*
  test('should complete full login-logout flow using helper method', async () => {
    const { username, password } = testUser.credentials;
    
    await test.step('Execute complete login-logout flow', async () => {
      const result = await loginPage.completeLoginLogoutFlow(username, password);
      
      // Verify all steps were successful
      expect(result.login).toBe(true);
      expect(result.postLogin).toBe(true);
      expect(result.logout).toBe(true);
    });
  });
  */
});
