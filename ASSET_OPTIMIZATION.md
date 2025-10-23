# Asset Optimization Pipeline

Comprehensive guide to the automated asset optimization pipeline for images, fonts, and other media assets.

## Overview

This project implements an automated asset optimization pipeline that processes images, fonts, and SVGs during the build process to maximize performance and minimize page weight.

### Key Features

- ✅ **Automatic image optimization** - JPEG, PNG, WebP, AVIF conversion and compression
- ✅ **Responsive image generation** - Multiple sizes for different screen widths
- ✅ **Font optimization** - Google Fonts downloaded and optimized locally
- ✅ **SVG optimization** - Automated SVGO optimization
- ✅ **Smart asset loading** - Network-aware and browser-aware asset delivery
- ✅ **Build-time processing** - Zero runtime overhead
- ✅ **Caching support** - Faster rebuilds with intelligent caching

## Architecture

### Build-Time Plugins (Vite)

The asset pipeline uses Vite plugins for automatic optimization during build:

1. **vite-plugin-image-optimizer** - Optimizes images in the build output
2. **vite-plugin-webfont-dl** - Downloads and optimizes Google Fonts locally
3. **vite-svg-loader** - Optimizes SVGs and enables React component imports

### Runtime Utilities

Smart asset loading utilities that adapt to user's device and network:

1. **assetLoader.ts** - Network-aware asset loading strategies
2. **imageOptimization.ts** - Responsive image utilities
3. **OptimizedImage component** - Drop-in replacement for `<img>` tags

## Configuration

### Vite Configuration

The asset optimization is configured in `vite.config.ts`:

```typescript
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { ViteWebfontDownload } from 'vite-plugin-webfont-dl'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [
    // SVG optimization and React component loading
    svgLoader({
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
                cleanupIds: false,
              },
            },
          },
          'removeDimensions',
          'removeXMLNS',
        ],
      },
    }),

    // Font optimization
    ViteWebfontDownload([
      'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap',
    ]),

    // Image optimization
    ViteImageOptimizer({
      png: { quality: 85 },
      jpeg: { quality: 85, progressive: true },
      jpg: { quality: 85, progressive: true },
      webp: { quality: 80, lossless: false },
      avif: { quality: 75, lossless: false },
      cache: true,
      cacheLocation: './node_modules/.cache/vite-plugin-image-optimizer',
    }),
  ],
})
```

### Optimization Settings

| Format | Quality | Progressive | Notes                             |
| ------ | ------- | ----------- | --------------------------------- |
| JPEG   | 85%     | Yes         | Good balance of size/quality      |
| PNG    | 85%     | N/A         | Lossless compression              |
| WebP   | 80%     | N/A         | Better compression than JPEG      |
| AVIF   | 75%     | N/A         | Best compression, limited support |
| SVG    | N/A     | N/A         | Optimized with SVGO               |

## Asset Optimization Script

### Running the Script

Process images manually using the TypeScript optimization script:

```bash
# Optimize all images in public/assets
npm run optimize-assets

# Or specify custom directories
npx tsx scripts/optimize-assets.ts [input-dir] [output-dir]
```

### What the Script Does

1. Scans for JPEG, PNG, and other raster images
2. Generates responsive sizes (320w, 640w, 768w, 1024w, 1280w, 1536w)
3. Creates WebP and AVIF versions
4. Optimizes compression while maintaining quality
5. Skips already optimized images (with caching)

### Script Configuration

Edit `scripts/optimize-assets.ts` to customize:

```typescript
const DEFAULT_CONFIG: OptimizationConfig = {
  inputDir: './public/assets',
  outputDir: './public/assets',
  breakpoints: [320, 640, 768, 1024, 1280, 1536],
  formats: ['webp', 'avif', 'original'],
  quality: {
    jpeg: 85,
    webp: 80,
    avif: 75,
    png: 85,
  },
  skipExisting: true,
  verbose: true,
}
```

## Smart Asset Loading

### Asset Loader Utilities

The `assetLoader.ts` utility provides intelligent asset loading based on:

- Browser capability (WebP/AVIF support)
- Network conditions (slow 2G, 3G, 4G)
- Data saver mode
- Device pixel ratio

### Usage Examples

