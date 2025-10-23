# Responsive Design - Quick Reference

This is a quick reference guide for responsive design on SUBCULT.TV. For complete documentation, see [RESPONSIVE_DESIGN.md](RESPONSIVE_DESIGN.md) and [RESPONSIVE_TESTING.md](RESPONSIVE_TESTING.md).

## 📱 Breakpoints Quick Reference

| Device | Width     | Prefix | Example        |
| ------ | --------- | ------ | -------------- |
| Mobile | 320-639px | (none) | `text-base`    |
| Small  | 640px+    | `sm:`  | `sm:text-lg`   |
| Medium | 768px+    | `md:`  | `md:text-xl`   |
| Large  | 1024px+   | `lg:`  | `lg:text-2xl`  |
| XL     | 1280px+   | `xl:`  | `xl:text-3xl`  |
| 2XL    | 1536px+   | `2xl:` | `2xl:text-4xl` |

## 🎨 Common Patterns

### Container

```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

### Grid (1→2→3→4 columns)

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```

### Typography

```tsx
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
```

### Spacing

```tsx
<div className="px-4 sm:px-6 lg:px-8">
<div className="py-12 md:py-16 lg:py-20">
```

### Show/Hide

```tsx
<div className="hidden lg:block">  {/* Desktop only */}
<div className="block lg:hidden">  {/* Mobile only */}
```

## ✅ Quick Testing Checklist

- [ ] No horizontal scroll at any width
- [ ] Text is readable (16px+ on mobile)
- [ ] Touch targets are 44px minimum
- [ ] Images don't overflow
- [ ] Navigation works at all sizes
- [ ] Forms are usable on mobile

## 🔧 Quick Debug

### Find horizontal scroll

```javascript
document.querySelectorAll('*').forEach(el => {
  if (el.scrollWidth > document.documentElement.clientWidth) {
    console.log('Wide element:', el)
  }
})
```

### Test breakpoints

1. Open DevTools (F12)
2. Toggle Device Mode (Ctrl+Shift+M)
3. Test: 375px, 768px, 1024px, 1920px

## 📚 Full Documentation

- **[RESPONSIVE_DESIGN.md](RESPONSIVE_DESIGN.md)** - Complete guide (13.7KB)
- **[RESPONSIVE_TESTING.md](RESPONSIVE_TESTING.md)** - Testing checklist (14.7KB)
