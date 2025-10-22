/**
 * ProjectFilter Component
 *
 * Filter and sort controls for the projects grid.
 */

import { motion } from 'framer-motion'
import type { Project } from '../../types'
import { microInteractions } from '../../utils/animations'

interface ProjectFilterProps {
  allStatuses: Array<Project['status']>
  selectedStatus: Project['status'] | null
  onStatusSelect: (status: Project['status'] | null) => void
  allCategories: string[]
  selectedCategory: string | null
  onCategorySelect: (category: string | null) => void
  sortBy: 'title' | 'date'
  onSortChange: (sort: 'title' | 'date') => void
}

export default function ProjectFilter({
  allStatuses,
  selectedStatus,
  onStatusSelect,
  allCategories,
  selectedCategory,
  onCategorySelect,
  sortBy,
  onSortChange,
}: ProjectFilterProps) {
  return (
    <div className="mb-8 space-y-4">
      {/* Sort Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <span className="font-mono text-gray-400 text-sm">Sort by:</span>
        <div className="flex gap-2">
          <motion.button
            className={`px-4 py-2 rounded font-mono text-sm transition-all ${
              sortBy === 'title'
                ? 'bg-neon-cyan text-cyber-black'
                : 'bg-deep-gray text-gray-300 hover:bg-mid-gray'
            }`}
            onClick={() => onSortChange('title')}
            variants={microInteractions.button}
            whileHover="hover"
            whileTap="tap"
          >
            Title
          </motion.button>
          <motion.button
            className={`px-4 py-2 rounded font-mono text-sm transition-all ${
              sortBy === 'date'
                ? 'bg-neon-cyan text-cyber-black'
                : 'bg-deep-gray text-gray-300 hover:bg-mid-gray'
            }`}
            onClick={() => onSortChange('date')}
            variants={microInteractions.button}
            whileHover="hover"
            whileTap="tap"
          >
            Start Date
          </motion.button>
        </div>
      </div>

      {/* Filter by Status */}
      <div className="space-y-2">
        <span className="font-mono text-gray-400 text-sm">
          Filter by status:
        </span>
        <div className="flex flex-wrap gap-2">
          <motion.button
            className={`px-3 py-1.5 rounded font-mono text-xs transition-all ${
              selectedStatus === null
                ? 'bg-glitch-magenta text-cyber-black'
                : 'bg-deep-gray text-gray-300 hover:bg-mid-gray border border-gray-700'
            }`}
            onClick={() => onStatusSelect(null)}
            variants={microInteractions.button}
            whileHover="hover"
            whileTap="tap"
          >
            All
          </motion.button>
          {allStatuses.map(status => {
            if (!status) return null
            const label = status
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
            return (
              <motion.button
                key={status}
                className={`px-3 py-1.5 rounded font-mono text-xs transition-all ${
                  selectedStatus === status
                    ? 'bg-neon-cyan text-cyber-black'
                    : 'bg-deep-gray text-gray-300 hover:bg-mid-gray border border-gray-700'
                }`}
                onClick={() => onStatusSelect(status)}
                variants={microInteractions.button}
                whileHover="hover"
                whileTap="tap"
              >
                {label}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Filter by Category */}
      {allCategories.length > 0 && (
        <div className="space-y-2">
          <span className="font-mono text-gray-400 text-sm">
            Filter by category:
          </span>
          <div className="flex flex-wrap gap-2">
            <motion.button
              className={`px-3 py-1.5 rounded font-mono text-xs transition-all ${
                selectedCategory === null
                  ? 'bg-glitch-magenta text-cyber-black'
                  : 'bg-deep-gray text-gray-300 hover:bg-mid-gray border border-gray-700'
              }`}
              onClick={() => onCategorySelect(null)}
              variants={microInteractions.button}
              whileHover="hover"
              whileTap="tap"
            >
              All
            </motion.button>
            {allCategories.map(category => (
              <motion.button
                key={category}
                className={`px-3 py-1.5 rounded font-mono text-xs transition-all ${
                  selectedCategory === category
                    ? 'bg-neon-cyan text-cyber-black'
                    : 'bg-deep-gray text-gray-300 hover:bg-mid-gray border border-gray-700'
                }`}
                onClick={() => onCategorySelect(category)}
                variants={microInteractions.button}
                whileHover="hover"
                whileTap="tap"
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

ProjectFilter.displayName = 'ProjectFilter'
