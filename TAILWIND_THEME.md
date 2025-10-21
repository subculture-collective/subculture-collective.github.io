# TailwindCSS Custom Theme - Subcult Aesthetic

## Overview
This document outlines the custom TailwindCSS theme configuration for the Subculture Collective project. The theme embodies a hacker culture meets avant-garde zine aesthetic with clean typography and glitchy energy.

## Color Palette

### Primary Colors - Neon/Electric
These are the main accent colors for the site, providing high-energy cyberpunk vibes:

- **neon-cyan** (`#00FFFF`) - Bright cyan for primary CTAs and highlights
- **electric-blue** (`#0066FF`) - Electric blue for hover states and secondary elements
- **neon-green** (`#39FF14`) - High-visibility green for success states and accents

```html
<!-- Usage Examples -->
<h1 class="text-neon-cyan">Neon Cyan Heading</h1>
<button class="bg-electric-blue">Electric Blue Button</button>
<span class="text-neon-green">Success Message</span>
```

### Secondary Colors - Dark Foundation
The dark, underground aesthetic base colors:

- **cyber-black** (`#0A0A0A`) - Primary background color
- **deep-gray** (`#1A1A1A`) - Card backgrounds and sections
- **mid-gray** (`#2A2A2A`) - Borders and dividers
- **light-gray** (`#3A3A3A`) - Subtle highlights and hover states
- **subcult-dark** (`#0F0F0F`) - Alternative dark background
- **subcult-darker** (`#050505`) - Ultra-dark for depth

```html
<!-- Usage Examples -->
<body class="bg-cyber-black">
<div class="bg-deep-gray border border-mid-gray">
  <p class="text-white">Content</p>
</div>
```

### Accent Colors - Glitch Inspired
Vibrant, glitch-aesthetic colors for special effects:

- **glitch-magenta** (`#FF00FF`) - Bright magenta for glitch effects
- **glitch-yellow** (`#FFFF00`) - High-contrast yellow for warnings
- **glitch-red** (`#FF0055`) - Vibrant red for errors and alerts
- **glitch-green** (`#00FF41`) - Matrix-style green for code/tech elements

```html
<!-- Usage Examples -->
<span class="text-glitch-magenta">Glitchy Text</span>
<code class="text-glitch-green">console.log('code')</code>
```

## Typography

### Font Families

#### Display Fonts (Headers)
Industrial and geometric fonts for impactful headings:
- **font-display**: Space Grotesk, Rajdhani, Orbitron
- **font-industrial**: Rajdhani, Saira Condensed

```html
<h1 class="font-display">Industrial Header</h1>
<h2 class="font-industrial">Alternative Header</h2>
```

#### Body Fonts
Clean, readable fonts for content:
- **font-mono**: JetBrains Mono, Fira Code, Roboto Mono
- **font-sans**: Inter, system fonts

```html
<p class="font-sans">Body text content</p>
<code class="font-mono">Code snippet</code>
```

### Heading Sizes
Pre-configured responsive heading sizes using Tailwind's `@apply`:
- `h1`: 5xl → 6xl → 7xl
- `h2`: 4xl → 5xl → 6xl
- `h3`: 3xl → 4xl → 5xl
- `h4`: 2xl → 3xl
- `h5`: xl → 2xl
- `h6`: lg → xl

## Animations

### Glitch Effects
Multiple glitch animation speeds for different use cases:

- **animate-glitch**: Standard glitch (1s loop)
- **animate-glitch-slow**: Slow glitch (3s loop)
- **animate-glitch-fast**: Fast glitch (0.5s loop)

```html
<h1 class="animate-glitch">Glitching Heading</h1>
<span class="text-glitch hover:animate-glitch-fast">Hover to Glitch</span>
```

### Other Animations
- **animate-scan**: Scanning line effect (8s loop)
- **animate-flicker**: Screen flicker effect (0.15s loop)
- **animate-pulse-glow**: Pulsing glow effect (2s loop)