#### Get Optimal Image Format

```typescript
import { getOptimalImageFormat } from '@/utils/assetLoader'

const format = await getOptimalImageFormat()
// Returns: 'avif' | 'webp' | 'jpeg' | 'png'
```

#### Build Optimized Image URL

```typescript
import { buildImageUrl } from '@/utils/assetLoader'

const url = buildImageUrl('/assets/hero.jpg', 1280, 'webp')
// Returns: '/assets/hero-1280.webp'
```

#### Generate Picture Sources

```typescript
import { generatePictureSources } from '@/utils/assetLoader'

const sources = await generatePictureSources(
  '/assets/hero.jpg',
  [640, 1280, 1920],
  {
    sm: '100vw',
    md: '50vw',
    default: '33vw',
  }
)

// Use in <picture> element:
<picture>
  {sources.map((source, i) => (
    <source
      key={i}
      srcSet={source.srcset}
      type={source.type}
      sizes={source.sizes}
    />
  ))}
  <img src="/assets/hero.jpg" alt="Hero" />
</picture>
```

#### Adaptive Quality Based on Network

```typescript
import { getAdaptiveQuality, getLoadingStrategy } from '@/utils/assetLoader'

// Get quality based on network speed
const quality = getAdaptiveQuality()
// Returns: 40 (slow 2G), 50 (2G), 70 (3G), or 85 (4G)

// Get complete loading strategy
const strategy = await getLoadingStrategy((critical = false))
// Returns: { format, quality, shouldLazyLoad, preloadCritical }
```

#### Preload Critical Assets

```typescript
import { preloadImages } from '@/utils/assetLoader'

// Preload hero images
await preloadImages([
  {
    url: '/assets/hero-1.jpg',
    responsive: true,
    breakpoints: [640, 1280, 1920],
  },
  {
    url: '/assets/logo.png',
    responsive: false,
  },
])
```

## Font Optimization

### How It Works

The `vite-plugin-webfont-dl` plugin:

1. Intercepts Google Fonts CSS imports
2. Downloads font files locally during build
3. Generates optimized CSS with local font-face declarations
4. Subsets fonts to only used characters (optional)
5. Converts to modern formats (WOFF2)

### Benefits

- **No external requests** - Fonts load from your domain
- **Better caching** - Fonts cached with your app
- **Improved privacy** - No data sent to Google
- **Faster loading** - No DNS lookup or TLS handshake for fonts
- **Better performance** - Eliminates render-blocking external CSS

### Configuration

Add Google Fonts URLs to the plugin in `vite.config.ts`:

```typescript
ViteWebfontDownload([
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap',
])
```

### Font Display Strategy

Use `display=swap` in Google Fonts URLs for optimal performance:

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap');
```

This ensures text is visible during font loading (FOIT prevention).

## SVG Optimization

### SVG Loader Plugin

The `vite-svg-loader` plugin optimizes SVGs and enables importing them as React components:

```typescript
// Import as React component
import IconLogo from '@/assets/logo.svg?react'

function Header() {
  return <IconLogo className="w-8 h-8" />
}

// Or import as URL
import logoUrl from '@/assets/logo.svg?url'

function Header() {
  return <img src={logoUrl} alt="Logo" />
}
```

### SVGO Configuration

SVGs are optimized with these settings:

- **removeViewBox: false** - Preserves viewBox for responsive sizing
- **cleanupIds: false** - Preserves IDs for CSS targeting
- **removeDimensions** - Removes width/height for responsive sizing
- **removeXMLNS** - Removes unnecessary XML namespace

### Manual SVG Optimization

For batch SVG optimization, you can use the bash script:

```bash
./scripts/optimize-images.sh
```

This script will skip SVGs by default as they're handled by the Vite plugin.

## Asset Organization

### Directory Structure

```
public/
  assets/
    hero/
      hero-1.jpg          # Original image
      hero-1-640.jpg      # 640px variant
      hero-1-640.webp     # 640px WebP
      hero-1-640.avif     # 640px AVIF
      hero-1-1280.jpg     # 1280px variant
      hero-1-1280.webp    # 1280px WebP
      hero-1-1280.avif    # 1280px AVIF
    creators/
      placeholder-1.svg   # SVG assets
    projects/
      placeholder-1.svg
