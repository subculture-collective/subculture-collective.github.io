/**
 * StatusBadge Component
 *
 * Displays project status with color-coded styling.
 */

import { motion } from 'framer-motion'
import type { Project } from '../../types'

interface StatusBadgeProps {
  status: Project['status']
  className?: string
}

const statusConfig: Record<
  NonNullable<Project['status']>,
  { label: string; color: string; bgColor: string; borderColor: string }
> = {
  'in-progress': {
    label: 'In Progress',
    color: 'text-neon-cyan',
    bgColor: 'bg-neon-cyan/10',
    borderColor: 'border-neon-cyan/50',
  },
  completed: {
    label: 'Completed',
    color: 'text-neon-green',
    bgColor: 'bg-neon-green/10',
    borderColor: 'border-neon-green/50',
  },
  'on-hold': {
    label: 'On Hold',
    color: 'text-glitch-yellow',
    bgColor: 'bg-glitch-yellow/10',
    borderColor: 'border-glitch-yellow/50',
  },
  planning: {
    label: 'Planning',
    color: 'text-glitch-magenta',
    bgColor: 'bg-glitch-magenta/10',
    borderColor: 'border-glitch-magenta/50',
  },
  archived: {
    label: 'Archived',
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10',
    borderColor: 'border-gray-400/50',
  },
}

export default function StatusBadge({
  status,
  className = '',
}: StatusBadgeProps) {
  if (!status) return null

  const config = statusConfig[status]

  return (
    <motion.div
      className={`inline-flex items-center px-3 py-1 rounded-full border ${config.bgColor} ${config.borderColor} ${className}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={`w-2 h-2 rounded-full ${config.color.replace('text-', 'bg-')} mr-2 animate-pulse`}
      />
      <span className={`font-mono text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    </motion.div>
  )
}

StatusBadge.displayName = 'StatusBadge'
