# Subculture Collective

[![CI](https://github.com/subculture-collective/subculture-collective.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/subculture-collective/subculture-collective.github.io/actions/workflows/ci.yml)
[![Tests](https://github.com/subculture-collective/subculture-collective.github.io/actions/workflows/test.yml/badge.svg)](https://github.com/subculture-collective/subculture-collective.github.io/actions/workflows/test.yml)
[![Deploy](https://github.com/subculture-collective/subculture-collective.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/subculture-collective/subculture-collective.github.io/actions/workflows/deploy.yml)

> A cyberpunk-inspired platform showcasing underground creators, projects, and cultural commentary.

Subculture Collective (Subcult) is a modern web platform built with React, TypeScript, and Vite. It features a hacker-culture aesthetic meets avant-garde zine design, bringing together independent creators, experimental projects, and subcultural discourse.

## 🚀 Live Site

**[https://subculture-collective.github.io/](https://subculture-collective.github.io/)**

## ✨ Features

- **🎨 Custom Design System**: Cyberpunk aesthetic with neon accents and dark themes
- **📝 MDX Blog**: Write blog posts with React components
- **👥 Creator Showcase**: Highlight independent creators and their work
- **🎯 Project Gallery**: Display innovative projects and experiments
- **♿ WCAG 2.1 AA Compliant**: Full accessibility support
- **⚡ Optimized Performance**: Image optimization, lazy loading, and code splitting
- **📱 Fully Responsive**: Mobile-first design with breakpoint testing
- **🔍 SEO Optimized**: Meta tags, Open Graph, and structured data
- **🧪 Comprehensive Testing**: 93%+ test coverage with Vitest
- **🚀 CI/CD Pipeline**: Automated testing, linting, and deployment

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: TailwindCSS with custom theme
- **Routing**: React Router v7
- **Animation**: Framer Motion
- **Content**: MDX (Markdown + JSX)
- **Testing**: Vitest, Testing Library
- **Linting**: ESLint with accessibility rules
- **Formatting**: Prettier with pre-commit hooks
- **Deployment**: GitHub Pages with GitHub Actions

## 📋 Prerequisites

- **Node.js**: v20 or higher
- **npm**: v10 or higher
- **Git**: For version control

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/subculture-collective/subculture-collective.github.io.git
cd subculture-collective.github.io

# Install dependencies
npm ci

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the production bundle
npm run build

# Preview the production build
npm run preview
```

## 📖 Documentation

## 📖 Documentation

### Core Documentation

- **[Contributing Guide](./CONTRIBUTING.md)** - How to contribute to the project
- **[Development Guide](./docs/DEVELOPMENT.md)** - Local setup and development workflow
- **[Architecture Overview](./docs/ARCHITECTURE.md)** - Technical architecture and folder structure
- **[Component Documentation](./docs/COMPONENTS.md)** - Component usage and patterns
- **[Content Management](./docs/CONTENT.md)** - How to add blog posts, creators, and projects
- **[Design System](./docs/DESIGN_SYSTEM.md)** - Brand guidelines and design patterns

### Technical Documentation

- **[Deployment Guide](./DEPLOYMENT.md)** - GitHub Pages deployment setup
- **[VPS Deployment Guide](./docs/VPS_DEPLOYMENT.md)** - Comprehensive VPS deployment guide
- **[VPS Quick Start](./docs/VPS_QUICKSTART.md)** - Quick VPS deployment (30 minutes)
- **[VPS Setup Checklist](./docs/VPS_SETUP_CHECKLIST.md)** - Step-by-step VPS setup checklist
- **[Testing Guide](./TESTING.md)** - Testing infrastructure and best practices
- **[CI/CD Documentation](./.github/CI_DOCUMENTATION.md)** - Continuous integration workflows

### Guides and Standards

- **[Accessibility Guide](./ACCESSIBILITY.md)** - WCAG 2.1 AA compliance
- **[Accessibility Implementation](./ACCESSIBILITY_IMPLEMENTATION.md)** - Implementation details
- **[Accessibility Testing](./ACCESSIBILITY_TESTING.md)** - Testing checklist
- **[ESLint Guide](./ESLINT_GUIDE.md)** - Code quality rules
- **[Prettier Guide](./PRETTIER_GUIDE.md)** - Code formatting
- **[TypeScript Guide](./TYPESCRIPT_GUIDE.md)** - TypeScript usage
- **[Image Optimization](./IMAGE_OPTIMIZATION.md)** - Image optimization guide
- **[Responsive Design](./RESPONSIVE_DESIGN.md)** - Responsive patterns
- **[Responsive Testing](./RESPONSIVE_TESTING.md)** - Testing checklist
- **[SEO Guide](./SEO_GUIDE.md)** - SEO best practices
- **[Tailwind Theme](./TAILWIND_THEME.md)** - Custom theme configuration
- **[Animations Guide](./ANIMATIONS.md)** - Animation patterns
- **[Performance Guide](./PERFORMANCE.md)** - Performance optimization
- **[Error Handling](./ERROR_HANDLING.md)** - Error handling patterns

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run format          # Format with Prettier
npm run format:check    # Check formatting

# Testing
npm run test            # Run tests in watch mode
npm run test:run        # Run tests once
npm run test:ui         # Open Vitest UI
npm run test:coverage   # Generate coverage report

# Assets
npm run optimize-assets # Optimize images
```

### Development Workflow

1. **Create a feature branch**: `git checkout -b feature/my-feature`
2. **Make your changes**: Follow the coding standards
3. **Test your changes**: Run linting and tests
4. **Commit**: Use conventional commit messages
5. **Push and create PR**: Follow the PR template

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

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

## 🎨 Design System

Subculture Collective features a custom design system with:

- **Cyberpunk Aesthetic**: Dark themes with neon accents (cyan, blue, green, magenta)
- **Typography**: Custom font system with glitch effects
- **Color Palette**: Dark foundations with electric accent colors
- **Animation**: Framer Motion for smooth transitions and effects
- **Components**: Reusable UI components with consistent styling

See **[TAILWIND_THEME.md](./TAILWIND_THEME.md)** and **[docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md)** for details.

## 📦 Project Structure

```
subculture-collective.github.io/
├── .github/              # GitHub Actions workflows and templates
├── public/               # Static assets
├── src/
│   ├── assets/          # Images, fonts, and other assets
│   ├── components/      # React components
│   │   ├── about/       # About page components
│   │   ├── creators/    # Creator showcase components
│   │   ├── hero/        # Hero section components
│   │   ├── journal/     # Blog components
│   │   ├── layout/      # Layout components (header, footer)
│   │   ├── projects/    # Project gallery components
│   │   └── ui/          # Reusable UI components
│   ├── content/         # MDX content (blog posts)
│   ├── data/            # Static data (creators, projects)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── docs/                # Documentation
└── scripts/             # Build and utility scripts
```

See **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** for detailed architecture documentation.

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](./CONTRIBUTING.md) to get started.

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Run linting and tests
6. Submit a pull request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](./LICENSE) file for details.

## 🔗 Links

- **Live Site**: https://subculture-collective.github.io/
- **Repository**: https://github.com/subculture-collective/subculture-collective.github.io
- **Issues**: https://github.com/subculture-collective/subculture-collective.github.io/issues
- **Discussions**: https://github.com/subculture-collective/subculture-collective.github.io/discussions

## 💬 Community

Join the discussion and connect with other contributors!

- Report bugs and request features in [Issues](https://github.com/subculture-collective/subculture-collective.github.io/issues)
- Discuss ideas in [Discussions](https://github.com/subculture-collective/subculture-collective.github.io/discussions)
- Follow development in [Pull Requests](https://github.com/subculture-collective/subculture-collective.github.io/pulls)

---

Made with 💜 by the Subculture Collective community
