/**
 * ProjectGrid Component
 *
 * Responsive grid layout for displaying project cards with stagger animations.
 */

import { motion } from 'framer-motion'
import type { Project } from '../../types'
import { staggerChildren, entranceAnimations } from '../../utils/animations'
import ProjectCard from './ProjectCard'

interface ProjectGridProps {
  projects: Project[]
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="font-mono text-gray-400">No projects found</p>
      </div>
    )
  }

  // Separate featured and regular projects
  const featuredProjects = projects.filter(p => p.featured)
  const regularProjects = projects.filter(p => !p.featured)

  return (
    <div className="space-y-8">
      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <div>
          <h2 className="font-display text-2xl text-neon-cyan mb-6">
            Featured Projects
          </h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerChildren.container}
            initial="initial"
            animate="animate"
          >
            {featuredProjects.map(project => (
              <motion.div
                key={project.id}
                variants={entranceAnimations.fadeInUp}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* All Projects / Regular Projects */}
      {regularProjects.length > 0 && (
        <div>
          {featuredProjects.length > 0 && (
            <h2 className="font-display text-2xl text-neon-cyan mb-6">
              All Projects
            </h2>
          )}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerChildren.container}
            initial="initial"
            animate="animate"
          >
            {regularProjects.map(project => (
              <motion.div
                key={project.id}
                variants={entranceAnimations.fadeInUp}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  )
}

ProjectGrid.displayName = 'ProjectGrid'
