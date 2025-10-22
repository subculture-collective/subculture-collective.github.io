/**
 * Reading Progress Hook
 *
 * Tracks scroll progress through an article for reading progress indicator
 */

import { useEffect, useState } from 'react'

/**
 * Hook to track reading progress as a percentage (0-100)
 */
export function useReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      // Get the total scrollable height
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      const scrollableHeight = scrollHeight - clientHeight

      if (scrollableHeight <= 0) {
        setProgress(0)
        return
      }

      // Get current scroll position
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0

      // Calculate progress as percentage
      const scrollProgress = (scrollTop / scrollableHeight) * 100
      setProgress(Math.min(100, Math.max(0, scrollProgress)))
    }

    // Initial calculation
    updateProgress()

    // Update on scroll
    window.addEventListener('scroll', updateProgress, { passive: true })

    // Update on resize (content height might change)
    window.addEventListener('resize', updateProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return progress
}
