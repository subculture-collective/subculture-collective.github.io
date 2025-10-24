/**
 * useAnalytics Hook
 *
 * Custom hook for tracking analytics events
 * Provides convenient methods for tracking common events
 */

import { useCallback } from 'react'
import {
  trackEvent,
  trackPageView,
  trackCTA,
  trackFormSubmit,
  trackNavigation,
  trackOutboundLink,
  trackDownload,
  trackBlogPost,
  trackError,
  type EventProps,
} from '../utils/analytics'

/**
 * Hook for analytics tracking
 *
 * @example
 * const analytics = useAnalytics()
 * analytics.trackCTA('Join Now', 'hero')
 */
export function useAnalytics() {
  // Track custom event
  const track = useCallback((eventName: string, props?: EventProps) => {
    trackEvent(eventName, props)
  }, [])

  // Track page view
  const page = useCallback((url?: string) => {
    trackPageView(url)
  }, [])

  // Track CTA button click
  const cta = useCallback((buttonName: string, location: string) => {
    trackCTA(buttonName, location)
  }, [])

  // Track form submission
  const form = useCallback((formName: string, success: boolean) => {
    trackFormSubmit(formName, success)
  }, [])

  // Track navigation
  const navigate = useCallback((destination: string, source: string) => {
    trackNavigation(destination, source)
  }, [])

  // Track outbound link
  const outbound = useCallback((url: string, label?: string) => {
    trackOutboundLink(url, label)
  }, [])

  // Track download
  const download = useCallback((filename: string, type?: string) => {
    trackDownload(filename, type)
  }, [])

  // Track blog post interaction
  const blog = useCallback((action: string, postSlug: string) => {
    trackBlogPost(action, postSlug)
  }, [])

  // Track error
  const error = useCallback((errorType: string, message: string) => {
    trackError(errorType, message)
  }, [])

  return {
    track,
    page,
    cta,
    form,
    navigate,
    outbound,
    download,
    blog,
    error,
  }
}
