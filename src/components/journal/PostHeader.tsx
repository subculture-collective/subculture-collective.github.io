/**
 * PostHeader Component
 *
 * Displays post metadata including title, author, date, reading time, tags, and cover image
 */

import { motion } from 'framer-motion'
import GlitchText from '@/components/motion/GlitchText'
import OptimizedImage from '@/components/ui/OptimizedImage'
import type { MDXFrontmatter } from '@/types/content'

interface PostHeaderProps {
  frontmatter: MDXFrontmatter
  readingTime?: string
}

export default function PostHeader({
  frontmatter,
  readingTime,
}: PostHeaderProps) {
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="mb-12">
      {/* Cover Image */}
      {frontmatter.coverImage && (
        <motion.div
          className="relative w-full aspect-[16/9] mb-8 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <OptimizedImage
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            className="w-full h-full"
            objectFit="cover"
            priority
            showPlaceholder
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/80 via-transparent to-transparent" />
        </motion.div>
      )}

      {/* Title with Glitch Effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <GlitchText
          as="h1"
          type="rgbSplit"
          className="font-display text-4xl md:text-5xl lg:text-6xl text-neon-cyan text-shadow-neon mb-6"
          triggerOnHover
        >
          {frontmatter.title}
        </GlitchText>
      </motion.div>

      {/* Metadata */}
      <motion.div
        className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-400 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <time dateTime={frontmatter.date} className="font-mono">
          {formattedDate}
        </time>
        <span className="hidden sm:inline">•</span>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan to-glitch-magenta flex items-center justify-center text-cyber-black font-bold text-xs">
            {frontmatter.author.charAt(0).toUpperCase()}
          </div>
          <span className="text-glitch-green font-medium">
            {frontmatter.author}
          </span>
        </div>
        {readingTime && (
          <>
            <span className="hidden sm:inline">•</span>
            <span className="font-mono">{readingTime}</span>
          </>
        )}
      </motion.div>

      {/* Tags */}
      {frontmatter.tags.length > 0 && (
        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {frontmatter.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-mono bg-glitch-green/10 text-glitch-green border border-glitch-green/20 rounded hover:border-glitch-green/50 transition-colors cursor-default"
            >
              #{tag}
            </span>
          ))}
        </motion.div>
      )}

      {/* Excerpt */}
      {frontmatter.excerpt && (
        <motion.p
          className="mt-6 text-lg text-gray-300 leading-relaxed italic border-l-4 border-neon-cyan pl-4 py-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {frontmatter.excerpt}
        </motion.p>
      )}
    </header>
  )
}

PostHeader.displayName = 'PostHeader'
