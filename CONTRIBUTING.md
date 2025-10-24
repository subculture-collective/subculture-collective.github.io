# Contributing to Subculture Collective

Thank you for your interest in contributing to Subculture Collective! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Commit Message Conventions](#commit-message-conventions)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors. We expect:

- **Be respectful**: Treat everyone with respect and kindness
- **Be inclusive**: Welcome diverse perspectives and experiences
- **Be constructive**: Provide helpful feedback and criticism
- **Be collaborative**: Work together towards common goals

## Getting Started

### Prerequisites

- Node.js v20 or higher
- npm v10 or higher
- Git

### Initial Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/subculture-collective.github.io.git
   cd subculture-collective.github.io
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/subculture-collective/subculture-collective.github.io.git
   ```
4. **Install dependencies**:
   ```bash
   npm ci
   ```
5. **Start development server**:
   ```bash
   npm run dev
   ```

## Development Workflow

### 1. Create a Feature Branch

Always create a new branch for your work:

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a new feature branch
git checkout -b feature/your-feature-name
# or for bug fixes
git checkout -b fix/bug-description
```

Branch naming conventions:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions or modifications
- `chore/` - Maintenance tasks

### 2. Make Your Changes

- Write clean, maintainable code
- Follow the [Code Style Guidelines](#code-style-guidelines)
- Write/update tests for your changes
- Update documentation as needed

### 3. Test Your Changes

Before committing, ensure all tests pass:

```bash
# Run linting
npm run lint

# Run tests
npm run test:run

# Check formatting
npm run format:check

# Build the project
npm run build
```

### 4. Commit Your Changes

Follow the [Commit Message Conventions](#commit-message-conventions):

```bash
git add .
git commit -m "feat: add new feature"
```

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub following the [Pull Request Process](#pull-request-process).

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Define types/interfaces for component props
- Avoid `any` type - use `unknown` if needed
- Use type inference where possible

```typescript
// Good
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

// Bad
function Button(props: any) { ... }
```

### React Components

- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use proper prop destructuring

```tsx
// Good
export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {label}
    </button>
  )
}

// Bad
export function Button(props) {
  return <button className={props.className}>{props.children}</button>
}
```

### Styling

- Use TailwindCSS utility classes
- Follow the custom theme in `tailwind.config.js`
- Keep inline styles to a minimum
- Use responsive utilities for mobile-first design

```tsx
// Good
<div className="bg-cyber-black text-neon-cyan p-4 hover:bg-deep-gray transition-colors">
  Content
</div>

// Avoid excessive custom styles
<div style={{ backgroundColor: '#000', padding: '1rem' }}>
  Content
</div>
```

### File Organization

- One component per file
- Co-locate related files (tests, styles)
- Use index files for cleaner imports
- Keep file names consistent with component names

```
components/
  Button/
    Button.tsx
    Button.test.tsx
    index.ts
```

### Imports

- Group imports logically
- Use absolute imports with `@/` prefix
- Sort imports alphabetically within groups

```typescript
// External dependencies
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Internal components
import { Button } from '@/components/ui'
import { Header } from '@/components/layout'

// Utilities and types
import { cn } from '@/lib/utils'
import type { PageProps } from '@/types'
```

## Commit Message Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, no logic change)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `perf` - Performance improvements
- `ci` - CI/CD changes

### Examples

```bash
feat(blog): add MDX support for blog posts

fix(nav): resolve mobile menu closing issue

docs(readme): update installation instructions

style(components): format code with prettier

test(hooks): add tests for useMediaQuery hook

chore(deps): update dependencies
```

### Best Practices

- Use present tense ("add" not "added")
- Keep the description concise (< 72 characters)
- Reference issues in the footer: `Fixes #123`
- Break down large changes into smaller commits

## Pull Request Process

### Before Submitting

1. **Update from upstream**:

   ```bash
   git checkout main
   git pull upstream main
   git checkout your-branch
   git rebase main
   ```

2. **Run all checks**:

   ```bash
   npm run lint
   npm run test:run
   npm run format:check
   npm run build
   ```

3. **Update documentation** if needed

### Creating the Pull Request

1. Push your branch to your fork
2. Open a pull request against `main`
3. Fill out the PR template completely
4. Link related issues
5. Add appropriate labels

### PR Title Format

Follow commit message conventions:

```
feat: add dark mode toggle
fix: resolve navigation bug on mobile
docs: update contributing guide
```

### Description Guidelines

- Clearly describe what changes were made and why
- Include screenshots for UI changes
- List any breaking changes
- Mention any dependencies or related PRs

### Review Process

- All PRs require at least one approval
- Address review feedback promptly
- Keep discussions focused and professional
- CI checks must pass before merging

### After Approval

- Maintainers will merge your PR
- Delete your feature branch after merge
- Update your local main branch:
  ```bash
  git checkout main
  git pull upstream main
  ```

## Issue Reporting

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Check documentation** for solutions
3. **Verify the bug** is reproducible

### Bug Reports

Use the bug report template and include:

- **Description**: Clear description of the issue
- **Steps to reproduce**: Detailed steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: OS, browser, Node version
- **Screenshots**: If applicable
- **Additional context**: Logs, error messages

### Feature Requests

Use the feature request template and include:

- **Problem statement**: What problem does this solve?
- **Proposed solution**: How should it work?
- **Alternatives**: Other approaches considered
- **Additional context**: Examples, mockups

### Questions

- Use [GitHub Discussions](https://github.com/subculture-collective/subculture-collective.github.io/discussions) for questions
- Check existing documentation first
- Provide context and what you've tried

## Testing Guidelines

### Writing Tests

- Write tests for all new features
- Update tests when modifying existing code
- Aim for high coverage (>90%)
- Test edge cases and error scenarios

### Test Structure

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" onClick={() => {}} />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button label="Click" onClick={handleClick} />)
    screen.getByText('Click').click()
    expect(handleClick).toHaveBeenCalledOnce()
  })
})
```

### Running Tests

```bash
# Watch mode (during development)
npm run test

# Run once (before committing)
npm run test:run

# With coverage
npm run test:coverage

# With UI
npm run test:ui
```

See [TESTING.md](./TESTING.md) for detailed testing documentation.

## Documentation

### When to Update Documentation

- Adding new features
- Changing existing functionality
- Fixing bugs that affect documented behavior
- Adding new components or utilities

### Documentation Files

- `README.md` - Project overview and quick start
- `CONTRIBUTING.md` - This file
- `docs/` - Detailed documentation
- Component comments - JSDoc for components
- Inline comments - For complex logic

### Writing Documentation

- **Be clear and concise**
- **Use examples** where helpful
- **Keep it updated** with code changes
- **Use proper formatting** (Markdown)
- **Include code samples** when relevant

### Documentation Style

```markdown
# Component Name

Brief description of what it does.

## Usage

\`\`\`tsx
import { ComponentName } from '@/components/ui'

<ComponentName prop="value" />
\`\`\`

## Props

| Prop  | Type   | Default | Description |
| ----- | ------ | ------- | ----------- |
| prop1 | string | -       | Description |

## Examples

### Basic Example

\`\`\`tsx
<ComponentName prop="value" />
\`\`\`
```

## Questions or Need Help?

- **Documentation**: Check the [docs/](./docs/) directory
- **Discussions**: Use [GitHub Discussions](https://github.com/subculture-collective/subculture-collective.github.io/discussions)
- **Issues**: Report bugs or request features
- **Pull Requests**: Review others' contributions

---

Thank you for contributing to Subculture Collective! 💜