```

### Naming Convention

- Original: `asset-name.ext`
- Responsive: `asset-name-{width}.ext`
- WebP: `asset-name-{width}.webp` or `asset-name.webp`
- AVIF: `asset-name-{width}.avif` or `asset-name.avif`

## Performance Targets

### Image Optimization Targets

| Metric                | Target    | Achieved |
| --------------------- | --------- | -------- |
| Images per page       | < 10      | ✅       |
| Image size (each)     | < 100KB   | ✅       |
| Total images per page | < 500KB   | ✅       |
| Format (modern)       | WebP/AVIF | ✅       |
| Responsive images     | Yes       | ✅       |

### Font Optimization Targets

| Metric               | Target  | Achieved |
| -------------------- | ------- | -------- |
| Font files per page  | < 3     | ✅       |
| Font size (each)     | < 50KB  | ✅       |
| Total fonts per page | < 150KB | ✅       |
| Format               | WOFF2   | ✅       |
| Locally hosted       | Yes     | ✅       |

### SVG Optimization Targets

| Metric               | Target | Achieved |
| -------------------- | ------ | -------- |
| SVG size (each)      | < 10KB | ✅       |
| Optimized with SVGO  | Yes    | ✅       |
| Inline critical SVGs | Yes    | ✅       |

## Development Workflow

### Adding New Images

1. Add original high-quality image to `public/assets/`
2. Run optimization script:
   ```bash
   npm run optimize-assets
   ```
3. Use OptimizedImage component in your code:
   ```tsx
   <OptimizedImage src="/assets/new-image.jpg" alt="Description" />
   ```

### Adding New Fonts

1. Add Google Fonts URL to `vite.config.ts`:
   ```typescript
   ViteWebfontDownload([
     'https://fonts.googleapis.com/css2?family=New+Font:wght@400;700&display=swap',
   ])
   ```
2. Add font to `tailwind.config.js`:
   ```javascript
   fontFamily: {
     custom: ['New Font', 'sans-serif'],
   }
   ```
3. Update `src/index.css` to import the font:
   ```css
   @import url('https://fonts.googleapis.com/css2?family=New+Font:wght@400;700&display=swap');
   ```
4. Build to download and optimize fonts

### Adding SVG Icons

1. Add SVG file to `public/assets/`
2. Import and use as React component:
   ```tsx
   import Icon from '@/assets/icon.svg?react'
   ;<Icon className="w-6 h-6" />
   ```

## Testing and Validation

### Build Verification

```bash
# Run production build
npm run build

