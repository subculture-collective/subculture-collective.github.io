/**
 * Tests for SEO utilities
 */

import { describe, it, expect, vi } from 'vitest'
import {
  generateTitle,
  generateCanonicalUrl,
  generateImageUrl,
  generateMetaTags,
  generateRobotsContent,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generatePersonSchema,
} from '../seo'
import type { PageSEO } from '@/data/seo-config'

// Mock the seo-config
vi.mock('@/data/seo-config', () => ({
  siteConfig: {
    siteName: 'Subcult Collective',
    siteUrl: 'https://subcult.tv',
    defaultTitle: 'Subcult Collective - Underground Digital Culture',
    defaultDescription: 'A cooperative for creators',
    defaultImage: '/assets/og-default.jpg',
    twitterHandle: '@subcult_tv',
    locale: 'en_US',
    type: 'website',
  },
}))

describe('generateTitle', () => {
  it('should return default title when no page title provided', () => {
    expect(generateTitle()).toBe(
      'Subcult Collective - Underground Digital Culture'
    )
  })

  it('should generate title with site name', () => {
    expect(generateTitle('About')).toBe('About | Subcult Collective')
  })

  it('should handle empty string', () => {
    expect(generateTitle('')).toBe(
      'Subcult Collective - Underground Digital Culture'
    )
  })
})

describe('generateCanonicalUrl', () => {
  it('should generate canonical URL for root', () => {
    expect(generateCanonicalUrl('/')).toBe('https://subcult.tv/')
  })

  it('should generate canonical URL and remove trailing slash', () => {
    expect(generateCanonicalUrl('/about/')).toBe('https://subcult.tv/about')
    expect(generateCanonicalUrl('/projects/')).toBe(
      'https://subcult.tv/projects'
    )
  })

  it('should handle paths without trailing slash', () => {
    expect(generateCanonicalUrl('/about')).toBe('https://subcult.tv/about')
  })

  it('should handle nested paths', () => {
    expect(generateCanonicalUrl('/journal/post-1')).toBe(
      'https://subcult.tv/journal/post-1'
    )
  })
})

describe('generateImageUrl', () => {
  it('should return default image when no image path provided', () => {
    expect(generateImageUrl()).toBe('https://subcult.tv/assets/og-default.jpg')
  })

  it('should return absolute URL as-is', () => {
    expect(generateImageUrl('https://example.com/image.jpg')).toBe(
      'https://example.com/image.jpg'
    )
  })

  it('should convert relative path to absolute URL', () => {
    expect(generateImageUrl('/assets/hero.jpg')).toBe(
      'https://subcult.tv/assets/hero.jpg'
    )
  })

  it('should handle path without leading slash', () => {
    expect(generateImageUrl('assets/hero.jpg')).toBe(
      'https://subcult.tv/assets/hero.jpg'
    )
  })
})

describe('generateRobotsContent', () => {
  it('should generate default robots content', () => {
    const pageSEO: PageSEO = {
      title: 'Test',
      description: 'Test description',
    }
    expect(generateRobotsContent(pageSEO)).toBe('index, follow')
  })

  it('should respect noindex flag', () => {
    const pageSEO: PageSEO = {
      title: 'Test',
      description: 'Test description',
      noindex: true,
    }
    expect(generateRobotsContent(pageSEO)).toBe('noindex, follow')
  })

  it('should respect nofollow flag', () => {
    const pageSEO: PageSEO = {
      title: 'Test',
      description: 'Test description',
      nofollow: true,
    }
    expect(generateRobotsContent(pageSEO)).toBe('index, nofollow')
  })

  it('should respect both noindex and nofollow flags', () => {
    const pageSEO: PageSEO = {
      title: 'Test',
      description: 'Test description',
      noindex: true,
      nofollow: true,
    }
    expect(generateRobotsContent(pageSEO)).toBe('noindex, nofollow')
  })
})

