/**
 * PostCard Component
 *
 * Individual blog post card with hover animations, cover image, and metadata.
 * Displays post preview in a magazine/zine inspired layout.
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { MDXPost } from '@/types/content'
import { microInteractions } from '@/utils/animations'

interface PostCardProps {
  post: MDXPost
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const { slug, frontmatter, readingTime } = post

  // Format date
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <motion.article
      className={`cyber-card group relative overflow-hidden ${
        featured ? 'md:col-span-2 lg:col-span-3' : ''
      }`}
      variants={microInteractions.card}
      initial="initial"
      whileHover="hover"
    >
      <Link to={`/journal/${slug}`} className="block">
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-2 py-1 bg-glitch-magenta text-cyber-black font-mono text-xs font-bold rounded">
              FEATURED
            </span>
          </div>
        )}

        {/* Cover Image */}
        {frontmatter.coverImage && (
          <div
            className={`relative mb-4 overflow-hidden rounded-lg ${
              featured ? 'aspect-[16/9]' : 'aspect-[4/3]'
            }`}
          >
            <motion.img
              src={frontmatter.coverImage}
              alt={frontmatter.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              loading="lazy"
            />
            {/* Glitch overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-glitch-magenta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        {/* Content */}
        <div className="space-y-3">
          {/* Title */}
          <h2
            className={`font-display text-glitch-pink group-hover:text-neon-cyan transition-colors ${
              featured ? 'text-3xl md:text-4xl' : 'text-2xl'
            }`}
          >
            {frontmatter.title}
          </h2>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <time dateTime={frontmatter.date}>{formattedDate}</time>
            <span>•</span>
            <span>{frontmatter.author}</span>
            {readingTime && (
              <>
                <span>•</span>
                <span>{readingTime}</span>
              </>
            )}
          </div>

          {/* Excerpt */}
          <p
            className={`text-gray-300 leading-relaxed ${
              featured ? 'text-lg' : 'text-base'
            }`}
          >
            {frontmatter.excerpt}
          </p>

          {/* Tags */}
          {frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {frontmatter.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-mono bg-glitch-green/10 text-glitch-green border border-glitch-green/20 rounded hover:border-glitch-green/50 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Read More Link */}
          <div className="pt-2">
            <span className="inline-flex items-center text-neon-cyan font-mono text-sm group-hover:text-shadow-neon transition-all">
              Read more →
            </span>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 rounded-lg shadow-neon" />
        </div>
      </Link>
    </motion.article>
  )
}

PostCard.displayName = 'PostCard'
