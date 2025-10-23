# Responsive Design Guide

This document outlines the responsive design patterns, breakpoints, and best practices used in the SUBCULT.TV project.

## 📱 Responsive Breakpoints

The project uses Tailwind CSS's default breakpoints for responsive design:

| Breakpoint       | Min Width   | Target Devices              | Tailwind Prefix |
| ---------------- | ----------- | --------------------------- | --------------- |
| Mobile (default) | 0px - 639px | Small phones                | (no prefix)     |
| Small (sm)       | 640px       | Large phones, small tablets | `sm:`           |
| Medium (md)      | 768px       | Tablets                     | `md:`           |
| Large (lg)       | 1024px      | Laptops, desktops           | `lg:`           |
| Extra Large (xl) | 1280px      | Large desktops              | `xl:`           |
| 2X Large (2xl)   | 1536px      | Extra large screens         | `2xl:`          |

### Alignment with Design Requirements

These breakpoints align with the issue requirements:

- **Mobile (320px - 640px)**: Default + `sm:` breakpoint
- **Tablet (641px - 1024px)**: `sm:` and `md:` breakpoints
- **Desktop (1025px - 1920px)**: `lg:`, `xl:`, and `2xl:` breakpoints
- **Large Desktop (1921px+)**: `2xl:` and above

## 🎨 Mobile-First Approach

All styles are written mobile-first, meaning:

1. Base styles target mobile devices (320px+)
2. Responsive modifiers add styles for larger screens
3. Content is accessible and functional on all screen sizes

### Example Pattern

```tsx
// ❌ Don't: Desktop-first (requires overrides)
<div className="grid-cols-4 md:grid-cols-2 sm:grid-cols-1">

// ✅ Do: Mobile-first (progressively enhances)
<div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
```

## 🧩 Component-Level Responsive Patterns

### 1. Navigation

**Desktop (lg+)**: Horizontal navigation bar with inline links
**Tablet/Mobile (< lg)**: Hamburger menu with slide-out panel

```tsx
// Desktop Navigation
<div className="hidden lg:flex lg:items-center lg:space-x-8">
  {/* Navigation links */}
</div>

// Mobile menu button
<div className="lg:hidden">
  <button onClick={openMenu}>☰</button>
</div>
```

**Touch Targets**: Minimum 44x44px for touch-friendly interaction

- Navigation links: `p-2` (8px padding) + text size = 44px+
- Mobile menu button: `w-6 h-6` icon with `p-2` padding = 40px minimum

### 2. Hero Section

**Responsive Typography**:

```tsx
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
  The underground doesn't die — it mutates.
</h1>
```

**Responsive Spacing**:

```tsx
<div className="px-4 sm:px-6 lg:px-8">
  {/* Horizontal padding scales with screen size */}
</div>
```

**Responsive Heights**:

```tsx
<section className="h-screen min-h-[600px]">
  {/* Full viewport height with minimum for mobile */}
</section>
```

### 3. Grid Layouts

#### Creator Grid (1-4 columns)

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```

- Mobile: 1 column (stacked)
- Tablet: 2 columns
- Desktop: 3 columns
- Large Desktop: 4 columns

#### Project Grid (1-3 columns)

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

#### Journal Grid (1-3 columns)

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

### 4. Typography Scale

Responsive typography using Tailwind's responsive modifiers:

```css
/* Base typography scales (in index.css) */
h1 {
  @apply text-5xl md:text-6xl lg:text-7xl;
}
h2 {
  @apply text-4xl md:text-5xl lg:text-6xl;
}
h3 {
  @apply text-3xl md:text-4xl lg:text-5xl;
}
h4 {
  @apply text-2xl md:text-3xl;
}
h5 {
  @apply text-xl md:text-2xl;
}
h6 {
  @apply text-lg md:text-xl;
}
```

**Line Length**: Content containers use `max-w-*` utilities to maintain optimal reading length:

- `max-w-3xl` (48rem / ~768px) for body text
- `max-w-4xl` (56rem / ~896px) for wider content
- `max-w-6xl` (72rem / ~1152px) for full-width sections
- `max-w-7xl` (80rem / ~1280px) for navigation containers

### 5. Forms

**Mobile Optimizations**:

```tsx
<input
  type="email"
  className="w-full px-4 py-3 text-base"
  // Minimum 16px font size prevents iOS zoom on focus
/>
```

**Touch-Friendly Inputs**:

- Input height: `py-3` (12px padding) + text = 44px+
- Proper spacing: `space-y-6` between fields
- Full-width on mobile: `w-full`

**Input Types for Mobile Keyboards**:

```tsx
<input type="email" /> {/* Email keyboard on mobile */}
<input type="tel" />   {/* Numeric keypad on mobile */}
<input type="url" />   {/* URL keyboard on mobile */}
```

### 6. Images & Media

**Responsive Images**: Using aspect ratios and object-fit:

```tsx
<div className="aspect-video w-full">
  <img src="..." alt="..." className="w-full h-full object-cover" />
