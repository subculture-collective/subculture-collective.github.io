/**
 * Social Links Component
 *
 * Displays social media icons with hover animations.
 * Icons are text-based for simplicity (can be replaced with icon library if needed).
 */

import { motion } from 'framer-motion'
import type { SocialLink } from '../../types/content'
import { microInteractions } from '../../utils/animations'

interface SocialLinksProps {
  links: readonly SocialLink[]
  className?: string
}

/**
 * Get icon/label for each social platform
 */
function getSocialIcon(platform: SocialLink['platform']): string {
  switch (platform) {
    case 'twitter':
      return '𝕏'
    case 'instagram':
      return 'IG'
    case 'youtube':
      return 'YT'
    case 'twitch':
      return 'TW'
    case 'github':
      return 'GH'
    case 'website':
      return '🌐'
  }
}

/**
 * Get display name for social platform
 */
function getSocialName(platform: SocialLink['platform']): string {
  return platform.charAt(0).toUpperCase() + platform.slice(1)
}

function SocialLinks({ links, className = '' }: SocialLinksProps) {
  return (
    <div className={`flex gap-4 ${className}`}>
      {links.map((social, index) => (
        <motion.a
          key={`${social.platform}-${index}`}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
          variants={microInteractions.button}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          aria-label={`${getSocialName(social.platform)}${social.handle ? ` - ${social.handle}` : ''}`}
        >
          {/* Icon container with neon border effect */}
          <div className="relative w-12 h-12 flex items-center justify-center border-2 border-light-gray text-gray-300 transition-all duration-300 group-hover:border-neon-cyan group-hover:text-neon-cyan group-hover:shadow-neon">
            <span className="font-display text-sm font-bold">
              {getSocialIcon(social.platform)}
            </span>
          </div>

          {/* Tooltip on hover */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-deep-gray border border-neon-cyan text-neon-cyan text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {social.handle || getSocialName(social.platform)}
          </div>
        </motion.a>
      ))}
    </div>
  )
}

SocialLinks.displayName = 'SocialLinks'

export default SocialLinks
