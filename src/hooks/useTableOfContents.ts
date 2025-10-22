/**
 * Table of Contents Hook
 *
 * Extracts headings from the page and tracks active section during scroll
 */

import { useEffect, useState, useCallback } from 'react'

export interface TOCHeading {
  id: string
  text: string
  level: number
}

interface UseTableOfContentsOptions {
  /**
   * CSS selector for headings to include in TOC
   * @default 'h2, h3'
   */
  selector?: string
  /**
   * Root margin for intersection observer (affects when headings are considered "active")
   * @default '-80px 0px -80% 0px'
   */
  rootMargin?: string
}

/**
 * Hook to generate table of contents from headings and track active section
 */
export function useTableOfContents({
  selector = 'h2, h3',
  rootMargin = '-80px 0px -80% 0px',
}: UseTableOfContentsOptions = {}) {
  const [headings, setHeadings] = useState<TOCHeading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  // Extract headings from the page
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(selector))

    const headingData: TOCHeading[] = elements.map((element, index) => {
      const heading = element as HTMLHeadingElement
      // Generate ID if not present
      if (!heading.id) {
        heading.id = `heading-${index}-${heading.textContent
          ?.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, '')}`
      }

      return {
        id: heading.id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.substring(1)),
      }
    })

    setHeadings(headingData)
  }, [selector])

  // Track active heading using Intersection Observer
  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin,
        threshold: 0,
      }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings, rootMargin])

  // Scroll to heading
  const scrollToHeading = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }, [])

  return {
    headings,
    activeId,
    scrollToHeading,
  }
}
