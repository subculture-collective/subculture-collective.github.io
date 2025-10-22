/**
 * CreatorCard Component
 *
 * Individual creator card with hover animations and glitch effects.
 * Displays creator profile information in a cyberpunk-styled card.
 */

import { motion } from 'framer-motion'
import type { CreatorProfile } from '../../types'
import { microInteractions } from '../../utils/animations'

interface CreatorCardProps {
  creator: CreatorProfile
}

export default function CreatorCard({ creator }: CreatorCardProps) {
  const { name, displayName, bio, avatar, skills, socials } = creator

  return (
    <motion.div
      className="cyber-card group relative overflow-hidden"
      variants={microInteractions.card}
      initial="initial"
      whileHover="hover"
    >
      {/* Avatar */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <motion.img
          src={avatar || '/assets/creators/placeholder-1.svg'}
          alt={name}
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        {/* Glitch overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-glitch-magenta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Name & Display Name */}
      <div className="mb-2">
        <h3 className="font-display text-neon-cyan text-xl mb-1">{name}</h3>
        {displayName && (
          <p className="font-mono text-glitch-magenta text-sm">
            @{displayName}
          </p>
        )}
      </div>

      {/* Bio */}
      <p className="font-sans text-gray-300 text-sm mb-4 line-clamp-3">{bio}</p>

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-deep-gray text-neon-cyan font-mono text-xs rounded border border-neon-cyan/30 hover:border-neon-cyan transition-colors"
              >
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className="px-2 py-1 bg-deep-gray text-gray-400 font-mono text-xs rounded">
                +{skills.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Social Links */}
      {socials && socials.length > 0 && (
        <div className="flex gap-3 pt-4 border-t border-mid-gray">
          {socials.slice(0, 4).map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-neon-cyan transition-colors"
              title={social.platform}
            >
              <span className="font-mono text-xs uppercase">
                {social.platform === 'website'
                  ? '🌐'
                  : social.platform.slice(0, 2)}
              </span>
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

CreatorCard.displayName = 'CreatorCard'
