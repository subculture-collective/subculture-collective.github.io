/**
 * Get a single MDX blog post by slug
 */

import type { MDXPost } from '@/types/content'
import {
  calculateReadingTime,
  extractMdxContent,
} from '@/lib/utils/readingTime'

/**
 * Get a single MDX post by its slug
 */
export async function getMdxPost(slug: string): Promise<MDXPost | null> {
  try {
    // Dynamically import the MDX file
    const module = await import(`../../content/journal/${slug}.mdx`)

    // Import the raw content for reading time calculation
    const rawModule = await import(`../../content/journal/${slug}.mdx?raw`)
    const rawContent = rawModule.default || ''

    const frontmatter = module.frontmatter || {
      title: 'Untitled',
      date: new Date().toISOString(),
      author: 'Unknown',
      tags: [],
      excerpt: '',
    }

    // Calculate reading time from full article content
    const content = extractMdxContent(rawContent)
    const readingTime = calculateReadingTime(content)

    return {
      slug,
      frontmatter,
      content: module.default,
      readingTime,
    }
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
    return null
  }
}
