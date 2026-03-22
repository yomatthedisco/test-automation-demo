import { test, expect, Page } from '@playwright/test';

test.describe('Login Without POM', () => {

  test('should login without POM - hardcoded approach', async ({ page }: { page: Page }) => {
    
    // Step 1: Navigate to login page
    await page.goto('/');
    
    // Step 2: Fill username - hardcoded XPath selector
    await page.locator('xpath=//*[@id="user-name"]').fill('standard_user');
    
    // Step 3: Fill password - hardcoded XPath selector
    await page.locator('xpath=//*[@id="password"]').fill('secret_sauce');
    
    // Step 4: Click login button - hardcoded XPath selector
    await page.locator('xpath=//*[@id="login-button"]').click();
    
    // Step 5: Wait for navigation
    await page.waitForLoadState('networkidle');
    
    // Step 6: Verify login was successful - hardcoded URL
    await expect(page).toHaveURL(/inventory\.html/);
    
    // Step 7: Verify dashboard title - hardcoded XPath selector and text
    await expect(page.locator('xpath=//*[@class="title"]')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('xpath=//*[@class="title"]')).toHaveText('Products');
    
    // Step 8: Verify app logo - hardcoded XPath selector and text
    await expect(page.locator('xpath=//*[@class="app_logo"]')).toBeVisible();
    await expect(page.locator('xpath=//*[@class="app_logo"]')).toContainText('Swag Labs');
    
    // Step 9: Verify menu button exists - hardcoded XPath selector
    await expect(page.locator('xpath=//*[@id="react-burger-menu-btn"]')).toBeVisible();
    
    // Step 10: Perform logout
    await page.locator('xpath=//*[@id="react-burger-menu-btn"]').click();
    
    // Step 11: Wait for menu to be visible
    await page.locator('xpath=//*[@id="logout_sidebar_link"]').waitFor({ state: 'visible', timeout: 3000 });
    
    // Step 12: Click logout link
    await page.locator('xpath=//*[@id="logout_sidebar_link"]').click();
    
    // Step 13: Wait for navigation back to login
    await page.waitForLoadState('networkidle');
    
    // Step 14: Verify back on login page - hardcoded URL
    await expect(page).toHaveURL(/.*\/$/);
    
    // Step 15: Verify login form is visible again - hardcoded XPath selectors
    await expect(page.locator('xpath=//*[@id="user-name"]')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('xpath=//*[@id="password"]')).toBeVisible();
    await expect(page.locator('xpath=//*[@id="login-button"]')).toBeVisible();
  });


  test('should login with another user without POM - duplicate code', async ({ page }: { page: Page }) => {
    
    // Step 1: Navigate to login page - DUPLICATED CODE
    await page.goto('/');
    
    // Step 2: Fill username with different user - DUPLICATED XPath CODE with different data
    await page.locator('xpath=//*[@id="user-name"]').fill('problem_user');
    
    // Step 3: Fill password - DUPLICATED XPath CODE
    await page.locator('xpath=//*[@id="password"]').fill('secret_sauce');
    
    // Step 4: Click login button - DUPLICATED XPath CODE
    await page.locator('xpath=//*[@id="login-button"]').click();
    
    // Step 5: Wait for navigation - DUPLICATED CODE
    await page.waitForLoadState('networkidle');
    
    // Step 6: Verify login was successful - DUPLICATED CODE
    await expect(page).toHaveURL(/inventory\.html/);
    
    // Step 7: Verify dashboard title - DUPLICATED XPath CODE
    await expect(page.locator('xpath=//*[@class="title"]')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('xpath=//*[@class="title"]')).toHaveText('Products');
    
    // Step 8: Perform logout - DUPLICATED XPath CODE
    await page.locator('xpath=//*[@id="react-burger-menu-btn"]').click();
    await page.locator('xpath=//*[@id="logout_sidebar_link"]').waitFor({ state: 'visible', timeout: 3000 });
    await page.locator('xpath=//*[@id="logout_sidebar_link"]').click();
    await page.waitForLoadState('networkidle');
    
    // Step 9: Verify back on login page - DUPLICATED CODE
    await expect(page).toHaveURL(/.*\/$/);
  });


  test('should handle invalid login without POM', async ({ page }: { page: Page }) => {
    
    // Step 1: Navigate to login page - DUPLICATED AGAIN
    await page.goto('/');
    
    // Step 2: Fill invalid username - DUPLICATED XPath CODE pattern
    await page.locator('xpath=//input[@id="user-name"]').fill('invalid_user');
    
    // Step 3: Fill invalid password - DUPLICATED XPath CODE pattern
    await page.locator('xpath=//input[@id="password"]').fill('wrong_password');
    
    // Step 4: Click login button - DUPLICATED XPath CODE
    await page.locator('xpath=//input[@id="login-button"]').click();
    
    // Step 5: Verify error message - hardcoded XPath selector and text
    await expect(page.locator('xpath=//*[@data-test="error"]')).toBeVisible({ timeout: 3000 });
    await expect(page.locator('xpath=//*[@data-test="error"]'))
      .toContainText('Username and password do not match');
    
    // Step 6: Verify still on login page
    await expect(page).toHaveURL(/.*\/$/);
  });


  test('should verify complete login workflow with problem_user - step by step', async ({ page }: { page: Page }) => {
    
    // Step 1: Navigate to application URL - Login page is displayed
    await page.goto('/');
    
    // Step 2: Locate username field using XPath - Username field is visible and enabled
    await expect(page.locator('xpath=//*[@id="user-name"]')).toBeVisible();
    await expect(page.locator('xpath=//*[@id="user-name"]')).toBeEnabled();
    
    // Step 3: Enter username in username field - problem_user
    await page.locator('xpath=//*[@id="user-name"]').fill('problem_user');
    
    // Step 4: Locate password field using XPath - Password field is visible and enabled
    await expect(page.locator('xpath=//*[@id="password"]')).toBeVisible();
    await expect(page.locator('xpath=//*[@id="password"]')).toBeEnabled();
    
    // Step 5: Enter password in password field - secret_sauce (masked)
    await page.locator('xpath=//*[@id="password"]').fill('secret_sauce');
    
    // Step 6: Locate and click login button using XPath - Login button is clicked
    await page.locator('xpath=//*[@id="login-button"]').click();
    
    // Step 7: Wait for page to load completely - networkidle
    await page.waitForLoadState('networkidle');
    
    // Step 8: Verify URL contains 'inventory.html' - URL matches expected pattern
    await expect(page).toHaveURL(/inventory\.html/);
    
    // Step 9: Verify Products title is visible - "Products" title is displayed
    await expect(page.locator('xpath=//*[@class="title"]')).toBeVisible();
    
    // Step 10: Verify Products title text - Title text matches exactly
    await expect(page.locator('xpath=//*[@class="title"]')).toHaveText('Products');
    
    // Step 11: Click burger menu button - Sidebar menu opens
    await page.locator('xpath=//*[@id="react-burger-menu-btn"]').click();
    
    // Step 12: Wait for logout link to be visible - Logout link appears within 3 seconds
    await page.locator('xpath=//*[@id="logout_sidebar_link"]').waitFor({ state: 'visible', timeout: 3000 });
    
    // Step 13: Click logout link - Logout is triggered
    await page.locator('xpath=//*[@id="logout_sidebar_link"]').click();
    
    // Step 14: Wait for navigation to complete - Page navigates back to login
    await page.waitForLoadState('networkidle');
    
    // Step 15: Verify URL is login page - URL matches login page pattern
    await expect(page).toHaveURL(/.*\/$/);
  });

});