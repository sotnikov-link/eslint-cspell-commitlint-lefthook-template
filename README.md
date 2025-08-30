# ESLint + cSpell + Commitlint + Lefthook Template

A template for quick project startup with configured code quality tools and
automated testing.

## 📦 Installation and Usage

### 🧩 Customization

- Remove anything you don't need (packages, rules, scripts, docs)
- Use AI to speed up onboarding and edits:
  - **Cursor AI / Continue.dev** — code understanding, refactors, quick edits
  - **MCP Context7 + BrowserMCP** — fetch up-to-date docs and examples

### Quick Start

```bash
# Enable Corepack
corepack enable

# Clone repository
git clone <repository-url>
cd eslint-cspell-commitlint-lefthook-template

# Install dependencies
yarn install

# Install Git hooks
yarn lefthook install
```

### Testing Template Projects

#### Automated Testing via Lefthook

```bash
# Full CI testing (including builds)
yarn lefthook run ci
```

#### Manual Testing

```bash
# Code quality checks
yarn check-eslint-all
yarn check-prettier-all
yarn check-cspell-all
yarn test

# Build projects
yarn workspace @some-name/trpc-service build
yarn workspace @some-name/vite-mantine build

# Run in development mode
yarn workspace @some-name/trpc-service start
yarn workspace @some-name/vite-mantine dev
```

## 🚀 Features

### Code Quality Tools

- **ESLint** — JavaScript/TypeScript linting with custom rules
- **Prettier** — automatic code formatting
- **cSpell** — spell checking in comments
- **Commitlint** — commit message validation
- **Lefthook** — Git hooks management and automation

### Flat ESLint Config

