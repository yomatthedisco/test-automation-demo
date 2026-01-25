/**
 * Credentials Helper
 * 
 * Manages test user credentials from environment variables.
 * This helper provides a centralized way to access test credentials.
 */

export interface UserCredentials {
  username: string;
  password: string;
}

/**
 * Retrieves test user credentials from environment variables
 * 
 * @returns UserCredentials object with username and password
 * @throws Error if required environment variables are not set
 */
export function getTestCredentials(): UserCredentials {
  const username = process.env.TEST_USERNAME;
  const password = process.env.TEST_PASSWORD;

  if (!username || !password) {
    throw new Error(
      'Test credentials not found. Please set TEST_USERNAME and TEST_PASSWORD in .env file'
    );
  }

  return {
    username,
    password,
  };
}

/**
 * Validates if credentials are set in environment
 * 
 * @returns true if credentials are available, false otherwise
 */
export function hasTestCredentials(): boolean {
  return !!(process.env.TEST_USERNAME && process.env.TEST_PASSWORD);
}
