/**
 * CreatorGrid Component
 *
 * Responsive grid layout for displaying creator cards with stagger animations.
 */

import { motion } from 'framer-motion'
import type { CreatorProfile } from '../../types'
import { staggerChildren, entranceAnimations } from '../../utils/animations'
import CreatorCard from './CreatorCard'

interface CreatorGridProps {
  creators: CreatorProfile[]
}

export default function CreatorGrid({ creators }: CreatorGridProps) {
  if (creators.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="font-mono text-gray-400">No creators found</p>
      </div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={staggerChildren.container}
      initial="initial"
      animate="animate"
    >
      {creators.map(creator => (
        <motion.div key={creator.id} variants={entranceAnimations.fadeInUp}>
          <CreatorCard creator={creator} />
        </motion.div>
      ))}
    </motion.div>
  )
}

CreatorGrid.displayName = 'CreatorGrid'
