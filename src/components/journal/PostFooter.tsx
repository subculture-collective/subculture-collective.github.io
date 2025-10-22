/**
 * PostFooter Component
 *
 * Footer section with author bio, navigation, and share buttons
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ShareButtons from './ShareButtons'
import type { MDXFrontmatter } from '@/types/content'

interface PostFooterProps {
  frontmatter: MDXFrontmatter
  /**
   * Previous post slug and title
   */
  previousPost?: {
    slug: string
    title: string
  }
  /**
   * Next post slug and title
   */
  nextPost?: {
    slug: string
    title: string
  }
}

export default function PostFooter({
  frontmatter,
  previousPost,
  nextPost,
}: PostFooterProps) {
  return (
    <footer className="mt-16 space-y-8">
      {/* Share Buttons */}
      <motion.div
        className="pt-8 border-t border-neon-cyan/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ShareButtons title={frontmatter.title} showLabels={false} />
      </motion.div>

      {/* Author Bio */}
      <motion.div
        className="p-6 bg-deep-gray border border-neon-cyan/20 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-cyan to-glitch-magenta flex items-center justify-center text-cyber-black font-bold text-2xl">
              {frontmatter.author.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Bio */}
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-xl text-neon-cyan mb-2">
              {frontmatter.author}
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              Creator and contributor at Subcult Collective. Passionate about
              underground culture, digital art, and building alternative
              creative ecosystems.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  /* TODO: Add Twitter link */
                }}
                className="text-xs text-gray-400 hover:text-neon-cyan transition-colors"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button
                onClick={() => {
                  /* TODO: Add GitHub link */
                }}
                className="text-xs text-gray-400 hover:text-neon-cyan transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Previous/Next Navigation */}
      {(previousPost || nextPost) && (
        <motion.nav
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Previous Post */}
          {previousPost ? (
            <Link
              to={`/journal/${previousPost.slug}`}
              className="group p-4 bg-deep-gray border border-neon-cyan/20 rounded-lg hover:border-neon-cyan/50 transition-all"
            >
              <div className="text-xs text-gray-500 font-mono mb-1">
                ← Previous
              </div>
              <div className="text-neon-cyan group-hover:text-glitch-pink transition-colors">
                {previousPost.title}
              </div>
            </Link>
          ) : (
            <div />
          )}

          {/* Next Post */}
          {nextPost ? (
            <Link
              to={`/journal/${nextPost.slug}`}
              className="group p-4 bg-deep-gray border border-neon-cyan/20 rounded-lg hover:border-neon-cyan/50 transition-all text-right"
            >
              <div className="text-xs text-gray-500 font-mono mb-1">Next →</div>
              <div className="text-neon-cyan group-hover:text-glitch-pink transition-colors">
                {nextPost.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
        </motion.nav>
      )}

      {/* Back to Journal */}
      <motion.div
        className="pt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 text-neon-cyan hover:text-glitch-pink transition-colors font-mono text-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Journal
        </Link>
      </motion.div>
    </footer>
  )
}

PostFooter.displayName = 'PostFooter'