describe('generateMetaTags', () => {
  it('should generate basic meta tags', () => {
    const pageSEO: PageSEO = {
      title: 'Test Page',
      description: 'Test description',
    }
    const tags = generateMetaTags(pageSEO, '/test')

    expect(tags.title).toBe('Test Page | Subcult Collective')
    expect(tags.description).toBe('Test description')
    expect(tags.canonical).toBe('https://subcult.tv/test')
    expect(tags['og:title']).toBe('Test Page')
    expect(tags['twitter:card']).toBe('summary_large_image')
  })

  it('should use default description when not provided', () => {
    const pageSEO: PageSEO = {
      title: 'Test Page',
      description: '',
    }
    const tags = generateMetaTags(pageSEO, '/test')

    expect(tags.description).toBe('A cooperative for creators')
  })

  it('should include keywords', () => {
    const pageSEO: PageSEO = {
      title: 'Test',
      description: 'Test description',
      keywords: ['test', 'seo', 'meta'],
    }
    const tags = generateMetaTags(pageSEO, '/test')

    expect(tags.keywords).toBe('test, seo, meta')
  })

  it('should set article type when specified', () => {
    const pageSEO: PageSEO = {
      title: 'Test',
      description: 'Test description',
      type: 'article',
    }
    const tags = generateMetaTags(pageSEO, '/test')

    expect(tags['og:type']).toBe('article')
  })
})

describe('generateBreadcrumbSchema', () => {
  it('should generate breadcrumb structured data', () => {
    const items = [
      { name: 'Home', url: '/' },
      { name: 'Journal', url: '/journal' },
      { name: 'Post', url: '/journal/post' },
    ]
    const schema = generateBreadcrumbSchema(items)

    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('BreadcrumbList')
    expect(schema.itemListElement).toHaveLength(3)
    expect(schema.itemListElement[0]).toEqual({
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://subcult.tv/',
    })
  })

  it('should handle single item', () => {
    const items = [{ name: 'Home', url: '/' }]
    const schema = generateBreadcrumbSchema(items)

    expect(schema.itemListElement).toHaveLength(1)
  })
})

describe('generateWebPageSchema', () => {
  it('should generate web page structured data', () => {
    const pageSEO: PageSEO = {
      title: 'Test Page',
      description: 'Test description',
      image: '/test.jpg',
    }
    const schema = generateWebPageSchema(pageSEO, '/test')

    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('WebPage')
    expect(schema.name).toBe('Test Page')
    expect(schema.description).toBe('Test description')
    expect(schema.url).toBe('https://subcult.tv/test')
    expect(schema.publisher).toHaveProperty('name', 'Subcult Collective')
  })

  it('should include dates when provided', () => {
    const pageSEO: PageSEO = {
      title: 'Test',
      description: 'Test description',
    }
    const schema = generateWebPageSchema(
      pageSEO,
      '/test',
      '2024-01-01',
      '2024-01-15'
    )

    expect(schema.datePublished).toBe('2024-01-01')
    expect(schema.dateModified).toBe('2024-01-15')
  })

  it('should omit dates when not provided', () => {
    const pageSEO: PageSEO = {
      title: 'Test',
      description: 'Test description',
    }
    const schema = generateWebPageSchema(pageSEO, '/test')

    expect(schema).not.toHaveProperty('datePublished')
    expect(schema).not.toHaveProperty('dateModified')
  })
})

describe('generatePersonSchema', () => {
  it('should generate person structured data with minimal info', () => {
    const person = {
      name: 'John Doe',
      role: 'Designer',
    }
    const schema = generatePersonSchema(person)

    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('Person')
    expect(schema.name).toBe('John Doe')
    expect(schema.jobTitle).toBe('Designer')
    expect(schema.affiliation).toHaveProperty('name', 'Subcult Collective')
  })

  it('should include all optional fields when provided', () => {
    const person = {
      name: 'Jane Smith',
      role: 'Developer',
      description: 'Full-stack developer',
      image: '/creators/jane.jpg',
      url: '/creators/jane',
      sameAs: ['https://twitter.com/jane', 'https://github.com/jane'],
    }
    const schema = generatePersonSchema(person)

    expect(schema.description).toBe('Full-stack developer')
    expect(schema.image).toBe('https://subcult.tv/creators/jane.jpg')
    expect(schema.url).toBe('https://subcult.tv/creators/jane')
    expect(schema.sameAs).toEqual([
      'https://twitter.com/jane',
      'https://github.com/jane',
    ])
  })

  it('should omit optional fields when not provided', () => {
    const person = {
      name: 'John Doe',
      role: 'Designer',
    }
    const schema = generatePersonSchema(person)

    expect(schema).not.toHaveProperty('description')
    expect(schema).not.toHaveProperty('image')
    expect(schema).not.toHaveProperty('url')
    expect(schema).not.toHaveProperty('sameAs')
  })
})
