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
         * pre condtions Login to dashboard using 'standard_user 
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


    test('Sort Products by Name (A-Z)', async() => {
        await test.step('Verify alphabetical ascending sort.', async() =>{
            await dashboardpage.sortDropdown.selectOption('az');
           await sortHelper.verifySort(dashboardpage.inventoryItems, 'string', 'asc');
        });

    });


    test('Sort Products by Name (Z-A)', async() => {
        await test.step('Verify alphabetical descending sort.', async() =>{
            await dashboardpage.sortDropdown.selectOption('za');
           await sortHelper.verifySort(dashboardpage.inventoryItems, 'string', 'desc');
        });

    });


    test('Sort Products by Price (Low to High)', async() => {
        await test.step('Verify price ascending sort.', async() =>{
            await dashboardpage.sortdropdownSelect('lohi');
           await sortHelper.verifySort(dashboardpage.inventoryItems, 'number', 'asc');
        });

    });


    test('Sort Products by Price (High to Low)', async() => {
        await test.step('Verify price descending sort.', async() =>{
            await dashboardpage.sortdropdownSelect('hilo');
           await sortHelper.verifySort(dashboardpage.inventoryItems, 'number', 'desc');
        });

    });









});