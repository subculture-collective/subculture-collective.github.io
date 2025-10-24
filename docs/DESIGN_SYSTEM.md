# Design System Documentation

This document outlines the Subculture Collective design system, including brand guidelines, color palette, typography, component patterns, and animation guidelines.

## Table of Contents

- [Brand Identity](#brand-identity)
- [Color Palette](#color-palette)
- [Typography](#typography)
- [Spacing & Layout](#spacing--layout)
- [Component Patterns](#component-patterns)
- [Animation Guidelines](#animation-guidelines)
- [Accessibility](#accessibility)
- [Responsive Design](#responsive-design)

## Brand Identity

### Overview

Subculture Collective embodies a **cyberpunk aesthetic meets avant-garde zine** design philosophy. The visual language combines:

- **Underground hacker culture**: Dark, technical, precise
- **DIY zine aesthetic**: Raw, creative, experimental
- **Modern web design**: Clean, accessible, performant
- **Neon cyberpunk**: High-energy electric colors

### Brand Values

- **Independent**: Grassroots, community-driven
- **Experimental**: Pushing boundaries, trying new things
- **Technical**: Precise, well-crafted
- **Inclusive**: Welcoming to all creators
- **Authentic**: Real, unpolished, genuine

### Visual Style

- **Dark foundations**: Black and dark gray backgrounds
- **Neon accents**: Bright cyan, electric blue, magenta
- **Clean typography**: Readable with glitch effects for emphasis
- **Minimal UI**: Focus on content, not decoration
- **Smooth animations**: Subtle, purposeful motion

## Color Palette

### Primary Colors

Electric, high-energy accent colors:

```css
--neon-cyan: #00ffff /* Primary CTAs, highlights */ --electric-blue: #0066ff
  /* Secondary elements, hover states */ --neon-green: #39ff14
  /* Success states, accents */;
```

**Usage**:

- Primary buttons and CTAs
- Link hover states
- Important highlights
- Success indicators

**Examples**:

```tsx
<button className="bg-neon-cyan text-cyber-black">Primary CTA</button>
<a className="text-electric-blue hover:text-neon-cyan">Link</a>
<span className="text-neon-green">✓ Success</span>
```

### Dark Foundation Colors

The base color palette for backgrounds and surfaces:

```css
--cyber-black: #0a0a0a /* Primary background */ --subcult-darker: #050505
  /* Ultra-dark sections */ --subcult-dark: #0f0f0f
  /* Alternative backgrounds */ --deep-gray: #1a1a1a /* Cards, sections */
  --mid-gray: #2a2a2a /* Borders, dividers */ --light-gray: #3a3a3a
  /* Subtle highlights */;
```

**Usage**:

- Page backgrounds: `cyber-black` or `subcult-dark`
- Card backgrounds: `deep-gray`
- Borders: `mid-gray`
- Hover states: `light-gray`

**Examples**:

```tsx
<body className="bg-cyber-black text-white">
  <div className="bg-deep-gray border border-mid-gray">
    <p className="text-white">Content</p>
  </div>
</body>
```

### Glitch/Accent Colors

Vibrant colors for special effects and emphasis:

```css
--glitch-magenta: #ff00ff /* Glitch effects, emphasis */
  --glitch-yellow: #ffff00 /* Warnings, highlights */ --glitch-red: #ff0055
  /* Errors, alerts */;
```

**Usage**:

- Error messages
- Warning indicators
- Glitch text effects
- Special highlights

**Examples**:

```tsx
<p className="text-glitch-red">Error: Something went wrong</p>
<span className="text-glitch-yellow">⚠ Warning</span>
```

### Neutral Colors

For text and subtle UI elements:

```css
--white: #ffffff /* Primary text */ --gray-light: #cccccc /* Secondary text */
  --gray-mid: #888888 /* Tertiary text */ --gray-dark: #555555
  /* Disabled text */;
```

**Text Hierarchy**:

- Headings: `text-white`
- Body text: `text-gray-light`
- Secondary text: `text-gray-mid`
- Disabled: `text-gray-dark`

### Color Accessibility

All color combinations meet WCAG 2.1 AA contrast requirements:

- White on cyber-black: **19.57:1** ✓
- Neon-cyan on cyber-black: **13.31:1** ✓
- Gray-light on cyber-black: **12.63:1** ✓
- Electric-blue on cyber-black: **5.73:1** ✓

See [ACCESSIBILITY.md](../ACCESSIBILITY.md) for details.

## Typography

### Font Families

```css
/* Primary font - Body text */
font-family: 'Inter', system-ui, sans-serif;

/* Monospace font - Code, technical elements */
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```

**Usage**:

- Body text: Inter
- Headings: Inter (bold weights)
- Code blocks: JetBrains Mono
- Technical labels: JetBrains Mono

### Type Scale

Based on a modular scale with base size 16px:

```css
text-xs:   0.75rem  (12px)
text-sm:   0.875rem (14px)
text-base: 1rem     (16px)
text-lg:   1.125rem (18px)
text-xl:   1.25rem  (20px)
text-2xl:  1.5rem   (24px)
text-3xl:  1.875rem (30px)
text-4xl:  2.25rem  (36px)
text-5xl:  3rem     (48px)
text-6xl:  3.75rem  (60px)
```

### Heading Styles

```tsx
// H1 - Page titles
<h1 className="text-5xl md:text-6xl font-bold text-white">
  Main Heading
</h1>

// H2 - Section headings
<h2 className="text-3xl md:text-4xl font-bold text-neon-cyan">
  Section Heading
</h2>

// H3 - Subsection headings
<h3 className="text-2xl md:text-3xl font-semibold text-white">
  Subsection
</h3>

// H4 - Component headings
<h4 className="text-xl font-semibold text-gray-light">
  Component Heading
</h4>
```

### Body Text

```tsx
// Regular paragraph
<p className="text-base text-gray-light leading-relaxed">
  Body text content
</p>

// Large text (intro/lead)
<p className="text-lg text-white leading-relaxed">
  Lead paragraph
</p>

// Small text (captions, meta)
<p className="text-sm text-gray-mid">
  Caption or metadata
</p>
```

### Font Weights

```css
font-thin:       100
font-light:      300
font-normal:     400
font-medium:     500
font-semibold:   600
font-bold:       700
font-extrabold:  800
```

**Usage**:

- Headings: `font-bold` or `font-semibold`
- Body text: `font-normal`
- Emphasis: `font-medium` or `font-semibold`

## Spacing & Layout

### Spacing Scale

Based on 4px base unit:

```css
0:   0px
1:   4px
2:   8px
3:   12px
4:   16px
5:   20px
6:   24px
8:   32px
10:  40px
12:  48px
16:  64px
20:  80px
24:  96px
32:  128px
```

### Layout Patterns

#### Container

```tsx
<div className="container mx-auto px-4 md:px-6 lg:px-8">Content</div>
```

#### Section Spacing

```tsx
<section className="py-16 md:py-24 lg:py-32">Section content</section>
```

#### Card Spacing

```tsx
<div className="p-6 md:p-8 lg:p-10">Card content</div>
```

### Breakpoints

```css
sm:  640px   /* Mobile landscape */
md:  768px   /* Tablet */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large desktop */
2xl: 1536px  /* Extra large */
```

**Mobile-First Approach**:

```tsx
<div className="text-base md:text-lg lg:text-xl">Responsive text</div>
```

See [RESPONSIVE_DESIGN.md](../RESPONSIVE_DESIGN.md) for details.

## Component Patterns

### Buttons

#### Primary Button

```tsx
<button
  className="
  bg-neon-cyan text-cyber-black
  px-6 py-3 rounded-lg
  font-semibold
  hover:bg-electric-blue
  transition-colors duration-200
"
>
  Primary Action
</button>
```

#### Secondary Button

```tsx
<button
  className="
  border-2 border-neon-cyan text-neon-cyan
  px-6 py-3 rounded-lg
  font-semibold
  hover:bg-neon-cyan hover:text-cyber-black
  transition-all duration-200
"
>
  Secondary Action
</button>
```

#### Ghost Button

```tsx
<button
  className="
  text-neon-cyan
  px-4 py-2
  hover:bg-deep-gray
  transition-colors duration-200
"
>
  Ghost Action
</button>
```

### Cards

#### Basic Card

```tsx
<div
  className="
  bg-deep-gray
  border border-mid-gray
  rounded-lg
  p-6
  hover:border-neon-cyan
  transition-colors duration-300
"
>
  Card content
</div>
```

#### Elevated Card

```tsx
<div
  className="
  bg-deep-gray
  border border-mid-gray
  rounded-lg
  p-6
  shadow-lg shadow-neon-cyan/10
  hover:shadow-neon-cyan/20
  transition-shadow duration-300
"
>
  Card content
</div>
```

### Forms

#### Input Field

```tsx
<input
  type="text"
  className="
    w-full
    bg-cyber-black
    border border-mid-gray
    rounded-lg
    px-4 py-3
    text-white
    placeholder-gray-mid
    focus:border-neon-cyan
    focus:outline-none
    transition-colors duration-200
  "
  placeholder="Enter text..."
/>
```

#### Textarea

```tsx
<textarea
  className="
    w-full
    bg-cyber-black
    border border-mid-gray
    rounded-lg
    px-4 py-3
    text-white
    placeholder-gray-mid
    focus:border-neon-cyan
    focus:outline-none
    transition-colors duration-200
    resize-none
  "
  rows={4}
  placeholder="Enter message..."
/>
```

### Links

```tsx
<a
  href="/path"
  className="
    text-electric-blue
    hover:text-neon-cyan
    underline-offset-4
    hover:underline
    transition-colors duration-200
  "
>
  Link text
</a>
```

## Animation Guidelines

### Principles

1. **Purposeful**: Animations should enhance UX, not distract
2. **Subtle**: Prefer smooth, understated transitions
3. **Fast**: Keep animations under 300ms for interactions
4. **Respect preferences**: Honor `prefers-reduced-motion`

### Durations

```css
duration-75:   75ms    /* Very fast (hover states) */
duration-150:  150ms   /* Fast (button clicks) */
duration-200:  200ms   /* Normal (most transitions) */
duration-300:  300ms   /* Slow (entering/exiting) */
duration-500:  500ms   /* Very slow (complex animations) */
```

### Easing

```css
ease-linear     /* Linear motion */
ease-in         /* Slow start */
ease-out        /* Slow end */
ease-in-out     /* Slow start and end */
```

**Recommended**:

- Interactions: `ease-out`
- Exits: `ease-in`
- General: `ease-in-out`

### Common Animations

#### Fade In

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

#### Slide In

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
>
  Content
</motion.div>
```

#### Scale

```tsx
<motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
  Content
</motion.div>
```

See [ANIMATIONS.md](../ANIMATIONS.md) for more patterns.

### Reduced Motion

Always respect user preferences:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.4,
    ease: 'easeOut',
    // Disable if user prefers reduced motion
    ...(window.matchMedia('(prefers-reduced-motion: reduce)').matches && {
      duration: 0,
    }),
  }}
>
  Content
</motion.div>
```

## Accessibility

### Focus States

All interactive elements must have visible focus indicators:

```tsx
<button
  className="
  focus:outline-none
  focus:ring-2
  focus:ring-neon-cyan
  focus:ring-offset-2
  focus:ring-offset-cyber-black
"
>
  Accessible Button
</button>
```

### Color Contrast

Maintain WCAG 2.1 AA contrast ratios:

- Normal text: Minimum 4.5:1
- Large text (18pt+): Minimum 3:1
- UI components: Minimum 3:1

### Text Alternatives

Always provide alt text for images:

```tsx
<img src="/image.jpg" alt="Descriptive alt text" />
```

See [ACCESSIBILITY.md](../ACCESSIBILITY.md) for complete guidelines.

## Responsive Design

### Mobile-First Approach

Design for mobile first, then enhance for larger screens:

```tsx
<div
  className="
  text-base          /* Mobile */
  md:text-lg         /* Tablet */
  lg:text-xl         /* Desktop */
"
>
  Responsive text
</div>
```

### Responsive Images

Use responsive images with proper sizing:

```tsx
<OptimizedImage
  src="/image.jpg"
  srcSet="/image-400.jpg 400w, /image-800.jpg 800w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Description"
/>
```

### Touch Targets

Ensure touch targets are at least 44x44px:

```tsx
<button
  className="
  min-h-[44px]
  min-w-[44px]
  px-6 py-3
"
>
  Touch-friendly
</button>
```

See [RESPONSIVE_DESIGN.md](../RESPONSIVE_DESIGN.md) for details.

## Design Tokens

All design values are defined in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        /* color palette */
      },
      fontFamily: {
        /* font stacks */
      },
      spacing: {
        /* spacing scale */
      },
      // ... other tokens
    },
  },
}
```

See [TAILWIND_THEME.md](../TAILWIND_THEME.md) for complete configuration.

## Resources

- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Inclusive Components](https://inclusive-components.design/)

---

For design questions, open a [Discussion](https://github.com/subculture-collective/subculture-collective.github.io/discussions).
