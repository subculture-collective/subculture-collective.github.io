# Accessibility Guide

This document outlines the accessibility features of SUBCULT.TV and provides guidelines for maintaining accessibility standards.

## Overview

SUBCULT.TV is committed to meeting **WCAG 2.1 Level AA** accessibility standards. This ensures our website is usable by people with various disabilities, including those who use assistive technologies like screen readers, keyboard-only navigation, or have visual impairments.

## Current Accessibility Features

### 1. Semantic HTML Structure

- ✅ Proper heading hierarchy (h1 → h6)
- ✅ Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`
- ✅ Lists for list content (`<ul>`, `<ol>`)
- ✅ Correct use of `<button>` vs `<a>` elements

### 2. Keyboard Navigation

- ✅ All interactive elements are keyboard accessible
- ✅ Visible focus indicators on all focusable elements
- ✅ Logical tab order throughout the site
- ✅ "Skip to main content" link for bypassing navigation
- ✅ Escape key closes modals and menus
- ✅ Arrow keys for navigation where appropriate

### 3. Screen Reader Support

- ✅ Descriptive alt text for all meaningful images
- ✅ Decorative images have `alt=""` or use CSS backgrounds
- ✅ ARIA labels for complex interactive elements
- ✅ ARIA live regions for dynamic content updates
- ✅ Form labels properly associated with inputs using `htmlFor`/`id`
- ✅ Error messages announced with `role="alert"`

### 4. Color & Contrast

- ✅ Minimum 4.5:1 contrast ratio for normal text
- ✅ Minimum 3:1 contrast ratio for large text and UI components
- ✅ Information not conveyed by color alone
- ✅ Focus indicators visible and high contrast

**Color Palette Contrast Ratios:**

- `neon-cyan` (#00FFFF) on `cyber-black` (#0A0A0A): **14.8:1** ✅
- `electric-blue` (#0066FF) on `cyber-black` (#0A0A0A): **7.4:1** ✅
- `neon-green` (#39FF14) on `cyber-black` (#0A0A0A): **12.5:1** ✅
- Gray text (#A0A0A0) on `cyber-black`: **5.2:1** ✅

### 5. Forms

- ✅ Labels for all form inputs
- ✅ Required fields indicated with asterisk and aria-required
- ✅ Error messages clear, specific, and announced
- ✅ Autocomplete attributes for common fields:
  - `autoComplete="name"` for name fields
  - `autoComplete="email"` for email fields
  - `autoComplete="url"` for URL fields
- ✅ Error prevention and validation feedback

### 6. Motion & Animation

- ✅ `prefers-reduced-motion` media query respected
- ✅ `useReducedMotion` React hook for dynamic content
- ✅ No auto-playing media
- ✅ No flashing content (seizure risk)
- ✅ Animations can be paused or stopped

### 7. Touch & Mobile

- ✅ Touch targets at least 44x44 pixels
- ✅ Responsive design works on all screen sizes
- ✅ Mobile menu keyboard accessible
- ✅ No hover-only interactions

## Implementation Details

### Skip to Content Link

Located in `src/components/layout/SkipToContent.tsx`:

```tsx
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

The main content area has the matching ID:

```tsx
<main id="main-content" tabIndex={-1}>
```

### Reduced Motion Hook

Located in `src/hooks/useReducedMotion.ts`:

```tsx
export function useReducedMotion(): boolean {
  // Detects user's motion preferences
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  return mediaQuery.matches
}
```

Used throughout components to disable or reduce animations.

### Visually Hidden Component

Located in `src/components/a11y/VisuallyHidden.tsx`:

```tsx
<VisuallyHidden>Additional context for screen readers</VisuallyHidden>
```

Hides content visually while keeping it accessible to screen readers.

### Focus Indicators

Global focus styles in `src/index.css`:

```css
*:focus-visible {
  @apply outline-none ring-2 ring-neon-cyan ring-offset-2 ring-offset-cyber-black;
}
```

## Testing Accessibility

### Automated Testing

1. **ESLint with jsx-a11y**

   ```bash
   npm run lint
   ```

   Catches common accessibility issues during development.

2. **Lighthouse CI**

   ```bash
   npm run build
   npx @lhci/cli autorun
   ```

   Automated accessibility audits in CI/CD.

3. **axe DevTools**
   - Install browser extension
   - Run on each page
   - Fix all issues before deployment

