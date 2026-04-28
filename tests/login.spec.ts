import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { DashboardPage } from '@pages/DashboardPage';
import { testUser, URLS, EXPECTED_TEXT } from '@data/testData';
import { ELEMENT_WAIT } from '@utils/timeouts';

/**
 * Login Test Suite
 * 
 * Validates login functionality using Page Object Model pattern.
 * Follows AAA (Arrange-Act-Assert) pattern with assertions in tests.
 */

test.describe('Login Functionality', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  /**
   * Before Each Test - Setup
   */
  test.beforeEach(async ({ page }: { page: Page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.goto(URLS.LOGIN_PAGE);
  });

  /**
   * Test: Successful Login, Dashboard Verification, and Logout
   * 
   * This test follows the AAA (Arrange-Act-Assert) pattern:
   * - Arrange: Prepare test data and preconditions
   * - Act: Execute the login and logout actions
   * - Assert: Verify the expected outcomes
   */

  for (const user of testUser.allUsers) {
    test(`should successfully login, verify dashboard, and logout: ${user.username}`, async () => {
      await test.step('Arrange - Get test credentials', async () => {
        const { username, password } = user;
      });

      // ACT - Perform login
      await test.step('Act - Login with valid credentials', async () => {
        await loginPage.login(user.username, user.password);
      });

           if(user.username === 'locked_out_user') {
        await loginPage.expectLockedOuterror();
        return; // exit the test if username is locked out
      }

      // ASSERT - Verify successful login and dashboard access
      await test.step('Assert - Verify successful login and dashboard access', async () => {
        // Verify URL
        await expect(loginPage.page).toHaveURL(new RegExp(URLS.DASHBOARD));

        // Verify dashboard elements
        await expect(dashboardPage.title).toBeVisible({ timeout: ELEMENT_WAIT });
        await expect(dashboardPage.title).toHaveText(EXPECTED_TEXT.DASHBOARD_TITLE);
        await expect(dashboardPage.appLogo).toBeVisible();
        await expect(dashboardPage.appLogo).toContainText(EXPECTED_TEXT.DASHBOARD_MESSAGE);
        await expect(dashboardPage.hamburgerMenu).toBeVisible();
      });

      // ACT - Perform logout
      await test.step('Act - Logout from the application', async () => {
        await dashboardPage.logout();
      });

      // ASSERT - Verify successful logout
      await test.step('Assert - Verify successful logout and return to login page', async () => {
        // Verify URL is back to login page
        await expect(loginPage.page).toHaveURL(new RegExp(URLS.LOGIN_PAGE));

        // Verify login form is visible
        await expect(loginPage.usernameInput).toBeVisible({ timeout: ELEMENT_WAIT });
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.submitButton).toBeVisible();
      });
    });
  }
});
