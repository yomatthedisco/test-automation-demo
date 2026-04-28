import {test as base, expect} from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { DashboardPage } from '@pages/DashboardPage';
import {URLS} from '@data/testData';

type MyFixtures = {
    loginPage: LoginPage
    dashboardPage: DashboardPage
};

export const test = base.extend<MyFixtures>({
    loginPage: async({page}, use) =>{
        const loginPage = new LoginPage(page);
        await loginPage.goto(URLS.LOGIN_PAGE);
        await use(loginPage);
    },

    dashboardPage: async({page}, use) =>{
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    }
});

export {expect};