import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import GlitchText from '../components/motion/GlitchText'
import CreatorGrid from '../components/creators/CreatorGrid'
import CreatorFilter from '../components/creators/CreatorFilter'
import { creatorsData, getAllSkills } from '../data/creators'
import { entranceAnimations } from '../utils/animations'

function Creators() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'name' | 'date'>('name')

  // Get all unique skills
  const allSkills = useMemo(() => getAllSkills(), [])

  // Filter and sort creators
  const filteredCreators = useMemo(() => {
    let filtered = [...creatorsData]

    // Filter by skill
    if (selectedSkill) {
      filtered = filtered.filter(creator =>
        creator.skills?.some(skill => skill === selectedSkill)
      )
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      } else {
        return b.joinedAt.getTime() - a.joinedAt.getTime()
      }
    })

    return filtered
  }, [selectedSkill, sortBy])

  return (
    <div className="min-h-screen bg-cyber-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={entranceAnimations.fadeInDown}
          initial="initial"
          animate="animate"
        >
          <GlitchText
            type="rgbSplit"
            className="font-display text-5xl md:text-6xl mb-4"
            as="h1"
          >
            Creators
          </GlitchText>
          <p className="font-sans text-gray-300 text-lg max-w-2xl mx-auto">
            Meet the talented artists, developers, and creators who make up the
            SUBCULT collective.
          </p>
          <div className="mt-4 font-mono text-glitch-cyan text-sm">
            {filteredCreators.length} creator
            {filteredCreators.length !== 1 ? 's' : ''} found
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          variants={entranceAnimations.fadeInUp}
          initial="initial"
          animate="animate"
        >
          <CreatorFilter
            allSkills={allSkills}
            selectedSkill={selectedSkill}
            onSkillSelect={setSelectedSkill}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </motion.div>

        {/* Grid */}
        <CreatorGrid creators={filteredCreators} />
      </div>
    </div>
  )
}

Creators.displayName = 'Creators'

export default Creators
