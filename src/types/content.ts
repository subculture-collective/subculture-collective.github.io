/**
 * Content Type Definitions
 *
 * Type definitions for content structures including blog posts,
 * creator profiles, projects, and related metadata.
 */

/**
 * Branded type for unique identifiers
 */
export type BrandedId<T extends string> = string & { __brand: T }

export type BlogPostId = BrandedId<'BlogPost'>
export type CreatorId = BrandedId<'Creator'>
export type ProjectId = BrandedId<'Project'>

/**
 * SEO metadata structure
 */
export interface SEOMetadata {
  title: string
  description: string
  keywords?: readonly string[]
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
  twitterCard?: 'summary' | 'summary_large_image'
  canonicalUrl?: string
}

/**
 * Blog post author information
 */
export interface BlogPostAuthor {
  id: CreatorId
  name: string
  avatar?: string
  bio?: string
  socials?: readonly SocialLink[]
}

/**
 * Social media link
 */
export interface SocialLink {
  platform:
    | 'twitter'
    | 'instagram'
    | 'youtube'
    | 'twitch'
    | 'github'
    | 'website'
  url: string
  handle?: string
}

/**
 * Blog post tag/category
 */
export interface BlogTag {
  id: string
  name: string
  slug: string
  color?: string
}

/**
 * Blog post structure
 */
export interface BlogPost {
  id: BlogPostId
  slug: string
  title: string
  excerpt: string
  content: string
  author: BlogPostAuthor
  publishedAt: Date
  updatedAt?: Date
  featuredImage?: string
  tags?: readonly BlogTag[]
  readingTime?: number
  isDraft?: boolean
  seo?: SEOMetadata
}

/**
 * Blog post preview for lists
 */
export interface BlogPostPreview {
  id: BlogPostId
  slug: string
  title: string
  excerpt: string
  author: {
    name: string
    avatar?: string
  }
  publishedAt: Date
  featuredImage?: string
  tags?: readonly BlogTag[]
  readingTime?: number
}

/**
 * Creator/Artist profile
 */
export interface CreatorProfile {
  id: CreatorId
  name: string
  displayName?: string
  slug: string
  bio: string
  avatar?: string
  coverImage?: string
  location?: string
  website?: string
  socials?: readonly SocialLink[]
  skills?: readonly string[]
  projects?: readonly ProjectId[]
  joinedAt: Date
  isActive?: boolean
  seo?: SEOMetadata
}

/**
 * Project information
 */
export interface Project {
  id: ProjectId
  slug: string
  title: string
  description: string
  longDescription?: string
  thumbnailImage?: string
  coverImage?: string
  gallery?: readonly string[]
  creators?: readonly CreatorId[]
  tags?: readonly string[]
  category?: string
  status?: 'planning' | 'in-progress' | 'completed' | 'archived'
  startDate?: Date
  completionDate?: Date
  links?: readonly {
    type: 'demo' | 'github' | 'website' | 'download'
    url: string
    label?: string
  }[]
  featured?: boolean
  seo?: SEOMetadata
}

/**
 * Project preview for lists
 */
export interface ProjectPreview {
  id: ProjectId
  slug: string
  title: string
  description: string
  thumbnailImage?: string
  creators?: readonly {
    name: string
    avatar?: string
  }[]
  tags?: readonly string[]
  status?: Project['status']
  featured?: boolean
}
