/**
 * RelatedPosts Component
 *
 * Shows related blog posts based on tags
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { MDXPost } from '@/types/content'

interface RelatedPostsProps {
  /**
   * Current post slug to exclude from related posts
   */
  currentSlug: string
  /**
   * All available posts
   */
  allPosts: MDXPost[]
  /**
   * Maximum number of related posts to show
   * @default 3
   */
  maxPosts?: number
}

/**
 * Calculate similarity score between two posts based on shared tags
 */
function calculateSimilarity(
  currentTags: string[],
  postTags: string[]
): number {
  const sharedTags = currentTags.filter(tag => postTags.includes(tag))
  return sharedTags.length
}

export default function RelatedPosts({
  currentSlug,
  allPosts,
  maxPosts = 3,
}: RelatedPostsProps) {
  // Filter out current post
  const otherPosts = allPosts.filter(post => post.slug !== currentSlug)

  if (otherPosts.length === 0) {
    return null
  }

  // Get current post to compare tags
  const currentPost = allPosts.find(post => post.slug === currentSlug)
  const currentTags = currentPost?.frontmatter.tags || []

  // Sort posts by similarity (shared tags) and date
  const relatedPosts = otherPosts
    .map(post => ({
      post,
      similarity: calculateSimilarity(currentTags, post.frontmatter.tags),
    }))
    .sort((a, b) => {
      // First sort by similarity
      if (b.similarity !== a.similarity) {
        return b.similarity - a.similarity
      }
      // Then by date (most recent first)
      return (
        new Date(b.post.frontmatter.date).getTime() -
        new Date(a.post.frontmatter.date).getTime()
      )
    })
    .slice(0, maxPosts)
    .map(item => item.post)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="mt-16 pt-8 border-t border-neon-cyan/20">
      <h2 className="font-display text-2xl md:text-3xl text-neon-cyan text-shadow-neon mb-6">
        Related Posts
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post, index) => (
          <motion.article
            key={post.slug}
            className="cyber-card group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link to={`/journal/${post.slug}`}>
              {/* Cover Image */}
              {post.frontmatter.coverImage && (
                <div className="relative mb-4 overflow-hidden rounded-lg aspect-[16/9]">
                  <img
                    src={post.frontmatter.coverImage}
                    alt={post.frontmatter.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Content */}
              <div className="space-y-2">
                <h3 className="font-display text-lg text-glitch-pink group-hover:text-neon-cyan transition-colors">
                  {post.frontmatter.title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <time dateTime={post.frontmatter.date}>
                    {new Date(post.frontmatter.date).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      }
                    )}
                  </time>
                  {post.readingTime && (
                    <>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </>
                  )}
                </div>

                <p className="text-sm text-gray-300 line-clamp-2">
                  {post.frontmatter.excerpt}
                </p>

                {/* Tags */}
                {post.frontmatter.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {post.frontmatter.tags.slice(0, 2).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs font-mono bg-glitch-green/10 text-glitch-green border border-glitch-green/20 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.frontmatter.tags.length > 2 && (
                      <span className="px-2 py-0.5 text-xs font-mono text-gray-500">
                        +{post.frontmatter.tags.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

RelatedPosts.displayName = 'RelatedPosts'
