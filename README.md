# WebAutomation

A reusable **Playwright + TypeScript** automation framework featuring Page Object Model, typed fixtures, independent UI/API tests, cross-browser projects, configurable environments and test evidence.

## Quick start

Requires Node.js 22+ and npm.

```bash
npm install
npx playwright install
npm test
```

Optionally copy `.env.example` to `.env` (PowerShell: `Copy-Item .env.example .env`) to override public demo URLs. The sample UI uses [Playwright TodoMVC](https://demo.playwright.dev/todomvc/) and API tests use [JSONPlaceholder](https://jsonplaceholder.typicode.com/), without requiring credentials.

## Running the tests

Playwright runs browser tests **headlessly by default**. Use `--headed` to display real browser windows, or `--ui` to open Playwright's interactive test runner. API tests do not open a browser.

| Mode | Command | Description |
| --- | --- | --- |
| All tests (headless) | `npm test` | UI tests in Chromium, Firefox and WebKit, plus API tests |
| UI tests (headless) | `npm run test:ui` | All browser UI tests without visible windows |
| UI tests (headed) | `npm run test:headed` | Browser UI tests with visible browser windows |
| Interactive UI runner | `npm run test:ui -- --ui` | Playwright Test UI to select, run and inspect UI tests |
| API tests only | `npm run test:api` | API happy-path and negative tests |
| Smoke suite | `npm run test:smoke` | Tests tagged `@smoke` |
| Regression suite | `npm run test:regression` | Tests tagged `@regression` |
| Chromium only | `npm test -- --project=chromium` | UI tests in Chromium |
| Firefox only | `npm test -- --project=firefox` | UI tests in Firefox |
| WebKit only | `npm test -- --project=webkit` | UI tests in WebKit |
| Single spec | `npx playwright test tests/ui/todo.spec.ts` | Run one UI test file |
| Debugger | `npm run test:debug` | Step through tests with Playwright Inspector |
| HTML report | `npm run report` | Open the last HTML report |

### Common examples

```bash
# Run everything headlessly (default)
npm test

# Headless UI tests in Chromium only
npm run test:ui -- --project=chromium

# Display browser windows (all UI browser projects)
npm run test:headed

# Open Playwright's interactive testing UI
npm run test:ui -- --ui

# Headless smoke tests in Chromium
npm run test:smoke -- --project=chromium

# Run API tests without browsers
npm run test:api

# View the HTML report after test execution
npm run report
```

**Note:** `--headed` shows the tested browser; `--ui` opens Playwright's interactive test runner. They are different execution modes. If running on a server without a desktop, use headless mode.

### Maintenance commands

| Command | Purpose |
| --- | --- |
| `npm run typecheck` | Strict TypeScript validation |
| `npm run format` | Format repository |
| `npm run format:check` | Check formatting |

## Design

```text
.env -> src/config/env.ts -> playwright.config.ts
                                 |
               +-----------------+----------------+
               |                                  |
       src/fixtures/test.fixture.ts       src/api/posts.client.ts
               |                                  |
        src/pages/todo.page.ts            tests/api/posts.spec.ts
               |
         tests/ui/todo.spec.ts
               |
         tests/data/todos.ts
```

Each UI test receives an isolated browser context. Fixtures supply page objects, page objects encapsulate selectors, and tests express business scenarios rather than mechanics. Configuration provides overrideable UI/API endpoints; no secrets are committed. Retained-on-failure traces, videos and screenshots, plus JUnit and HTML reports, support troubleshooting.

`tests/ui/todo.spec.ts` demonstrates create/complete and create/delete workflows. `tests/api/posts.spec.ts` demonstrates typed client usage and a missing-resource check.

To extend for your own application, add page objects or API clients, replace demo specs, and configure new application URLs via environment variables. Avoid arbitrary waits and share application authentication via fixtures/storage state when needed.

**Execution:** Cloning this repository does not require GitHub Actions or the original maintainer's account. Run tests locally using the commands above. These are live integration examples; availability/behavior of the public demo services is outside this repository's control.