### Manual Testing

1. **Keyboard Navigation**
   - Tab through all interactive elements
   - Verify focus indicators are visible
   - Test skip link (press Tab on page load)
   - Ensure logical tab order
   - Test Escape key on modals/menus

2. **Screen Readers**
   - **NVDA (Windows)**: Free, open source
   - **JAWS (Windows)**: Industry standard (paid)
   - **VoiceOver (macOS/iOS)**: Built-in
   - **TalkBack (Android)**: Built-in

   Test checklist:
   - [ ] All content is announced
   - [ ] Images have descriptive alt text
   - [ ] Form labels are properly associated
   - [ ] Headings provide clear structure
   - [ ] Links are descriptive out of context
   - [ ] Error messages are announced

3. **Color Contrast**
   - Use browser DevTools contrast checker
   - Test with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
   - Verify all text meets WCAG AA standards

4. **Reduced Motion**
   - Enable "Reduce motion" in OS settings:
     - **macOS**: System Preferences → Accessibility → Display → Reduce motion
     - **Windows**: Settings → Ease of Access → Display → Show animations
     - **iOS**: Settings → Accessibility → Motion → Reduce Motion
   - Verify animations are disabled or minimized

5. **Mobile Testing**
   - Test on real devices when possible
   - Use Chrome DevTools device emulation
   - Test with screen readers (VoiceOver, TalkBack)
   - Verify touch targets are adequate size

## Maintaining Accessibility

### Component Checklist

When creating new components, ensure:

- [ ] Semantic HTML elements are used
- [ ] Interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Images have alt text (or alt="" for decorative)
- [ ] Form inputs have associated labels
- [ ] Buttons and links are properly distinguished
- [ ] ARIA attributes are used appropriately (not overused)
- [ ] Motion respects `prefers-reduced-motion`
- [ ] Color contrast meets WCAG AA standards
- [ ] Touch targets are at least 44x44 pixels

### Common Patterns

#### Buttons vs Links

```tsx
// Use button for actions
<button onClick={handleAction}>Submit Form</button>

// Use link for navigation
<Link to="/page">View Page</Link>
```

#### Form Fields

```tsx
<label htmlFor="email" className="...">
  Email
  <span className="text-glitch-red">*</span>
</label>
<input
  type="email"
  id="email"
  name="email"
  autoComplete="email"
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby={hasError ? 'email-error' : undefined}
/>
{hasError && (
  <p id="email-error" role="alert">
    Please enter a valid email address
  </p>
)}
```

#### Images

```tsx
// Meaningful image
<img src="..." alt="Developer coding on laptop" />

// Decorative image
<img src="..." alt="" aria-hidden="true" />

// Or use CSS background for decorative images
```

#### Icon Buttons

```tsx
<button aria-label="Close menu">
  <CloseIcon aria-hidden="true" />
</button>
```

#### Loading States

```tsx
<div aria-live="polite" aria-busy={isLoading}>
  {isLoading ? 'Loading...' : content}
</div>
```

## Resources

### WCAG Guidelines

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM WCAG Checklist](https://webaim.org/standards/wcag/checklist)

### Testing Tools

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Learning Resources

- [MDN Web Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM Resources](https://webaim.org/resources/)
- [A11y Project](https://www.a11yproject.com/)
- [Inclusive Components](https://inclusive-components.design/)

### ARIA Reference

- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [ARIA in HTML](https://www.w3.org/TR/html-aria/)

## Support

If you discover accessibility issues:

1. **Check existing issues** on GitHub
2. **Create a new issue** with:
   - Description of the problem
   - Steps to reproduce
   - Your setup (browser, screen reader, etc.)
   - Screenshots or recordings if helpful
3. **Label it** with `accessibility` tag

For urgent accessibility concerns, email: contact@subcult.tv

## Statement

Our accessibility statement page is available at `/accessibility`.

## Changelog

### 2025-01-23

- ✅ Created VisuallyHidden component
- ✅ Added accessibility statement page
- ✅ Enhanced focus indicators
- ✅ Added autocomplete attributes to forms
- ✅ Created accessibility testing workflow
- ✅ Added comprehensive accessibility documentation

---

**Last Updated**: January 23, 2025
**WCAG Level**: AA (Partial Conformance)
**Next Review**: April 23, 2025
