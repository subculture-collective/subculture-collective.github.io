/**
 * SEO Configuration
 *
 * Centralized configuration for SEO meta tags, Open Graph, and Twitter Cards
 */

export interface SEOConfig {
  siteName: string
  siteUrl: string
  defaultTitle: string
  defaultDescription: string
  defaultImage: string
  twitterHandle: string
  locale: string
  type: string
}

export interface PageSEO {
  title: string
  description: string
  keywords?: string[]
  image?: string
  type?: 'website' | 'article' | 'profile'
  noindex?: boolean
  nofollow?: boolean
}

/**
 * Site-wide SEO configuration
 */
export const siteConfig: SEOConfig = {
  siteName: 'Subcult Collective',
  siteUrl: 'https://subcult.tv',
  defaultTitle: 'Subcult Collective - Underground Digital Culture',
  defaultDescription:
    'A cooperative for creators, radicals, and cultural agitators building the next wave of underground digital culture. No corporate gatekeepers.',
  defaultImage: '/assets/og-default.jpg',
  twitterHandle: '@subcult_tv',
  locale: 'en_US',
  type: 'website',
}

/**
 * Organization structured data
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Subculture Collective',
  alternateName: 'Subcult',
  url: siteConfig.siteUrl,
  logo: `${siteConfig.siteUrl}/assets/logo.png`,
  description: siteConfig.defaultDescription,
  sameAs: [
    'https://twitter.com/subcult',
    'https://instagram.com/subcult',
    'https://youtube.com/@subcult',
    'https://github.com/subculture-collective',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@subcult.tv',
    contactType: 'General Inquiries',
  },
}

/**
 * Website structured data
 */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.siteName,
  url: siteConfig.siteUrl,
  description: siteConfig.defaultDescription,
  publisher: {
    '@type': 'Organization',
    name: 'Subculture Collective',
  },
}

/**
 * Page-specific SEO configurations
 */
export const pageSEO: Record<string, PageSEO> = {
  home: {
    title: 'Subcult Collective - Underground Digital Culture',
    description:
      'A cooperative for creators, radicals, and cultural agitators. Build the underground. No corporate gatekeepers. Join the collective.',
    keywords: [
      'digital culture',
      'underground',
      'cooperative',
      'creators',
      'radical art',
      'independent creators',
      'cultural collective',
    ],
  },
  about: {
    title: 'About Subcult - Our Mission & Values',
    description:
      'Learn about Subcult Collective: our mission, cooperative structure, origin story, and core values. Building alternative systems for creators.',
    keywords: [
      'about subcult',
      'cooperative structure',
      'mission',
      'values',
      'creator collective',
    ],
  },
  creators: {
    title: 'Creators - Meet Our Collective Members',
    description:
      'Meet the artists, developers, writers, and cultural agitators building the next wave of underground digital culture at Subcult.',
    keywords: [
      'creators',
      'artists',
      'developers',
      'collective members',
      'underground artists',
    ],
    type: 'profile',
  },
  projects: {
    title: 'Projects - Experimental Digital Works',
    description:
      'Explore experimental projects from Subcult Collective members: digital art, installations, and boundary-pushing creative works.',
    keywords: [
      'projects',
      'digital art',
      'experimental',
      'installations',
      'creative works',
    ],
  },
  journal: {
    title: 'Journal - Dispatches from the Underground',
    description:
      'Thoughts, manifestos, and dispatches from the underground. Read about digital autonomy, cooperative culture, and radical creativity.',
    keywords: [
      'journal',
      'blog',
      'articles',
      'manifestos',
      'digital culture writing',
    ],
  },
  join: {
    title: 'Join Subcult - Apply to the Collective',
    description:
      'Subcult is open to creators, developers, artists, and cultural workers who want to build something different. Apply to join the collective.',
    keywords: [
      'join',
      'apply',
      'membership',
      'collective membership',
      'become a member',
    ],
  },
  accessibility: {
    title: 'Accessibility Statement - Our Commitment',
    description:
      'Subcult Collective is committed to ensuring digital accessibility for all users. Learn about our accessibility features and standards.',
    keywords: ['accessibility', 'a11y', 'inclusive design', 'wcag'],
  },
  notFound: {
    title: '404 - Page Not Found',
    description: 'The page you are looking for could not be found.',
    noindex: true,
  },
  serverError: {
    title: '500 - Server Error',
    description: 'An unexpected error occurred. Please try again later.',
    noindex: true,
  },
  networkError: {
    title: 'Network Error',
    description: 'Network connection error. Please check your connection.',
    noindex: true,
  },
}
