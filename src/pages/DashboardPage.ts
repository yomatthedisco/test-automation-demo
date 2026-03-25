import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { ELEMENT_WAIT } from '@utils/timeouts';

/**
 * DashboardPage - Page Object Model
 * 
 * Handles all dashboard/inventory page interactions after login.
 * Reusable and dynamic for various dashboard operations.
 * Extends BasePage for common functionality.
 */
export class DashboardPage extends BasePage {
  
  // Dashboard elements
  readonly title: Locator;
  readonly appLogo: Locator;
  readonly hamburgerMenu: Locator;
  readonly logoutLink: Locator;
  readonly inventoryItems: Locator;
  readonly cart: Locator
  readonly cartBadge: Locator;  
  readonly sortDropdown: Locator;


  /**
   * Constructor - Initialize the DashboardPage
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    super(page);
    // this.title = page.locator('.title');
    this.title = page.getByText('Products');
    this.appLogo = page.locator('.app_logo');
    this.hamburgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.inventoryItems = page.locator('.inventory_item');
    this.cart = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');

  }

  /**
   * Open hamburger menu
   */
  async openMenu(): Promise<void> {
    await this.hamburgerMenu.click();
    await this.logoutLink.waitFor({ state: 'visible', timeout: ELEMENT_WAIT });
  }



  

  /**
   * Logout from dashboard
   */
  async logout(): Promise<void> {
    await this.openMenu();
    await this.logoutLink.click();
    await this.waitForNavigation('networkidle');
  }

  /**
   * Check if on dashboard/inventory page
   */
  async isOnDashboard(): Promise<boolean> {
    return this.urlContains('/inventory');
  }


}
