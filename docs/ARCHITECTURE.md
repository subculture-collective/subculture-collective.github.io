# Architecture Overview

This document provides a comprehensive overview of the Subculture Collective technical architecture, folder structure, and key design decisions.

## Table of Contents

- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Architecture Patterns](#architecture-patterns)
- [Routing](#routing)
- [State Management](#state-management)
- [Data Flow](#data-flow)
- [Build System](#build-system)

## Technology Stack

### Core Technologies

- **React 19**: UI library with concurrent features
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and dev server
- **React Router v7**: Client-side routing
- **TailwindCSS**: Utility-first CSS framework

### Additional Libraries

- **Framer Motion**: Animation library
- **MDX**: Markdown with JSX support
- **gray-matter**: Frontmatter parsing
- **web-vitals**: Performance monitoring

### Development Tools

- **Vitest**: Testing framework
- **Testing Library**: React testing utilities
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks

## Project Structure

```
subculture-collective.github.io/
├── .github/                    # GitHub-specific files
│   ├── workflows/             # CI/CD workflows
│   ├── ISSUE_TEMPLATE/        # Issue templates
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CI_DOCUMENTATION.md    # CI/CD documentation
│
├── public/                    # Static assets
│   ├── assets/               # Public images, icons
│   ├── 404.html             # SPA routing fallback
│   └── .nojekyll            # Disable Jekyll on GitHub Pages
│
├── src/                      # Source code
│   ├── assets/              # Build-time assets
│   │   ├── images/         # Images processed by Vite
│   │   └── fonts/          # Font files
│   │
│   ├── components/          # React components
│   │   ├── about/          # About page components
│   │   ├── a11y/           # Accessibility components
│   │   ├── creators/       # Creator showcase
│   │   ├── error/          # Error boundaries
│   │   ├── hero/           # Hero sections
│   │   ├── join/           # Join/contact components
│   │   ├── journal/        # Blog components
│   │   ├── layout/         # Layout components
│   │   ├── motion/         # Animation components
│   │   ├── projects/       # Project gallery
│   │   ├── seo/            # SEO components
│   │   └── ui/             # Reusable UI components
│   │
│   ├── content/             # Content files
│   │   ├── journal/        # Blog posts (MDX)
│   │   ├── about.json      # About page content
│   │   └── join.json       # Join page content
│   │
│   ├── data/                # Static data
│   │   ├── creators.ts     # Creator data
│   │   ├── projects.ts     # Project data
│   │   └── seo-config.ts   # SEO configuration
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useMediaQuery.ts
│   │   ├── useScrollPosition.ts
│   │   └── useWebVitals.ts
│   │
│   ├── lib/                 # Utilities and helpers
│   │   ├── utils.ts        # General utilities
│   │   └── cn.ts           # Class name utilities
│   │
│   ├── pages/               # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Creators.tsx
│   │   ├── Projects.tsx
│   │   ├── Journal.tsx
│   │   ├── JournalPost.tsx
│   │   ├── Join.tsx
│   │   ├── NotFound.tsx
│   │   ├── NetworkError.tsx
│   │   ├── ServerError.tsx
│   │   └── AccessibilityStatement.tsx
│   │
│   ├── test/                # Test utilities
│   │   ├── setup.ts
│   │   └── test-utils.tsx
│   │
│   ├── types/               # TypeScript type definitions
│   │   ├── index.ts
│   │   ├── blog.ts
│   │   └── components.ts
│   │
│   ├── utils/               # Utility functions
│   │
│   ├── App.tsx              # Root application component
│   ├── App.css              # Global styles
│   ├── main.tsx             # Application entry point
│   └── index.css            # Tailwind imports
│
├── docs/                     # Documentation
├── scripts/                  # Build and utility scripts
│   └── optimize-assets.ts   # Image optimization
│
├── dist/                     # Build output (generated)
│
└── Configuration files
    ├── package.json
    ├── tsconfig.json
    ├── tsconfig.app.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── vitest.config.ts
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── eslint.config.js
    └── .prettierrc.json
```

## Architecture Patterns

### Component Architecture

The project follows a modular component architecture:

#### 1. Feature-Based Organization

Components are organized by feature/domain rather than by type:

```
components/
  creators/          # All creator-related components
  journal/           # All blog-related components
  projects/          # All project-related components
```

#### 2. UI Component Library

Reusable UI components are centralized in `components/ui/`:

- `Button`
- `Card`
- `OptimizedImage`
- `LoadingSpinner`
- `ErrorBoundary`

#### 3. Layout Components

Layout components provide consistent page structure:

- `Header`: Navigation and branding
- `Footer`: Links and information
- `PageLayout`: Common page wrapper

#### 4. Page Components

Page components compose features and layouts:

```tsx
// pages/Home.tsx
import { Hero } from '@/components/hero'
import { FeaturedProjects } from '@/components/projects'
import { LatestPosts } from '@/components/journal'

export function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <LatestPosts />
    </>
  )
}
```

### Design Patterns

#### Composition Over Inheritance

Components favor composition:

```tsx
// Good: Composition
<Card>
  <CardHeader>
    <CardTitle>{title}</CardTitle>
  </CardHeader>
  <CardContent>{content}</CardContent>
</Card>

// Avoid: Complex prop drilling
<Card title={title} content={content} hasHeader={true} />
```

#### Custom Hooks for Logic Reuse

Extract component logic into custom hooks:

```tsx
// hooks/useMediaQuery.ts
export function useMediaQuery(query: string): boolean {
  // Implementation
}

// Usage in component
function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  return isMobile ? <MobileView /> : <DesktopView />
}
```

#### Error Boundaries

Error boundaries catch and handle errors gracefully:

```tsx
<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>
```

## Routing

### React Router Configuration

The application uses React Router v7 for client-side routing:

```tsx
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:slug" element={<JournalPost />} />
        <Route path="/join" element={<Join />} />
        <Route path="/accessibility" element={<AccessibilityStatement />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
```

### Route Structure

- `/` - Home page
- `/about` - About the collective
- `/creators` - Creator showcase
- `/projects` - Project gallery
- `/journal` - Blog post list
- `/journal/:slug` - Individual blog post
- `/join` - Join/contact page
- `/accessibility` - Accessibility statement
- `*` - 404 Not Found

### GitHub Pages SPA Support

GitHub Pages doesn't natively support client-side routing. We use a workaround:

1. **404.html Redirect**: Captures 404 errors and redirects to index.html with the path encoded
2. **Path Restoration**: The app decodes and restores the original path
3. **Router Handling**: React Router handles the restored path

See [DEPLOYMENT.md](../DEPLOYMENT.md) for details.

## State Management

### Local State

The application primarily uses local state with React hooks:

- `useState` - Component-local state
- `useReducer` - Complex state logic
- `useContext` - Shared state across components

### No Global State Library

Currently, no global state management library (Redux, Zustand, etc.) is needed because:

- Most state is component-local
- Content is static or comes from MDX files
- No complex data synchronization required

### Future Considerations

If the application grows to require global state:

- Consider Zustand for lightweight state management
- Or React Query for server state management
- Keep state as local as possible

## Data Flow

### Content Loading

#### Blog Posts (MDX)

```
1. User navigates to /journal/post-slug
2. JournalPost component loads
3. Dynamic import loads MDX file
4. MDX is rendered with React components
5. Frontmatter provides metadata
```

#### Static Data

```
1. Data defined in src/data/*.ts
2. Imported directly into components
3. No runtime fetching needed
4. Data bundled at build time
```

### Example: Blog Post Flow

```tsx
// pages/JournalPost.tsx
export function JournalPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    // Dynamically import MDX file
    import(`../content/journal/${slug}.mdx`)
      .then(module => setPost(module))
      .catch(() => navigate('/404'))
  }, [slug])

  if (!post) return <LoadingSpinner />

  const { default: Content, frontmatter } = post

  return (
    <article>
      <h1>{frontmatter.title}</h1>
      <Content />
    </article>
  )
}
```

## Build System

### Vite Configuration

Key Vite features used:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    react(), // React support
    mdx(), // MDX support
    svgLoader(), // SVG as React components
    imageOptimizer(), // Image optimization
    compression(), // Gzip/Brotli compression
  ],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
})
```

### Build Process

1. **TypeScript Compilation**: `tsc -b`
2. **Bundle Generation**: Vite creates optimized bundles
3. **Code Splitting**: Automatic for routes and vendors
4. **Asset Optimization**: Images, CSS minification
5. **Compression**: Gzip and Brotli files generated

### Build Output

```
dist/
├── assets/
│   ├── index-[hash].js       # Main bundle
│   ├── vendor-[hash].js      # Vendor code
│   ├── [route]-[hash].js     # Route chunks
│   └── index-[hash].css      # Styles
├── index.html                # Entry HTML
└── assets/                   # Optimized assets
```

### Performance Optimizations

- **Code Splitting**: Routes loaded on demand
- **Tree Shaking**: Unused code removed
- **Minification**: JavaScript and CSS minified
- **Compression**: Brotli compression for ~70% reduction
- **Image Optimization**: WebP/AVIF formats with fallbacks
- **CSS Purging**: Unused Tailwind classes removed

## CI/CD Pipeline

### Workflow Steps

1. **Linting**: ESLint checks code quality
2. **Type Checking**: TypeScript compilation
3. **Testing**: Vitest runs all tests
4. **Build**: Production bundle created
5. **Accessibility**: Lighthouse checks
6. **Deploy**: Artifacts deployed to GitHub Pages

See [.github/CI_DOCUMENTATION.md](../.github/CI_DOCUMENTATION.md) for details.

## Environment Variables

### Development

No environment variables currently required for development.

### Production

- **Base Path**: Set in `vite.config.ts` to `/` for user GitHub Pages site
- **GitHub Token**: Automatically provided by GitHub Actions

### Future Environment Variables

If API keys or external services are added:

1. Create `.env.local` for local development
2. Add to GitHub Secrets for CI/CD
3. Document in `.env.example`

## Security Considerations

### Content Security

- Static site generation prevents injection attacks
- No user-generated content at runtime
- MDX files are trusted (from repository)

### Dependencies

- Regular dependency updates
- Automated security scanning
- No known vulnerabilities

### Deployment

- HTTPS enforced on GitHub Pages
- No sensitive data in repository
- Environment secrets in GitHub Secrets

## Performance

### Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### Monitoring

- Web Vitals tracking
- Lighthouse CI in pipeline
- Bundle size monitoring

See [PERFORMANCE.md](../PERFORMANCE.md) for details.

## Accessibility

### WCAG 2.1 AA Compliance

- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Screen reader support
- Color contrast
- Focus management

See [ACCESSIBILITY.md](../ACCESSIBILITY.md) for details.

---

For questions or clarifications about the architecture, please open a [Discussion](https://github.com/subculture-collective/subculture-collective.github.io/discussions).
