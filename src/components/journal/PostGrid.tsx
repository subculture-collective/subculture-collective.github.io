/**
 * PostGrid Component
 *
 * Responsive grid layout for displaying post cards with stagger animations.
 * Supports featured posts with different layout.
 */

import { motion } from 'framer-motion'
import type { MDXPost } from '@/types/content'
import { staggerChildren, entranceAnimations } from '@/utils/animations'
import PostCard from './PostCard'

interface PostGridProps {
  posts: MDXPost[]
  featuredSlugs?: string[]
}

export default function PostGrid({ posts, featuredSlugs = [] }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="font-mono text-gray-400 text-lg">
          No posts yet. Check back soon...
        </p>
        <p className="font-mono text-gray-500 text-sm mt-2">
          The underground is brewing something special.
        </p>
      </div>
    )
  }

  // Separate featured and regular posts
  const featuredPosts = posts.filter(p => featuredSlugs.includes(p.slug))
  const regularPosts = posts.filter(p => !featuredSlugs.includes(p.slug))

  return (
    <div className="space-y-12">
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div>
          <h2 className="font-display text-2xl text-neon-cyan mb-6 flex items-center gap-2">
            <span className="text-glitch-magenta">⚡</span>
            Featured Posts
          </h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerChildren.container}
            initial="initial"
            animate="animate"
          >
            {featuredPosts.map(post => (
              <motion.div
                key={post.slug}
                variants={entranceAnimations.fadeInUp}
              >
                <PostCard post={post} featured={true} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* All Posts / Regular Posts */}
      {regularPosts.length > 0 && (
        <div>
          {featuredPosts.length > 0 && (
            <h2 className="font-display text-2xl text-neon-cyan mb-6">
              All Posts
            </h2>
          )}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerChildren.container}
            initial="initial"
            animate="animate"
          >
            {regularPosts.map(post => (
              <motion.div
                key={post.slug}
                variants={entranceAnimations.fadeInUp}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  )
}

PostGrid.displayName = 'PostGrid'
