# Content Management Guide

This guide explains how to add and manage content on the Subculture Collective website, including blog posts, creators, projects, and static pages.

## Table of Contents

- [Blog Posts](#blog-posts)
- [Creators](#creators)
- [Projects](#projects)
- [Static Pages](#static-pages)
- [Images and Assets](#images-and-assets)
- [Content Guidelines](#content-guidelines)

## Blog Posts

### Overview

Blog posts are written in MDX format, which combines Markdown with React components for rich, interactive content.

**Location**: `src/content/journal/`

### Creating a New Blog Post

1. **Create a new file** in `src/content/journal/` with a `.mdx` extension
2. **Use kebab-case** for the filename (e.g., `my-new-post.mdx`)
3. **Add frontmatter** at the top of the file
4. **Write your content** using Markdown and MDX

### File Naming

- Use kebab-case: `building-in-the-shadows.mdx`
- Be descriptive: `announcing-new-project.mdx`
- Avoid dates in filename (use frontmatter instead)
- The filename becomes the URL slug: `/journal/your-filename`

### Post Structure

````mdx
export const frontmatter = {
  title: 'Your Post Title',
  date: '2025-10-22',
  author: 'Author Name',
  tags: ['announcement', 'updates'],
  excerpt: 'A brief description that appears in post listings',
  coverImage: '/assets/journal/cover.jpg', // optional
  description: 'SEO meta description', // optional
  keywords: ['keyword1', 'keyword2'], // optional
}

# Your Post Content Here

Write your post content using Markdown syntax...

## Section Heading

Regular paragraph text with **bold** and _italic_ formatting.

- List item 1
- List item 2

```javascript
// Code blocks with syntax highlighting
const example = 'Hello, world!'
console.log(example)
```
````

![Image alt text](/path/to/image.jpg)

````

### Frontmatter Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Post title (used in heading and SEO) |
| `date` | string | ✅ | Publication date (YYYY-MM-DD format) |
| `author` | string | ✅ | Author name |
| `tags` | string[] | ✅ | Array of tags (2-5 recommended) |
| `excerpt` | string | ✅ | Brief description for post listings |
| `coverImage` | string | ❌ | Path to cover image |
| `description` | string | ❌ | SEO meta description (falls back to excerpt) |
| `keywords` | string[] | ❌ | SEO keywords |

### Markdown Features

#### Headings

```markdown
# H1 Heading
## H2 Heading
### H3 Heading
````

#### Text Formatting

```markdown
**Bold text**
_Italic text_
**_Bold and italic_**
~~Strikethrough~~
```

#### Links

```markdown
[Link text](https://example.com)
[Internal link](/about)
```

#### Lists

```markdown
- Unordered list item
- Another item
  - Nested item

1. Ordered list item
2. Another item
```

#### Blockquotes

```markdown
> This is a blockquote
> It can span multiple lines
```

#### Code

````markdown
Inline `code` formatting

```javascript
// Code block with syntax highlighting
function example() {
  return 'Hello, world!'
}
```
````

#### Images

```markdown
![Alt text](/path/to/image.jpg)
```

#### Tables

```markdown
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

### React Components in MDX

You can use React components in your blog posts for richer content.

#### Available Components

Currently, standard HTML and Markdown elements are supported. To add custom components:

1. Create the component in `src/components/journal/`
2. Import it in your MDX file
3. Use it like any React component

Example:

```mdx
import { Callout } from '@/components/journal'

export const frontmatter = { ... }

# My Post

<Callout type="info">This is an informational callout box</Callout>
```

### Best Practices

1. **Descriptive titles**: Make titles clear and engaging
2. **Good excerpts**: Write compelling excerpts (150-200 characters)
3. **Relevant tags**: Use 2-5 tags that accurately describe the content
4. **Optimize images**: Compress images before adding them
5. **Internal links**: Link to relevant pages/posts
6. **Headings**: Use proper heading hierarchy (H2, H3, etc.)
7. **Alt text**: Always include descriptive alt text for images
8. **Preview locally**: Test your post before committing

### Testing Your Post

```bash
# Start development server
npm run dev

# Navigate to your post
# http://localhost:5173/journal/your-post-slug
```

### Publishing

1. Commit your `.mdx` file to the repository
2. Push to the main branch
3. GitHub Actions will automatically deploy your post
4. Check the live site in a few minutes

## Creators

### Overview

Creator profiles showcase independent artists, developers, and makers in the collective.

**Location**: `src/data/creators.ts`

### Adding a New Creator

Edit `src/data/creators.ts` and add a new entry to the `creators` array:

```typescript
export const creators: Creator[] = [
  // ... existing creators
  {
    id: 'unique-slug',
    name: 'Creator Name',
    bio: 'Brief bio describing the creator and their work',
    avatar: '/assets/creators/avatar.jpg',
    role: 'Artist / Developer / Musician',
    links: {
      website: 'https://creatorsite.com',
      github: 'https://github.com/username',
      twitter: 'https://twitter.com/username',
      instagram: 'https://instagram.com/username',
    },
    featured: false, // Set to true to feature on home page
  },
]
```

### Creator Schema

| Field      | Type    | Required | Description                           |
| ---------- | ------- | -------- | ------------------------------------- |
| `id`       | string  | ✅       | Unique identifier (kebab-case)        |
| `name`     | string  | ✅       | Creator's display name                |
| `bio`      | string  | ✅       | Brief bio (200-300 characters)        |
| `avatar`   | string  | ✅       | Path to avatar image                  |
| `role`     | string  | ✅       | Creator's role/discipline             |
| `links`    | object  | ✅       | Social media and website links        |
| `featured` | boolean | ❌       | Display on home page (default: false) |

### Creator Avatar Guidelines

- **Size**: 400x400px minimum
- **Format**: JPG or WebP
- **Location**: `public/assets/creators/`
- **Naming**: Use creator's id: `creator-slug.jpg`
- **Optimize**: Compress images for web

## Projects

### Overview

Projects showcase creative works, tools, and experiments from the collective.

**Location**: `src/data/projects.ts`

### Adding a New Project

Edit `src/data/projects.ts` and add a new entry to the `projects` array:

```typescript
export const projects: Project[] = [
  // ... existing projects
  {
    id: 'unique-slug',
    title: 'Project Title',
    description: 'Detailed description of the project and its purpose',
    image: '/assets/projects/project-image.jpg',
    tags: ['React', 'TypeScript', 'Design'],
    links: {
      live: 'https://project-url.com',
      github: 'https://github.com/org/repo',
    },
    featured: false, // Set to true to feature on home page
    date: '2025-10-22',
  },
]
```

### Project Schema

| Field         | Type     | Required | Description                                |
| ------------- | -------- | -------- | ------------------------------------------ |
| `id`          | string   | ✅       | Unique identifier (kebab-case)             |
| `title`       | string   | ✅       | Project title                              |
| `description` | string   | ✅       | Project description (300-500 characters)   |
| `image`       | string   | ✅       | Path to project image                      |
| `tags`        | string[] | ✅       | Technology/category tags (3-5 recommended) |
| `links`       | object   | ✅       | Project and repository links               |
| `featured`    | boolean  | ❌       | Display on home page (default: false)      |
| `date`        | string   | ❌       | Project date (YYYY-MM-DD)                  |

### Project Image Guidelines

- **Size**: 1200x630px (16:9 aspect ratio)
- **Format**: JPG or WebP
- **Location**: `public/assets/projects/`
- **Naming**: Use project id: `project-slug.jpg`
- **Optimize**: Compress images for web

## Static Pages

### About Page

**Location**: `src/content/about.json`

Edit the JSON file to update about page content:

```json
{
  "title": "About Subculture Collective",
  "subtitle": "Who We Are",
  "content": [
    {
      "heading": "Our Mission",
      "text": "Mission statement..."
    },
    {
      "heading": "What We Do",
      "text": "Description of activities..."
    }
  ],
  "values": [
    {
      "title": "Value 1",
      "description": "Description..."
    }
  ]
}
```

### Join Page

**Location**: `src/content/join.json`

Edit the JSON file to update join page content:

```json
{
  "title": "Join the Collective",
  "description": "Description of how to join...",
  "contact": {
    "email": "contact@example.com",
    "discord": "https://discord.gg/...",
    "form": "https://forms.gle/..."
  }
}
```

## Images and Assets

### Directory Structure

```
public/
  assets/
    journal/        # Blog post images
    creators/       # Creator avatars
    projects/       # Project images
    brand/          # Logos, icons
```

### Image Guidelines

#### Optimization

1. **Compress images** before uploading
2. **Use WebP format** when possible (with JPG fallback)
3. **Responsive images**: Provide multiple sizes
4. **Alt text**: Always include descriptive alt text

#### Recommended Sizes

- **Blog cover images**: 1200x630px (16:9)
- **Creator avatars**: 400x400px (1:1)
- **Project images**: 1200x630px (16:9)
- **Thumbnails**: 400x400px (1:1)

#### Tools

- **[Squoosh](https://squoosh.app/)**: Image optimization
- **[TinyPNG](https://tinypng.com/)**: PNG/JPG compression
- **[ImageOptim](https://imageoptim.com/)**: Mac image optimization

### Using OptimizedImage Component

```tsx
import { OptimizedImage } from '@/components/ui'
;<OptimizedImage
  src="/assets/journal/post-image.jpg"
  alt="Descriptive alt text"
  srcSet="/assets/journal/post-image-400.jpg 400w,
          /assets/journal/post-image-800.jpg 800w,
          /assets/journal/post-image-1200.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 800px"
/>
```

See [IMAGE_OPTIMIZATION.md](../IMAGE_OPTIMIZATION.md) for details.

## Content Guidelines

### Writing Style

1. **Clear and concise**: Avoid jargon, be direct
2. **Active voice**: Use active voice when possible
3. **Consistent tone**: Match the cyberpunk/underground aesthetic
4. **Inclusive language**: Use gender-neutral language
5. **Proofread**: Check for spelling and grammar

### SEO Best Practices

1. **Descriptive titles**: Include keywords naturally
2. **Meta descriptions**: Write compelling descriptions
3. **Headings**: Use proper heading hierarchy
4. **Alt text**: Describe images for accessibility and SEO
5. **Internal links**: Link to relevant pages
6. **Keywords**: Use keywords naturally in content

### Accessibility

1. **Alt text**: Provide descriptive alt text for all images
2. **Headings**: Use semantic heading order (H2, H3, etc.)
3. **Links**: Use descriptive link text, avoid "click here"
4. **Contrast**: Ensure sufficient color contrast
5. **Plain language**: Write clearly for all audiences

### Brand Voice

- **Underground**: Indie, DIY, grassroots
- **Technical**: Precise, knowledgeable
- **Creative**: Innovative, experimental
- **Inclusive**: Welcoming, community-focused
- **Edgy**: Cyberpunk aesthetic, but professional

### Content Checklist

Before publishing content:

- [ ] Spelling and grammar checked
- [ ] Links work and go to correct destinations
- [ ] Images optimized and have alt text
- [ ] Headings use proper hierarchy
- [ ] Tested on mobile devices
- [ ] Previewed locally
- [ ] SEO fields filled out
- [ ] Follows brand guidelines

## Workflow

### 1. Plan Content

- Define topic and purpose
- Research and outline
- Gather images and assets

### 2. Create Content

- Write content following guidelines
- Add images with alt text
- Include relevant links

### 3. Review

- Proofread for errors
- Check formatting
- Verify links and images
- Test accessibility

### 4. Publish

- Commit changes
- Push to repository
- Verify deployment
- Share on social media

## Troubleshooting

### Post Not Showing

- Check filename format (kebab-case, .mdx extension)
- Verify frontmatter syntax
- Ensure all required fields are present
- Check for JavaScript errors in console

### Images Not Loading

- Verify image path is correct
- Check image exists in public/assets/
- Ensure proper file permissions
- Clear browser cache

### Formatting Issues

- Check MDX syntax
- Verify component imports
- Look for unclosed tags
- Test in development mode

## Resources

- [MDX Documentation](https://mdxjs.com/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Content Strategy Guide](https://contentmarketinginstitute.com/)
- [SEO Best Practices](https://developers.google.com/search/docs)

---

For content-related questions, open a [Discussion](https://github.com/subculture-collective/subculture-collective.github.io/discussions).