```html
<div class="scanner">Scanning effect container</div>
<button class="animate-pulse-glow">Glowing Button</button>
```

## Component Classes

### .text-glitch
Adds glitch text shadow effect with color displacement:

```html
<h1 class="text-glitch">Glitch Text</h1>
```

### .btn-neon
Neon-styled button with hover effects:

```html
<button class="btn-neon">Neon Button</button>
```

### .cyber-card
Card component with hover effects and backdrop blur:

```html
<div class="cyber-card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

### .scanner
Container with animated scanning line effect:

```html
<div class="scanner">
  Content with scanner effect
</div>
```

### .glitch-container
Advanced glitch effect with pseudo-elements (requires data-text attribute):

```html
<h1 class="glitch-container" data-text="SUBCULT">SUBCULT</h1>
```

## Utility Classes

### Text Effects
- **text-shadow-neon**: Neon glow text shadow
- **text-shadow-neon-strong**: Stronger neon glow

```html
<h1 class="text-neon-cyan text-shadow-neon">Glowing Text</h1>
```

### Backdrop Effects
- **backdrop-cyber**: Blur and brightness backdrop filter

```html
<div class="backdrop-cyber">Cyberpunk backdrop</div>
```

### Scrollbar Styling
- **scrollbar-cyber**: Custom styled scrollbar

```html
<div class="overflow-auto scrollbar-cyber">
  Scrollable content
</div>
```

## Box Shadows

### Neon Shadows
Pre-configured neon glow shadows:
- **shadow-neon**: Standard neon glow
- **shadow-neon-strong**: Intense neon glow
- **shadow-cyber**: Cyan-tinted shadow

```html
<div class="shadow-neon">Standard glow</div>
<button class="shadow-neon-strong">Intense glow</button>
<div class="cyber-card shadow-cyber">Cyber shadow</div>
```

## Background Gradients
- **bg-glitch-gradient**: Cyan → Magenta → Green gradient
- **bg-cyber-gradient**: Dark gradient for depth

```html
<div class="bg-glitch-gradient">Gradient background</div>
```

## Usage Guidelines

### Best Practices

1. **Color Contrast**: Always ensure sufficient contrast between text and background colors for accessibility
2. **Animation Usage**: Use animations sparingly to avoid overwhelming users
3. **Glitch Effects**: Reserve for special emphasis, not for all text
4. **Dark Theme**: The design is optimized for dark mode; light mode is not recommended
5. **Typography Hierarchy**: Use display fonts for headers and sans-serif for body text

### Common Patterns

#### Hero Section
```html
<section class="bg-cyber-black min-h-screen flex items-center justify-center">
  <div class="text-center">
    <h1 class="font-display text-neon-cyan text-shadow-neon animate-glitch-slow">
      SUBCULT
    </h1>
    <p class="font-sans text-white mt-4">
      Underground culture meets digital art
    </p>
    <button class="btn-neon mt-8">
      Enter
    </button>
  </div>
</section>
```

#### Content Card
```html
<article class="cyber-card">
  <h2 class="font-display text-electric-blue mb-4">
    Article Title
  </h2>
  <p class="font-sans text-gray-300">
    Article content goes here...
  </p>
  <code class="text-glitch-green mt-4 block">
    ./subcult.sh --read
  </code>
</article>
```

#### Glitch Text Heading
```html
<h1 class="font-display text-glitch text-6xl" data-text="GLITCH">
  GLITCH
</h1>
```

## Customization

To customize the theme further, edit `tailwind.config.js`:

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        'custom-color': '#HEXCODE',
      },
      // Add more customizations
    },
  },
}
```

## Browser Support

The theme uses modern CSS features including:
- CSS Grid and Flexbox
- CSS Custom Properties
- CSS Animations
- backdrop-filter (may require fallbacks in older browsers)

Tested and optimized for:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Resources

- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Google Fonts](https://fonts.google.com/)
- Color palette inspired by cyberpunk and hacker aesthetics