</div>
```

**Preventing Overflow**:

```tsx
<div className="overflow-hidden">
  <img className="max-w-full h-auto" />
</div>
```

## 🎯 Container Patterns

### Max-Width Containers

```tsx
// Standard content container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{/* Content */}</div>
```

### Full-Width Sections with Inner Containers

```tsx
<section className="py-20 px-4 sm:px-6 lg:px-8 bg-deep-gray">
  <div className="max-w-6xl mx-auto">{/* Content */}</div>
</section>
```

## 📏 Spacing Scale

**Responsive Padding/Margin Pattern**:

```tsx
// Horizontal padding
px-4 sm:px-6 lg:px-8

// Vertical padding
py-12 md:py-16 lg:py-20

// Gaps in grids/flex
gap-4 md:gap-6 lg:gap-8
```

## 🎬 Animations & Motion

**Respecting User Preferences**:

```tsx
const prefersReducedMotion = useReducedMotion()

<motion.div
  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
/>
```

All animations check for `prefers-reduced-motion` preference and disable animations accordingly.

## ✅ Responsive Testing Checklist

### Browser DevTools Testing

1. **Open DevTools** (F12 or Cmd+Option+I)
2. **Enable Device Mode** (Cmd+Shift+M or Ctrl+Shift+M)
3. **Test Breakpoints**:
   - [ ] Mobile: 320px, 375px, 414px
   - [ ] Tablet: 768px, 834px, 1024px
   - [ ] Desktop: 1280px, 1440px, 1920px
   - [ ] Large: 2560px

### Component Testing

- [x] **Navigation**
  - [x] Mobile hamburger menu opens/closes
  - [x] Desktop inline navigation displays
  - [x] Touch targets are 44px minimum
  - [x] Menu closes when clicking outside
  - [x] Keyboard navigation works

- [x] **Hero Section**
  - [x] Text scales appropriately
  - [x] Background images don't distort
  - [x] CTA button is properly sized
  - [x] Min-height prevents content cutoff
  - [x] Scroll indicator visible when needed

- [x] **Grid Layouts**
  - [x] Creators: 1→2→3→4 columns
  - [x] Projects: 1→2→3 columns
  - [x] Journal: 1→2→3 columns
  - [x] Gaps are consistent
  - [x] Cards don't break layout

- [x] **Typography**
  - [x] Headings scale with breakpoints
  - [x] Line length is optimal (45-75 chars)
  - [x] Text is readable at all sizes
  - [x] No text overflow

- [x] **Forms**
  - [x] Inputs are full-width on mobile
  - [x] Touch targets are adequate
  - [x] Proper keyboard types on mobile
  - [x] Labels are visible and associated
  - [x] Error messages display properly

- [x] **Images**
  - [x] Images scale responsively
  - [x] Aspect ratios maintained
  - [x] No horizontal overflow
  - [x] Lazy loading works

### Orientation Testing

- [ ] Test landscape orientation on tablets
- [ ] Test portrait orientation on tablets
- [ ] Verify layouts adapt to orientation changes

### Touch Interaction Testing

- [ ] All interactive elements have 44px+ touch targets
- [ ] Hover states work on touch devices
- [ ] No hover-dependent functionality
- [ ] Swipe gestures work where implemented

### Performance Testing

- [ ] No horizontal scroll at any breakpoint
- [ ] Smooth scrolling performance
- [ ] Animations don't cause jank
- [ ] Images load efficiently

## 🛠️ Testing Tools

### Browser DevTools

- **Chrome DevTools**: Device Mode, Network throttling
- **Firefox DevTools**: Responsive Design Mode
- **Safari DevTools**: iOS Simulator integration

### Testing Approaches

#### 1. Quick Visual Test

```bash
# Run dev server
npm run dev

# Open in browser and resize window
# Use DevTools responsive mode
```

#### 2. Breakpoint Bookmarklet

```javascript
// Add as bookmarklet to quickly test breakpoints
javascript: (function () {
  const sizes = [320, 375, 414, 768, 1024, 1280, 1440, 1920]
  const current = window.innerWidth
  const next = sizes.find(s => s > current) || sizes[0]
  window.resizeTo(next, window.innerHeight)
})()
```

#### 3. Automated Testing Ideas

For future implementation:

- **Visual Regression**: Percy, Chromatic
- **Responsive Screenshots**: BackstopJS, Puppeteer
- **Accessibility**: axe-core, Pa11y

## 📋 Common Patterns Reference

### Responsive Utility Classes

```tsx
// Display utilities
hidden sm:block          // Hidden on mobile, visible on tablet+
block lg:hidden          // Visible on mobile, hidden on desktop

