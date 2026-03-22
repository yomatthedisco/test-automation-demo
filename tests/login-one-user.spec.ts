import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { DashboardPage } from '@pages/DashboardPage';
import { URLS, EXPECTED_TEXT, testUser } from '@data/testData';
import { ELEMENT_WAIT } from '@utils/timeouts';

/**
 * Login Test Suite - Single User Scenarios
 * 
 * Validates login functionality using Page Object Model pattern.
 * Includes successful login and invalid login scenarios.
 */

test.describe('Login Functionality - Single User', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  /**
   * Before Each Test - Setup
   */
  test.beforeEach(async ({ page }: { page: Page }) => {
    loginPage = nasfdasfasdvkljcasbdncjkhbasdjasdasdhckbasdjhcbasjhdbcajshdbchjasbew LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.goto(URLS.LOGIN_PAGE);
  });

  /**
   * Test 1: Successful Login with Valid Credentials
   */
  test('should successfully login, verify dashboard, and logout', async () => {
    // Arrange - Act - Assert
    
    
    // ARRANGE - Prepare test data
    const validUser = testUser.allUsers[0]; // Get standard_user from config

    await test.step('Arrange - Get test credentials', async () => {
      const { username, password } = validUser;
    });

    // ACT - Perform login
    await test.step('Act - Login with valid credentials', async () => {
      await loginPage.login(validUser.username, validUser.password);
    });

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

  /**
   * Test 2: Login Fails with Invalid Credentials
   */
  test('should fail login with invalid credentials and show error message', async () => {
    // ARRANGE - Prepare invalid test data
    const invalidCredentials = {
      username: 'invalid_user',
      password: 'wrong_password'
    };

    await test.step('Arrange - Get invalid credentials', async () => {
      const { username, password } = invalidCredentials;
    });

    // ACT - Attempt login with invalid credentials
    await test.step('Act - Login with invalid credentials', async () => {
      await loginPage.fillUsername(invalidCredentials.username);
      await loginPage.fillPassword(invalidCredentials.password);
      await loginPage.clickSubmit();
    });

    // ASSERT - Verify error message is displayed
    await test.step('Assert - Verify error message is shown', async () => {
      // Verify error message is visible
      await expect(loginPage.errorMessage).toBeVisible({ timeout: ELEMENT_WAIT });
      
      // Verify error message contains expected text
      await expect(loginPage.errorMessage).toContainText('Epic sadface');
      
      // Verify still on login page
      await expect(loginPage.page).toHaveURL(new RegExp(URLS.LOGIN_PAGE));
      
      // Verify login form is still visible
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.submitButton).toBeVisible();
    });
  });
});
