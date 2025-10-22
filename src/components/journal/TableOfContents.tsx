/**
 * TableOfContents Component
 *
 * Auto-generated table of contents with sticky positioning and active section highlighting
 */

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTableOfContents } from '@/hooks/useTableOfContents'

interface TableOfContentsProps {
  /**
   * Whether to show the TOC in a mobile-friendly collapsed state
   * @default false
   */
  mobileCollapsible?: boolean
}

export default function TableOfContents({
  mobileCollapsible = true,
}: TableOfContentsProps) {
  const { headings, activeId, scrollToHeading } = useTableOfContents()
  const [isOpen, setIsOpen] = useState(false)

  if (headings.length === 0) {
    return null
  }

  return (
    <>
      {/* Mobile: Collapsible TOC */}
      {mobileCollapsible && (
        <div className="lg:hidden mb-8">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-deep-gray border border-neon-cyan/20 rounded-lg text-neon-cyan font-mono text-sm hover:border-neon-cyan/50 transition-colors"
            aria-expanded={isOpen}
            aria-controls="mobile-toc"
          >
            <span>Table of Contents</span>
            <motion.svg
              className="w-5 h-5"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.nav
                id="mobile-toc"
                className="mt-2 px-4 py-3 bg-deep-gray border border-neon-cyan/20 rounded-lg overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ul className="space-y-2">
                  {headings.map(heading => (
                    <li
                      key={heading.id}
                      style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
                    >
                      <button
                        onClick={() => {
                          scrollToHeading(heading.id)
                          setIsOpen(false)
                        }}
                        className={`text-left text-sm transition-colors hover:text-neon-cyan ${
                          activeId === heading.id
                            ? 'text-neon-cyan font-semibold'
                            : 'text-gray-400'
                        }`}
                      >
                        {heading.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Desktop: Sticky TOC */}
      <nav
        className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
        aria-label="Table of contents"
      >
        <div className="p-4 bg-deep-gray border border-neon-cyan/20 rounded-lg">
          <h2 className="font-display text-neon-cyan text-sm uppercase tracking-wider mb-4">
            On This Page
          </h2>
          <ul className="space-y-2">
            {headings.map(heading => (
              <li
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
              >
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className={`text-left text-sm transition-all hover:text-neon-cyan relative ${
                    activeId === heading.id
                      ? 'text-neon-cyan font-semibold'
                      : 'text-gray-400'
                  }`}
                >
                  {/* Active indicator */}
                  {activeId === heading.id && (
                    <motion.div
                      className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-neon-cyan rounded-full"
                      layoutId="active-toc-item"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}

TableOfContents.displayName = 'TableOfContents'
