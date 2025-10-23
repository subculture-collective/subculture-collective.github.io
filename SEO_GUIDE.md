# SEO Implementation Guide

This document provides an overview of the SEO implementation and how to maintain it.

## Overview

Comprehensive SEO has been implemented across all pages of the Subcult Collective website, including:

- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags for social media sharing
- ✅ Twitter Card metadata
- ✅ Canonical URLs
- ✅ Structured data (JSON-LD)
- ✅ robots.txt
- ✅ sitemap.xml
- ✅ Language declarations
- ✅ Mobile-friendly meta tags

## Files Created

### SEO Components and Configuration

1. **`src/components/seo/SEOHead.tsx`**
   - Reusable SEO component for all pages
   - Manages meta tags and structured data
   - Automatically updates based on current route

2. **`src/data/seo-config.ts`**
   - Centralized SEO configuration
   - Contains page-specific SEO data
   - Organization and website schemas

3. **`src/utils/seo.ts`**
   - Utility functions for SEO operations
   - Functions to generate meta tags, URLs, and structured data
   - Helper for breadcrumb schemas

### Technical SEO Files

4. **`public/robots.txt`**
   - Crawler instructions
   - Allows all search engines
   - Points to sitemap.xml

5. **`public/sitemap.xml`**
   - XML sitemap with all main pages
   - Includes priority and change frequency
   - Needs manual updates when new pages are added

## Usage

### Adding SEO to a New Page

1. Add page configuration to `src/data/seo-config.ts`:

```typescript
export const pageSEO: Record<string, PageSEO> = {
  // ... existing pages
  newPage: {
    title: 'Page Title (50-60 chars)',
    description: 'Page description (150-160 chars)',
    keywords: ['keyword1', 'keyword2', 'keyword3'],
    type: 'website', // or 'article', 'profile'
  },
}
```

2. Import and use SEOHead in your page component:

```tsx
import SEOHead from '@/components/seo/SEOHead'
import { pageSEO } from '@/data/seo-config'
import { generateBreadcrumbSchema } from '@/utils/seo'

function MyPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'My Page', url: '/my-page' },
  ])

  return (
    <>
      <SEOHead pageSEO={pageSEO.newPage!} structuredData={breadcrumb} />
      {/* Your page content */}
    </>
  )
}
```

3. Update `public/sitemap.xml` to include the new page.

### Updating Meta Tags

Edit `src/data/seo-config.ts` to update:

- Page titles and descriptions
- Keywords
- Social media handles
- Site-wide defaults

### Adding Structured Data

Use the utility functions in `src/utils/seo.ts`:

- `generateBreadcrumbSchema()` - For breadcrumb navigation
- `generateWebPageSchema()` - Automatically added to all pages
- `generatePersonSchema()` - For creator profiles

Pass structured data to the SEOHead component:

```tsx
<SEOHead
  pageSEO={pageSEO.myPage!}
  structuredData={[breadcrumb, customSchema]}
/>
```

## SEO Features by Page

### Home Page

- Organization schema
- Website schema
- WebPage schema
- Full Open Graph and Twitter Card support

### About Page

- Breadcrumb schema
- Organization schema
- WebPage schema

### Creators Page

- Breadcrumb schema
- Profile type Open Graph
- WebPage schema

### Projects Page

- Breadcrumb schema
- WebPage schema

### Journal Listing

- Breadcrumb schema
- WebPage schema

### Journal Posts

- Article schema (existing implementation)
- Author information
- Publication dates
- Full social media metadata

### Error Pages (404, 500, Network Error)

- `noindex` directive (prevents search engine indexing)
- Still includes basic meta tags

## Maintenance

### Regular Updates

1. **Update sitemap.xml** when:
   - New pages are added
   - Journal posts are published
   - Update lastmod dates quarterly

2. **Review meta tags** quarterly:
   - Ensure descriptions are accurate
   - Update keywords based on content changes
   - Check character counts (title: 50-60, description: 150-160)

3. **Verify structured data** using:
   - [Google Rich Results Test](https://search.google.com/test/rich-results)
   - [Schema.org Validator](https://validator.schema.org/)

### Testing

Before deploying major changes:

1. Run the build: `npm run build`
2. Test locally with dev server: `npm run dev`
3. Verify meta tags in browser DevTools
4. Check structured data with validator tools

### Best Practices

- Keep titles under 60 characters
- Keep descriptions between 150-160 characters
- Use descriptive, keyword-rich titles
- Ensure each page has unique title and description
- Update sitemap when adding new pages
- Test Open Graph tags with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- Test Twitter Cards with [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## Monitoring

Set up the following tools:

1. **Google Search Console**
   - Submit sitemap.xml
   - Monitor indexing status
   - Check for crawl errors

2. **Google Analytics** (optional)
   - Track organic search traffic
   - Monitor page performance

3. **Schema Markup Validator**
   - Regularly validate structured data
   - Fix any warnings or errors

## Resources

- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Web.dev SEO](https://web.dev/lighthouse-seo/)

## Troubleshooting

### Meta tags not updating

- Clear browser cache
- Check that SEOHead component is imported
- Verify pageSEO key exists in seo-config.ts

### Structured data errors

- Validate JSON-LD syntax
- Ensure all required properties are present
- Check for trailing commas in objects

### Sitemap not accessible

- Verify file is in public/ directory
- Check build output includes sitemap.xml
- Ensure no .gitignore rules exclude it
