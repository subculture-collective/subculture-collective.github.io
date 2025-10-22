/**
 * ProjectCard Component
 *
 * Individual project card with hover animations and status indicators.
 * Displays project information in a cyberpunk-styled card.
 */

import { motion } from 'framer-motion'
import type { Project } from '../../types'
import { microInteractions } from '../../utils/animations'
import StatusBadge from './StatusBadge'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const {
    title,
    description,
    thumbnailImage,
    status,
    tags,
    links,
    category,
    featured,
  } = project

  return (
    <motion.div
      className="cyber-card group relative overflow-hidden"
      variants={microInteractions.card}
      initial="initial"
      whileHover="hover"
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-2 py-1 bg-glitch-magenta text-cyber-black font-mono text-xs font-bold rounded">
            FEATURED
          </span>
        </div>
      )}

      {/* Project Image */}
      <div className="relative mb-4 overflow-hidden rounded-lg aspect-[4/3]">
        <motion.img
          src={thumbnailImage || '/assets/projects/placeholder-1.svg'}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        {/* Glitch overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-glitch-magenta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Status Badge */}
      <div className="mb-3">
        <StatusBadge status={status} />
      </div>

      {/* Title & Category */}
      <div className="mb-2">
        <h3 className="font-display text-neon-cyan text-xl mb-1 group-hover:text-shadow-neon transition-all">
          {title}
        </h3>
        {category && (
          <p className="font-mono text-glitch-magenta text-xs uppercase">
            {category}
          </p>
        )}
      </div>

      {/* Description */}
      <p className="font-sans text-gray-300 text-sm mb-4 line-clamp-3">
        {description}
      </p>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-deep-gray text-neon-cyan font-mono text-xs rounded border border-neon-cyan/30 hover:border-neon-cyan transition-colors"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 bg-deep-gray text-gray-400 font-mono text-xs rounded">
                +{tags.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Links */}
      {links && links.length > 0 && (
        <div className="flex gap-2 pt-4 border-t border-mid-gray">
          {links.slice(0, 2).map((link, index) => (
            <a
              key={`${link.type}-${index}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-3 py-2 bg-deep-gray text-neon-cyan font-mono text-xs rounded border border-neon-cyan/30 hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all"
            >
              {link.label || link.type}
            </a>
          ))}
        </div>
      )}

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 rounded-lg shadow-neon" />
      </div>
    </motion.div>
  )
}

ProjectCard.displayName = 'ProjectCard'
