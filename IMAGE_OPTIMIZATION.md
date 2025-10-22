# Image Optimization Guide

This guide explains how to use the image optimization features implemented in this project to achieve optimal web performance.

## Overview

The project includes comprehensive image optimization features:

- **Modern image formats** (WebP, AVIF) with automatic fallbacks
- **Responsive images** with srcset and sizes attributes
- **Lazy loading** with Intersection Observer API
- **Blur-up placeholder** effects during image load
- **Error handling** with fallback images
- **Performance optimization** through Vite configuration

## Components

### OptimizedImage Component

The `OptimizedImage` component is a drop-in replacement for standard `<img>` tags that provides automatic optimization.

**Location:** `src/components/ui/OptimizedImage.tsx`

#### Basic Usage

```tsx
import OptimizedImage from '@/components/ui/OptimizedImage'

function MyComponent() {
  return (
    <OptimizedImage
      src="/assets/hero-image.jpg"
      alt="Hero image"
      className="w-full h-64"
    />
  )
}
```

#### Advanced Usage with Responsive Images

```tsx
<OptimizedImage
  src="/assets/hero-image.jpg"
  srcSet="/assets/hero-400.jpg 400w, /assets/hero-800.jpg 800w, /assets/hero-1200.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Hero image"
  width={1200}
  height={600}
  priority // Disable lazy loading for above-the-fold images
  showPlaceholder
  fallbackSrc="/assets/fallback.jpg"
/>
```

#### Props

| Prop              | Type                                                       | Default   | Description                              |
| ----------------- | ---------------------------------------------------------- | --------- | ---------------------------------------- |
| `src`             | `string`                                                   | Required  | Image source URL                         |
| `alt`             | `string`                                                   | Required  | Alt text for accessibility               |
| `srcSet`          | `string`                                                   | -         | Responsive image sources                 |
| `sizes`           | `string`                                                   | -         | Sizes attribute for responsive images    |
| `width`           | `number`                                                   | -         | Image width                              |
| `height`          | `number`                                                   | -         | Image height                             |
| `className`       | `string`                                                   | `''`      | CSS class name                           |
| `objectFit`       | `'cover' \| 'contain' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` | Object fit style                         |
| `loading`         | `'lazy' \| 'eager'`                                        | `'lazy'`  | Loading strategy                         |
| `showPlaceholder` | `boolean`                                                  | `true`    | Show blur-up placeholder during load     |
| `placeholderBlur` | `number`                                                   | `10`      | Placeholder blur amount (px)             |
| `onLoad`          | `() => void`                                               | -         | Callback when image loads                |
| `onError`         | `() => void`                                               | -         | Callback when image fails                |
| `fallbackSrc`     | `string`                                                   | -         | Fallback image if main image fails       |
| `priority`        | `boolean`                                                  | `false`   | Priority loading (disables lazy loading) |

## Utility Functions

### Image Optimization Utilities

**Location:** `src/utils/imageOptimization.ts`

#### Generate srcset

```tsx
import { generateSrcSet } from '@/utils/imageOptimization'

const srcSet = generateSrcSet('/images/hero', [400, 800, 1200])
// Returns: '/images/hero-400.jpg 400w, /images/hero-800.jpg 800w, /images/hero-1200.jpg 1200w'
```

#### Generate sizes attribute

```tsx
import { generateSizesAttribute } from '@/utils/imageOptimization'

const sizes = generateSizesAttribute({
  sm: '100vw',
  md: '50vw',
  default: '33vw',
})
// Returns: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
```

#### Preload images

```tsx
import { preloadImages } from '@/utils/imageOptimization'

// Preload critical images
await preloadImages(['/hero-1.jpg', '/hero-2.jpg', '/hero-3.jpg'])
```

#### Check format support

```tsx
import { supportsImageFormat } from '@/utils/imageOptimization'

const webpSupported = await supportsImageFormat('webp')
const avifSupported = await supportsImageFormat('avif')
```

## Build Script

### Optimize Images Script

**Location:** `scripts/optimize-images.sh`

This script automatically optimizes images by:

- Converting to modern formats (WebP, AVIF)
- Generating responsive image sizes
- Compressing images without quality loss

#### Prerequisites

Install required tools:

**Ubuntu/Debian:**

```bash
sudo apt-get install imagemagick webp libavif-bin
```

**macOS:**

```bash
brew install imagemagick webp libavif
```

#### Usage

```bash
# Optimize all images in public/assets
./scripts/optimize-images.sh ./public/assets ./public/assets

# Optimize specific directory
./scripts/optimize-images.sh ./source/images ./optimized/images
```

The script will:

1. Process all JPG, JPEG, and PNG images
2. Generate WebP and AVIF versions
3. Create responsive sizes (320w, 640w, 768w, 1024w, 1280w, 1536w)
4. Optimize compression while maintaining quality

