/**
 * Performance Utilities
 *
 * Utilities for measuring and optimizing web performance
 */

/**
 * Report Web Vitals metrics to analytics
 */
export function reportWebVitals(metric: {
  name: string
  value: number
  id: string
  rating: 'good' | 'needs-improvement' | 'poor'
}) {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log('Web Vital:', metric)
  }

  // In production, send to analytics service
  // Example: window.gtag?.('event', metric.name, { value: metric.value, metric_id: metric.id })
}

/**
 * Prefetch a route for faster navigation
 */
export function prefetchRoute(path: string) {
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = path
  document.head.appendChild(link)
}

/**
 * Preload critical resources
 */
export function preloadResource(url: string, as: string) {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = url
  link.as = as
  document.head.appendChild(link)
}

/**
 * DNS prefetch for external domains
 */
export function dnsPrefetch(domain: string) {
  const link = document.createElement('link')
  link.rel = 'dns-prefetch'
  link.href = domain
  document.head.appendChild(link)
}

/**
 * Preconnect to external domains
 */
export function preconnect(domain: string) {
  const link = document.createElement('link')
  link.rel = 'preconnect'
  link.href = domain
  link.crossOrigin = 'anonymous'
  document.head.appendChild(link)
}

/**
 * Measure First Contentful Paint (FCP)
 */
export function measureFCP() {
  const observer = new PerformanceObserver(list => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        reportWebVitals({
          name: 'FCP',
          value: entry.startTime,
          id: 'v1',
          rating:
            entry.startTime < 1800
              ? 'good'
              : entry.startTime < 3000
                ? 'needs-improvement'
                : 'poor',
        })
        observer.disconnect()
      }
    }
  })

  observer.observe({ type: 'paint', buffered: true })
}

/**
 * Measure Largest Contentful Paint (LCP)
 */
export function measureLCP() {
  const observer = new PerformanceObserver(list => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1]

    if (lastEntry) {
      reportWebVitals({
        name: 'LCP',
        value: lastEntry.startTime,
        id: 'v1',
        rating:
          lastEntry.startTime < 2500
            ? 'good'
            : lastEntry.startTime < 4000
              ? 'needs-improvement'
              : 'poor',
      })
    }
  })

  observer.observe({ type: 'largest-contentful-paint', buffered: true })
}

/**
 * Measure Cumulative Layout Shift (CLS)
 */
export function measureCLS() {
  let clsValue = 0
  const observer = new PerformanceObserver(list => {
    for (const entry of list.getEntries()) {
      // Only count layout shifts without recent user input
      if (!(entry as LayoutShift).hadRecentInput) {
        clsValue += (entry as LayoutShift).value
      }
    }

    reportWebVitals({
      name: 'CLS',
      value: clsValue,
      id: 'v1',
      rating:
        clsValue < 0.1
          ? 'good'
          : clsValue < 0.25
            ? 'needs-improvement'
            : 'poor',
    })
  })

  observer.observe({ type: 'layout-shift', buffered: true })
}

/**
 * Measure First Input Delay (FID) - deprecated in favor of INP
 */
export function measureFID() {
  const observer = new PerformanceObserver(list => {
    for (const entry of list.getEntries()) {
      const fid =
        (entry as PerformanceEventTiming).processingStart - entry.startTime

      reportWebVitals({
        name: 'FID',
        value: fid,
        id: 'v1',
        rating: fid < 100 ? 'good' : fid < 300 ? 'needs-improvement' : 'poor',
      })
    }
  })

  observer.observe({ type: 'first-input', buffered: true })
}

/**
 * Measure Interaction to Next Paint (INP) - new metric
 */
export function measureINP() {
  let maxINP = 0
  const observer = new PerformanceObserver(list => {
    for (const entry of list.getEntries()) {
      const inp =
        (entry as PerformanceEventTiming).processingStart - entry.startTime
      maxINP = Math.max(maxINP, inp)
    }

    reportWebVitals({
      name: 'INP',
      value: maxINP,
      id: 'v1',
      rating:
        maxINP < 200 ? 'good' : maxINP < 500 ? 'needs-improvement' : 'poor',
    })
  })

  observer.observe({ type: 'event', buffered: true })
}

/**
 * Initialize all web vitals measurements
 */
export function initWebVitals() {
  // Only measure in browser
  if (typeof window === 'undefined') return

  try {
    measureFCP()
    measureLCP()
    measureCLS()
    measureFID()
    measureINP()
  } catch (error) {
    console.error('Error initializing web vitals:', error)
  }
}

/**
 * Performance budget warnings
 */
export const PERFORMANCE_BUDGET = {
  // Bundle sizes in KB
  maxBundleSize: 500,
  maxVendorSize: 300,
  maxPageChunkSize: 50,

  // Core Web Vitals thresholds (good)
  maxLCP: 2500, // ms
  maxFID: 100, // ms
  maxCLS: 0.1, // score
  maxFCP: 1800, // ms
  maxTTI: 3500, // ms
} as const

/**
 * Check if bundle size exceeds budget
 */
export function checkBundleBudget(
  size: number,
  type: 'bundle' | 'vendor' | 'page'
): boolean {
  const budgets = {
    bundle: PERFORMANCE_BUDGET.maxBundleSize,
    vendor: PERFORMANCE_BUDGET.maxVendorSize,
    page: PERFORMANCE_BUDGET.maxPageChunkSize,
  }

  if (size > budgets[type]) {
    console.warn(`${type} size (${size}KB) exceeds budget (${budgets[type]}KB)`)
    return false
  }
  return true
}

/**
 * TypeScript interface for LayoutShift
 */
interface LayoutShift extends PerformanceEntry {
  value: number
  hadRecentInput: boolean
}
