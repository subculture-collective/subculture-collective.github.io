# Testing Guide

This document provides comprehensive information about the testing infrastructure, best practices, and how to write tests for the Subculture Collective website.

## Table of Contents

- [Overview](#overview)
- [Testing Stack](#testing-stack)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Coverage Requirements](#coverage-requirements)
- [Testing Patterns](#testing-patterns)
- [CI/CD Integration](#cicd-integration)

## Overview

We use a comprehensive testing strategy that includes:

- **Unit Tests**: Testing individual functions and utilities
- **Integration Tests**: Testing component interactions and data flows
- **Coverage Tracking**: Ensuring code quality with coverage metrics

Our testing infrastructure is built on Vitest, a modern, fast testing framework designed for Vite projects.

## Testing Stack

### Core Dependencies

- **Vitest** - Fast unit test framework
- **@testing-library/react** - React component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers for DOM elements
- **@testing-library/user-event** - User interaction simulation
- **jsdom** - DOM implementation for Node.js
- **@vitest/coverage-v8** - Code coverage reporting

### Configuration

Tests are configured in `vitest.config.ts`:

```typescript
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      css: true,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html', 'lcov'],
        thresholds: {
          lines: 80,
          functions: 80,
          branches: 80,
          statements: 80,
        },
      },
    },
  })
)
```

## Running Tests

### Available Commands

```bash
# Run tests in watch mode (for development)
npm run test

# Run tests once (for CI/CD)
npm run test:run

# Run tests with UI (visual test runner)
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Watch Mode

The default `npm run test` command runs tests in watch mode, which:

- Automatically reruns tests when files change
- Shows only affected tests
- Provides interactive filtering

### Coverage Reports

Coverage reports are generated in multiple formats:

- **Text**: Summary in terminal
- **HTML**: Interactive report in `coverage/index.html`
- **LCOV**: For integration with coverage tools
- **JSON**: Machine-readable format

## Writing Tests

### Test File Structure

Tests are colocated with the code they test in `__tests__` directories:

```
src/
  utils/
    __tests__/
      animations.test.ts
      validation.test.ts
  hooks/
    __tests__/
      useContactForm.test.ts
      useImageCycle.test.ts
  components/
    __tests__/
      ComponentName.test.tsx
```

### Basic Test Structure

```typescript
import { describe, it, expect } from 'vitest'

describe('FeatureName', () => {
  describe('specific functionality', () => {
    it('should do something specific', () => {
      // Arrange
      const input = 'test'

      // Act
      const result = functionToTest(input)

      // Assert
      expect(result).toBe('expected')
    })
  })
})
```

### Testing Utilities

**Example: Validation Functions**

```typescript
import { describe, it, expect } from 'vitest'
import { isValidEmail } from '../validation'

describe('isValidEmail', () => {
  it('should validate correct email addresses', () => {
    expect(isValidEmail('test@example.com')).toBe(true)
  })

  it('should reject invalid email addresses', () => {
    expect(isValidEmail('invalid')).toBe(false)
  })
})
```

### Testing React Hooks

**Example: Custom Hook Testing**

```typescript
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useContactForm } from '../useContactForm'

describe('useContactForm', () => {
  it('should initialize with empty form data', () => {
    const { result } = renderHook(() => useContactForm())

    expect(result.current.formData.name).toBe('')
    expect(result.current.errors).toEqual({})
  })

  it('should update form field', () => {
    const { result } = renderHook(() => useContactForm())

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John' },
      } as any)
    })

    expect(result.current.formData.name).toBe('John')
  })
})
```

### Testing React Components

**Example: Component Testing**

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '../Button'

describe('Button', () => {
  it('should render with text', () => {
    render(<Button>Click me</Button>)

    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn()
    const { user } = render(<Button onClick={handleClick}>Click</Button>)

    await user.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledOnce()
  })
})
```

### Mocking

**Mocking Modules**

```typescript
import { vi } from 'vitest'

vi.mock('@/data/seo-config', () => ({
  siteConfig: {
    siteName: 'Test Site',
    siteUrl: 'https://test.com',
  },
}))
```

**Mocking Functions**

```typescript
const mockFn = vi.fn()
mockFn.mockReturnValue('mocked value')
mockFn.mockResolvedValue('async value')
```

**Timers**

```typescript
import { vi, beforeEach, afterEach } from 'vitest'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.restoreAllMocks()
})

it('should do something after delay', () => {
  // Test code
  vi.advanceTimersByTime(1000)
  // Assertions
})
```

## Coverage Requirements

### Thresholds

We maintain the following coverage thresholds:

- **Overall Coverage**: 80% minimum
- **Critical Utilities**: 95% minimum
- **Hooks and Components**: 80% minimum

### Current Coverage

Run `npm run test:coverage` to see current coverage:

```
-------------------|---------|----------|---------|---------|
File               | % Stmts | % Branch | % Funcs | % Lines |
-------------------|---------|----------|---------|---------|
All files          |   93.03 |    93.71 |   90.24 |   93.61 |
 hooks             |   91.22 |       92 |   85.18 |   92.15 |
 utils             |    95.4 |    94.49 |     100 |   95.34 |
-------------------|---------|----------|---------|---------|
```

### Excluded from Coverage

The following are excluded from coverage requirements:

- Test files themselves
- Configuration files
- Type definitions (`.d.ts`)
- Mock data
- Build artifacts

## Testing Patterns

### Arrange-Act-Assert (AAA)

Structure tests using the AAA pattern:

```typescript
it('should calculate total', () => {
  // Arrange: Set up test data
  const items = [{ price: 10 }, { price: 20 }]

  // Act: Execute the function
  const total = calculateTotal(items)

  // Assert: Verify the result
  expect(total).toBe(30)
})
```

### Test Behavior, Not Implementation

Focus on what the code does, not how it does it:

```typescript
// ✅ Good: Tests behavior
it('should display error message for invalid email', () => {
  render(<ContactForm />)
  const input = screen.getByLabelText('Email')

  await user.type(input, 'invalid-email')
  await user.click(screen.getByRole('button', { name: 'Submit' }))

  expect(screen.getByText('Please enter a valid email')).toBeInTheDocument()
})

// ❌ Bad: Tests implementation
it('should set error state to true', () => {
  const { result } = renderHook(() => useForm())
  // ...
  expect(result.current.hasError).toBe(true)
})
```

### Keep Tests Simple

Each test should verify one thing:

```typescript
// ✅ Good: Single responsibility
it('should validate email format', () => {
  expect(isValidEmail('test@example.com')).toBe(true)
})

it('should require @ symbol', () => {
  expect(isValidEmail('testexample.com')).toBe(false)
})

// ❌ Bad: Testing multiple things
it('should validate email', () => {
  expect(isValidEmail('test@example.com')).toBe(true)
  expect(isValidEmail('testexample.com')).toBe(false)
  expect(isValidEmail('')).toBe(false)
  // Too many assertions
})
```

### Use Descriptive Test Names

Test names should clearly describe what is being tested:

```typescript
// ✅ Good: Clear and descriptive
it('should return true for valid email addresses', () => {})
it('should reject emails without @ symbol', () => {})
it('should trim whitespace before validation', () => {})

// ❌ Bad: Vague or unclear
it('works', () => {})
it('test email', () => {})
it('returns something', () => {})
```

## CI/CD Integration

### GitHub Actions Workflow

Tests run automatically on:

- Every push to `main`
- Every pull request
- Manual workflow dispatch

The test workflow (`.github/workflows/test.yml`):

1. Checks out code
2. Installs dependencies
3. Runs all tests
4. Generates coverage report
5. Uploads coverage to Codecov (if configured)
6. Fails if coverage thresholds are not met

### Required Checks

The following must pass before merging:

- ✅ All tests pass
- ✅ Coverage thresholds met (80%)
- ✅ No TypeScript errors
- ✅ ESLint passes
- ✅ Build succeeds

## Best Practices

### DO

- ✅ Write tests for all new features
- ✅ Keep tests simple and focused
- ✅ Use descriptive test names
- ✅ Test edge cases and error conditions
- ✅ Mock external dependencies
- ✅ Clean up after tests (use `afterEach`)
- ✅ Maintain high coverage (80%+)

### DON'T

- ❌ Test implementation details
- ❌ Write flaky tests
- ❌ Skip error cases
- ❌ Leave console errors/warnings
- ❌ Test third-party code
- ❌ Use `any` type in tests
- ❌ Commit commented-out tests

## Debugging Tests

### Running Single Test File

```bash
npm run test path/to/test.test.ts
```

### Running Specific Test

```bash
npm run test -- -t "test name pattern"
```

### Using Test UI

```bash
npm run test:ui
```

Opens an interactive UI for running and debugging tests.

### Debugging in VS Code

Add to `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Tests",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "test"],
  "console": "integratedTerminal"
}
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Getting Help

If you encounter issues with tests:

1. Check this documentation
2. Review existing test files for examples
3. Check Vitest documentation
4. Ask in the team chat
5. Open an issue if you find a bug in the testing infrastructure
