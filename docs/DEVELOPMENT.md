# Development Guide

This guide covers local development setup, workflow, tools, and best practices for developing Subculture Collective.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Development Environment](#development-environment)
- [Available Scripts](#available-scripts)
- [Development Workflow](#development-workflow)
- [Code Quality Tools](#code-quality-tools)
- [Debugging](#debugging)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

- **Node.js**: v20.x or higher
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify: `node --version`
- **npm**: v10.x or higher (comes with Node.js)
  - Verify: `npm --version`
- **Git**: Latest version
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify: `git --version`

### Recommended Tools

- **VS Code**: Recommended IDE
  - Install from [code.visualstudio.com](https://code.visualstudio.com/)
- **VS Code Extensions** (see `.vscode/extensions.json`):
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - MDX

### Optional Tools

- **React Developer Tools**: Browser extension for debugging React
- **GitHub CLI**: `gh` command-line tool
- **Postman**: For API testing (future)

## Initial Setup

### 1. Clone the Repository

```bash
# Clone via HTTPS
git clone https://github.com/subculture-collective/subculture-collective.github.io.git
cd subculture-collective.github.io

# Or clone via SSH (if you have SSH keys set up)
git clone git@github.com:subculture-collective/subculture-collective.github.io.git
cd subculture-collective.github.io
```

### 2. Install Dependencies

```bash
# Clean install (recommended)
npm ci

# Or regular install
npm install
```

**Note**: `npm ci` is preferred for consistent installs from `package-lock.json`.

### 3. Verify Installation

```bash
# Check if build works
npm run build

# Start development server
npm run dev
```

The site should now be running at `http://localhost:5173`.

## Development Environment

### VS Code Setup

The project includes VS Code configuration:

**Workspace Settings** (`.vscode/settings.json`):

- Auto-format on save
- ESLint auto-fix
- Tailwind CSS class sorting

**Recommended Extensions** (`.vscode/extensions.json`):

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "unifiedjs.vscode-mdx"
  ]
}
```

### Environment Configuration

Currently, no environment variables are required for development.

If you need to add environment variables in the future:

1. Create `.env.local` in the root directory
2. Add variables with `VITE_` prefix:
   ```
   VITE_API_URL=http://localhost:3000
   ```
3. Access in code:
   ```typescript
   const apiUrl = import.meta.env.VITE_API_URL
   ```

## Available Scripts

### Development

```bash
# Start development server (with hot reload)
npm run dev

# Opens at http://localhost:5173
```

**Features**:

- Hot Module Replacement (HMR)
- Fast refresh for React
- TypeScript type checking in IDE
- Instant feedback on changes

### Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

**Build Output**: `dist/` directory

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint:fix

# Check code formatting
npm run format:check

# Format code with Prettier
npm run format
```

### Testing

```bash
# Run tests in watch mode
npm run test

# Run tests once (CI mode)
npm run test:run

# Open Vitest UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Asset Optimization

```bash
# Optimize images
npm run optimize-assets
```

## Development Workflow

### Daily Workflow

1. **Pull latest changes**:

   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create feature branch**:

   ```bash
   git checkout -b feature/my-feature
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Make changes** and test in browser

5. **Run linting and tests**:

   ```bash
   npm run lint
   npm run test:run
   ```

6. **Commit changes**:

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

7. **Push and create PR**:
   ```bash
   git push origin feature/my-feature
   ```

### Hot Reload

The development server supports hot module replacement:

- **Component changes**: Instant update
- **CSS changes**: Instant update
- **MDX changes**: Instant update
- **Config changes**: Requires server restart

### Making Changes

#### Adding a New Page

1. Create page component in `src/pages/`:

   ```tsx
   // src/pages/NewPage.tsx
   export function NewPage() {
     return <div>New Page Content</div>
   }
   ```

2. Add route in `App.tsx`:

   ```tsx
   <Route path="/new-page" element={<NewPage />} />
   ```

3. Add navigation link in `Header.tsx`

#### Adding a New Component

1. Create component directory:

   ```bash
   mkdir src/components/feature-name
   ```

2. Create component file:

   ```tsx
   // src/components/feature-name/FeatureName.tsx
   export function FeatureName() {
     return <div>Component</div>
   }
   ```

3. Create index file for clean imports:

   ```tsx
   // src/components/feature-name/index.ts
   export { FeatureName } from './FeatureName'
   ```

4. Add tests:

   ```tsx
   // src/components/feature-name/FeatureName.test.tsx
   import { describe, it, expect } from 'vitest'
   import { render } from '@testing-library/react'
   import { FeatureName } from './FeatureName'

   describe('FeatureName', () => {
     it('renders', () => {
       const { container } = render(<FeatureName />)
       expect(container).toBeInTheDocument()
     })
   })
   ```

#### Styling Components

Use TailwindCSS utility classes:

```tsx
<div className="bg-cyber-black text-neon-cyan p-4 hover:bg-deep-gray">
  Content
</div>
```

For complex styles, use the custom theme:

```tsx
<div className="bg-gradient-to-r from-neon-cyan to-electric-blue">Gradient</div>
```

See [TAILWIND_THEME.md](../TAILWIND_THEME.md) for theme details.

## Code Quality Tools

### ESLint

**Configuration**: `eslint.config.js`

**Rules**:

- React hooks rules
- Accessibility (jsx-a11y)
- Import sorting
- TypeScript rules

**Usage**:

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix
```

See [ESLINT_GUIDE.md](../ESLINT_GUIDE.md) for details.

### Prettier

**Configuration**: `.prettierrc.json`

**Settings**:

- 2-space indentation
- Single quotes
- Semicolons
- Trailing commas

**Usage**:

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

See [PRETTIER_GUIDE.md](../PRETTIER_GUIDE.md) for details.

### TypeScript

**Configuration**: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`

**Features**:

- Strict mode enabled
- Path aliases (`@/` for `src/`)
- Type checking in IDE

**Usage**:

```bash
# Type check
npm run build

# Or use IDE for real-time type checking
```

See [TYPESCRIPT_GUIDE.md](../TYPESCRIPT_GUIDE.md) for details.

### Husky & lint-staged

Pre-commit hooks automatically:

- Run ESLint
- Run Prettier
- Type check changed files

**Configuration**: `.lintstagedrc.json`

## Debugging

### Browser DevTools

1. **React Developer Tools**: Inspect component tree and props
2. **Console**: Check for errors and warnings
3. **Network**: Monitor asset loading
4. **Sources**: Set breakpoints in code

### Debugging in VS Code

1. Install "Debugger for Chrome" extension
2. Create `.vscode/launch.json`:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "type": "chrome",
         "request": "launch",
         "name": "Launch Chrome",
         "url": "http://localhost:5173",
         "webRoot": "${workspaceFolder}/src"
       }
     ]
   }
   ```
3. Set breakpoints and press F5 to debug

### Common Debugging Scenarios

#### Component Not Rendering

1. Check console for errors
2. Verify component import path
3. Check if props are passed correctly
4. Add console.log statements

#### Styles Not Applying

1. Check Tailwind class names
2. Verify class is not overridden
3. Check responsive breakpoints
4. Inspect element in DevTools

#### Route Not Working

1. Check route path in `App.tsx`
2. Verify component is imported
3. Check for conflicting routes
4. Test with React Router DevTools

## Common Tasks

### Adding a Blog Post

See [CONTENT.md](./CONTENT.md#blog-posts)

### Adding a Creator

See [CONTENT.md](./CONTENT.md#creators)

### Adding a Project

See [CONTENT.md](./CONTENT.md#projects)

### Optimizing Images

```bash
# Run optimization script
npm run optimize-assets

# Or use online tools
# - Squoosh: https://squoosh.app/
# - TinyPNG: https://tinypng.com/
```

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all dependencies
npm update

# Update specific package
npm install package-name@latest

# Update package.json and install
npm install
```

### Running Tests

```bash
# Watch mode (during development)
npm run test

# Run once (before committing)
npm run test:run

# With coverage
npm run test:coverage

# UI mode
npm run test:ui
```

See [TESTING.md](../TESTING.md) for testing details.

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5173
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Fails

```bash
# Check TypeScript errors
npm run build

# Clear cache
rm -rf dist node_modules/.vite
npm install
npm run build
```

### Tests Failing

```bash
# Clear test cache
npm run test:run -- --clearCache

# Run specific test
npm run test -- path/to/test.test.tsx
```

### Git Issues

```bash
# Reset to last commit
git reset --hard HEAD

# Clean untracked files
git clean -fd

# Update from main
git fetch origin
git rebase origin/main
```

### Performance Issues

1. Check browser console for errors
2. Run Lighthouse audit
3. Check bundle size: `npm run build`
4. Profile with React DevTools

## Best Practices

### Code Organization

- Keep components small and focused
- Extract reusable logic into hooks
- Co-locate related files
- Use proper file naming

### Performance

- Lazy load routes and components
- Optimize images before committing
- Avoid unnecessary re-renders
- Use proper React keys

### Git Workflow

- Commit frequently with clear messages
- Keep commits atomic
- Pull before pushing
- Resolve merge conflicts carefully

### Documentation

- Update documentation with code changes
- Add JSDoc comments for complex functions
- Keep README.md up to date
- Document breaking changes

## Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Vitest Documentation](https://vitest.dev/)

## Getting Help

- **Documentation**: Check the `docs/` directory
- **Discussions**: [GitHub Discussions](https://github.com/subculture-collective/subculture-collective.github.io/discussions)
- **Issues**: Report bugs or request features
- **Contributing**: See [CONTRIBUTING.md](../CONTRIBUTING.md)

---

Happy coding! 💜
