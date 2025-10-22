/**
 * ReadingProgress Component
 *
 * Visual indicator showing reading progress through an article
 */

import { motion } from 'framer-motion'
import { useReadingProgress } from '@/hooks/useReadingProgress'

export default function ReadingProgress() {
  const progress = useReadingProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-deep-gray"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-neon-cyan via-glitch-magenta to-glitch-green"
        style={{
          width: `${progress}%`,
          boxShadow: '0 0 10px currentColor',
        }}
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  )
}

ReadingProgress.displayName = 'ReadingProgress'
