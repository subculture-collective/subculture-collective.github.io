/**
 * Performance Utilities
 *
 * Utilities for measuring and optimizing web performance
 */

import { onCLS, onFCP, onINP, onLCP, type Metric } from 'web-vitals'
import { trackWebVital } from './analytics'

/**
 * Report Web Vitals metrics to analytics
 */
export function reportWebVitals(metric: Metric) {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log('Web Vital:', metric)
  }

  // In production, send to analytics service
  if (import.meta.env.PROD) {
    trackWebVital(metric.name, metric.value, metric.id, metric.rating)
  }
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
  onFCP(reportWebVitals)
}

/**
 * Measure Largest Contentful Paint (LCP)
 */
export function measureLCP() {
  onLCP(reportWebVitals)
}

/**
 * Measure Cumulative Layout Shift (CLS)
 */
export function measureCLS() {
  onCLS(reportWebVitals)
}

/**
 * Measure Interaction to Next Paint (INP)
 * Uses web-vitals library for proper INP measurement with correct entry types
 */
export function measureINP() {
  onINP(reportWebVitals)
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
