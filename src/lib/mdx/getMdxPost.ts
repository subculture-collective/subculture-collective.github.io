/**
 * Get a single MDX blog post by slug
 */

import type { MDXPost } from '@/types/content'

/**
 * Simple reading time calculation based on word count
 */
function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200
  const wordCount = text.trim().split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

/**
 * Get a single MDX post by its slug
 */
export async function getMdxPost(slug: string): Promise<MDXPost | null> {
  try {
    // Dynamically import the MDX file
    const module = await import(`../../content/journal/${slug}.mdx`)

    const frontmatter = module.frontmatter || {
      title: 'Untitled',
      date: new Date().toISOString(),
      author: 'Unknown',
      tags: [],
      excerpt: '',
    }

    // Calculate reading time from excerpt
    const readingTime = calculateReadingTime(frontmatter.excerpt)

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
