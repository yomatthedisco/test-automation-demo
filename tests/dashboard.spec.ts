import {Page, test, expect} from '@playwright/test';
import { EXPECTED_TEXT, testUser, URLS } from '../src/data/testData';
import { LoginPage } from '@pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { SortHelper } from '@utils/sortHelper';


/**
 * Dashboard test Suite
 * 
 * Validates login functionality using Page Object Model pattern.
 * Follows AAA (Arrange-Act-Assert) pattern with assertions in tests.
 */


test.describe('Dashboard Functionality', () =>{
    let loginPage: LoginPage;
    let dashboardpage: DashboardPage;
    let sortHelper: SortHelper; 

    /**
     * Before each test setup
     */

    test.beforeEach(async ({page}: {page:Page}) =>{
        loginPage = new LoginPage(page);
        dashboardpage =new DashboardPage(page);
        sortHelper = new SortHelper();
        await loginPage.goto(URLS.LOGIN_PAGE);

        /**
         * Arange - Login to dashboard using 'standard_user 
         * every ach test
         */

        const user = testUser.allUsers[0]; // standard user
        await test.step('Act - perform  login', async () =>{
            await loginPage.login(user.username, user.password);
        });
    });

    /**
     * test case TC-006 - validate dashboard elements and 
     * Assert product count==6; iterate over product cards
     */

    test('View All Products: ', async() => {
        await test.step('Verify all product items and mandatory attributes are displayed.', async() =>{
            const count = await dashboardpage.inventoryItems.count();
            expect(count).toBe(6);

            for (let i = 0; i < count; i++){
            await expect(dashboardpage.inventoryItems.nth(i)).toBeVisible();
            };
            console.log('Assert product count: ',count)
  
        });

    });

    /**
     * test case TC-007 - validate adding single product to cart
     *  and cart badge update
     */
    test('Verify adding single product updates UI and cart', async() => {
         /**
             * Automation NOTE: Badge may hide when 0; check visibility before/after
             * Use expect before/after to validate badge visibility
             */
        await test.step('Confirm cart badge is not visible or is 0', async() =>{
            expect (await dashboardpage.cartBadge).toBeVisible();
            expect (await dashboardpage.cartBadge.count()).toBe(0);   
            await dashboardpage.addProductToCart(0);
            
        });
        await test.step(" Click Add to cart for Sauce Labs Backpack", async() => {
            await expect(dashboardpage.cartBadge).toHaveText('1');
        });

        await test.step('Click cart icon to open cart', async() => {
            await dashboardpage.cart.click();
            await expect(dashboardpage.page).toHaveURL(new RegExp(URLS.CART));
            await expect(dashboardpage.cartItemName).toHaveText('Sauce Labs Backpack');
            expect (await dashboardpage.cartBadge).toBeVisible();
        });


    }); 


    /**
     * test case ID TC - 008 
     * Add Multiple Products to Cart
     */
 
    test('Verify adding multiple items accumulates correctly:', async() => {
        await test.step('add to cart 3 product: ',async() => {
            await dashboardpage.addMultipleProduct(3);

        });
        await test.step('open cart and verify 3 items added: ', async() => {
            await dashboardpage.cart.click();
            await expect(dashboardpage.page).toHaveURL(new RegExp(URLS.CART));
            const cartCount = await dashboardpage.cartBadge.textContent();
            console.log('item Count:', cartCount);
            expect(cartCount).toBe('3');
        });
    });

    /**Test case TC-0011
    * Inventory / Sorting    */
    test('Sort Products by Name (Z-A)', async() => {
        await test.step('Verify alphabetical descending sort.', async() =>{
            await dashboardpage.sortDropdown.selectOption('za');
           await sortHelper.verifySort(dashboardpage.inventoryItems, 'string', 'desc');
        });

    });

    /**Test case TC-0012
    * Inventory / Sorting    */
    test('Sort Products by Price (Low to High)', async() => {
        await test.step('Verify price ascending sort.', async() =>{
            await dashboardpage.sortdropdownSelect('lohi');
           await sortHelper.verifySort(dashboardpage.inventoryItems, 'number', 'asc');
        });

    });
   
    /**Test case TC-0013
     * Inventory / Sorting    */
    test('Sort Products by Price (High to Low)', async() => {
        await test.step('Verify price descending sort.', async() =>{
            await dashboardpage.sortdropdownSelect('hilo');
           await sortHelper.verifySort(dashboardpage.inventoryItems, 'number', 'desc');
        });

    });









});