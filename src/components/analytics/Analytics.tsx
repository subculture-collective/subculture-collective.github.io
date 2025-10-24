/**
 * Analytics Component
 *
 * Loads Plausible Analytics script conditionally based on environment
 * and user preferences (respects Do Not Track)
 */

import { useEffect } from 'react'
import { initAnalytics } from '../../utils/analytics'

interface AnalyticsProps {
  /**
   * Your site domain (e.g., 'example.com')
   */
  domain: string

  /**
   * Custom API host if self-hosting Plausible
   * Defaults to 'https://plausible.io'
   */
  apiHost?: string

  /**
   * Enable/disable analytics
   * Defaults to true in production, false in development
   */
  enabled?: boolean
}

/**
 * Analytics component that loads Plausible Analytics script
 *
 * @example
 * <Analytics domain="subculture-collective.github.io" />
 *
 * @example
 * // With custom API host (self-hosted)
 * <Analytics domain="example.com" apiHost="https://analytics.example.com" />
 */
export default function Analytics({
  domain,
  apiHost = 'https://plausible.io',
  enabled = import.meta.env.PROD,
}: AnalyticsProps) {
  useEffect(() => {
    // Don't load analytics if disabled
    if (!enabled) {
      if (import.meta.env.DEV) {
        console.log('Analytics disabled')
      }
      return
    }

    // Don't load analytics if Do Not Track is enabled
    if (
      navigator.doNotTrack === '1' ||
      navigator.doNotTrack === 'yes' ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).doNotTrack === '1'
    ) {
      if (import.meta.env.DEV) {
        console.log('Analytics disabled: Do Not Track enabled')
      }
      return
    }

    // Initialize analytics configuration
    initAnalytics({
      domain,
      apiHost,
      enabled,
    })

    // Check if script is already loaded
    const existingScript = document.querySelector(
      `script[data-domain="${domain}"]`
    )
    if (existingScript) {
      return
    }

    // Create and load Plausible script
    const script = document.createElement('script')
    script.defer = true
    script.dataset.domain = domain
    script.src = `${apiHost}/js/script.js`

    // Add error handling
    script.onerror = () => {
      console.error('Failed to load analytics script')
    }

    // Append script to document
    document.head.appendChild(script)

    // Cleanup function
    return () => {
      // Note: We don't remove the script on unmount to maintain analytics
      // across route changes in SPAs
    }
  }, [domain, apiHost, enabled])

  // This component doesn't render anything
  return null
}

Analytics.displayName = 'Analytics'
