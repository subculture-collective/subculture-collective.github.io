/**
 * Tests for analytics utilities
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  isAnalyticsAvailable,
  trackPageView,
  trackEvent,
  trackCTA,
  trackFormSubmit,
  trackNavigation,
  trackOutboundLink,
  trackDownload,
  trackBlogPost,
  trackError,
  trackWebVital,
  initAnalytics,
} from '../analytics'

// Mock window.plausible
const mockPlausible = vi.fn()

describe('Analytics Utilities', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks()

    // Mock window.plausible
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).plausible = mockPlausible

    // Mock navigator.doNotTrack
    Object.defineProperty(navigator, 'doNotTrack', {
      writable: true,
      configurable: true,
      value: null,
    })

    // Mock import.meta.env.PROD
    vi.stubEnv('PROD', true)
  })

  describe('isAnalyticsAvailable', () => {
    it('should return true when plausible is available and in production', () => {
      expect(isAnalyticsAvailable()).toBe(true)
    })

    it('should return false when plausible is not available', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).plausible
      expect(isAnalyticsAvailable()).toBe(false)
    })

    it('should return false when Do Not Track is enabled', () => {
      Object.defineProperty(navigator, 'doNotTrack', {
        writable: true,
        configurable: true,
        value: '1',
      })
      expect(isAnalyticsAvailable()).toBe(false)
    })

    it('should return false when Do Not Track is "yes"', () => {
      Object.defineProperty(navigator, 'doNotTrack', {
        writable: true,
        configurable: true,
        value: 'yes',
      })
      expect(isAnalyticsAvailable()).toBe(false)
    })

    it('should return false in development', () => {
      vi.stubEnv('PROD', false)
      expect(isAnalyticsAvailable()).toBe(false)
    })
  })

  describe('trackPageView', () => {
    it('should track page view with current pathname', () => {
      trackPageView()
      expect(mockPlausible).toHaveBeenCalledWith('pageview', {
        props: { url: window.location.pathname },
      })
    })

    it('should track page view with custom URL', () => {
      trackPageView('/custom-page')
      expect(mockPlausible).toHaveBeenCalledWith('pageview', {
        props: { url: '/custom-page' },
      })
    })

    it('should not track when analytics is not available', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).plausible
      trackPageView()
      expect(mockPlausible).not.toHaveBeenCalled()
    })

    it('should handle errors gracefully', () => {
      mockPlausible.mockImplementation(() => {
        throw new Error('Test error')
      })
      expect(() => trackPageView()).not.toThrow()
    })
  })

  describe('trackEvent', () => {
    it('should track event without props', () => {
      trackEvent('Test Event')
      expect(mockPlausible).toHaveBeenCalledWith('Test Event')
    })

    it('should track event with props', () => {
      trackEvent('Test Event', { key: 'value', number: 123 })
      expect(mockPlausible).toHaveBeenCalledWith('Test Event', {
        props: { key: 'value', number: 123 },
      })
    })

    it('should not track when analytics is not available', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).plausible
      trackEvent('Test Event')
      expect(mockPlausible).not.toHaveBeenCalled()
    })

    it('should handle errors gracefully', () => {
      mockPlausible.mockImplementation(() => {
        throw new Error('Test error')
      })
      expect(() => trackEvent('Test Event')).not.toThrow()
    })
  })

  describe('trackCTA', () => {
    it('should track CTA click with correct props', () => {
      trackCTA('Join Now', 'hero')
      expect(mockPlausible).toHaveBeenCalledWith('CTA Click', {
        props: {
          button: 'Join Now',
          location: 'hero',
        },
      })
    })
  })

  describe('trackFormSubmit', () => {
    it('should track successful form submission', () => {
      trackFormSubmit('Contact Form', true)
      expect(mockPlausible).toHaveBeenCalledWith('Form Submit', {
        props: {
          form: 'Contact Form',
          success: 'true',
        },
      })
    })

    it('should track failed form submission', () => {
      trackFormSubmit('Contact Form', false)
      expect(mockPlausible).toHaveBeenCalledWith('Form Submit', {
        props: {
          form: 'Contact Form',
          success: 'false',
        },
      })
    })
  })

  describe('trackNavigation', () => {
    it('should track navigation with destination and source', () => {
      trackNavigation('/about', 'header')
      expect(mockPlausible).toHaveBeenCalledWith('Navigation', {
        props: {
          destination: '/about',
          source: 'header',
        },
      })
    })
  })

  describe('trackOutboundLink', () => {
    it('should track outbound link with URL', () => {
      trackOutboundLink('https://example.com')
      expect(mockPlausible).toHaveBeenCalledWith('Outbound Link', {
        props: {
          url: 'https://example.com',
          label: 'https://example.com',
        },
      })
    })

    it('should track outbound link with custom label', () => {
      trackOutboundLink('https://example.com', 'Example Site')
      expect(mockPlausible).toHaveBeenCalledWith('Outbound Link', {
        props: {
          url: 'https://example.com',
          label: 'Example Site',
        },
      })
    })
  })

  describe('trackDownload', () => {
    it('should track download with filename', () => {
      trackDownload('document.pdf')
      expect(mockPlausible).toHaveBeenCalledWith('File Download', {
        props: {
          filename: 'document.pdf',
          type: 'unknown',
        },
      })
    })

    it('should track download with type', () => {
      trackDownload('document.pdf', 'pdf')
      expect(mockPlausible).toHaveBeenCalledWith('File Download', {
        props: {
          filename: 'document.pdf',
          type: 'pdf',
        },
      })
    })
  })

  describe('trackBlogPost', () => {
    it('should track blog post interaction', () => {
      trackBlogPost('read', 'my-post-slug')
      expect(mockPlausible).toHaveBeenCalledWith('Blog Post', {
        props: {
          action: 'read',
          post: 'my-post-slug',
        },
      })
    })
  })

  describe('trackError', () => {
    it('should track error with type and message', () => {
      trackError('Network Error', 'Failed to fetch data')
      expect(mockPlausible).toHaveBeenCalledWith('Error', {
        props: {
          type: 'Network Error',
          message: 'Failed to fetch data',
        },
      })
    })

    it('should truncate long error messages', () => {
      const longMessage = 'a'.repeat(150)
      trackError('Error', longMessage)
      expect(mockPlausible).toHaveBeenCalledWith('Error', {
        props: {
          type: 'Error',
          message: longMessage.substring(0, 100),
        },
      })
    })
  })

  describe('trackWebVital', () => {
    it('should track web vital metric', () => {
      trackWebVital('LCP', 1234.56, 'v1-123', 'good')
      expect(mockPlausible).toHaveBeenCalledWith('Web Vitals', {
        props: {
          metric: 'LCP',
          value: 1235, // rounded
          id: 'v1-123',
          rating: 'good',
        },
      })
    })
  })

  describe('initAnalytics', () => {
    it('should initialize analytics configuration', () => {
      const config = {
        domain: 'example.com',
        apiHost: 'https://analytics.example.com',
        enabled: true,
      }
      initAnalytics(config)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((window as any).__analyticsConfig).toEqual(config)
    })
  })
})
