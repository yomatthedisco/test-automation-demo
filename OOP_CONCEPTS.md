# 🎯 Object-Oriented Programming (OOP) in This Framework

## Introduction

This framework demonstrates **Object-Oriented Programming (OOP)** principles to create maintainable, reusable, and scalable test automation code. Understanding these concepts will help you write better tests and extend the framework effectively.

---

## Table of Contents

1. [The Four Pillars of OOP](#1-the-four-pillars-of-oop)
2. [Encapsulation in Action](#2-encapsulation-in-action)
3. [Inheritance in Action](#3-inheritance-in-action)
4. [Polymorphism in Action](#4-polymorphism-in-action)
5. [Abstraction in Action](#5-abstraction-in-action)
6. [SOLID Principles in Our Framework](#6-solid-principles-in-our-framework)
7. [Real-World Examples](#7-real-world-examples)

---

## 1. The Four Pillars of OOP

### Overview
- **Encapsulation** - Bundling data and methods together, hiding implementation details
- **Inheritance** - Creating new classes based on existing ones
- **Polymorphism** - Same interface, different implementations
- **Abstraction** - Hiding complex logic behind simple interfaces

---

## 2. Encapsulation in Action

### What is Encapsulation?
Encapsulation means bundling data (properties) and methods (functions) that work on that data within a single unit (class), and hiding the internal details from the outside world.

### Example from Our Framework: `LoginPage.ts`

```typescript
export class LoginPage extends BasePage {
  // ENCAPSULATED DATA - Private locators hidden from tests
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('#login-button');
  }

  // PUBLIC INTERFACE - Tests only see this simple method
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickSubmit();
    await this.waitForNavigation('networkidle');
  }

  // PRIVATE IMPLEMENTATION - Internal details hidden
  private async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  private async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  private async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }
}
```

### Benefits:
✅ **Tests don't need to know HOW login works** - they just call `login()`  
✅ **If the login flow changes** - update only the LoginPage class  
✅ **Locators are centralized** - change `#user-name` in one place  
✅ **Implementation is hidden** - tests stay clean and readable

### In Tests:
```typescript
// Clean and simple - no knowledge of internal implementation
await loginPage.login('standard_user', 'secret_sauce');

// Instead of messy code in every test:
// await page.locator('#user-name').fill('standard_user');
// await page.locator('#password').fill('secret_sauce');
// await page.locator('#login-button').click();
// await page.waitForLoadState('networkidle');
```

---

## 3. Inheritance in Action

### What is Inheritance?
Inheritance allows a class (child) to inherit properties and methods from another class (parent), promoting code reuse.

### Example: `BasePage` → `LoginPage` → `DashboardPage`

```typescript
// PARENT CLASS - BasePage.ts
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // COMMON METHODS - Available to all child classes
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  getElement(selector: string): Locator {
    return this.page.locator(selector);
  }

  async clickElement(selector: string): Promise<void> {
    await this.page.locator(selector).click();
  }

  getCurrentUrl(): string {
    return this.page.url();
  }

  async isVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }
}

// CHILD CLASS 1 - LoginPage.ts
export class LoginPage extends BasePage {
  // INHERITS: goto(), getElement(), clickElement(), getCurrentUrl(), isVisible()
  // ADDS: login-specific functionality

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;

  constructor(page: Page) {
    super(page);  // Call parent constructor
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
  }

  // LOGIN-SPECIFIC METHOD
  async login(username: string, password: string): Promise<void> {
    // Uses inherited method from BasePage
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickSubmit();
  }
}

// CHILD CLASS 2 - DashboardPage.ts
export class DashboardPage extends BasePage {
  // INHERITS: goto(), getElement(), clickElement(), getCurrentUrl(), isVisible()
  // ADDS: dashboard-specific functionality

  readonly hamburgerMenu: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);  // Call parent constructor
    this.hamburgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  // DASHBOARD-SPECIFIC METHOD
  async logout(): Promise<void> {
    await this.hamburgerMenu.click();
    // Uses inherited waitForElement from BasePage
    await this.waitForElement('#logout_sidebar_link');
    await this.logoutLink.click();
  }
}
```

### Inheritance Hierarchy:

```
                    BasePage
                       |
        ┌──────────────┼──────────────┐
        |                             |
   LoginPage                    DashboardPage
   (inherits all                (inherits all
   BasePage methods)            BasePage methods)
```

### Benefits:
✅ **Write common code once** - DRY principle  
✅ **Consistency** - All pages use same base methods  
✅ **Easier maintenance** - Fix bugs in BasePage, all pages benefit  
✅ **Extensibility** - Add new page objects easily

### In Tests:
```typescript
const loginPage = new LoginPage(page);
const dashboardPage = new DashboardPage(page);

// Both can use inherited methods
await loginPage.goto('/');              // From BasePage
await loginPage.login('user', 'pass');  // From LoginPage

await dashboardPage.getCurrentUrl();    // From BasePage
await dashboardPage.logout();           // From DashboardPage
```

---

## 4. Polymorphism in Action

### What is Polymorphism?
Polymorphism means "many forms" - the ability to use the same method name for different implementations.

### Example: Method Overriding

```typescript
// BasePage - Generic implementation
export class BasePage {
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }
}

// LoginPage - Specialized implementation (if needed)
export class LoginPage extends BasePage {
  // Override parent method with custom behavior
  async goto(url: string = '/'): Promise<void> {
    await super.goto(url);  // Call parent implementation
    // Add login page-specific logic
    await this.usernameInput.waitFor({ state: 'visible' });
  }
}

// DashboardPage - Another specialized implementation
export class DashboardPage extends BasePage {
  async goto(url: string = '/inventory.html'): Promise<void> {
    await super.goto(url);
    // Add dashboard-specific logic
    await this.title.waitFor({ state: 'visible' });
  }
}
```

### Benefits:
✅ **Same interface, different behavior** - each page can customize  
✅ **Flexibility** - override methods when needed  
✅ **Maintainability** - common logic stays in base class

---

## 5. Abstraction in Action

### What is Abstraction?
Abstraction means hiding complex implementation details and exposing only what's necessary.

### Example: Hiding Complexity in Helper Methods

```typescript
// credentialsHelper.ts - ABSTRACTION
export function getTestCredentials(): UserCredentials {
  // COMPLEX LOGIC HIDDEN from tests
  const username = process.env.TEST_USERNAME;
  const password = process.env.TEST_PASSWORD;

  if (!username || !password) {
    throw new Error('Credentials not found in environment');
  }

  return { username, password };
}

// testData.ts - SIMPLE INTERFACE
export const testUser = {
  get credentials() {
    return getTestCredentials();  // Abstracted away
  },
};

// In tests - SIMPLE USAGE
const { username, password } = testUser.credentials;
// Tests don't know or care HOW credentials are loaded
```

### Another Example: Login Flow Abstraction

```typescript
// LoginPage.ts - Complex login logic abstracted
export class LoginPage extends BasePage {
  // SIMPLE INTERFACE for tests
  async login(username: string, password: string): Promise<void> {
    // COMPLEX IMPLEMENTATION hidden from tests
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickSubmit();
    await this.waitForNavigation('networkidle');
  }
}

// Test - Simple and readable
await loginPage.login(username, password);
// vs manually doing all 4 steps every time
```

### Benefits:
✅ **Reduces complexity** - tests stay simple  
✅ **Easier to understand** - high-level operations  
✅ **Easier to change** - modify implementation without breaking tests

---

## 6. SOLID Principles in Our Framework

### S - Single Responsibility Principle
**"A class should have one, and only one, reason to change"**

```typescript
// ✅ GOOD - Each class has ONE responsibility

// LoginPage - Handles ONLY login page interactions
export class LoginPage extends BasePage {
  async login(username, password) { ... }
}

// DashboardPage - Handles ONLY dashboard interactions
export class DashboardPage extends BasePage {
  async logout() { ... }
}

// credentialsHelper - Handles ONLY credential management
export function getTestCredentials() { ... }
```

### O - Open/Closed Principle
**"Open for extension, closed for modification"**

```typescript
// BasePage is CLOSED for modification (we don't change it often)
// But OPEN for extension (we can extend it)

// Extend BasePage without modifying it
export class ProductPage extends BasePage {
  async addToCart(productName: string) {
    // New functionality without changing BasePage
  }
}
```

### L - Liskov Substitution Principle
**"Child classes should be substitutable for parent classes"**

```typescript
// Any BasePage method should work with LoginPage or DashboardPage
function navigateToPage(page: BasePage, url: string) {
  await page.goto(url);  // Works with ANY class extending BasePage
}

navigateToPage(new LoginPage(page), '/');
navigateToPage(new DashboardPage(page), '/inventory');
```

### I - Interface Segregation Principle
**"Don't force classes to implement interfaces they don't use"**

```typescript
// ✅ GOOD - Small, focused classes
export class LoginPage extends BasePage {
  // Only login-related methods
  async login() { ... }
  async fillUsername() { ... }
  async fillPassword() { ... }
}

// ❌ BAD - Would be a bloated class
// export class MegaPage {
//   async login() { ... }
//   async logout() { ... }
//   async addToCart() { ... }
//   async checkout() { ... }
//   // Too many responsibilities!
// }
```

### D - Dependency Inversion Principle
**"Depend on abstractions, not concretions"**

```typescript
// Classes depend on the Page interface (abstraction)
// Not on specific browser implementations (concretions)

export class LoginPage extends BasePage {
  constructor(page: Page) {  // Page is an interface
    super(page);
    // Works with ANY implementation of Page
  }
}
```

---

## 7. Real-World Examples

### Example 1: Adding a New Page Object

```typescript
// 1. Create new page extending BasePage
export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);  // Inherit all BasePage methods
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
  }

  // Add cart-specific methods
  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.waitForNavigation();
  }
}

// 2. Use in tests
const cartPage = new CartPage(page);
await cartPage.goto('/cart.html');        // From BasePage
const count = await cartPage.getItemCount();  // From CartPage
await cartPage.proceedToCheckout();       // From CartPage
```

### Example 2: Composition Over Inheritance

```typescript
// Sometimes composition is better than inheritance
// Example: Logger utility used BY page objects

export class Logger {
  static log(message: string) {
    console.log(`[${new Date().toISOString()}] ${message}`);
  }
}

export class LoginPage extends BasePage {
  async login(username: string, password: string): Promise<void> {
    Logger.log(`Attempting login for user: ${username}`);
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickSubmit();
    Logger.log('Login completed');
  }
}
```

---

## 💡 Key Takeaways

### OOP in Test Automation:
1. **Encapsulation** keeps tests clean by hiding implementation details
2. **Inheritance** eliminates code duplication across page objects
3. **Polymorphism** allows flexible method overriding when needed
4. **Abstraction** simplifies complex operations into simple interfaces

### Benefits for Your Tests:
- **Maintainable** - Changes in one place
- **Reusable** - Write once, use everywhere
- **Readable** - High-level, business-focused code
- **Scalable** - Easy to add new features

### Think OOP When:
- Creating new page objects → Extend BasePage
- Seeing repeated code → Create a reusable method
- Complex logic → Abstract it into a helper class
- Similar but different behavior → Use polymorphism

---

## 📚 Related Documentation

- [README.md](README.md) - Project setup and quick start
- [BEST_PRACTICES.md](BEST_PRACTICES.md) - Framework design best practices
