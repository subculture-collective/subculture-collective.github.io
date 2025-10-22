# ESLint Configuration Guide

This project uses a comprehensive ESLint configuration to maintain code quality and consistency.

## Installed Plugins

- **eslint-plugin-jsx-a11y** - Accessibility linting for JSX elements
- **eslint-plugin-import** - Import/export best practices
- **eslint-plugin-react-hooks** - React hooks rules
- **eslint-plugin-prettier** - Prettier integration for consistent formatting
- **@typescript-eslint/eslint-plugin** - TypeScript-specific rules

## NPM Scripts

```bash
# Run linting on all files
npm run lint

# Run linting with auto-fix
npm run lint:fix

# Run linting with zero warnings (for CI)
npm run lint:ci
```

## Pre-commit Hooks

This project uses Husky and lint-staged to automatically lint and format code before commits:

- **Husky** - Git hooks manager
- **lint-staged** - Runs linters on staged files only

When you commit code, the pre-commit hook will automatically:

1. Run ESLint with auto-fix on staged `.ts`, `.tsx`, `.js`, `.jsx` files
2. Run Prettier on staged files
3. Only allow the commit if there are no linting errors

## Key Rules

### TypeScript

- `@typescript-eslint/no-explicit-any: warn` - Warns on explicit `any` usage
- `@typescript-eslint/consistent-type-imports: warn` - Prefer type imports
- `@typescript-eslint/no-unused-vars: warn` - Warns on unused variables (prefix with `_` to ignore)

### React

- `react-hooks/rules-of-hooks: error` - Enforces React hooks rules
- `react-hooks/exhaustive-deps: warn` - Warns on missing dependencies in hooks

### Code Quality

- `no-console: warn` - Warns on `console.log` (allows `console.warn` and `console.error`)
- `no-debugger: error` - Prevents `debugger` statements
- `no-var: error` - Use `const` or `let` instead of `var`
- `prefer-const: warn` - Prefer `const` when variables aren't reassigned

### Accessibility

- All rules from `eslint-plugin-jsx-a11y` are enabled to ensure accessible JSX

### Prettier

- Integrated with ESLint for consistent code formatting
- Configuration in `.prettierrc.json`:
  - Single quotes
  - No semicolons
  - 2-space indentation
  - 100 character line width
  - ES5 trailing commas
  - Arrow function parens: avoid

## Ignoring Rules

If you need to disable a rule for a specific line or file:

```typescript
// Disable for next line
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = {}

// Disable for entire file
/* eslint-disable @typescript-eslint/no-explicit-any */
```

## CI Integration

The CI workflow runs `npm run lint:ci` which fails if there are any warnings or errors. Make sure your code passes linting before pushing.

## Troubleshooting

### Pre-commit hook not running

```bash
# Make sure the hook is executable
chmod +x .husky/pre-commit

# Reinstall Husky
npm run prepare
```

### Linting errors preventing commit

```bash
# Run auto-fix to resolve most issues
npm run lint:fix

# Check remaining issues
npm run lint
```
