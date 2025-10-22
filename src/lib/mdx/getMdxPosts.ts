/**
 * Get all MDX blog posts
 *
 * Uses Vite's glob import to dynamically load all MDX files
 * from the content/journal directory
 */

import type { MDXPost } from '@/types/content'
import {
  calculateReadingTime,
  extractMdxContent,
} from '@/lib/utils/readingTime'

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
  },
  rawContent: string
): Promise<MDXPost> {
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

  // Load raw content for reading time calculation
  const rawModules = import.meta.glob<string>('/src/content/journal/*.mdx', {
    query: '?raw',
    import: 'default',
    eager: false,
  })

  const posts: MDXPost[] = []

  for (const [path, moduleLoader] of Object.entries(modules)) {
    // Extract slug from file path
    const slug = path.replace('/src/content/journal/', '').replace('.mdx', '')

    try {
      const module = await moduleLoader()
      const rawLoader = rawModules[path]
      const rawContent = rawLoader ? await rawLoader() : ''
      const post = await parseMdxModule(slug, module, rawContent)
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
