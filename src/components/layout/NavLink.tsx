/**
 * NavLink Component
 *
 * Styled navigation link with active state and glitch hover effects
 */

import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface NavLinkProps {
  to: string
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

/**
 * NavLink Component
 *
 * Usage:
 * ```tsx
 * <NavLink to="/about">About</NavLink>
 * ```
 */
export default function NavLink({
  to,
  children,
  onClick,
  className = '',
}: NavLinkProps) {
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()
  const isActive = location.pathname === to

  return (
    <Link to={to} onClick={onClick} className={className}>
      <motion.span
        className={`
          relative inline-block font-display uppercase tracking-wider text-sm
          transition-colors duration-200
          ${isActive ? 'text-neon-cyan' : 'text-gray-400 hover:text-neon-cyan'}
        `}
        whileHover={
          !prefersReducedMotion
            ? {
                textShadow: [
                  '0 0 0 rgba(0, 255, 255, 0)',
                  '2px 0 0 rgba(0, 255, 255, 0.7), -2px 0 0 rgba(255, 0, 255, 0.7)',
                  '0 0 0 rgba(0, 255, 255, 0)',
                ],
                transition: {
                  duration: 0.3,
                  times: [0, 0.5, 1],
                },
              }
            : undefined
        }
      >
        {children}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-cyan"
            layoutId="activeNavIndicator"
            initial={false}
            transition={{
              type: 'spring',
              stiffness: 380,
              damping: 30,
            }}
          />
        )}
      </motion.span>
    </Link>
  )
}

NavLink.displayName = 'NavLink'
