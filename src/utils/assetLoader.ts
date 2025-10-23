/**
 * Asset Loader Utilities
 *
 * Smart asset loading utilities for optimizing asset delivery based on
 * browser capabilities, network conditions, and viewport size.
 */

import { IMAGE_BREAKPOINTS, supportsImageFormat } from './imageOptimization'

/**
 * Asset type enumeration
 */
export const AssetType = {
  IMAGE: 'image',
  FONT: 'font',
  VIDEO: 'video',
  AUDIO: 'audio',
} as const

export type AssetType = (typeof AssetType)[keyof typeof AssetType]

/**
 * Network connection quality
 */
export const NetworkQuality = {
  SLOW_2G: 'slow-2g',
  TWO_G: '2g',
  THREE_G: '3g',
  FOUR_G: '4g',
  UNKNOWN: 'unknown',
} as const

export type NetworkQuality =
  (typeof NetworkQuality)[keyof typeof NetworkQuality]

/**
 * Get network information from browser
 */
function getNetworkInfo(): NetworkQuality {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return NetworkQuality.UNKNOWN
  }

  const connection = (
    navigator as Navigator & {
      connection?: {
        effectiveType?: string
        saveData?: boolean
      }
    }
  ).connection

  if (!connection?.effectiveType) {
    return NetworkQuality.UNKNOWN
  }

  return connection.effectiveType as NetworkQuality
}

/**
 * Check if user has enabled data saver mode
 */
export function isDataSaverEnabled(): boolean {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return false
  }

  const connection = (
    navigator as Navigator & {
      connection?: {
        saveData?: boolean
      }
    }
  ).connection

  return connection?.saveData ?? false
}

/**
 * Get optimal image format based on browser support and network conditions
 */
export async function getOptimalImageFormat(
  preferredFormat?: 'webp' | 'avif' | 'jpeg' | 'png'
): Promise<'avif' | 'webp' | 'jpeg' | 'png'> {
  // If user prefers data saving, use WebP (good compression, wide support)
  if (isDataSaverEnabled()) {
    const webpSupported = await supportsImageFormat('webp')
    return webpSupported ? 'webp' : 'jpeg'
  }

  // If a preferred format is specified, check if it's supported
  if (preferredFormat === 'avif') {
    const avifSupported = await supportsImageFormat('avif')
    if (avifSupported) return 'avif'
  }

  if (preferredFormat === 'webp') {
    const webpSupported = await supportsImageFormat('webp')
    if (webpSupported) return 'webp'
  }

  // Default priority: AVIF > WebP > JPEG
  const avifSupported = await supportsImageFormat('avif')
  if (avifSupported) return 'avif'

  const webpSupported = await supportsImageFormat('webp')
  if (webpSupported) return 'webp'

  // Fallback to JPEG for photos, PNG for graphics
  return preferredFormat === 'png' ? 'png' : 'jpeg'
}

/**
 * Get optimal image size based on container width and device pixel ratio
 */
export function getOptimalImageSize(
  containerWidth: number,
  devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 1
): number {
  // Account for device pixel ratio
  const targetWidth = Math.ceil(containerWidth * devicePixelRatio)

  // Find the smallest breakpoint that can accommodate the target width
  const breakpoints = Object.values(IMAGE_BREAKPOINTS)
  const optimalSize =
    breakpoints.find(bp => bp >= targetWidth) ??
    breakpoints[breakpoints.length - 1] ??
    targetWidth

  return optimalSize
}

/**
 * Build an optimized image URL based on base path, size, and format
 */
export function buildImageUrl(
  basePath: string,
  size?: number,
  format?: string
): string {
  // Remove existing extension
  const pathWithoutExt = basePath.replace(/\.[^.]+$/, '')

  // Build the URL with size and format
  if (size && format) {
    return `${pathWithoutExt}-${size}.${format}`
  } else if (size) {
    // Keep original format
    const ext = basePath.match(/\.([^.]+)$/)?.[1] ?? 'jpg'
    return `${pathWithoutExt}-${size}.${ext}`
  } else if (format) {
    return `${pathWithoutExt}.${format}`
  }

  return basePath
}