## Best Practices

### 1. Use Priority Loading for Above-the-Fold Images

Images visible on initial page load should use priority loading:

```tsx
<OptimizedImage src="/hero.jpg" alt="Hero" priority loading="eager" />
```

### 2. Lazy Load Below-the-Fold Images

Images not immediately visible should use lazy loading (default):

```tsx
<OptimizedImage src="/content.jpg" alt="Content" loading="lazy" />
```

### 3. Provide Responsive Images

For images that scale with viewport, provide multiple sizes:

```tsx
<OptimizedImage
  src="/responsive.jpg"
  srcSet="/responsive-400.jpg 400w, /responsive-800.jpg 800w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Responsive image"
/>
```

### 4. Always Include Alt Text

Alt text is critical for accessibility and SEO:

```tsx
<OptimizedImage src="/product.jpg" alt="Red sneakers with white sole" />
```

### 5. Use Appropriate Object Fit

Choose the right object-fit for your use case:

- `cover` - Fill container, crop if needed (default)
- `contain` - Fit entire image, may show background
- `fill` - Stretch to fill container

```tsx
<OptimizedImage src="/logo.jpg" alt="Logo" objectFit="contain" />
```

### 6. Provide Fallback Images

For critical images, provide a fallback:

```tsx
<OptimizedImage
  src="/profile.jpg"
  alt="User profile"
  fallbackSrc="/default-avatar.jpg"
/>
```

## Performance Targets

The image optimization strategy aims to meet these performance goals:

- **Largest Contentful Paint (LCP):** < 2.5s
- **Hero image load time:** < 1s on 3G
- **Cumulative Layout Shift (CLS):** 0 (no layout shift from images)
- **Total image size per page:** < 500KB

## Monitoring Performance

### Using Chrome DevTools

1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "Img"
4. Check image sizes and load times
5. Use Lighthouse for performance audit

### Key Metrics to Monitor

- Total image size per page
- Number of image requests
- Image load times
- Format support (WebP/AVIF usage)
- Lazy loading effectiveness

## Updating Existing Components

When updating components to use OptimizedImage:

1. Import the component:

   ```tsx
   import OptimizedImage from '@/components/ui/OptimizedImage'
   ```

2. Replace `<img>` tags:

   ```tsx
   // Before
   <img src={src} alt={alt} loading="lazy" />

   // After
   <OptimizedImage src={src} alt={alt} />
   ```

3. Replace background images:

   ```tsx
   // Before
   <div style={{ backgroundImage: `url(${src})` }} />

   // After
   <OptimizedImage src={src} alt={alt} objectFit="cover" />
   ```

## Troubleshooting

### Images not loading

1. Check image path is correct
2. Verify image file exists
3. Check browser console for errors
4. Ensure fallbackSrc is provided for critical images

### Poor performance

1. Ensure responsive images are being used
2. Verify lazy loading is enabled for below-fold images
3. Check that modern formats (WebP/AVIF) are being served
4. Run the optimize-images.sh script if not done already

### Layout shift issues

1. Always specify width and height attributes
2. Use aspect-ratio CSS for responsive containers
3. Enable showPlaceholder to reserve space during load

## Examples

### Hero Section

```tsx
<OptimizedImage
  src="/hero.jpg"
  srcSet="/hero-800.jpg 800w, /hero-1200.jpg 1200w, /hero-1920.jpg 1920w"
  sizes="100vw"
  alt="Hero background"
  priority
  className="w-full h-screen"
  objectFit="cover"
/>
```

### Blog Post Cover Image

```tsx
<OptimizedImage
  src={post.coverImage}
  alt={post.title}
  className="w-full aspect-video"
  objectFit="cover"
  showPlaceholder
/>
```

### Profile Avatar

```tsx
<OptimizedImage
  src={user.avatar}
  alt={user.name}
  width={128}
  height={128}
  className="rounded-full"
  fallbackSrc="/default-avatar.jpg"
/>
```

### Product Thumbnail Grid

```tsx
{
  products.map(product => (
    <OptimizedImage
      key={product.id}
      src={product.thumbnail}
      srcSet={`${product.thumbnail}?w=300 300w, ${product.thumbnail}?w=600 600w`}
      sizes="(max-width: 768px) 50vw, 25vw"
      alt={product.name}
      loading="lazy"
    />
  ))
}
```

## Additional Resources

- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [MDN: Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [AVIF vs WebP](https://jakearchibald.com/2020/avif-has-landed/)
- [Lazy Loading Images](https://web.dev/lazy-loading-images/)

## Contributing

When adding new images to the project:

1. Add original high-quality image to `public/assets/`
2. Run optimization script: `./scripts/optimize-images.sh`
3. Use OptimizedImage component in your code
4. Provide appropriate alt text and responsive configurations
5. Test on various devices and network conditions
