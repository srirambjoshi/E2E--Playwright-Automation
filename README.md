# 🎭 ECommerce E2E Automation

A production-ready end-to-end test automation framework built with **Playwright** and **Node.js**, covering UI automation, API testing, BDD with Cucumber, Page Object Model, network interception, and CI/CD integration with Jenkins.

---

##  Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Core test automation framework |
| Node.js (CommonJS) | Runtime & module system |
| Cucumber + Gherkin (Added layer) | BDD / behaviour-driven testing |
| Page Object Model | Maintainable UI abstraction layer |
| Allure Reports | Rich HTML test reporting |
| Jenkins | CI/CD pipeline execution |

---

##  Project Structure

```
PLAYWRIGHT_PROJECT/
├── features/                        # BDD layer (Cucumber)
│   ├── step_definitions/
│   │   └── steps.js                 # Gherkin step implementations
│   └── Ecommerce.feature            # Feature file for E2E order flow
│
├── pageObjects/                     # Page Object Model classes
│   ├── POManager.js                 # Central POM manager (factory pattern)
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   ├── CartPage.js
│   ├── OrdersReviewPage.js
│   └── OrdersHistoryPage.js
│
├── tests/                           # Playwright test specs
│   ├── UIFunda.spec.js              # Login, UI controls, child window
│   ├── SpcLoc.spec.js               # Playwright special locators
│   ├── Calender.spec.js             # Calendar date picker validation
│   ├── ClientApp.spec.js            # Full E2E order flow (UI login)
│   ├── CleintAppOtherWay.spec.js    # E2E with role-based locators
│   ├── ClientAppPOP.spec.js         # E2E using POM + data-driven testing
│   ├── NetworkTest.spec.js          # API login + network response mocking
│   ├── NetworkTest2.spec.js         # Security test via request interception
│   ├── MoreValidations.spec.js      # Popups, dialogs, hover, iframes
│   ├── WebAPIPart1.spec.js          # Browser storage state (session reuse)
│   └── WebAPIPart2.spec.js          # Storage state across tests
│
├── utils/
│   ├── APIUtils.js                  # Reusable API utility (login + order creation)
│   ├── test-base.js                 # Custom test fixture using test.extend()
│   └── PlaceOrderTestData.json      # (excluded — contains credentials)
│
├── playwright.config1.js            # Playwright configuration
├── .gitignore
└── package.json
```

---

##  Test Features

###  Authentication
- Valid and invalid login validation with error assertion
- Session reuse via browser storage state (`storageState`)
- API-based token injection into `localStorage` to bypass UI login

###  E2E Order Flow
- Product search → Add to cart → Checkout → Payment details → Place order → Order history verification
- Implemented three ways: raw locators, role-based locators, and Page Object Model

###  Page Object Model (POM)
- Centralised `POManager` as a factory to instantiate all page classes
- Promotes reusability and clean test readability
- Data-driven tests using JSON test data with `for...of` loop

###  API Testing
- REST API calls using Playwright's `request` context
- Token retrieval → Order creation → UI verification (hybrid API + UI)
- Encapsulated in reusable `APIUtils` class

###  Network Interception
- Mock API responses using `page.route()` to simulate empty order lists
- Request URL manipulation to test unauthorised order access (security testing)

###  BDD with Cucumber
- Gherkin feature file covering full order placement scenario
- Step definitions wired to POM for clean separation of concerns

###  UI Controls & Advanced Locators
- Dropdowns, radio buttons, checkboxes, attribute assertions
- Playwright special locators: `getByLabel`, `getByRole`, `getByPlaceholder`, `getByText`, `filter()`
- Child window / new tab handling with `Promise.all` and `waitForEvent`
- Calendar date picker with year/month/day navigation and validation
- Hover actions, dialogs (`page.on('dialog')`), iframe locators

###  Framework Features
- Custom fixture using `test.extend()` for shared test data injection
- Allure + HTML dual reporting configured
- Screenshots on all tests, trace on first retry
- Sequential execution (`workers: 1`) for shared test site stability
- Jenkins CI/CD pipeline ready

---

##  Getting Started

### Prerequisites
- Node.js v18+
- Git

### Installation

```bash
git clone https://github.com/<your-username>/ecommerce-e2e-automation.git
cd ecommerce-e2e-automation
npm install
npx playwright install
```

### Configuration

Create a `utils/PlaceOrderTestData.json` file (excluded from repo for security):

```json
[
  {
    "email": "your-email@example.com",
    "password": "your-password",
    "productName": "ZARA COAT 3"
  }
]
```

Create a `utils/test-base.js` with your credentials (excluded from repo):

```js
const base = require('@playwright/test');
exports.customtest = base.test.extend({
  testDataForOrder: {
    email: "your-email@example.com",
    password: "your-password",
    productName: "ZARA COAT 3"
  }
});
```

### Running Tests

```bash
# Run all tests (headed)
npm test

# Run all tests (headless)
npm run regression

# Run a specific spec
npx playwright test tests/ClientAppPOP.spec.js

# Run BDD tests (Cucumber)
npx cucumber-js

# Generate and open Allure report
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---

## 📊 Reporting

- **HTML Report**: Auto-generated at `playwright-report/` after each run
- **Allure Report**: Generated at `allure-results/` → open with Allure CLI

---

## 🔧 Jenkins CI/CD Integrated

This framework is integrated with Jenkins for automated pipeline execution:

- Tests can also be triggered via Jenkins job
- Allure plugin configured for report publishing
- Retries set to 3 on failure (`retries: 3`)

---

##  Application Under Test

[Rahul Shetty Academy Practice Site](https://rahulshettyacademy.com/practice) — an Angular-based e-commerce practice application used to demonstrate real-world automation scenarios.

---

## 👤 Author

**Sriram B Joshi**  
QA Automation Engineer | Playwright  · API Testing · BDD  
[LinkedIn](https://linkedin.com/in/) | [Email]joshisriram@outlook.com
