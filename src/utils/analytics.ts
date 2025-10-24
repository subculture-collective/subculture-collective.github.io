/**
 * Analytics Utilities
 *
 * Privacy-focused analytics tracking using Plausible Analytics
 * - GDPR compliant, no cookies
 * - Respects Do Not Track
 * - Anonymous data collection
 */

/**
 * Custom event properties type
 */
export interface EventProps {
  [key: string]: string | number | boolean
}

/**
 * Analytics configuration
 */
export interface AnalyticsConfig {
  domain: string
  apiHost?: string
  enabled: boolean
}

/**
 * Check if analytics is available and enabled
 */
export function isAnalyticsAvailable(): boolean {
  // Check if Plausible is loaded
  if (typeof window === 'undefined' || !window.plausible) {
    return false
  }

  // Respect Do Not Track
  if (navigator.doNotTrack === '1' || navigator.doNotTrack === 'yes') {
    return false
  }

  // Check if running in production
  return import.meta.env.PROD
}

/**
 * Track a page view
 * Plausible automatically tracks page views, but this can be used for SPAs
 */
export function trackPageView(url?: string): void {
  if (!isAnalyticsAvailable()) return

  try {
    window.plausible?.('pageview', {
      props: { url: url || window.location.pathname },
    })
  } catch (error) {
    console.error('Error tracking page view:', error)
  }
}

/**
 * Track a custom event
 *
 * @param eventName - Name of the event (e.g., 'CTA Click', 'Form Submit')
 * @param props - Optional event properties
 *
 * @example
 * trackEvent('CTA Click', { button: 'Join Now', location: 'hero' })
 */
export function trackEvent(eventName: string, props?: EventProps): void {
  if (!isAnalyticsAvailable()) return

  try {
    if (props) {
      window.plausible?.(eventName, { props })
    } else {
      window.plausible?.(eventName)
    }
  } catch (error) {
    console.error('Error tracking event:', error)
  }
}

/**
 * Track outbound link clicks
 */
export function trackOutboundLink(url: string, label?: string): void {
  trackEvent('Outbound Link', {
    url,
    label: label || url,
  })
}

/**
 * Track file downloads
 */
export function trackDownload(filename: string, type?: string): void {
  trackEvent('File Download', {
    filename,
    type: type || 'unknown',
  })
}

/**
 * Track form submissions
 */
export function trackFormSubmit(formName: string, success: boolean): void {
  trackEvent('Form Submit', {
    form: formName,
    success: success ? 'true' : 'false',
  })
}

/**
 * Track CTA button clicks
 */
export function trackCTA(buttonName: string, location: string): void {
  trackEvent('CTA Click', {
    button: buttonName,
    location,
  })
}

/**
 * Track navigation clicks
 */
export function trackNavigation(destination: string, source: string): void {
  trackEvent('Navigation', {
    destination,
    source,
  })
}

/**
 * Track blog post interactions
 */
export function trackBlogPost(action: string, postSlug: string): void {
  trackEvent('Blog Post', {
    action,
    post: postSlug,
  })
}

/**
 * Track errors
 */
export function trackError(errorType: string, message: string): void {
  trackEvent('Error', {
    type: errorType,
    message: message.substring(0, 100), // Limit message length
  })
}

/**
 * Track Web Vitals metrics
 */
export function trackWebVital(
  name: string,
  value: number,
  id: string,
  rating: string
): void {
  trackEvent('Web Vitals', {
    metric: name,
    value: Math.round(value),
    id,
    rating,
  })
}

/**
 * Initialize analytics configuration
 */
export function initAnalytics(config: AnalyticsConfig): void {
  if (typeof window === 'undefined') return

  // Store config for reference
  window.__analyticsConfig = config

  // Log initialization in development
  if (import.meta.env.DEV) {
    console.log('Analytics initialized:', config)
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> }
    ) => void
    __analyticsConfig?: AnalyticsConfig
  }
}
