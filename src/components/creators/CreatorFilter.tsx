/**
 * CreatorFilter Component
 *
 * Filter and sort controls for the creators grid.
 */

import { motion } from 'framer-motion'
import { microInteractions } from '../../utils/animations'

interface CreatorFilterProps {
  allSkills: string[]
  selectedSkill: string | null
  onSkillSelect: (skill: string | null) => void
  sortBy: 'name' | 'date'
  onSortChange: (sort: 'name' | 'date') => void
}

export default function CreatorFilter({
  allSkills,
  selectedSkill,
  onSkillSelect,
  sortBy,
  onSortChange,
}: CreatorFilterProps) {
  return (
    <div className="mb-8 space-y-4">
      {/* Sort Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <span className="font-mono text-gray-400 text-sm">Sort by:</span>
        <div className="flex gap-2">
          <motion.button
            className={`px-4 py-2 rounded font-mono text-sm transition-all ${
              sortBy === 'name'
                ? 'bg-neon-cyan text-cyber-black'
                : 'bg-deep-gray text-gray-300 hover:bg-mid-gray'
            }`}
            onClick={() => onSortChange('name')}
            variants={microInteractions.button}
            whileHover="hover"
            whileTap="tap"
          >
            Name
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
            Date Joined
          </motion.button>
        </div>
      </div>

      {/* Filter by Skill */}
      <div className="space-y-2">
        <span className="font-mono text-gray-400 text-sm">
          Filter by skill:
        </span>
        <div className="flex flex-wrap gap-2">
          <motion.button
            className={`px-3 py-1.5 rounded font-mono text-xs transition-all ${
              selectedSkill === null
                ? 'bg-glitch-magenta text-cyber-black'
                : 'bg-deep-gray text-gray-300 hover:bg-mid-gray border border-gray-700'
            }`}
            onClick={() => onSkillSelect(null)}
            variants={microInteractions.button}
            whileHover="hover"
            whileTap="tap"
          >
            All
          </motion.button>
          {allSkills.map(skill => (
            <motion.button
              key={skill}
              className={`px-3 py-1.5 rounded font-mono text-xs transition-all ${
                selectedSkill === skill
                  ? 'bg-neon-cyan text-cyber-black'
                  : 'bg-deep-gray text-gray-300 hover:bg-mid-gray border border-gray-700'
              }`}
              onClick={() => onSkillSelect(skill)}
              variants={microInteractions.button}
              whileHover="hover"
              whileTap="tap"
            >
              {skill}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

CreatorFilter.displayName = 'CreatorFilter'
