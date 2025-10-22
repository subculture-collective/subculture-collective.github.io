import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import GlitchText from '../components/motion/GlitchText'
import ProjectGrid from '../components/projects/ProjectGrid'
import ProjectFilter from '../components/projects/ProjectFilter'
import type { Project } from '../types'
import {
  projectsData,
  getAllProjectStatuses,
  getAllProjectCategories,
} from '../data/projects'
import { entranceAnimations } from '../utils/animations'

function Projects() {
  const [selectedStatus, setSelectedStatus] = useState<
    Project['status'] | null
  >(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'title' | 'date'>('date')

  // Get all unique statuses and categories
  const allStatuses = useMemo(() => getAllProjectStatuses(), [])
  const allCategories = useMemo(() => getAllProjectCategories(), [])

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = [...projectsData]

    // Filter by status
    if (selectedStatus) {
      filtered = filtered.filter(project => project.status === selectedStatus)
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        project => project.category === selectedCategory
      )
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title)
      } else {
        // Sort by start date (most recent first)
        const dateA = a.startDate ? a.startDate.getTime() : 0
        const dateB = b.startDate ? b.startDate.getTime() : 0
        return dateB - dateA
      }
    })

    return filtered
  }, [selectedStatus, selectedCategory, sortBy])

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
            Projects
          </GlitchText>
          <p className="font-sans text-gray-300 text-lg max-w-2xl mx-auto">
            Explore our ongoing sub-projects, collaborations, and collective
            works. From web experiences to art installations, each project
            pushes the boundaries of digital creativity.
          </p>
          <div className="mt-4 font-mono text-glitch-cyan text-sm">
            {filteredProjects.length} project
            {filteredProjects.length !== 1 ? 's' : ''} found
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          variants={entranceAnimations.fadeInUp}
          initial="initial"
          animate="animate"
        >
          <ProjectFilter
            allStatuses={allStatuses}
            selectedStatus={selectedStatus}
            onStatusSelect={setSelectedStatus}
            allCategories={allCategories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </motion.div>

        {/* Grid */}
        <ProjectGrid projects={filteredProjects} />
      </div>
    </div>
  )
}

Projects.displayName = 'Projects'

export default Projects
