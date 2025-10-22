# Journal Posts - Writing Guide

## Overview

This directory contains all blog posts for the Subcult Journal. Posts are written in MDX format, which allows you to use both Markdown and React components.

## Creating a New Post

1. Create a new `.mdx` file in this directory
2. Use kebab-case for the filename (e.g., `my-new-post.mdx`)
3. The filename will become the URL slug (e.g., `/journal/my-new-post`)

## Post Structure

Every post must include frontmatter at the top:

```mdx
export const frontmatter = {
  title: 'Your Post Title',
  date: '2025-10-22',
  author: 'Author Name',
  tags: ['tag1', 'tag2'],
  excerpt: 'A brief description of your post',
  coverImage: '/assets/journal/image.jpg', // optional
  description: 'SEO description', // optional
  keywords: ['keyword1', 'keyword2'], // optional
}

# Your Content Here

Write your post content using Markdown syntax...
```

## Frontmatter Fields

| Field         | Required | Description                            |
| ------------- | -------- | -------------------------------------- |
| `title`       | ✅       | Post title                             |
| `date`        | ✅       | Publication date (YYYY-MM-DD)          |
| `author`      | ✅       | Author name                            |
| `tags`        | ✅       | Array of tags                          |
| `excerpt`     | ✅       | Brief description (shown in post list) |
| `coverImage`  | ❌       | Cover image URL                        |
| `description` | ❌       | SEO meta description                   |
| `keywords`    | ❌       | SEO keywords array                     |

## Custom Components

You can use custom React components in your posts:

### Callout Boxes

```mdx
<Callout type="info">This is an informational callout</Callout>

<Callout type="warning">This is a warning</Callout>

<Callout type="error">This is an error message</Callout>

<Callout type="success">This is a success message</Callout>
```

### Code Blocks

Use standard Markdown syntax for code blocks with syntax highlighting:

````mdx
```javascript
const hello = 'world'
console.log(hello)
```
````

### Images

```mdx
![Alt text](/path/to/image.jpg)
```

Images will automatically have lazy loading and proper styling.

## Markdown Features

All standard Markdown features are supported:

- **Bold text**
- _Italic text_
- [Links](https://example.com)
- Lists (ordered and unordered)
- Blockquotes
- Headings (H1-H6)
- Horizontal rules
- Tables

## Best Practices

1. **Keep frontmatter consistent** - Always include all required fields
2. **Use descriptive slugs** - Make URLs readable and SEO-friendly
3. **Write good excerpts** - This is what readers see first
4. **Tag appropriately** - Use 2-5 relevant tags per post
5. **Optimize images** - Compress images before uploading
6. **Use proper headings** - Create a clear content hierarchy
7. **Test locally** - Preview your post before committing

## Local Development

To preview your post locally:

```bash
npm run dev
```

Then navigate to `http://localhost:5173/journal/your-post-slug`

## Deployment

When you commit and push changes to the repository, posts are automatically deployed to the production site.

---

**Questions?** Reach out to the dev team on Discord.
