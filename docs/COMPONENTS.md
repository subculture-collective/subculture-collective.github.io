# Component Documentation

This guide provides documentation for the Subculture Collective component library, including usage examples, props, and best practices.

## Table of Contents

- [UI Components](#ui-components)
- [Layout Components](#layout-components)
- [Feature Components](#feature-components)
- [Utility Components](#utility-components)
- [Animation Components](#animation-components)
- [Component Patterns](#component-patterns)

## UI Components

### OptimizedImage

Optimized image component with lazy loading, responsive images, and blur-up placeholders.

**Location**: `src/components/ui/OptimizedImage.tsx`

**Usage**:

```tsx
import { OptimizedImage } from '@/components/ui'

// Basic usage
<OptimizedImage src="/image.jpg" alt="Description" />

// With responsive images
<OptimizedImage
  src="/image.jpg"
  srcSet="/image-400.jpg 400w, /image-800.jpg 800w, /image-1200.jpg 1200w"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt="Description"
/>

// With blur placeholder
<OptimizedImage
  src="/image.jpg"
  alt="Description"
  blurDataURL="data:image/jpeg;base64,..."
  placeholder="blur"
/>
```

**Props**:

| Prop          | Type              | Default  | Description              |
| ------------- | ----------------- | -------- | ------------------------ |
| `src`         | string            | required | Image source URL         |
| `alt`         | string            | required | Alternative text         |
| `srcSet`      | string            | -        | Responsive image sources |
| `sizes`       | string            | -        | Responsive image sizes   |
| `loading`     | 'lazy' \| 'eager' | 'lazy'   | Loading strategy         |
| `placeholder` | 'blur' \| 'empty' | 'empty'  | Placeholder type         |
| `blurDataURL` | string            | -        | Base64 blur placeholder  |
| `className`   | string            | -        | Additional CSS classes   |

See [IMAGE_OPTIMIZATION.md](../IMAGE_OPTIMIZATION.md) for more details.

### Button

Reusable button component with multiple variants.

**Location**: `src/components/ui/Button.tsx`

**Usage**:

```tsx
import { Button } from '@/components/ui'

// Primary button
<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>

// Secondary button
<Button variant="secondary" size="lg">
  Learn More
</Button>

// Link button
<Button as="a" href="/about" variant="outline">
  About Us
</Button>
```

**Props**:

| Prop       | Type                                  | Default   | Description              |
| ---------- | ------------------------------------- | --------- | ------------------------ |
| `variant`  | 'primary' \| 'secondary' \| 'outline' | 'primary' | Button style variant     |
| `size`     | 'sm' \| 'md' \| 'lg'                  | 'md'      | Button size              |
| `disabled` | boolean                               | false     | Disabled state           |
| `as`       | 'button' \| 'a'                       | 'button'  | Render as button or link |
| `onClick`  | () => void                            | -         | Click handler            |
| `children` | ReactNode                             | required  | Button content           |

### Card

Flexible card component for content grouping.

**Location**: `src/components/ui/Card.tsx`

**Usage**:

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui'

;<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### LoadingSpinner

Loading indicator component.

**Location**: `src/components/ui/LoadingSpinner.tsx`

**Usage**:

```tsx
import { LoadingSpinner } from '@/components/ui'

<LoadingSpinner size="md" />
<LoadingSpinner size="lg" text="Loading..." />
```

**Props**:

| Prop        | Type                 | Default | Description            |
| ----------- | -------------------- | ------- | ---------------------- |
| `size`      | 'sm' \| 'md' \| 'lg' | 'md'    | Spinner size           |
| `text`      | string               | -       | Optional loading text  |
| `className` | string               | -       | Additional CSS classes |

## Layout Components

### Header

Main navigation header.

**Location**: `src/components/layout/Header.tsx`

**Features**:

- Responsive navigation
- Mobile menu
- Active route highlighting
- Accessibility support

**Usage**:

```tsx
import { Header } from '@/components/layout'

;<Header />
```

### Footer

Site footer with links and information.

**Location**: `src/components/layout/Footer.tsx`

**Usage**:

```tsx
import { Footer } from '@/components/layout'

;<Footer />
```

### PageLayout

Common page wrapper with consistent structure.

**Location**: `src/components/layout/PageLayout.tsx`

**Usage**:

```tsx
import { PageLayout } from '@/components/layout'

;<PageLayout title="Page Title" description="Page description">
  <YourContent />
</PageLayout>
```

**Props**:

| Prop          | Type      | Default  | Description              |
| ------------- | --------- | -------- | ------------------------ |
| `title`       | string    | required | Page title for SEO       |
| `description` | string    | -        | Page description for SEO |
| `children`    | ReactNode | required | Page content             |

## Feature Components

### Hero

Hero section component with animations.

**Location**: `src/components/hero/`

**Usage**:

```tsx
import { Hero } from '@/components/hero'

;<Hero
  title="Welcome to Subcult"
  subtitle="Underground creativity"
  ctaText="Explore"
  ctaLink="/projects"
/>
```

### CreatorCard

Card displaying creator information.

**Location**: `src/components/creators/CreatorCard.tsx`

**Usage**:

```tsx
import { CreatorCard } from '@/components/creators'

;<CreatorCard
  name="Creator Name"
  bio="Creator bio"
  avatar="/avatar.jpg"
  links={{ website: 'https://...', twitter: '...' }}
/>
```

### ProjectCard

Card displaying project information.

**Location**: `src/components/projects/ProjectCard.tsx`

**Usage**:

```tsx
import { ProjectCard } from '@/components/projects'

;<ProjectCard
  title="Project Title"
  description="Project description"
  image="/project.jpg"
  tags={['React', 'TypeScript']}
  link="https://..."
/>
```

### JournalCard

Card displaying blog post preview.

**Location**: `src/components/journal/JournalCard.tsx`

**Usage**:

```tsx
import { JournalCard } from '@/components/journal'

;<JournalCard
  title="Post Title"
  excerpt="Brief description"
  date="2025-10-22"
  slug="post-slug"
  tags={['announcement', 'updates']}
/>
```

## Utility Components

### ErrorBoundary

React Error Boundary for error handling.

**Location**: `src/components/error/ErrorBoundary.tsx`

**Usage**:

```tsx
import { ErrorBoundary } from '@/components/error'

;<ErrorBoundary fallback={<ErrorPage />}>
  <YourComponent />
</ErrorBoundary>
```

**Props**:

| Prop       | Type                       | Default  | Description          |
| ---------- | -------------------------- | -------- | -------------------- |
| `fallback` | ReactNode                  | -        | Fallback UI on error |
| `onError`  | (error, errorInfo) => void | -        | Error callback       |
| `children` | ReactNode                  | required | Children to wrap     |

### SEOHead

Component for managing SEO meta tags.

**Location**: `src/components/seo/SEOHead.tsx`

**Usage**:

```tsx
import { SEOHead } from '@/components/seo'

;<SEOHead
  title="Page Title"
  description="Page description"
  keywords={['keyword1', 'keyword2']}
  ogImage="/og-image.jpg"
/>
```

**Props**:

| Prop          | Type     | Default   | Description      |
| ------------- | -------- | --------- | ---------------- |
| `title`       | string   | required  | Page title       |
| `description` | string   | -         | Page description |
| `keywords`    | string[] | -         | SEO keywords     |
| `ogImage`     | string   | -         | Open Graph image |
| `ogType`      | string   | 'website' | Open Graph type  |

### SkipToContent

Accessibility component for keyboard navigation.

**Location**: `src/components/a11y/SkipToContent.tsx`

**Usage**:

```tsx
import { SkipToContent } from '@/components/a11y'

<SkipToContent />
<main id="main-content">...</main>
```

## Animation Components

### FadeIn

Fade-in animation wrapper using Framer Motion.

**Location**: `src/components/motion/FadeIn.tsx`

**Usage**:

```tsx
import { FadeIn } from '@/components/motion'

<FadeIn>
  <YourContent />
</FadeIn>

<FadeIn delay={0.2} duration={0.8}>
  <YourContent />
</FadeIn>
```

**Props**:

| Prop       | Type      | Default  | Description                |
| ---------- | --------- | -------- | -------------------------- |
| `delay`    | number    | 0        | Animation delay in seconds |
| `duration` | number    | 0.5      | Animation duration         |
| `children` | ReactNode | required | Content to animate         |

### SlideIn

Slide-in animation wrapper.

**Location**: `src/components/motion/SlideIn.tsx`

**Usage**:

```tsx
import { SlideIn } from '@/components/motion'

;<SlideIn direction="left">
  <YourContent />
</SlideIn>
```

**Props**:

| Prop        | Type                                | Default  | Description        |
| ----------- | ----------------------------------- | -------- | ------------------ |
| `direction` | 'left' \| 'right' \| 'up' \| 'down' | 'up'     | Slide direction    |
| `delay`     | number                              | 0        | Animation delay    |
| `children`  | ReactNode                           | required | Content to animate |

See [ANIMATIONS.md](../ANIMATIONS.md) for more animation patterns.

## Component Patterns

### Composition Pattern

Build complex components from simpler ones:

```tsx
// Instead of a complex prop interface
<Card title="Title" content="Content" footer={<Button />} />

// Use composition
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Render Props Pattern

Share logic between components:

```tsx
interface MouseTrackerProps {
  children: (position: { x: number; y: number }) => ReactNode
}

function MouseTracker({ children }: MouseTrackerProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return children(position)
}

// Usage
;<MouseTracker>
  {({ x, y }) => (
    <div>
      Mouse position: {x}, {y}
    </div>
  )}
</MouseTracker>
```

### Custom Hooks Pattern

Extract component logic:

```tsx
// hooks/useMediaQuery.ts
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

// Usage in component
function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  return isMobile ? <MobileView /> : <DesktopView />
}
```

### Compound Components Pattern

Components that work together:

```tsx
// Tabs component family
function Tabs({ children, defaultValue }) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  )
}

function TabsList({ children }) {
  return <div className="tabs-list">{children}</div>
}

function Tab({ value, children }) {
  const { activeTab, setActiveTab } = useTabsContext()
  return (
    <button
      className={activeTab === value ? 'active' : ''}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

function TabsContent({ value, children }) {
  const { activeTab } = useTabsContext()
  return activeTab === value ? <div>{children}</div> : null
}

// Usage
;<Tabs defaultValue="tab1">
  <TabsList>
    <Tab value="tab1">Tab 1</Tab>
    <Tab value="tab2">Tab 2</Tab>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

## Best Practices

### Component Design

1. **Single Responsibility**: Each component should do one thing well
2. **Composition**: Build complex UIs from simple components
3. **Props over Configuration**: Prefer props for customization
4. **Accessibility First**: Include ARIA labels and keyboard support
5. **Type Safety**: Use TypeScript interfaces for props

### Performance

1. **Lazy Loading**: Use `React.lazy()` for code splitting
2. **Memoization**: Use `React.memo()` for expensive components
3. **Avoid Inline Functions**: Define handlers outside render
4. **Key Props**: Use stable keys in lists

### Styling

1. **TailwindCSS**: Use utility classes
2. **Responsive**: Mobile-first design
3. **Consistent Spacing**: Use theme spacing scale
4. **Dark Mode**: Support dark theme
5. **Animation**: Use Framer Motion for complex animations

### Testing

1. **Test Behavior**: Test what users see and do
2. **Accessibility**: Test with screen readers
3. **Edge Cases**: Test loading, error, and empty states
4. **Integration**: Test component interactions

See [TESTING.md](../TESTING.md) for testing guidelines.

## Creating New Components

### Component Template

````tsx
// components/ui/NewComponent.tsx
import { type ReactNode } from 'react'

export interface NewComponentProps {
  /**
   * Description of prop
   */
  prop1: string
  /**
   * Optional prop with default
   */
  prop2?: number
  /**
   * React children
   */
  children?: ReactNode
}

/**
 * Brief description of component
 *
 * @example
 * ```tsx
 * <NewComponent prop1="value">Content</NewComponent>
 * ```
 */
export function NewComponent({
  prop1,
  prop2 = 0,
  children,
}: NewComponentProps) {
  return <div className="component-class">{children}</div>
}
````

### Component Test Template

```tsx
// components/ui/NewComponent.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NewComponent } from './NewComponent'

describe('NewComponent', () => {
  it('renders children', () => {
    render(<NewComponent prop1="value">Test Content</NewComponent>)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies correct classes', () => {
    const { container } = render(
      <NewComponent prop1="value">Content</NewComponent>
    )
    expect(container.firstChild).toHaveClass('component-class')
  })
})
```

## Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)

---

For questions about components, open a [Discussion](https://github.com/subculture-collective/subculture-collective.github.io/discussions).
