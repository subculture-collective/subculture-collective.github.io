# Layout Components

This directory contains layout-related components that define the overall structure and navigation of the application.

## Components

### Layout.tsx

Master layout component that wraps all pages with:

- Skip to content link (accessibility)
- Navbar (optional based on variant)
- Page transitions (Framer Motion AnimatePresence)
- Main content area (PageWrapper)
- Footer (optional based on variant)
- Scroll restoration

**Layout Variants:**

- `default`: Full layout with navbar and footer
- `minimal`: Footer only, no navbar
- `fullscreen`: No navbar or footer (for hero sections)

**Usage:**

```tsx
<Layout variant="default" transitionType="glitch">
  <YourPageContent />
</Layout>
```

**Props:**

- `children`: ReactNode - Page content to render
- `variant`: 'default' | 'minimal' | 'fullscreen' (default: 'default')
- `transitionType`: 'fade' | 'slideRight' | 'slideLeft' | 'slideUp' | 'glitch' (default: 'glitch')
- `pageWrapperClassName`: string - Additional classes for PageWrapper
- `fullWidthContent`: boolean - Whether to use full width content

---

### PageWrapper.tsx

Wrapper component for page content with consistent styling and structure.

**Features:**

- Sets up the main content area with proper semantic HTML (`<main>`)
- Provides consistent max-width and padding
- Enables flexible layout with `flex-1` and `min-h-screen`
- Supports full-width content when needed
- Includes `id="main-content"` for skip link target
- Focusable with `tabIndex={-1}` for accessibility

**Usage:**

```tsx
<PageWrapper>
  <YourPageContent />
</PageWrapper>

// Full width variant
<PageWrapper fullWidth>
  <YourPageContent />
</PageWrapper>
```

---

### Footer.tsx

Site footer with navigation links, social media, and cyberpunk aesthetic.

**Features:**

- Brand section with glitch effect on hover
- Navigation links to all main pages
- Social media links (Twitter, Instagram, Discord, GitHub)
- Copyright notice with current year
- Privacy and Terms links
- Responsive grid layout
- Accessible navigation with proper ARIA labels

**Usage:**

```tsx
<Footer />
```

---

### SkipToContent.tsx

Accessibility component that provides a skip link for keyboard users to bypass navigation.

**Features:**

- Visually hidden by default (using `sr-only`)
- Becomes visible when focused (keyboard navigation)
- Jumps to `#main-content` when activated
- Smooth scroll behavior (respects reduced motion)
- Styled with cyberpunk theme

**Usage:**

```tsx
<SkipToContent />
<nav>...</nav>
<main id="main-content">...</main>
```

---

### Navbar.tsx

Main navigation bar with responsive design and sticky positioning.

**Features:**

- Sticky positioning with backdrop blur
- Desktop and mobile navigation
- Glitch effects on brand logo
- Active link highlighting
- Hide on scroll option
- Accessibility support with ARIA labels

**Usage:**

```tsx
<Navbar sticky hideOnScroll />
```

---

### NavLink.tsx

Individual navigation link component with active state styling.

---

### MobileMenu.tsx

Mobile navigation menu overlay component.

---

## File Structure

```
src/components/layout/
├── Layout.tsx          # Master layout wrapper
├── PageWrapper.tsx     # Page content container
├── Footer.tsx          # Site footer
├── SkipToContent.tsx   # Accessibility skip link
├── Navbar.tsx          # Main navigation bar
├── NavLink.tsx         # Navigation link component
├── MobileMenu.tsx      # Mobile menu overlay
└── README.md           # This file
```

## Integration

The Layout component is integrated at the app level in `App.tsx`:

```tsx
import Layout from './components/layout/Layout'

function App() {
  return (
    <Layout variant="default" transitionType="glitch">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* ... other routes */}
      </Routes>
    </Layout>
  )
}
```

---

### SocialLinks.tsx

A reusable component for displaying social media links with icons and hover effects.

**Usage:**

```tsx
import SocialLinks from './components/layout/SocialLinks'
import { socialLinks } from '../../config/social'

function MyComponent() {
  return <SocialLinks links={socialLinks} />
}
```

**Props:**

- `links: readonly SocialLink[]` - Array of social media links from config
- `className?: string` - Optional additional CSS classes

**Configuration:**

Social media links and footer content are configured in `src/config/social.ts`:

```typescript
import { socialLinks, footerLinks, legalInfo } from './config/social'
```

Update the configuration file to customize:

- Social media URLs and handles
- Contact email
- Footer navigation links
- Copyright information
- License details

---

## Accessibility Features

- **Skip to Content**: Allows keyboard users to bypass navigation
- **ARIA Labels**: Proper navigation and landmark labels
- **Semantic HTML**: Correct use of `<header>`, `<nav>`, `<main>`, `<footer>`
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Reduced Motion**: Respects user's motion preferences

## Styling

All components use:

- Tailwind CSS utility classes
- Custom cyberpunk theme colors
- Responsive breakpoints (sm, md, lg)
- Framer Motion for animations
