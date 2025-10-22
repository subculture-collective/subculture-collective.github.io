/**
 * useImageCycle Hook
 *
 * Custom hook for cycling through images with configurable interval
 * Handles preloading and smooth transitions between images
 */

import { useState, useEffect, useCallback } from 'react'

export interface ImageCycleOptions {
  images: string[]
  interval?: number // milliseconds
  autoPlay?: boolean
  preload?: boolean
}

export interface ImageCycleState {
  currentIndex: number
  currentImage: string
  isTransitioning: boolean
  next: () => void
  previous: () => void
  goTo: (index: number) => void
  pause: () => void
  resume: () => void
  isPlaying: boolean
}

/**
 * Hook for cycling through images
 *
 * @param options - Configuration options
 * @returns Image cycle state and controls
 *
 * @example
 * ```tsx
 * const { currentImage, next } = useImageCycle({
 *   images: ['/hero-1.jpg', '/hero-2.jpg'],
 *   interval: 5000,
 *   autoPlay: true
 * })
 * ```
 */
export function useImageCycle({
  images,
  interval = 6000,
  autoPlay = true,
  preload = true,
}: ImageCycleOptions): ImageCycleState {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // Preload images
  useEffect(() => {
    if (!preload || images.length === 0) {
      setImagesLoaded(true)
      return
    }

    const imageElements: HTMLImageElement[] = []
    let loadedCount = 0

    images.forEach(src => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        loadedCount++
        if (loadedCount === images.length) {
          setImagesLoaded(true)
        }
      }
      img.onerror = () => {
        loadedCount++
        if (loadedCount === images.length) {
          setImagesLoaded(true)
        }
      }
      imageElements.push(img)
    })

    return () => {
      imageElements.forEach(img => {
        img.onload = null
        img.onerror = null
      })
    }
  }, [images, preload])

  // Navigate to next image
  const next = useCallback(() => {
    if (images.length === 0) return

    setIsTransitioning(true)
    setCurrentIndex(prev => (prev + 1) % images.length)

    // Reset transition state after animation
    setTimeout(() => setIsTransitioning(false), 500)
  }, [images.length])

  // Navigate to previous image
  const previous = useCallback(() => {
    if (images.length === 0) return

    setIsTransitioning(true)
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length)

    setTimeout(() => setIsTransitioning(false), 500)
  }, [images.length])

  // Go to specific index
  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= images.length) return

      setIsTransitioning(true)
      setCurrentIndex(index)

      setTimeout(() => setIsTransitioning(false), 500)
    },
    [images.length]
  )

  // Pause auto-cycling
  const pause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  // Resume auto-cycling
  const resume = useCallback(() => {
    setIsPlaying(true)
  }, [])

  // Auto-cycle images
  useEffect(() => {
    if (!isPlaying || !imagesLoaded || images.length <= 1) return

    const timer = setInterval(() => {
      next()
    }, interval)

    return () => clearInterval(timer)
  }, [isPlaying, imagesLoaded, images.length, interval, next])

  return {
    currentIndex,
    currentImage: images[currentIndex] || '',
    isTransitioning,
    next,
    previous,
    goTo,
    pause,
    resume,
    isPlaying,
  }
}