- Uses the modern
  [Flat ESLint](https://eslint.org/docs/latest/extend/plugin-migration-flat-config)
  configuration format
- Based on
  [eslint-canonical-config](https://github.com/gajus/eslint-config-canonical)

### Project Structure

- **Yarn Workspaces** — monorepo with multiple packages
- **Corepack** — package manager version management
  - https://yarnpkg.com/corepack
  - https://yarnpkg.com/blog/release/4.0
  - https://nodejs.org/api/corepack.html
- **TypeScript** — strict typing across all packages

### Template Projects

- **`@some-name/trpc-service`** — tRPC backend service
- **`@some-name/vite-mantine`** — React frontend with Vite + Mantine
- **`@some-name/tsconfig`** — shared TypeScript configuration

## 🛠️ Custom ESLint Rules

### Empty Lines Formatting

Automatic empty lines management for better code readability.

### React Components

#### Props Interfaces

Automatic replacement of `type` with `interface` for React Props.

<!-- eslint-disable import/no-extraneous-dependencies -->
<!-- eslint-disable @typescript-eslint/consistent-type-imports -->
<!-- eslint-disable n/no-extraneous-import -->
<!-- eslint-disable perfectionist/sort-intersection-types -->

```tsx
import { ComponentPropsWithRef } from 'react';

// Bad example
export type BadInputProps = ComponentPropsWithRef<'input'> & {
  type: number; // no error and <input /> gets an invalid property 👎
};
```

```tsx
// Good example
export interface GoodInputProps extends ComponentPropsWithRef<'input'> {
  type: number; // TypeScript error 👍
}
```

#### Display Name

Automatic addition of `displayName` for React DevTools
([docs](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md)).

```ts
// you write only
YourComponent.displayName = '';
```

```ts
// after auto-fix
YourComponent.displayName = 'YourComponent';
```

### JSDoc Rules

Rules for correct JSDoc comment formatting.

The project uses a hybrid approach combining `@stylistic/eslint-plugin` rules
with custom JSDoc rules:

- **@stylistic/spaced-comment** — handles general comment spacing with balanced
  blocks
- **Custom JSDoc rules** — handle JSDoc-specific formatting requirements

**@stylistic Rule Examples:**

#### @stylistic/spaced-comment

Handles general comment spacing with balanced blocks.

<!-- eslint-disable @stylistic/spaced-comment -->

```javascript
// ❌ Incorrect
//This is a comment
/*This is a comment*/
```

```javascript
// ✅ Correct
// This is a comment
/* This is a comment */
```

**JSDoc Rule Examples:**

#### jsdoc-space-after-asterisk

Ensures space after `*` in JSDoc lines.

<!-- prettier-ignore-start -->
<!-- eslint-disable jsdoc/check-alignment, custom/jsdoc-space-after-asterisk -->

```javascript
// ❌ Incorrect
/**
*Example Content
*/
```

<!-- prettier-ignore-end -->

```javascript
// ✅ Correct
/**
 * Example Content
 */
```

#### jsdoc-multiple-empty-lines

Prevents multiple empty lines within JSDoc blocks.

<!-- eslint-disable custom/jsdoc-multiple-empty-lines -->

```javascript
// ❌ Incorrect
/**
 * Example Content
 *
 *
 * More content
 */
```

```javascript
// ✅ Correct
/**
 * Example Content
 *
 * More content
 */
```

#### jsdoc-empty-line-before

Requires empty line before JSDoc comments.

<!-- eslint-disable custom/jsdoc-empty-line-before -->

```javascript
// ❌ Incorrect
export const before = 1;
/**
 * Example Content
 */
export const after = 1;
```

```javascript
// ✅ Correct
export const before = 1;

/**
 * Example Content
 */
export const after = 1;
```

#### jsdoc-no-empty-start

Prevents empty lines at JSDoc start.

<!-- eslint-disable custom/jsdoc-no-empty-start -->

```javascript
// ❌ Incorrect
/**
 *
 * Example Content
 */
export const after = 1;
```

```javascript
// ✅ Correct
/**
 * Example Content
 */
export const after = 1;
```

#### jsdoc-empty-line-after

Requires not empty line after JSDoc comments.

<!-- eslint-disable custom/jsdoc-empty-line-after -->

```javascript
// ❌ Incorrect
/**
 * Example Content
 */

export const after = 1;
```

```javascript
// ✅ Correct
/**
 * Example Content
 */
export const after = 1;
```

#### jsdoc-no-empty-end

Prevents empty lines at JSDoc end.

<!-- eslint-disable custom/jsdoc-no-empty-end -->

```javascript
// ❌ Incorrect
/**
 * Example Content
 *
 */
export const after = 1;
```

```javascript
// ✅ Correct
/**
 * Example Content
 */
export const after = 1;
```

#### jsdoc-multiline

Enforces block comment format for JSDoc.

<!-- eslint-disable jsdoc/multiline-blocks, custom/jsdoc-multiline -->

```javascript
// ❌ Incorrect
/** Example Content */
export const after = 1;
```

```javascript
// ✅ Correct
/**
 * Example Content
 */
export const after = 1;
```

**Why Hybrid Approach:**

- `@stylistic` rules provide general code formatting
- Custom rules handle JSDoc-specific syntax and context requirements
- Ensures comprehensive formatting coverage for both code and JSDoc

## 🔧 Recommended Tools

### Backend

- **[tsx](https://www.npmjs.com/package/tsx)** — easiest way to run TypeScript
  in Node.js
- **[pkgroll](https://www.npmjs.com/package/pkgroll)** — the zero-config package
  bundler used by tsx!
- **[tRPC](https://www.npmjs.com/package/@trpc/server)** — end-to-end typesafe
  APIs

### Frontend

- **[Vite](https://www.npmjs.com/package/vite)** — next generation frontend
  tooling
- **[Next.js](https://www.npmjs.com/package/next)** — The React Framework for
  the Web
- **[Mantine](https://mantine.dev/)** — React UI library
- **[Vanilla Extract](https://www.npmjs.com/package/@vanilla-extract/css)** —
  CSS-in-TypeScript

### Testing

- **[Vitest](https://www.npmjs.com/package/vitest)** — fast testing framework

## 📁 Project Structure

```
├── eslint/               # Custom ESLint rules
│   ├── empty-lines/      # Empty lines rules
│   ├── jsdoc/            # JSDoc rules
│   └── react/            # React rules
├── packages/             # Template projects
│   ├── trpc-service/     # tRPC backend
│   ├── vite-mantine/     # React frontend
│   └── tsconfig/         # Shared TS config
├── tests/                # ESLint rule tests
├── lefthook.yml          # Git hooks configuration
├── eslint.config.js      # ESLint configuration
└── commitlint.config.ts  # Commitlint configuration
```

## 🤝 Development

### Adding New ESLint Rules

1. Create rule in `eslint/`
2. Add tests in `tests/`
3. Update `eslint.config.js`

### Adding New Packages

1. Create folder in `packages/`
2. Add `package.json` with correct name
3. Update tests in lefthook

### Git Hooks

Project uses Lefthook for automation:

- **pre-commit** — linting and formatting
- **commit-msg** — commit message validation
- **ci** — full testing for CI/CD
