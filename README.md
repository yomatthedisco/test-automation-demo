# Test Automation Demo

A simple yet comprehensive Playwright test automation project demonstrating the **Page Object Model (POM)** pattern with TypeScript. This project is designed for educational purposes and showcases best practices in test automation.

## 🎯 Project Overview

This project demonstrates automated testing of a login workflow using:
- **Playwright** - Modern end-to-end testing framework
- **TypeScript** - Type-safe test development
- **Page Object Model** - Maintainable and reusable test architecture
- **Environment Variables** - Secure credential management

## ⚡ Quick Start

Get started with just 3 commands:

```bash
npm run setup                        # Install all dependencies and browsers
copy config\.env.example config\.env  # Setup environment variables
npm test                             # Run tests
```

## 📁 Project Structure

```
test-automation-demo/
├── config/                 # Configuration files
│   ├── .env                # Environment variables (gitignored)
│   └── .env.example        # Environment template
├── src/
│   ├── pages/              # Page Object Model classes
│   │   └── LoginPage.ts    # Login page interactions
│   ├── utils/              # Utility functions
│   │   ├── timeouts.ts     # Timeout constants
│   │   └── credentialsHelper.ts  # Credential management
│   └── data/               # Test data
│       └── testData.ts     # Test user data and constants
├── tests/                  # Test specifications
│   └── login.spec.ts       # Login test scenarios
├── .gitignore              # Git ignore rules
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies
└── README.md               # This file
```

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation Steps

1. **Clone the repository** (or navigate to the project folder):
   ```bash
   cd test-automation-demo
   ```

2. **Install all dependencies and Playwright browsers** (one command):
   ```bash
   npm run setup
   ```

3. **Setup environment variables**:
   - Copy `config/.env.example` to `config/.env`:
     ```bash
     copy config\.env.example config\.env
     ```
   - The `.env` file is already configured with Sauce Demo test credentials

#### Alternative: Step-by-Step Installation
If you prefer to install dependencies separately:
```bash
npm install                              # Install npm packages
npx playwright install --with-deps       # Install Playwright browsers
```

## 🧪 Running Tests

### Run all tests (headless mode):
```bash
npm test
```

### Run tests in headed mode (see browser):
```bash
npm run test:headed
```

### Run tests in debug mode:
```bash
npm run test:debug
```

### Run tests with UI mode (interactive):
```bash
npm run test:ui
```

### View test report:
```bash
npm run report
```

## 📚 Test Scenarios

### Login Test (`tests/login.spec.ts`)
**Scenario: Successful Login, Dashboard Verification, and Logout**

This test validates the complete authentication flow:
1. ✅ Navigate to login page
2. ✅ Enter valid credentials
3. ✅ Submit login form
4. ✅ Verify redirect to dashboard
5. ✅ Verify dashboard content
6. ✅ Logout from application
7. ✅ Verify redirect back to login page

## 🏗️ Page Object Model Pattern

### What is POM?
The Page Object Model is a design pattern that:
- Creates an object repository for web elements
- Reduces code duplication
- Improves test maintenance
- Enhances code readability

### Example: LoginPage Class
```typescript
export class LoginPage {
  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  
  // Methods
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

## 🔧 Configuration

### Path Aliases
The project uses TypeScript path aliases for clean imports:
- `@pages/*` → `src/pages/*`
- `@utils/*` → `src/utils/*`
- `@data/*` → `src/data/*`

Example:
```typescript
import { LoginPage } from '@pages/LoginPage';
import { testUser } from '@data/testData';
```

### Playwright Config Highlights
- **Browser**: Chromium (Desktop Chrome)
- **Base URL**: Configured via environment variable
- **Screenshots**: Captured on failure
- **Reports**: HTML report generated after test run
- **Retries**: 0 locally, 2 in CI

## 📖 Key Concepts

### 1. Page Object Model
- Encapsulates page interactions in classes
- Separates test logic from page structure
- See `src/pages/LoginPage.ts`

### 2. Test Organization
- Uses `test.step()` for better test structure
- Clear test descriptions
- See `tests/login.spec.ts`

### 3. Environment Variables
- Credentials stored in `config/.env` file
- Supports multiple environments (dev, staging, prod)
- Accessed via `credentialsHelper`
- Never committed to version control

### 4. Type Safety
- Full TypeScript support
- Strict mode enabled
- Better IDE autocomplete and error detection

## 🎓 Learning Points

This project demonstrates:
- ✅ Page Object Model implementation
- ✅ TypeScript with Playwright
- ✅ Environment variable management
- ✅ Test organization with test.step()
- ✅ Centralized test data management
- ✅ Reusable utility functions
- ✅ Proper project structure

## 🔍 Troubleshooting

### Tests fail with "credentials not found"
- Ensure `config/.env` file exists (copy from `config/.env.example`)
- Verify `TEST_USERNAME` and `TEST_PASSWORD` are set

### Playwright browsers not installed
```bash
npx playwright install
```

### TypeScript path aliases not resolving
- Check `tsconfig.json` paths configuration
- Restart your IDE/editor

## 📝 Best Practices Demonstrated

1. **Separation of Concerns**: Tests, page objects, and data are separated
2. **DRY Principle**: Reusable methods in page objects
3. **Type Safety**: TypeScript for better code quality
4. **Clear Naming**: Descriptive variable and method names
5. **Comments**: Well-documented code for learning
6. **Version Control**: Proper `.gitignore` configuration

## 🤝 Contributing

This is an educational project. Feel free to:
- Add more test scenarios
- Implement additional page objects
- Enhance utilities
- Improve documentation