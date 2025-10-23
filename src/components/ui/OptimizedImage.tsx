/**
 * OptimizedImage Component
 *
 * High-performance image component with modern format support, responsive images,
 * lazy loading, and blur-up placeholder effect
 */

import { useState, useEffect, useRef, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Helper function to replace image extensions in srcSet strings
 * Handles multiple URLs separated by commas
 * @param srcSet - The srcSet string containing one or more image URLs with descriptors
 * @param newExtension - The new file extension (e.g., '.avif', '.webp')
 * @returns The srcSet string with all image extensions replaced
 */
function replaceSrcSetExtensions(srcSet: string, newExtension: string): string {
  return srcSet
    .split(',')
    .map(part => {
      const trimmed = part.trim()
      return trimmed.replace(/\.(jpg|jpeg|png)/gi, newExtension)
    })
    .join(', ')
}

export interface OptimizedImageProps {
  /**
   * Image source URL
   */
  src: string
  /**
   * Alt text for accessibility
   */
  alt: string
  /**
   * Optional srcset for responsive images
   */
  srcSet?: string
  /**
   * Sizes attribute for responsive images
   */
  sizes?: string
  /**
   * Image width
   */
  width?: number
  /**
   * Image height
   */
  height?: number
  /**
   * CSS class name
   */
  className?: string
  /**
   * Object fit style
   * @default 'cover'
   */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  /**
   * Loading strategy
   * @default 'lazy'
   */
  loading?: 'lazy' | 'eager'
  /**
   * Show blur-up placeholder during load
   * @default true
   */
  showPlaceholder?: boolean
  /**
   * Placeholder blur amount (px)
   * @default 10
   */
  placeholderBlur?: number
  /**
   * Callback when image loads successfully
   */
  onLoad?: () => void
  /**
   * Callback when image fails to load
   */
  onError?: () => void
  /**
   * Fallback image source if main image fails
   */
  fallbackSrc?: string
  /**
   * Priority loading (disables lazy loading)
   * @default false
   */
  priority?: boolean
}

/**
 * OptimizedImage Component
 *
 * Provides optimized image loading with modern formats, responsive images,
 * lazy loading, and smooth transitions
 *
 * @example
 * ```tsx
 * <OptimizedImage
 *   src="/hero.jpg"
 *   alt="Hero image"
 *   srcSet="/hero-400.jpg 400w, /hero-800.jpg 800w"
 *   sizes="(max-width: 768px) 100vw, 50vw"
 *   showPlaceholder
 * />
 * ```
 */
const OptimizedImage = memo(
  ({
    src,
    alt,
    srcSet,
    sizes,
    width,
    height,
    className = '',
    objectFit = 'cover',
    loading = 'lazy',
    showPlaceholder = true,
    placeholderBlur = 10,
    onLoad,
    onError,
    fallbackSrc,
    priority = false,
  }: OptimizedImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [isInView, setIsInView] = useState(priority || loading === 'eager')
    const imgRef = useRef<HTMLImageElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Intersection Observer for lazy loading
    useEffect(() => {
      if (priority || loading === 'eager' || !containerRef.current) {
        return
      }

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsInView(true)
              observer.disconnect()
            }
          })
        },
        {
          rootMargin: '50px', // Start loading 50px before image enters viewport
        }
      )

      observer.observe(containerRef.current)

      return () => {
        observer.disconnect()
      }
    }, [priority, loading])

    const handleLoad = () => {
      setIsLoaded(true)
      setHasError(false)
      onLoad?.()
    }

    const handleError = () => {
      if (fallbackSrc && !hasError) {
        setHasError(true)
        onError?.()
      } else {
        setIsLoaded(true)
        setHasError(true)
        onError?.()
      }
    }

    // Get the appropriate source URL
    const imageSource = hasError && fallbackSrc ? fallbackSrc : src

    // Generate WebP/AVIF sources if original is JPG/PNG
    const shouldGenerateModernFormats = src.match(/\.(jpg|jpeg|png)$/i)
    const baseUrl = src.replace(/\.(jpg|jpeg|png)$/i, '')

    const objectFitClass = {
      cover: 'object-cover',
      contain: 'object-contain',
      fill: 'object-fill',
      none: 'object-none',
      'scale-down': 'object-scale-down',
    }[objectFit]

    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden ${className}`}
        style={{
          width: width ? `${width}px` : undefined,
          height: height ? `${height}px` : undefined,
        }}
      >
        {/* Placeholder blur-up effect */}
        <AnimatePresence>
          {showPlaceholder && !isLoaded && isInView && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-deep-gray via-mid-gray to-cyber-black"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                filter: `blur(${placeholderBlur}px)`,
              }}
            />
          )}
        </AnimatePresence>

        {/* Main Image */}
        {isInView && (
          <picture>
            {/* Modern formats with fallback */}
            {shouldGenerateModernFormats && (
              <>
                {/* AVIF format - best compression */}
                {srcSet && (
                  <source
                    type="image/avif"
                    srcSet={replaceSrcSetExtensions(srcSet, '.avif')}
                    sizes={sizes}
                  />
                )}
                <source
                  type="image/avif"
                  srcSet={`${baseUrl}.avif`}
                  sizes={sizes}
                />

                {/* WebP format - good compression, wide support */}
                {srcSet && (
                  <source
                    type="image/webp"
                    srcSet={replaceSrcSetExtensions(srcSet, '.webp')}
                    sizes={sizes}
                  />
                )}
                <source
                  type="image/webp"
                  srcSet={`${baseUrl}.webp`}
                  sizes={sizes}
                />
              </>
            )}

            {/* Original format as fallback */}
            <motion.img
              ref={imgRef}
              src={imageSource}
              srcSet={srcSet}
              sizes={sizes}
              alt={alt}
              width={width}
              height={height}
              loading={priority ? 'eager' : loading}
              decoding="async"
              className={`w-full h-full ${objectFitClass} transition-opacity duration-300 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleLoad}
              onError={handleError}
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </picture>
        )}

        {/* Error state */}
        {hasError && !fallbackSrc && isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-deep-gray">
            <div className="text-center text-gray-500 p-4">
              <svg
                className="w-12 h-12 mx-auto mb-2 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-xs font-mono">Image failed to load</p>
            </div>
          </div>
        )}
      </div>
    )
  }
)

OptimizedImage.displayName = 'OptimizedImage'

export default OptimizedImage
