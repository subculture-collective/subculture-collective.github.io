# Accessibility Testing Checklist

Use this checklist to verify accessibility compliance before deploying updates.

## Automated Testing

### ESLint jsx-a11y

- [ ] Run `npm run lint`
- [ ] Verify no accessibility-related errors
- [ ] Fix any warnings related to jsx-a11y plugin

### Lighthouse Audit

- [ ] Run `npm run build`
- [ ] Run `npx @lhci/cli autorun`
- [ ] Verify accessibility score ≥ 90%
- [ ] Review and address any flagged issues

### axe DevTools

- [ ] Install [axe DevTools extension](https://www.deque.com/axe/devtools/)
- [ ] Test each major page:
  - [ ] Home (`/`)
  - [ ] About (`/about`)
  - [ ] Creators (`/creators`)
  - [ ] Projects (`/projects`)
  - [ ] Journal (`/journal`)
  - [ ] Join (`/join`)
  - [ ] Accessibility Statement (`/accessibility`)
- [ ] Fix all Critical and Serious issues
- [ ] Document any Known issues

### WAVE Extension

- [ ] Install [WAVE extension](https://wave.webaim.org/extension/)
- [ ] Test each major page
- [ ] Verify no errors
- [ ] Review and address warnings

## Manual Testing

### Keyboard Navigation

#### Desktop

- [ ] Tab through all interactive elements on each page
- [ ] Verify visible focus indicators on all elements
- [ ] Check logical tab order (left-to-right, top-to-bottom)
- [ ] Test "Skip to main content" link (press Tab on page load)
- [ ] Verify Escape key closes mobile menu
- [ ] Test Enter/Space to activate buttons
- [ ] Test Enter to follow links

#### Forms

- [ ] Tab through all form fields
- [ ] Verify labels are announced correctly
- [ ] Test form submission with keyboard
- [ ] Verify error messages appear and are accessible
- [ ] Check required field indicators

### Screen Reader Testing

#### NVDA (Windows - Free)

Download: https://www.nvaccess.org/

- [ ] Test homepage with NVDA
- [ ] Verify all content is announced
- [ ] Check heading navigation (H key)
- [ ] Test form field labels (Tab through form)
- [ ] Verify image alt text is read
- [ ] Check landmark navigation (D key for landmarks)
- [ ] Test link descriptions (Tab through links)

#### VoiceOver (macOS/iOS - Built-in)

Enable: System Preferences → Accessibility → VoiceOver

- [ ] Test homepage with VoiceOver
- [ ] Verify all content is announced
- [ ] Check heading navigation (VO + Command + H)
- [ ] Test form field labels
- [ ] Verify image alt text is read
- [ ] Check rotor for navigation

#### JAWS (Windows - Paid but has demo)

Download: https://www.freedomscientific.com/products/software/jaws/

- [ ] Test homepage with JAWS
- [ ] Verify all content is announced
- [ ] Check heading navigation (H key)
- [ ] Test form field labels
- [ ] Verify image alt text is read

### Color and Contrast

#### Contrast Checker

Use: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

- [ ] Verify body text meets 4.5:1 ratio
- [ ] Verify large text meets 3:1 ratio
- [ ] Check UI components meet 3:1 ratio
- [ ] Test focus indicators have sufficient contrast
- [ ] Verify error messages are visible

#### Color Blindness Simulator

Use: Browser extensions or [Color Oracle](https://colororacle.org/)

- [ ] Test with Deuteranopia (red-green)
- [ ] Test with Protanopia (red-green)
- [ ] Test with Tritanopia (blue-yellow)
- [ ] Verify information not conveyed by color alone
- [ ] Check that all interactive states are distinguishable

### Reduced Motion

#### macOS

System Preferences → Accessibility → Display → Reduce motion

#### Windows

Settings → Ease of Access → Display → Show animations

#### Test

- [ ] Enable "Reduce motion" in OS settings
- [ ] Reload website
- [ ] Verify animations are disabled or minimized
- [ ] Check that glitch effects are removed
- [ ] Verify smooth scrolling becomes instant
- [ ] Ensure all functionality still works

### Mobile Testing

#### Touch Targets

- [ ] Verify all buttons/links are at least 44x44 pixels
- [ ] Test with finger on real device
- [ ] Check that elements don't overlap

#### Mobile Screen Readers

- [ ] Test with VoiceOver on iOS
- [ ] Test with TalkBack on Android
- [ ] Verify all content is accessible
- [ ] Check gesture navigation works

#### Responsive Design

- [ ] Test on phone (≤ 640px)
- [ ] Test on tablet (641px - 1024px)
- [ ] Test on desktop (≥ 1025px)
- [ ] Verify no horizontal scrolling
- [ ] Check that content reflows properly

### Zoom and Magnification

- [ ] Test at 200% zoom
- [ ] Test at 400% zoom
- [ ] Verify no content is cut off
- [ ] Check that text doesn't overlap
- [ ] Ensure all functionality remains accessible

## Content Review

### Images

- [ ] All meaningful images have descriptive alt text
- [ ] Decorative images have empty alt (`alt=""`)
- [ ] Complex images have extended descriptions
- [ ] Background images are decorative only

### Headings

- [ ] Each page has exactly one h1
- [ ] Heading hierarchy is logical (no skipped levels)
- [ ] Headings accurately describe content
- [ ] Test heading navigation with screen reader

### Links

- [ ] Link text is descriptive out of context
- [ ] No "click here" or "read more" without context
- [ ] External links indicate they open in new window (if applicable)
- [ ] Links are distinguishable from regular text

### Forms

- [ ] All inputs have associated labels
- [ ] Required fields are marked
- [ ] Error messages are specific and helpful
- [ ] Success messages are announced
- [ ] Validation doesn't rely on color alone

### Media

- [ ] Videos have captions (when added)
- [ ] Audio has transcripts (when added)
- [ ] No auto-playing media
- [ ] Media controls are keyboard accessible

## Browser Testing

Test in multiple browsers:

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Test with JavaScript disabled (basic content accessible)

## Documentation

- [ ] Update ACCESSIBILITY.md with any new features
- [ ] Document known issues
- [ ] Update accessibility statement page
- [ ] Note testing date and results

## Sign-off

- **Tester Name**: ********\_\_\_********
- **Date**: ********\_\_\_********
- **WCAG Level Achieved**: [ ] A [ ] AA [ ] AAA
- **Issues Found**: ********\_\_\_********
- **Issues Resolved**: ********\_\_\_********
- **Outstanding Issues**: ********\_\_\_********

---

## Quick Reference

### Keyboard Shortcuts

**Windows (NVDA)**

- Start/Stop: `Ctrl + Alt + N`
- Read from cursor: `Insert + Down Arrow`
- Next heading: `H`
- Next link: `Insert + F7`

**macOS (VoiceOver)**

- Start/Stop: `Command + F5`
- Read from cursor: `VO + A`
- Next heading: `VO + Command + H`
- Rotor: `VO + U`

### Common ARIA Attributes

- `aria-label`: Labels element for screen readers
- `aria-labelledby`: References label element
- `aria-describedby`: References description element
- `aria-hidden`: Hides element from screen readers
- `aria-live`: Announces dynamic content changes
- `aria-invalid`: Indicates form field error
- `aria-required`: Indicates required field
- `aria-expanded`: Indicates expanded/collapsed state

### Common Issues to Watch For

1. Missing alt text on images
2. Empty links or buttons
3. Insufficient color contrast
4. Missing form labels
5. Keyboard traps
6. Auto-playing media
7. Flashing content
8. Heading level skips
9. Missing skip link
10. Poorly structured tables

---

**Last Updated**: January 23, 2025