/**
 * Generate a responsive image source set
 */
export interface ResponsiveImageSource {
  srcset: string
  type?: string
  sizes?: string
}

/**
 * Generate sources for the <picture> element
 */
export async function generatePictureSources(
  basePath: string,
  breakpoints: number[],
  sizesConfig?: {
    xs?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
    default?: string
  }
): Promise<ResponsiveImageSource[]> {
  const sources: ResponsiveImageSource[] = []

  // Get supported formats
  const avifSupported = await supportsImageFormat('avif')
  const webpSupported = await supportsImageFormat('webp')

  // Generate sizes attribute if config provided
  let sizesAttr: string | undefined
  if (sizesConfig) {
    const entries = Object.entries(sizesConfig).filter(
      ([key]) => key !== 'default'
    ) as Array<[keyof typeof IMAGE_BREAKPOINTS, string]>

    const mediaQueries = entries
      .sort(([a], [b]) => IMAGE_BREAKPOINTS[a] - IMAGE_BREAKPOINTS[b])
      .map(
        ([breakpoint, size]) =>
          `(max-width: ${IMAGE_BREAKPOINTS[breakpoint]}px) ${size}`
      )

    sizesAttr = sizesConfig.default
      ? [...mediaQueries, sizesConfig.default].join(', ')
      : mediaQueries.join(', ')
  }

  // AVIF source (best compression)
  if (avifSupported) {
    sources.push({
      srcset: breakpoints
        .map(size => `${buildImageUrl(basePath, size, 'avif')} ${size}w`)
        .join(', '),
      type: 'image/avif',
      sizes: sizesAttr,
    })
  }

  // WebP source (good compression, wide support)
  if (webpSupported) {
    sources.push({
      srcset: breakpoints
        .map(size => `${buildImageUrl(basePath, size, 'webp')} ${size}w`)
        .join(', '),
      type: 'image/webp',
      sizes: sizesAttr,
    })
  }

  // Original format fallback
  const ext = basePath.match(/\.([^.]+)$/)?.[1] ?? 'jpg'
  sources.push({
    srcset: breakpoints
      .map(size => `${buildImageUrl(basePath, size, ext)} ${size}w`)
      .join(', '),
    type: ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`,
    sizes: sizesAttr,
  })

  return sources
}

/**
 * Preload critical assets
 */
export function preloadAsset(
  url: string,
  type: AssetType,
  options?: {
    as?: string
    crossOrigin?: 'anonymous' | 'use-credentials'
    fetchPriority?: 'high' | 'low' | 'auto'
  }
): void {
  if (typeof document === 'undefined') return

  // Check if already preloaded
  const existing = document.querySelector(`link[href="${url}"]`)
  if (existing) return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = url

  switch (type) {
    case AssetType.IMAGE:
      link.as = options?.as ?? 'image'
      break
    case AssetType.FONT:
      link.as = 'font'
      link.type = 'font/woff2'
      link.crossOrigin = options?.crossOrigin ?? 'anonymous'
      break
    case AssetType.VIDEO:
      link.as = 'video'
      break
    case AssetType.AUDIO:
      link.as = 'audio'
      break
  }

  if (options?.fetchPriority) {
    link.setAttribute('fetchpriority', options.fetchPriority)
  }

  document.head.appendChild(link)
}

/**
 * Preload critical images
 */
export async function preloadImages(
  images: Array<{
    url: string
    responsive?: boolean
    breakpoints?: number[]
  }>
): Promise<void> {
  const format = await getOptimalImageFormat()

  for (const image of images) {
    if (image.responsive && image.breakpoints) {
      // Preload the largest size in optimal format
      const largestSize = Math.max(...image.breakpoints)
      const url = buildImageUrl(image.url, largestSize, format)
      preloadAsset(url, AssetType.IMAGE, { fetchPriority: 'high' })
    } else {
      // Preload the image in optimal format
      const url = buildImageUrl(image.url, undefined, format)
      preloadAsset(url, AssetType.IMAGE, { fetchPriority: 'high' })
    }
  }
}

/**
 * Lazy load an asset when it enters the viewport
 */
export function lazyLoadAsset(
  element: HTMLElement,
  callback: () => void,
  options?: IntersectionObserverInit
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    // Fallback: load immediately if IntersectionObserver is not supported
    callback()
    return null
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback()
        observer.disconnect()
      }
    })
  }, options)

  observer.observe(element)
  return observer
}

/**
 * Get adaptive quality based on network conditions
 */
export function getAdaptiveQuality(): number {
  const network = getNetworkInfo()

  switch (network) {
    case NetworkQuality.SLOW_2G:
      return 40 // Very low quality
    case NetworkQuality.TWO_G:
      return 50 // Low quality
    case NetworkQuality.THREE_G:
      return 70 // Medium quality
    case NetworkQuality.FOUR_G:
    case NetworkQuality.UNKNOWN:
    default:
      return 85 // High quality
  }
}

/**
 * Check if resource should be lazy loaded based on network conditions
 */
export function shouldLazyLoad(): boolean {
  // Always lazy load if data saver is enabled
  if (isDataSaverEnabled()) {
    return true
  }

  const network = getNetworkInfo()
  // Lazy load on slow connections
  return network === NetworkQuality.SLOW_2G || network === NetworkQuality.TWO_G
}

/**
 * Asset loading strategy
 */
export interface AssetLoadingStrategy {
  format: 'avif' | 'webp' | 'jpeg' | 'png'
  quality: number
  shouldLazyLoad: boolean
  preloadCritical: boolean
}

/**
 * Get optimal asset loading strategy based on current conditions
 */
export async function getLoadingStrategy(
  critical = false
): Promise<AssetLoadingStrategy> {
  return {
    format: await getOptimalImageFormat(),
    quality: getAdaptiveQuality(),
    shouldLazyLoad: !critical && shouldLazyLoad(),
    preloadCritical: critical,
  }
}

/**
 * Monitor asset loading performance
 */
export interface AssetPerformanceEntry {
  name: string
  duration: number
  size: number
  type: string
}

/**
 * Get asset loading performance metrics
 */
export function getAssetPerformanceMetrics(): AssetPerformanceEntry[] {
  if (
    typeof window === 'undefined' ||
    !('performance' in window) ||
    !window.performance.getEntriesByType
  ) {
    return []
  }

  const resourceEntries = window.performance.getEntriesByType(
    'resource'
  ) as PerformanceResourceTiming[]

  return resourceEntries
    .filter(entry => {
      // Filter for asset types
      const isAsset =
        entry.initiatorType === 'img' ||
        entry.initiatorType === 'css' ||
        entry.initiatorType === 'link'
      return isAsset
    })
    .map(entry => ({
      name: entry.name,
      duration: entry.duration,
      size: entry.transferSize || 0,
      type: entry.initiatorType,
    }))
}

/**
 * Log asset loading statistics
 */
export function logAssetStats(): void {
  const metrics = getAssetPerformanceMetrics()

  if (metrics.length === 0) {
    console.log('No asset performance metrics available')
    return
  }

  const totalSize = metrics.reduce((sum, m) => sum + m.size, 0)
  const totalDuration = metrics.reduce((sum, m) => sum + m.duration, 0)

  console.group('Asset Loading Statistics')
  console.log(`Total Assets: ${metrics.length}`)
  console.log(`Total Size: ${(totalSize / 1024).toFixed(2)} KB`)
  console.log(`Total Load Time: ${totalDuration.toFixed(2)} ms`)
  console.log(
    `Average Load Time: ${(totalDuration / metrics.length).toFixed(2)} ms`
  )
  console.groupEnd()
}
