/**
 * Test Data
 * 
 * Centralized test data for automation tests.
 * This file contains test user credentials and other test-related data.
 */

import { getTestCredentials } from '@utils/credentialsHelper';
import { USERS, User } from '@data/testUsers';

/**
 * Test User Credentials
 * Loaded from environment variables via credentialsHelper
 */
export const testUser = {
  // get credentials() {
  //   return getTestCredentials();
  // },

  // get credentials(): User {
  //   return USERS[0];
  // }



  get allUsers(): User[] {
    return USERS;
  }
};

/**
 * Application URLs
 * Note: Base URL is configured in playwright.config.ts
 */
export const URLS = {
  LOGIN_PAGE: '/',
  DASHBOARD: '/inventory.html',
} as const;

/**
 * Expected UI Text/Messages
 */
export const EXPECTED_TEXT = {
  DASHBOARD_TITLE: 'Products',
  DASHBOARD_MESSAGE: 'Swag Labs',
  LOGOUT_SUCCESS: 'Swag Labs',
} as const;