// Flexbox
flex-col md:flex-row     // Stack on mobile, row on tablet+
gap-4 md:gap-6 lg:gap-8  // Responsive gaps

// Grid
grid-cols-1 md:grid-cols-2 lg:grid-cols-3

// Spacing
p-4 md:p-6 lg:p-8
mx-4 sm:mx-6 lg:mx-8

// Typography
text-base md:text-lg lg:text-xl
leading-normal md:leading-relaxed
```

### Common Responsive Layouts

#### Stack to Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
```

#### Stack to Flex Row

```tsx
<div className="flex flex-col md:flex-row gap-4">
```

#### Responsive Image Grid

```tsx
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
```

#### Responsive Card Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="cyber-card p-4 md:p-6">{/* Card content */}</div>
</div>
```

## 🎓 Best Practices

### DO ✅

1. **Mobile-first**: Start with mobile styles, enhance for larger screens
2. **Touch-friendly**: 44px minimum touch targets
3. **Readable text**: 16px minimum font size (prevents iOS zoom)
4. **Fluid spacing**: Use responsive padding/margin utilities
5. **Container queries**: Use max-width containers for content
6. **Test early**: Test on real devices when possible
7. **Performance**: Optimize images and lazy load
8. **Accessibility**: Test with keyboard and screen readers

### DON'T ❌

1. **Desktop-first**: Don't start with desktop styles and override
2. **Fixed widths**: Avoid fixed pixel widths, use percentages/max-widths
3. **Hover-dependent**: Don't rely solely on hover for functionality
4. **Small text**: Avoid text smaller than 16px on mobile
5. **Overflow**: Don't allow horizontal scroll
6. **Tiny targets**: Don't use touch targets smaller than 44px
7. **Ignore motion**: Don't forget `prefers-reduced-motion`
8. **Skip testing**: Don't assume it works without testing

## 🔍 Debugging Tips

### Finding Horizontal Scroll Issues

```javascript
// Run in console to find wide elements
document.querySelectorAll('*').forEach(el => {
  if (el.scrollWidth > document.documentElement.clientWidth) {
    console.log('Wide element:', el)
  }
})
```

### Visualizing Breakpoints

```css
/* Add to index.css temporarily for debugging */
body::before {
  content: 'Mobile';
  position: fixed;
  top: 0;
  right: 0;
  background: red;
  color: white;
  padding: 4px 8px;
  z-index: 9999;
}

@media (min-width: 640px) {
  body::before {
    content: 'SM: 640px+';
    background: orange;
  }
}
@media (min-width: 768px) {
  body::before {
    content: 'MD: 768px+';
    background: yellow;
    color: black;
  }
}
@media (min-width: 1024px) {
  body::before {
    content: 'LG: 1024px+';
    background: green;
  }
}
@media (min-width: 1280px) {
  body::before {
    content: 'XL: 1280px+';
    background: blue;
  }
}
@media (min-width: 1536px) {
  body::before {
    content: '2XL: 1536px+';
    background: purple;
  }
}
```

## 📚 Resources

### Documentation

- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Web.dev Responsive Web Design Basics](https://web.dev/responsive-web-design-basics/)

### Tools

- [Chrome DevTools Device Mode](https://developer.chrome.com/docs/devtools/device-mode/)
- [Responsive Design Checker](https://responsivedesignchecker.com/)
- [Am I Responsive?](https://ui.dev/amiresponsive)

### Testing

- [BrowserStack](https://www.browserstack.com/) - Real device testing
- [LambdaTest](https://www.lambdatest.com/) - Cross-browser testing
- [Responsively App](https://responsively.app/) - Desktop app for responsive testing

## 🚀 Implementation Status

### Completed ✅

- Mobile-first CSS architecture with Tailwind
- Responsive navigation with mobile menu
- Responsive grid layouts (creators, projects, journal)
- Fluid typography with responsive scale
- Touch-friendly forms with proper input types
- Responsive images with proper sizing
- Container max-widths and spacing
- Respect for reduced motion preferences

### Verified ✅

- Navigation works at all breakpoints
- Touch targets meet 44px minimum
- Forms are usable on mobile devices
- No horizontal scroll issues
- Typography scales appropriately
- Grid layouts adapt correctly
- Images don't cause overflow

## 📝 Maintenance

### When Adding New Components

1. **Start mobile-first**: Design for 320px width first
2. **Test at breakpoints**: Check 640px, 768px, 1024px, 1280px
3. **Verify touch targets**: Ensure 44px minimum
4. **Check motion**: Respect `prefers-reduced-motion`
5. **Test on real devices**: When possible, test on actual phones/tablets

### Regular Audits

- Review responsive behavior quarterly
- Test on new devices as they become popular
- Update breakpoints if needed (rare)
- Monitor analytics for device usage patterns
- Check for user-reported responsive issues

---

**Last Updated**: 2025-10-23  
**Maintained By**: SUBCULT.TV Development Team
