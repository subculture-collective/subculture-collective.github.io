/**
 * PostContent Component
 *
 * Wrapper for MDX content with optimized reading typography
 */

import { motion } from 'framer-motion'
import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from '@/lib/mdx'

interface PostContentProps {
  content: React.ComponentType
}

export default function PostContent({ content: Content }: PostContentProps) {
  return (
    <motion.div
      className="prose prose-invert prose-cyan max-w-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      style={{
        // Optimal reading width
        maxWidth: '65ch',
      }}
    >
      <style>{`
        /* Optimize typography for reading */
        .prose {
          font-size: 1.125rem;
          line-height: 1.75;
        }

        .prose p {
          margin-bottom: 1.5em;
        }

        .prose h2 {
          margin-top: 2em;
          margin-bottom: 1em;
        }

        .prose h3 {
          margin-top: 1.5em;
          margin-bottom: 0.75em;
        }

        /* Better link styling */
        .prose a {
          word-break: break-word;
        }

        /* Code block improvements */
        .prose pre {
          font-size: 0.875rem;
          line-height: 1.5;
        }

        /* Image captions */
        .prose img + em {
          display: block;
          text-align: center;
          font-size: 0.875rem;
          color: #9CA3AF;
          margin-top: -1rem;
          margin-bottom: 1.5rem;
        }

        @media (max-width: 640px) {
          .prose {
            font-size: 1rem;
          }
        }
      `}</style>

      <MDXProvider components={mdxComponents}>
        <Content />
      </MDXProvider>
    </motion.div>
  )
}

PostContent.displayName = 'PostContent'
