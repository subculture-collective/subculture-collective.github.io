/**
 * SEOHead Component
 *
 * Reusable component to manage document head meta tags for SEO,
 * Open Graph, Twitter Cards, and structured data
 */

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import type { PageSEO } from '@/data/seo-config'
import { generateMetaTags, generateWebPageSchema } from '@/utils/seo'

interface SEOHeadProps {
  pageSEO: PageSEO
  /**
   * Structured data to be added to the page
   * Can be a single schema object or array of schema objects
   */
  structuredData?: object | object[]
}

export default function SEOHead({ pageSEO, structuredData }: SEOHeadProps) {
  const location = useLocation()
  const path = location.pathname

  useEffect(() => {
    // Generate all meta tags
    const metaTags = generateMetaTags(pageSEO, path)

    // Update document title
    if (metaTags.title) {
      document.title = metaTags.title
    }

    // Helper function to set/update meta tags
    const setMetaTag = (
      name: string,
      content: string | undefined,
      isProperty = false
    ) => {
      if (!content) return

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
    setMetaTag('description', metaTags.description)
    if (metaTags.keywords) {
      setMetaTag('keywords', metaTags.keywords)
    }
    setMetaTag('robots', metaTags.robots)

    // Open Graph tags
    setMetaTag('og:title', metaTags['og:title'], true)
    setMetaTag('og:description', metaTags['og:description'], true)
    setMetaTag('og:type', metaTags['og:type'], true)
    setMetaTag('og:url', metaTags['og:url'], true)
    setMetaTag('og:image', metaTags['og:image'], true)
    setMetaTag('og:site_name', metaTags['og:site_name'], true)
    setMetaTag('og:locale', metaTags['og:locale'], true)

    // Twitter Card tags
    setMetaTag('twitter:card', metaTags['twitter:card'])
    setMetaTag('twitter:site', metaTags['twitter:site'])
    setMetaTag('twitter:creator', metaTags['twitter:creator'])
    setMetaTag('twitter:title', metaTags['twitter:title'])
    setMetaTag('twitter:description', metaTags['twitter:description'])
    setMetaTag('twitter:image', metaTags['twitter:image'])

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    if (metaTags.canonical) {
      canonical.setAttribute('href', metaTags.canonical)
    }

    // Generate and add structured data
    const schemas: object[] = []

    // Add WebPage schema
    schemas.push(generateWebPageSchema(pageSEO, path))

    // Add any additional structured data passed as props
    if (structuredData) {
      if (Array.isArray(structuredData)) {
        schemas.push(...structuredData)
      } else {
        schemas.push(structuredData)
      }
    }

    // Add or update JSON-LD script for each schema
    // Remove existing JSON-LD scripts first to avoid duplicates
    const existingScripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    )
    existingScripts.forEach(script => script.remove())

    // Add new scripts
    schemas.forEach(schema => {
      const jsonLdScript = document.createElement('script')
      jsonLdScript.setAttribute('type', 'application/ld+json')
      jsonLdScript.textContent = JSON.stringify(schema)
      document.head.appendChild(jsonLdScript)
    })

    // Cleanup function - reset to defaults
    return () => {
      document.title = 'Subcult Collective'
    }
  }, [pageSEO, path, structuredData])

  return null
}

SEOHead.displayName = 'SEOHead'
