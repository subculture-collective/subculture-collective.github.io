/**
 * Tests for useImageCycle hook
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useImageCycle } from '../useImageCycle'

describe('useImageCycle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const mockImages = ['/image1.jpg', '/image2.jpg', '/image3.jpg']

  describe('initialization', () => {
    it('should initialize with first image', () => {
      const { result } = renderHook(() =>
        useImageCycle({ images: mockImages, autoPlay: false })
      )

      expect(result.current.currentIndex).toBe(0)
      expect(result.current.currentImage).toBe('/image1.jpg')
      expect(result.current.isPlaying).toBe(false)
    })

    it('should start playing when autoPlay is true', () => {
      const { result } = renderHook(() =>
        useImageCycle({ images: mockImages, autoPlay: true })
      )

      expect(result.current.isPlaying).toBe(true)
    })

    it('should handle empty images array', () => {
      const { result } = renderHook(() =>
        useImageCycle({ images: [], autoPlay: false })
      )

      expect(result.current.currentIndex).toBe(0)
      expect(result.current.currentImage).toBe('')
    })
  })

  describe('navigation', () => {
    it('should navigate to next image', () => {
      const { result } = renderHook(() =>
        useImageCycle({ images: mockImages, autoPlay: false })
      )

      act(() => {
        result.current.next()
      })

      expect(result.current.currentIndex).toBe(1)
      expect(result.current.currentImage).toBe('/image2.jpg')
    })

    it('should wrap around to first image after last', () => {
      const { result } = renderHook(() =>
        useImageCycle({ images: mockImages, autoPlay: false })
      )

      act(() => {
        result.current.next()
        result.current.next()
        result.current.next()
      })

      expect(result.current.currentIndex).toBe(0)
      expect(result.current.currentImage).toBe('/image1.jpg')
    })

    it('should navigate to previous image', () => {
      const { result } = renderHook(() =>
        useImageCycle({ images: mockImages, autoPlay: false })
      )

      act(() => {
        result.current.next()
      })

      act(() => {
        result.current.previous()
      })

      expect(result.current.currentIndex).toBe(0)
      expect(result.current.currentImage).toBe('/image1.jpg')
    })

    it('should wrap around to last image when going previous from first', () => {
      const { result } = renderHook(() =>
        useImageCycle({ images: mockImages, autoPlay: false })
      )

      act(() => {
        result.current.previous()
      })

      expect(result.current.currentIndex).toBe(2)
      expect(result.current.currentImage).toBe('/image3.jpg')
    })

    it('should go to specific index', () => {
      const { result } = renderHook(() =>
        useImageCycle({ images: mockImages, autoPlay: false })
      )

      act(() => {
        result.current.goTo(2)
      })

      expect(result.current.currentIndex).toBe(2)
      expect(result.current.currentImage).toBe('/image3.jpg')
    })

    it('should not go to invalid index', () => {
      const { result } = renderHook(() =>
        useImageCycle({ images: mockImages, autoPlay: false })
      )

      act(() => {
        result.current.goTo(-1)
      })

      expect(result.current.currentIndex).toBe(0)

      act(() => {
        result.current.goTo(10)
      })

      expect(result.current.currentIndex).toBe(0)
    })
  })

  describe('transition state', () => {
    it('should set transitioning state when navigating', () => {
      const { result } = renderHook(() =>
        useImageCycle({ images: mockImages, autoPlay: false })
      )

      act(() => {
        result.current.next()
      })

      expect(result.current.isTransitioning).toBe(true)

      act(() => {
        vi.advanceTimersByTime(500)
      })

      expect(result.current.isTransitioning).toBe(false)
    })
  })

  describe('play/pause controls', () => {
    it('should pause auto-cycling', () => {
      const { result } = renderHook(() =>
        useImageCycle({ images: mockImages, autoPlay: true, interval: 1000 })
      )

      expect(result.current.isPlaying).toBe(true)

      act(() => {
        result.current.pause()
      })

      expect(result.current.isPlaying).toBe(false)
    })

    it('should resume auto-cycling', () => {
      const { result } = renderHook(() =>
        useImageCycle({ images: mockImages, autoPlay: false })
      )

      expect(result.current.isPlaying).toBe(false)

      act(() => {
        result.current.resume()
      })

      expect(result.current.isPlaying).toBe(true)
    })
  })

  describe('auto-cycling', () => {
    it('should auto-cycle through images', () => {
      const { result } = renderHook(() =>
        useImageCycle({
          images: mockImages,
          autoPlay: true,
          interval: 1000,
          preload: false,
        })
      )

      expect(result.current.currentIndex).toBe(0)

      act(() => {
        vi.advanceTimersByTime(1000)
      })

      expect(result.current.currentIndex).toBe(1)

      act(() => {
        vi.advanceTimersByTime(1000)
      })

      expect(result.current.currentIndex).toBe(2)
    })

    it('should not auto-cycle when paused', () => {
      const { result } = renderHook(() =>
        useImageCycle({ images: mockImages, autoPlay: true, interval: 1000 })
      )

      act(() => {
        result.current.pause()
      })

      const initialIndex = result.current.currentIndex

      act(() => {
        vi.advanceTimersByTime(2000)
      })

      expect(result.current.currentIndex).toBe(initialIndex)
    })

    it('should not auto-cycle with single image', () => {
      const { result } = renderHook(() =>
        useImageCycle({
          images: ['/image1.jpg'],
          autoPlay: true,
          interval: 1000,
        })
      )

      const initialIndex = result.current.currentIndex

      act(() => {
        vi.advanceTimersByTime(2000)
      })

      expect(result.current.currentIndex).toBe(initialIndex)
    })

    it('should use custom interval', () => {
      const { result } = renderHook(() =>
        useImageCycle({
          images: mockImages,
          autoPlay: true,
          interval: 500,
          preload: false,
        })
      )

      expect(result.current.currentIndex).toBe(0)

      act(() => {
        vi.advanceTimersByTime(500)
      })

      expect(result.current.currentIndex).toBe(1)
    })
  })

  describe('image preloading', () => {
    it('should preload images when enabled', () => {
      const { result } = renderHook(() =>
        useImageCycle({ images: mockImages, preload: true, autoPlay: false })
      )

      // Hook should initialize normally
      expect(result.current.currentImage).toBe('/image1.jpg')
    })

    it('should work without preloading', () => {
      const { result } = renderHook(() =>
        useImageCycle({ images: mockImages, preload: false, autoPlay: false })
      )

      expect(result.current.currentImage).toBe('/image1.jpg')
    })
  })

  describe('edge cases', () => {
    it('should handle navigation with empty images', () => {
      const { result } = renderHook(() =>
        useImageCycle({ images: [], autoPlay: false })
      )

      act(() => {
        result.current.next()
      })

      expect(result.current.currentIndex).toBe(0)

      act(() => {
        result.current.previous()
      })

      expect(result.current.currentIndex).toBe(0)
    })
  })
})
