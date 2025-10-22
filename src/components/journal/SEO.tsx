/**
 * SEO Component
 *
 * Manages document head meta tags for SEO, Open Graph, and Twitter Cards
 */

import { useEffect } from 'react'
import type { MDXFrontmatter } from '@/types/content'

interface SEOProps {
  frontmatter: MDXFrontmatter
  slug: string
  /**
   * Base URL for the site
   * @default 'https://subcult.tv'
   */
  baseUrl?: string
}

export default function SEO({
  frontmatter,
  slug,
  baseUrl = 'https://subcult.tv',
}: SEOProps) {
  const url = `${baseUrl}/journal/${slug}`
  const title = frontmatter.title
  const description =
    frontmatter.description || frontmatter.excerpt || frontmatter.title
  const keywords =
    frontmatter.keywords?.join(', ') || frontmatter.tags.join(', ')
  const image = frontmatter.coverImage
    ? frontmatter.coverImage.startsWith('http')
      ? frontmatter.coverImage
      : `${baseUrl}${frontmatter.coverImage}`
    : `${baseUrl}/assets/og-default.jpg`

  useEffect(() => {
    // Update document title
    document.title = `${title} | Subcult Collective`

    // Update meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attribute}="${name}"]`)

      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attribute, name)
        document.head.appendChild(meta)
      }

      meta.setAttribute('content', content)
    }

    // Standard meta tags
    setMetaTag('description', description)
    setMetaTag('keywords', keywords)
    setMetaTag('author', frontmatter.author)

    // Open Graph tags
    setMetaTag('og:title', title, true)
    setMetaTag('og:description', description, true)
    setMetaTag('og:type', 'article', true)
    setMetaTag('og:url', url, true)
    setMetaTag('og:image', image, true)
    setMetaTag('og:site_name', 'Subcult Collective', true)

    // Article-specific Open Graph tags
    setMetaTag('article:published_time', frontmatter.date, true)
    setMetaTag('article:author', frontmatter.author, true)
    frontmatter.tags.forEach((tag, index) => {
      setMetaTag(`article:tag_${index}`, tag, true)
    })

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image')
    setMetaTag('twitter:title', title)
    setMetaTag('twitter:description', description)
    setMetaTag('twitter:image', image)
    setMetaTag('twitter:creator', '@subcult_tv')
    setMetaTag('twitter:site', '@subcult_tv')

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    // JSON-LD structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description,
      image,
      author: {
        '@type': 'Person',
        name: frontmatter.author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Subcult Collective',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/assets/logo.png`,
        },
      },
      datePublished: frontmatter.date,
      dateModified: frontmatter.date,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      keywords,
    }

    // Add or update JSON-LD script
    let jsonLdScript = document.querySelector(
      'script[type="application/ld+json"]'
    )
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script')
      jsonLdScript.setAttribute('type', 'application/ld+json')
      document.head.appendChild(jsonLdScript)
    }
    jsonLdScript.textContent = JSON.stringify(structuredData)

    // Cleanup function
    return () => {
      document.title = 'Subcult Collective'
    }
  }, [frontmatter, slug, url, title, description, keywords, image, baseUrl])

  return null
}

SEO.displayName = 'SEO'
