# React + TypeScript + Vite

[![CI](https://github.com/subculture-collective/subculture-collective.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/subculture-collective/subculture-collective.github.io/actions/workflows/ci.yml)
[![Tests](https://github.com/subculture-collective/subculture-collective.github.io/actions/workflows/test.yml/badge.svg)](https://github.com/subculture-collective/subculture-collective.github.io/actions/workflows/test.yml)
[![Deploy](https://github.com/subculture-collective/subculture-collective.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/subculture-collective/subculture-collective.github.io/actions/workflows/deploy.yml)

This project is a React application built with TypeScript and Vite, automatically deployed to GitHub Pages.

## 🚀 Live Site

**https://subculture-collective.github.io/**

## 📚 Documentation

- **[Deployment Guide](./DEPLOYMENT.md)** - GitHub Pages deployment setup and configuration
- **[CI/CD Documentation](./.github/CI_DOCUMENTATION.md)** - Continuous integration and deployment workflows
- **[Testing Guide](./TESTING.md)** - Comprehensive testing infrastructure and best practices
- **[Accessibility Guide](./ACCESSIBILITY.md)** - WCAG 2.1 AA compliance and accessibility features
- **[ESLint Guide](./ESLINT_GUIDE.md)** - Code quality and linting rules
- **[Prettier Guide](./PRETTIER_GUIDE.md)** - Code formatting configuration
- **[TypeScript Guide](./TYPESCRIPT_GUIDE.md)** - TypeScript usage and best practices
- **[Image Optimization Guide](./IMAGE_OPTIMIZATION.md)** - Image optimization and performance best practices
- **[Responsive Design Guide](./RESPONSIVE_DESIGN.md)** - Responsive design patterns and best practices
- **[Responsive Testing Checklist](./RESPONSIVE_TESTING.md)** - Comprehensive testing checklist for all breakpoints

## Code Quality

This project uses:

- **[ESLint](https://eslint.org/)** for code quality and consistency - see
  [ESLINT_GUIDE.md](./ESLINT_GUIDE.md)
- **[Prettier](https://prettier.io/)** for code formatting - see
  [PRETTIER_GUIDE.md](./PRETTIER_GUIDE.md)
- **[TypeScript](https://www.typescriptlang.org/)** for type safety - see
  [TYPESCRIPT_GUIDE.md](./TYPESCRIPT_GUIDE.md)
- **[Vitest](https://vitest.dev/)** for unit and integration testing - see
  [TESTING.md](./TESTING.md)

All code is automatically formatted and linted via pre-commit hooks and
validated in CI.

## 🧪 Testing

This project includes comprehensive testing infrastructure with 93%+ coverage:

- **Unit Tests**: Testing individual functions and utilities
- **Integration Tests**: Testing component interactions and data flows
- **Coverage Reporting**: Automatic coverage tracking and reporting

### Running Tests

```bash
# Run tests in watch mode
npm run test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

See the **[Testing Guide](./TESTING.md)** for complete documentation, best practices, and examples.

## ⚡ Performance & Image Optimization

This project includes comprehensive image optimization features:

- **Modern Formats**: Automatic WebP and AVIF format support with fallbacks
- **Responsive Images**: srcset and sizes attributes for optimal loading
- **Lazy Loading**: Intersection Observer API for efficient resource loading
- **Blur-up Placeholders**: Smooth loading experience with placeholder effects
- **Optimized Build**: Vite configuration for asset optimization

### Quick Start with Images

```tsx
import { OptimizedImage } from '@/components/ui'

// Basic usage
<OptimizedImage src="/hero.jpg" alt="Hero image" />

// With responsive images
<OptimizedImage
  src="/hero.jpg"
  srcSet="/hero-400.jpg 400w, /hero-800.jpg 800w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Hero image"
/>
```

See the **[Image Optimization Guide](./IMAGE_OPTIMIZATION.md)** for complete documentation.

## ♿ Accessibility

This project is committed to **WCAG 2.1 Level AA** accessibility standards. Key features include:

- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Reader Support**: Semantic HTML, ARIA labels, and descriptive alt text
- **Focus Indicators**: Visible focus states on all interactive elements
- **Reduced Motion**: Respects `prefers-reduced-motion` user preferences
- **Color Contrast**: Minimum 4.5:1 contrast ratio for text
- **Form Accessibility**: Proper labels, error messages, and autocomplete attributes
- **Skip Navigation**: Skip to main content link for keyboard users

### Testing Accessibility

```bash
# Run ESLint with jsx-a11y plugin
npm run lint

# Run Lighthouse accessibility audit
npm run build
npx @lhci/cli autorun
```

See the **[Accessibility Guide](./ACCESSIBILITY.md)** for complete documentation and maintenance guidelines.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
