/**
 * TagFilter Component
 *
 * Tag filtering UI for blog posts.
 */

import { motion } from 'framer-motion'
import { microInteractions } from '@/utils/animations'

interface TagFilterProps {
  allTags: string[]
  selectedTag: string | null
  onTagSelect: (tag: string | null) => void
}

export default function TagFilter({
  allTags,
  selectedTag,
  onTagSelect,
}: TagFilterProps) {
  if (allTags.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      <span className="font-mono text-gray-400 text-sm">Filter by tag:</span>
      <div className="flex flex-wrap gap-2">
        <motion.button
          className={`px-3 py-1.5 rounded font-mono text-xs transition-all ${
            selectedTag === null
              ? 'bg-glitch-magenta text-cyber-black'
              : 'bg-deep-gray text-gray-300 hover:bg-mid-gray border border-gray-700'
          }`}
          onClick={() => onTagSelect(null)}
          variants={microInteractions.button}
          whileHover="hover"
          whileTap="tap"
        >
          All
        </motion.button>
        {allTags.map(tag => (
          <motion.button
            key={tag}
            className={`px-3 py-1.5 rounded font-mono text-xs transition-all ${
              selectedTag === tag
                ? 'bg-glitch-green text-cyber-black'
                : 'bg-deep-gray text-glitch-green hover:bg-mid-gray border border-glitch-green/30'
            }`}
            onClick={() => onTagSelect(tag)}
            variants={microInteractions.button}
            whileHover="hover"
            whileTap="tap"
          >
            #{tag}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

TagFilter.displayName = 'TagFilter'
