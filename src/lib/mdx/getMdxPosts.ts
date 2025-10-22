/**
 * Get all MDX blog posts
 *
 * Uses Vite's glob import to dynamically load all MDX files
 * from the content/journal directory
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
 * Extract frontmatter and content from MDX modules
 */
async function parseMdxModule(
  slug: string,
  module: {
    default: React.ComponentType
    frontmatter?: {
      title: string
      date: string
      author: string
      tags: string[]
      excerpt: string
      coverImage?: string
      description?: string
      keywords?: string[]
    }
  }
): Promise<MDXPost> {
  const frontmatter = module.frontmatter || {
    title: 'Untitled',
    date: new Date().toISOString(),
    author: 'Unknown',
    tags: [],
    excerpt: '',
  }

  // Use excerpt for reading time estimation
  const readingTime = calculateReadingTime(frontmatter.excerpt)

  return {
    slug,
    frontmatter,
    content: module.default,
    readingTime,
  }
}

/**
 * Get all MDX posts from the content/journal directory
 */
export async function getMdxPosts(): Promise<MDXPost[]> {
  // Use Vite's glob import to get all MDX files
  const modules = import.meta.glob<{
    default: React.ComponentType
    frontmatter?: {
      title: string
      date: string
      author: string
      tags: string[]
      excerpt: string
      coverImage?: string
      description?: string
      keywords?: string[]
    }
  }>('/src/content/journal/*.mdx', { eager: false })

  const posts: MDXPost[] = []

  for (const [path, moduleLoader] of Object.entries(modules)) {
    // Extract slug from file path
    const slug = path.replace('/src/content/journal/', '').replace('.mdx', '')

    try {
      const module = await moduleLoader()
      const post = await parseMdxModule(slug, module)
      posts.push(post)
    } catch (error) {
      console.error(`Error loading post ${slug}:`, error)
    }
  }

  // Sort posts by date (newest first)
  posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date)
    const dateB = new Date(b.frontmatter.date)
    return dateB.getTime() - dateA.getTime()
  })

  return posts
}

/**
 * Get posts filtered by tag
 */
export async function getMdxPostsByTag(tag: string): Promise<MDXPost[]> {
  const allPosts = await getMdxPosts()
  return allPosts.filter(post =>
    post.frontmatter.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

/**
 * Get all unique tags from posts
 */
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getMdxPosts()
  const tagsSet = new Set<string>()

  allPosts.forEach(post => {
    post.frontmatter.tags.forEach(tag => tagsSet.add(tag))
  })

  return Array.from(tagsSet).sort()
}
