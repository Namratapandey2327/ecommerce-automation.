# E-commerce Automation Framework

A professional, beginner-friendly test automation framework built using **Playwright** and **TypeScript**. This project demonstrates industry-standard best practices, including the **Page Object Model (POM)** design pattern, custom **Playwright Fixtures**, and **externalized test data** to automate the end-to-end checkout flow on the [Sauce Demo](https://www.saucedemo.com) e-commerce website.

---

## 🏗️ Framework Architecture

This framework is structured to keep tests clean, maintainable, and readable. It separates page interactions, test data, configuration, and test scenarios into distinct directories:

*   **Page Object Model (POM)**: Encapuslates UI elements and interactions within dedicated page classes (`/pages`) to avoid hardcoded selectors and duplicate logic.
*   **Custom Fixtures**: Uses a custom test fixture (`/fixtures`) to automatically instantiate page objects for each test. This eliminates repetitive setup boilerplate (like `new LoginPage(page)`) inside the test files.
*   **Externalized Test Data**: Centralizes credentials, product names, and checkout details (`/test-data`) to facilitate easy updates without modifying test logic.

---

## 📁 Directory Structure

```text
ecommerce-automation/
├── .gitignore                # Git ignore configuration
├── fixtures/
│   └── testFixture.ts        # Custom Playwright fixture to inject Page Objects
├── pages/
│   ├── BasePage.ts           # Common base class for shared page logic
│   ├── LoginPage.ts          # Page Object for the login portal
│   ├── ProductsPage.ts       # Page Object for the product listing screen
│   ├── CartPage.ts           # Page Object for the shopping cart
│   └── CheckoutPage.ts       # Page Object for the multi-step checkout workflow
├── test-data/
│   ├── checkoutData.ts       # Test data for credentials, products, and checkout forms
│   └── loginData.ts          # Test data for valid, invalid, and locked-out user scenarios
├── tests/
│   ├── checkout.spec.ts      # End-to-end checkout test specifications
│   └── login.spec.ts         # Login positive, negative, and edge test scenarios
├── playwright.config.ts      # Global Playwright settings and browser configurations
├── tsconfig.json             # TypeScript compiler options
└── package.json              # Project dependencies and script commands
```

---

## 📄 File-by-File Breakdown

### 🛠️ Configuration & Environment

#### 1. [`package.json`](./package.json)
*   **Purpose**: Manages the project's dependencies, metadata, and execution scripts.
*   **Key Scripts**:
    *   `npm test`: Runs the test suite in headless mode.
    *   `npm run test:headed`: Runs the tests with a visible browser (headed mode) for debugging.
    *   `npm run show-report`: Opens the interactive HTML test execution report.

#### 2. [`playwright.config.ts`](./playwright.config.ts)
*   **Purpose**: Configures the global Playwright test runner settings.
*   **Key Settings**:
    *   Specifies `./tests` as the test directory.
    *   Enables parallel execution (`fullyParallel: true`) for speed.
    *   Configures HTML reporting.
    *   Specifies screenshot capture on failure (`screenshot: 'only-on-failure'`).
    *   Defines the browser project (Chromium/Desktop Chrome) for execution.

#### 3. [`tsconfig.json`](./tsconfig.json)
*   **Purpose**: Configures compiler options for TypeScript, ensuring strict type-checking, ES2022 compatibility, and proper module resolution.

---

### 🧱 Page Objects (`/pages`)

All page classes inherit from a base page class and expose clean locators and action methods for interacting with specific pages.

#### 4. [`pages/BasePage.ts`](./pages/BasePage.ts)
*   **Purpose**: The base class for all Page Objects.
*   **Details**: Initializes the Playwright `Page` context and contains helper methods shared across multiple pages (e.g., getting the current URL or page title).

#### 5. [`pages/LoginPage.ts`](./pages/LoginPage.ts)
*   **Purpose**: Handles interactions on the Login screen.
*   **Details**: Declares locators for the username input, password input, login button, and error alerts. Exposes a helper `login(username, password)` method to perform full logins and exposes getters for input elements to enable attribute assertions.

#### 6. [`pages/ProductsPage.ts`](./pages/ProductsPage.ts)
*   **Purpose**: Handles interactions on the main Inventory/Products catalog screen.
*   **Details**: Provides locators for the page header and shopping cart icon. Includes a dynamic `addItemToCart(itemName)` method that locates a product by text, filters its container, and clicks the corresponding "Add to cart" button. It also provides locators and methods for logging out of the session.

#### 7. [`pages/CartPage.ts`](./pages/CartPage.ts)
*   **Purpose**: Handles interactions on the Shopping Cart screen.
*   **Details**: Provides locators for checking items in the cart and initiating checkout. Exposes a `getCartItemName(itemName)` method to verify that the added product name is correctly displayed.

#### 8. [`pages/CheckoutPage.ts`](./pages/CheckoutPage.ts)
*   **Purpose**: Consolidates the multi-step checkout sequence.
*   **Details**: Captures the customer details form fields (First Name, Last Name, Postal Code), the order summary "Finish" action, and the final order confirmation header. Bundling these steps into one class simplifies the Page Object directory for readability.

---

### 🧩 Custom Fixtures (`/fixtures`)

#### 9. [`fixtures/testFixture.ts`](./fixtures/testFixture.ts)
*   **Purpose**: Extends the default Playwright test runner to register custom fixtures.
*   **Details**: Automatically instantiates all Page Objects (`loginPage`, `productsPage`, `cartPage`, `checkoutPage`) and injects them directly into the tests. This avoids manual object creation inside test blocks.

---

### 💾 Test Data (`/test-data`)

#### 10. [`test-data/checkoutData.ts`](./test-data/checkoutData.ts)
*   **Purpose**: Stores checkout test inputs in a structured TypeScript constant.
*   **Details**: Contains mock credentials, item titles, and customer details, keeping the actual test script code clean and configurable.

#### 11. [`test-data/loginData.ts`](./test-data/loginData.ts)
*   **Purpose**: Stores login test credentials, invalid details, and expected validation/error messages.
*   **Details**: Centralizes authentication test data to allow testing validation messages, field security masking, and placeholders.

---

### 🧪 Test Specifications (`/tests`)

#### 12. [`tests/checkout.spec.ts`](./tests/checkout.spec.ts)
*   **Purpose**: End-to-end checkout test specifications.
*   **Details**: Imports the custom test fixture and test data. Uses `test.step` blocks to organize actions into logical phases (Navigate, Log in, Add to cart, Verify item, Complete checkout info, Confirm order, and Verify success confirmation) for enhanced readability and clear reporting logs.

#### 13. [`tests/login.spec.ts`](./tests/login.spec.ts)
*   **Purpose**: Test suite covering positive, negative, and other (placeholders, masking, logout redirects) test cases for the login form.
*   **Details**: Employs data-driven and scenario-based tests to exhaustively cover login validations.

---

## 🚀 Getting Started

Follow these steps to run the automation test suite locally:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher is recommended).

### 2. Install Dependencies
Clone the repository, navigate to the folder, and run:
```bash
npm install
```

### 3. Install Playwright Browsers
Download the required browser binaries:
```bash
npx playwright install
```

### 4. Run the Tests
Choose one of the following commands:
*   **Run all tests (Headless)**:
    ```bash
    npm test
    ```
*   **Run tests in Headed mode**:
    ```bash
    npm run test:headed
    ```

### 5. View Test Report
To see a breakdown of the steps, screenshots, or logs, open the HTML report:
```bash
npm run show-report
```

---

## ✨ Key Highlights & Best Practices
*   **No Hardcoded Selectors in Tests**: All elements are located using Page Objects.
*   **No Explicit Waits**: Uses Playwright's auto-waiting features under the hood.
*   **Step-by-Step Reporting**: Uses `test.step()` to generate detailed test execution reports.
*   **Clean Assertions**: Employs Playwright's web-first assertions (e.g., `expect(locator).toBeVisible()`).
