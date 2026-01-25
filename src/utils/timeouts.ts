/**
 * Timeout Constants
 * 
 * Centralized timeout values for test automation.
 * All values are in milliseconds.
 */

export const TIMEOUTS = {
  /** Standard page load timeout - 30 seconds */
  PAGE_LOAD: 30000,
  
  /** Wait for element to be visible/interactable - 10 seconds */
  ELEMENT_WAIT: 10000,
  
  /** Short wait for quick operations - 5 seconds */
  SHORT_WAIT: 5000,
  
  /** API response timeout - 15 seconds */
  API_TIMEOUT: 15000,
  
  /** Navigation timeout - 20 seconds */
  NAVIGATION: 20000,
} as const;

// Export individual constants for convenience
export const { PAGE_LOAD, ELEMENT_WAIT, SHORT_WAIT, API_TIMEOUT, NAVIGATION } = TIMEOUTS;
