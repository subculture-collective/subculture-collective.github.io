/**
 * Image Optimization Utilities
 *
 * Helper functions for generating responsive image URLs and optimizing image loading
 */

/**
 * Standard responsive image breakpoints (in pixels)
 */
export const IMAGE_BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

/**
 * Image quality settings for different use cases
 */
export const IMAGE_QUALITY = {
  thumbnail: 60,
  medium: 75,
  high: 85,
  max: 95,
} as const

/**
 * Generate srcset string for responsive images
 *
 * @param baseUrl - Base URL of the image (without size suffix)
 * @param sizes - Array of widths to include in srcset
 * @param format - Image format (jpg, webp, avif)
 * @returns srcset string
 *
 * @example
 * ```ts
 * generateSrcSet('/images/hero', [400, 800, 1200])
 * // Returns: '/images/hero-400.jpg 400w, /images/hero-800.jpg 800w, /images/hero-1200.jpg 1200w'
 * ```
 */
export function generateSrcSet(
  baseUrl: string,
  sizes: number[],
  format?: 'jpg' | 'webp' | 'avif'
): string {
  const ext = format || getImageExtension(baseUrl) || 'jpg'
  const base = baseUrl.replace(/\.[^.]+$/, '')

  return sizes.map(size => `${base}-${size}.${ext} ${size}w`).join(', ')
}

/**
 * Generate sizes attribute for responsive images
 *
 * @param config - Configuration object with breakpoints and sizes
 * @returns sizes string
 *
 * @example
 * ```ts
 * generateSizesAttribute({
 *   sm: '100vw',
 *   md: '50vw',
 *   lg: '33vw',
 * })
 * // Returns: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
 * ```
 */
export function generateSizesAttribute(config: {
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  default?: string
}): string {
  const entries = Object.entries(config).filter(
    ([key]) => key !== 'default'
  ) as [keyof typeof IMAGE_BREAKPOINTS, string][]

  const mediaQueries = entries
    .sort(
      ([a], [b]) =>
        IMAGE_BREAKPOINTS[a as keyof typeof IMAGE_BREAKPOINTS] -
        IMAGE_BREAKPOINTS[b as keyof typeof IMAGE_BREAKPOINTS]
    )
    .map(
      ([breakpoint, size]) =>
        `(max-width: ${IMAGE_BREAKPOINTS[breakpoint]}px) ${size}`
    )

  return config.default
    ? [...mediaQueries, config.default].join(', ')
    : mediaQueries.join(', ')
}

/**
 * Get image file extension from URL
 */
export function getImageExtension(url: string): string | null {
  const match = url.match(/\.([^.]+)$/)
  return match?.[1] ?? null
}

/**
 * Check if browser supports a specific image format
 *
 * @param format - Image format to check
 * @returns Promise that resolves to boolean
 */
export async function supportsImageFormat(
  format: 'webp' | 'avif'
): Promise<boolean> {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return false

  const testImages = {
    webp: 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=',
    avif: 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=',
  }

  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = testImages[format]
  })
}

/**
 * Preload images to improve performance
 *
 * @param urls - Array of image URLs to preload
 * @returns Promise that resolves when all images are loaded
 */
export function preloadImages(urls: string[]): Promise<void[]> {
  return Promise.all(
    urls.map(
      url =>
        new Promise<void>((resolve, reject) => {
          const img = new Image()
          img.onload = () => resolve()
          img.onerror = () => reject(new Error(`Failed to load image: ${url}`))
          img.src = url
        })
    )
  )
}

/**
 * Calculate aspect ratio from dimensions
 *
 * @param width - Image width
 * @param height - Image height
 * @returns Aspect ratio string (e.g., '16/9')
 */
export function calculateAspectRatio(
  width: number,
  height: number
): string | null {
  if (!width || !height) return null

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
  const divisor = gcd(width, height)

  return `${width / divisor}/${height / divisor}`
}

/**
 * Get optimal image dimensions for a given container size
 *
 * @param containerWidth - Container width in pixels
 * @param containerHeight - Container height in pixels
 * @param devicePixelRatio - Device pixel ratio (default: window.devicePixelRatio)
 * @returns Optimal dimensions
 */
export function getOptimalDimensions(
  containerWidth: number,
  containerHeight: number,
  devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 1
): { width: number; height: number } {
  // Account for device pixel ratio (retina displays)
  const width = Math.ceil(containerWidth * devicePixelRatio)
  const height = Math.ceil(containerHeight * devicePixelRatio)

  // Round up to nearest breakpoint for better caching
  const breakpointValues = Object.values(IMAGE_BREAKPOINTS)
  const optimalWidth =
    breakpointValues.find(bp => bp >= width) ||
    breakpointValues[breakpointValues.length - 1]!

  // Maintain aspect ratio
  const optimalHeight = Math.ceil((optimalWidth / width) * height)

  return { width: optimalWidth, height: optimalHeight }
}

/**
 * Generate blurhash-style placeholder for images
 * This is a simplified version - in production, you'd use actual blurhash
 *
 * @param width - Placeholder width
 * @param height - Placeholder height
 * @param color - Base color (hex)
 * @returns SVG data URL for placeholder
 */
export function generatePlaceholder(
  width: number,
  height: number,
  color = '#1a1a2e'
): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color};stop-opacity:0.8" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)" />
    </svg>
  `

  return `data:image/svg+xml;base64,${btoa(svg)}`
}

/**
 * Image optimization configuration type
 */
export interface ImageOptimizationConfig {
  /**
   * Enable lazy loading
   */
  lazyLoad?: boolean
  /**
   * Image quality (0-100)
   */
  quality?: number
  /**
   * Generate responsive images
   */
  responsive?: boolean
  /**
   * Breakpoints to use for responsive images
   */
  breakpoints?: number[]
  /**
   * Enable modern formats (WebP, AVIF)
   */
  modernFormats?: boolean
  /**
   * Show placeholder during load
   */
  placeholder?: boolean
}

/**
 * Default image optimization configuration
 */
export const defaultImageConfig: Required<ImageOptimizationConfig> = {
  lazyLoad: true,
  quality: IMAGE_QUALITY.high,
  responsive: true,
  breakpoints: [
    IMAGE_BREAKPOINTS.sm,
    IMAGE_BREAKPOINTS.md,
    IMAGE_BREAKPOINTS.lg,
    IMAGE_BREAKPOINTS.xl,
  ],
  modernFormats: true,
  placeholder: true,
}
