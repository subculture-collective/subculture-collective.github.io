/**
 * SEO Utility Functions
 *
 * Helper functions for managing SEO meta tags and structured data
 */

import type { PageSEO } from '@/data/seo-config'
import { siteConfig } from '@/data/seo-config'

/**
 * Generate full page title with site name
 */
export function generateTitle(pageTitle?: string): string {
  if (!pageTitle) {
    return siteConfig.defaultTitle
  }
  return `${pageTitle} | ${siteConfig.siteName}`
}

/**
 * Generate canonical URL for a page
 */
export function generateCanonicalUrl(path: string): string {
  // Remove trailing slash unless it's the root
  const cleanPath = path === '/' ? path : path.replace(/\/$/, '')
  return `${siteConfig.siteUrl}${cleanPath}`
}

/**
 * Generate absolute URL for images
 */
export function generateImageUrl(imagePath?: string): string {
  if (!imagePath) {
    return `${siteConfig.siteUrl}${siteConfig.defaultImage}`
  }

  // Return as-is if already absolute URL
  if (imagePath.startsWith('http')) {
    return imagePath
  }

  // Convert relative path to absolute URL
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`
  return `${siteConfig.siteUrl}${cleanPath}`
}

/**
 * Generate meta tags object for a page
 */
export function generateMetaTags(
  pageSEO: PageSEO,
  path: string
): Record<string, string | undefined> {
  const title = generateTitle(pageSEO.title)
  const description = pageSEO.description || siteConfig.defaultDescription
  const image = generateImageUrl(pageSEO.image)
  const url = generateCanonicalUrl(path)
  const type = pageSEO.type || 'website'

  return {
    // Standard meta tags
    title,
    description,
    keywords: pageSEO.keywords?.join(', ') || '',

    // Open Graph tags
    'og:title': pageSEO.title || siteConfig.defaultTitle,
    'og:description': description,
    'og:type': type,
    'og:url': url,
    'og:image': image,
    'og:site_name': siteConfig.siteName,
    'og:locale': siteConfig.locale,

    // Twitter Card tags
    'twitter:card': 'summary_large_image',
    'twitter:site': siteConfig.twitterHandle,
    'twitter:creator': siteConfig.twitterHandle,
    'twitter:title': pageSEO.title || siteConfig.defaultTitle,
    'twitter:description': description,
    'twitter:image': image,

    // Canonical URL
    canonical: url,

    // Robots directives
    robots: generateRobotsContent(pageSEO),
  }
}

/**
 * Generate robots meta tag content
 */
export function generateRobotsContent(pageSEO: PageSEO): string {
  const directives: string[] = []

  if (pageSEO.noindex) {
    directives.push('noindex')
  } else {
    directives.push('index')
  }

  if (pageSEO.nofollow) {
    directives.push('nofollow')
  } else {
    directives.push('follow')
  }

  return directives.join(', ')
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: generateCanonicalUrl(item.url),
    })),
  }
}

/**
 * Generate WebPage structured data
 */
export function generateWebPageSchema(
  pageSEO: PageSEO,
  path: string,
  datePublished?: string,
  dateModified?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageSEO.title,
    description: pageSEO.description,
    url: generateCanonicalUrl(path),
    image: generateImageUrl(pageSEO.image),
    inLanguage: 'en-US',
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    publisher: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.siteUrl}/assets/logo.png`,
      },
    },
  }
}

/**
 * Generate Person structured data for creator profiles
 */
export function generatePersonSchema(person: {
  name: string
  role: string
  image?: string
  description?: string
  url?: string
  sameAs?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.role,
    ...(person.description && { description: person.description }),
    ...(person.image && { image: generateImageUrl(person.image) }),
    ...(person.url && { url: generateCanonicalUrl(person.url) }),
    ...(person.sameAs && { sameAs: person.sameAs }),
    affiliation: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
  }
}
