# Layout Components

This directory contains layout-related components that are used across the entire site.

## Footer

The main site footer component with multi-column layout, social links, and legal information.

### Usage

```tsx
import Footer from './components/layout/Footer'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Your page content */}
      <Footer />
    </div>
  )
}
```

### Features

- Responsive multi-column layout (4 columns on desktop, 1 column on mobile)
- Animated social media icons with hover effects
- Copyright and legal information
- Entrance animations using Framer Motion
- Dark cyberpunk theme consistent with site design

## SocialLinks

A reusable component for displaying social media links with icons and hover effects.

### Usage

```tsx
import SocialLinks from './components/layout/SocialLinks'
import { socialLinks } from '../../config/social'

function MyComponent() {
  return <SocialLinks links={socialLinks} />
}
```

### Props

- `links: readonly SocialLink[]` - Array of social media links from config
- `className?: string` - Optional additional CSS classes

### Configuration

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
