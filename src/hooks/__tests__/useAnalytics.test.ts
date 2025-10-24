/**
 * Tests for useAnalytics hook
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAnalytics } from '../useAnalytics'
import * as analyticsUtils from '../../utils/analytics'

// Mock analytics utilities
vi.mock('../../utils/analytics', () => ({
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
  trackCTA: vi.fn(),
  trackFormSubmit: vi.fn(),
  trackNavigation: vi.fn(),
  trackOutboundLink: vi.fn(),
  trackDownload: vi.fn(),
  trackBlogPost: vi.fn(),
  trackError: vi.fn(),
}))

describe('useAnalytics', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should provide analytics methods', () => {
    const { result } = renderHook(() => useAnalytics())

    expect(result.current).toHaveProperty('track')
    expect(result.current).toHaveProperty('page')
    expect(result.current).toHaveProperty('cta')
    expect(result.current).toHaveProperty('form')
    expect(result.current).toHaveProperty('navigate')
    expect(result.current).toHaveProperty('outbound')
    expect(result.current).toHaveProperty('download')
    expect(result.current).toHaveProperty('blog')
    expect(result.current).toHaveProperty('error')
  })

  it('should call trackEvent when track is called', () => {
    const { result } = renderHook(() => useAnalytics())

    result.current.track('Test Event', { key: 'value' })

    expect(analyticsUtils.trackEvent).toHaveBeenCalledWith('Test Event', {
      key: 'value',
    })
  })

  it('should call trackPageView when page is called', () => {
    const { result } = renderHook(() => useAnalytics())

    result.current.page('/test-page')

    expect(analyticsUtils.trackPageView).toHaveBeenCalledWith('/test-page')
  })

  it('should call trackCTA when cta is called', () => {
    const { result } = renderHook(() => useAnalytics())

    result.current.cta('Join Now', 'hero')

    expect(analyticsUtils.trackCTA).toHaveBeenCalledWith('Join Now', 'hero')
  })

  it('should call trackFormSubmit when form is called', () => {
    const { result } = renderHook(() => useAnalytics())

    result.current.form('Contact Form', true)

    expect(analyticsUtils.trackFormSubmit).toHaveBeenCalledWith(
      'Contact Form',
      true
    )
  })

  it('should call trackNavigation when navigate is called', () => {
    const { result } = renderHook(() => useAnalytics())

    result.current.navigate('/about', 'header')

    expect(analyticsUtils.trackNavigation).toHaveBeenCalledWith(
      '/about',
      'header'
    )
  })

  it('should call trackOutboundLink when outbound is called', () => {
    const { result } = renderHook(() => useAnalytics())

    result.current.outbound('https://example.com', 'Example')

    expect(analyticsUtils.trackOutboundLink).toHaveBeenCalledWith(
      'https://example.com',
      'Example'
    )
  })

  it('should call trackDownload when download is called', () => {
    const { result } = renderHook(() => useAnalytics())

    result.current.download('document.pdf', 'pdf')

    expect(analyticsUtils.trackDownload).toHaveBeenCalledWith(
      'document.pdf',
      'pdf'
    )
  })

  it('should call trackBlogPost when blog is called', () => {
    const { result } = renderHook(() => useAnalytics())

    result.current.blog('read', 'my-post')

    expect(analyticsUtils.trackBlogPost).toHaveBeenCalledWith('read', 'my-post')
  })

  it('should call trackError when error is called', () => {
    const { result } = renderHook(() => useAnalytics())

    result.current.error('Network Error', 'Failed to fetch')

    expect(analyticsUtils.trackError).toHaveBeenCalledWith(
      'Network Error',
      'Failed to fetch'
    )
  })

  it('should maintain stable references for methods', () => {
    const { result, rerender } = renderHook(() => useAnalytics())

    const firstTrack = result.current.track
    const firstPage = result.current.page

    rerender()

    expect(result.current.track).toBe(firstTrack)
    expect(result.current.page).toBe(firstPage)
  })
})