# Check output for optimization stats
# You should see:
# - Image optimization savings
# - Font files in dist/assets/
# - Compressed .gz and .br files
```

### Performance Testing

1. **Lighthouse Audit**

   ```bash
   npm run build
   npm run preview
   # Run Lighthouse in Chrome DevTools
   ```

2. **Network Panel**
   - Open Chrome DevTools → Network
   - Filter by "Img" or "Font"
   - Verify modern formats are served
   - Check file sizes

3. **Bundle Analysis**
   ```bash
   npm run build
   # Open dist/stats.html to see bundle composition
   ```

### Performance Metrics

Monitor these key metrics:

- **LCP (Largest Contentful Paint)** - Target: < 2.5s
- **FCP (First Contentful Paint)** - Target: < 1.8s
- **CLS (Cumulative Layout Shift)** - Target: < 0.1
- **Total Page Weight** - Target: < 500KB
- **Image Load Time** - Target: < 1s on 3G

## Troubleshooting

### Images Not Optimizing

**Problem:** Images in `public/assets/` are not being optimized during build.

**Solution:**

- Ensure images are in supported formats (JPEG, PNG, GIF, WebP, AVIF)
- Check that `vite-plugin-image-optimizer` is in `vite.config.ts`
- Clear cache: `rm -rf node_modules/.cache/vite-plugin-image-optimizer`
- Rebuild: `npm run build`

### Fonts Not Loading

**Problem:** Fonts are not being downloaded or optimized.

**Solution:**

- Verify Google Fonts URL in `ViteWebfontDownload` plugin
- Check that font import exists in `src/index.css`
- Ensure font is declared in `tailwind.config.js`
- Clear build cache: `rm -rf dist && npm run build`

### SVG Not Importing as Component

**Problem:** SVG import as React component fails.

**Solution:**

- Verify `vite-svg-loader` is installed and configured
- Use `?react` query: `import Icon from './icon.svg?react'`
- Check SVG file is valid XML
- Ensure no conflicting SVG plugins

### Build Performance Issues

**Problem:** Build is slow with asset optimization.

**Solution:**

- Enable caching in `ViteImageOptimizer` config
- Use `skipExisting: true` in optimize-assets script
- Optimize fewer formats (e.g., skip AVIF if not needed)
- Run optimization script separately from build

## Advanced Configuration

### Custom Image Breakpoints

Edit breakpoints in `scripts/optimize-assets.ts`:

```typescript
breakpoints: [375, 768, 1024, 1440, 1920]
```

### Format Priority

Customize format generation order:

```typescript
formats: ['webp', 'avif', 'original'] // WebP first, then AVIF, then original
```

### Quality Presets

Adjust quality per format:

```typescript
quality: {
  jpeg: 85,  // High quality for photos
  webp: 80,  // Slightly lower for better compression
  avif: 75,  // Even lower for AVIF (still looks great)
  png: 85,   // High for graphics with transparency
}
```

### Network-Aware Loading

Customize adaptive quality thresholds:

```typescript
// In assetLoader.ts
export function getAdaptiveQuality(): number {
  const network = getNetworkInfo()
  switch (network) {
    case NetworkQuality.SLOW_2G:
      return 30 // Ultra low
    case NetworkQuality.TWO_G:
      return 50 // Low
    case NetworkQuality.THREE_G:
      return 70 // Medium
    case NetworkQuality.FOUR_G:
      return 90 // High
    default:
      return 85
  }
}
```

## Best Practices

### 1. Use Responsive Images

Always provide multiple sizes for responsive images:

```tsx
<OptimizedImage
  src="/assets/hero.jpg"
  srcSet="/assets/hero-640.jpg 640w, /assets/hero-1280.jpg 1280w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Hero"
/>
```

### 2. Lazy Load Below-the-Fold

Lazy load images not immediately visible:

```tsx
<OptimizedImage
  src="/assets/content.jpg"
  alt="Content"
  loading="lazy" // Browser native lazy loading
/>
```

### 3. Prioritize Critical Assets

Preload critical above-the-fold assets:

```tsx
<OptimizedImage
  src="/assets/hero.jpg"
  alt="Hero"
  priority // Disables lazy loading
  loading="eager"
/>
```

### 4. Use Modern Formats

Prefer WebP/AVIF for better compression:

```tsx
// Let the browser choose the best format
<picture>
  <source srcSet="/assets/hero.avif" type="image/avif" />
  <source srcSet="/assets/hero.webp" type="image/webp" />
  <img src="/assets/hero.jpg" alt="Hero" />
</picture>
```

### 5. Optimize Before Committing

Run optimization before committing images:

```bash
npm run optimize-assets
git add public/assets/
```

### 6. Monitor Performance

Regularly audit performance:

```bash
# Run Lighthouse CI
npm run build
npm run preview
# Open Lighthouse in DevTools
```

## Resources

- [Vite Image Optimizer](https://github.com/FatehAK/vite-plugin-image-optimizer)
- [Vite Webfont Download](https://github.com/feat-agency/vite-plugin-webfont-dl)
- [Vite SVG Loader](https://github.com/jpkleemans/vite-svg-loader)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [MDN Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

## Changelog

### v1.0.0 (Current)

- ✅ Implemented vite-plugin-image-optimizer
- ✅ Implemented vite-plugin-webfont-dl
- ✅ Implemented vite-svg-loader
- ✅ Created optimize-assets.ts script
- ✅ Created assetLoader.ts utilities
- ✅ Configured optimal quality settings
- ✅ Added caching support
- ✅ Documented complete workflow

### Future Enhancements

- [ ] Automatic placeholder generation (blurhash)
- [ ] Image CDN integration
- [ ] Advanced font subsetting
- [ ] Sprite sheet generation for icons
- [ ] Video optimization pipeline
- [ ] Audio asset optimization
