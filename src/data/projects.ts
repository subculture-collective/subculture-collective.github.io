/**
 * Projects Data
 *
 * Sample project data for the Projects page.
 * This data can be easily expanded with real project information.
 */

import type { Project, ProjectId, CreatorId } from '../types'

export const projectsData: Project[] = [
  {
    id: 'project-001' as ProjectId,
    slug: 'neon-dreams-visualizer',
    title: 'Neon Dreams Visualizer',
    description:
      'Real-time audio visualizer with glitch effects and cyberpunk aesthetics. Built with WebGL and Three.js.',
    longDescription:
      'An immersive audio-reactive visualizer that transforms sound into mesmerizing cyberpunk visuals. Features real-time FFT analysis, particle systems, and custom shader effects.',
    thumbnailImage: '/assets/projects/placeholder-1.svg',
    coverImage: '/assets/projects/placeholder-1.svg',
    creators: ['creator-001' as CreatorId, 'creator-003' as CreatorId],
    tags: ['WebGL', 'Three.js', 'Audio', 'Visualization'],
    category: 'Web Project',
    status: 'completed',
    startDate: new Date('2024-01-15'),
    completionDate: new Date('2024-03-20'),
    links: [
      {
        type: 'demo',
        url: 'https://example.com/neon-dreams',
        label: 'Live Demo',
      },
      {
        type: 'github',
        url: 'https://github.com/subcult/neon-dreams',
        label: 'Source Code',
      },
    ],
    featured: true,
  },
  {
    id: 'project-002' as ProjectId,
    slug: 'glitch-gallery',
    title: 'Glitch Gallery',
    description:
      'Interactive digital art gallery featuring AI-generated glitch art and experimental visuals.',
    longDescription:
      'A curated collection of digital art pieces exploring glitch aesthetics, data corruption, and digital decay. Built with React and Framer Motion.',
    thumbnailImage: '/assets/projects/placeholder-2.svg',
    coverImage: '/assets/projects/placeholder-2.svg',
    creators: ['creator-001' as CreatorId, 'creator-004' as CreatorId],
    tags: ['Digital Art', 'AI', 'React', 'Gallery'],
    category: 'Art Installation',
    status: 'in-progress',
    startDate: new Date('2024-04-01'),
    links: [
      {
        type: 'website',
        url: 'https://example.com/glitch-gallery',
        label: 'Gallery Website',
      },
    ],
    featured: true,
  },
  {
    id: 'project-003' as ProjectId,
    slug: 'cyberpunk-zine',
    title: 'SUBCULT Zine Issue #1',
    description:
      'Digital and print zine featuring essays, art, and interviews from the collective.',
    longDescription:
      'Our inaugural zine exploring cyberpunk culture, digital art, and underground tech. Features contributions from all collective members.',
    thumbnailImage: '/assets/projects/placeholder-3.svg',
    coverImage: '/assets/projects/placeholder-3.svg',
    creators: [
      'creator-002' as CreatorId,
      'creator-004' as CreatorId,
      'creator-005' as CreatorId,
    ],
    tags: ['Publication', 'Design', 'Editorial'],
    category: 'Publication',
    status: 'completed',
    startDate: new Date('2024-02-01'),
    completionDate: new Date('2024-05-15'),
    links: [
      {
        type: 'download',
        url: 'https://example.com/zine-1.pdf',
        label: 'Download PDF',
      },
      {
        type: 'website',
        url: 'https://example.com/zine',
        label: 'Read Online',
      },
    ],
    featured: false,
  },
  {
    id: 'project-004' as ProjectId,
    slug: 'underground-stream',
    title: 'Underground Stream Platform',
    description:
      'Live streaming platform for underground artists with chat, tipping, and collaboration features.',
    longDescription:
      'A dedicated streaming platform built for experimental artists and creators. Features real-time collaboration, low-latency streaming, and integrated tipping.',
    thumbnailImage: '/assets/projects/placeholder-4.svg',
    coverImage: '/assets/projects/placeholder-4.svg',
    creators: ['creator-003' as CreatorId],
    tags: ['Streaming', 'WebRTC', 'Platform', 'Full-Stack'],
    category: 'Tool/Software',
    status: 'in-progress',
    startDate: new Date('2024-05-01'),
    links: [
      {
        type: 'github',
        url: 'https://github.com/subcult/underground-stream',
        label: 'GitHub',
      },
    ],
    featured: false,
  },
  {
    id: 'project-005' as ProjectId,
    slug: 'neon-nights-event',
    title: 'Neon Nights: Live AV Performance',
    description:
      'Collaborative audiovisual performance combining live music, VJing, and interactive projections.',
    longDescription:
      'A multi-sensory experience blending electronic music, live visuals, and audience interaction. Performed at underground venues across the city.',
    thumbnailImage: '/assets/projects/placeholder-5.svg',
    coverImage: '/assets/projects/placeholder-5.svg',
    creators: [
      'creator-001' as CreatorId,
      'creator-002' as CreatorId,
      'creator-005' as CreatorId,
    ],
    tags: ['Event', 'Performance', 'AV', 'Live'],
    category: 'Event',
    status: 'on-hold',
    startDate: new Date('2024-06-01'),
    links: [
      {
        type: 'website',
        url: 'https://example.com/neon-nights',
        label: 'Event Info',
      },
    ],
    featured: true,
  },
]

/**
 * Get all unique tags from projects
 */
export function getAllProjectTags(): string[] {
  const tags = new Set<string>()
  projectsData.forEach(project => {
    project.tags?.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
}

/**
 * Get all unique categories from projects
 */
export function getAllProjectCategories(): string[] {
  const categories = new Set<string>()
  projectsData.forEach(project => {
    if (project.category) {
      categories.add(project.category)
    }
  })
  return Array.from(categories).sort()
}

/**
 * Get all unique statuses from projects
 */
export function getAllProjectStatuses(): Project['status'][] {
  return ['in-progress', 'completed', 'on-hold', 'planning', 'archived']
}

/**
 * Filter projects by status
 */
export function filterProjectsByStatus(status: Project['status']): Project[] {
  return projectsData.filter(project => project.status === status)
}

/**
 * Filter projects by tag
 */
export function filterProjectsByTag(tag: string): Project[] {
  return projectsData.filter(project =>
    project.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

/**
 * Filter projects by category
 */
export function filterProjectsByCategory(category: string): Project[] {
  return projectsData.filter(
    project => project.category?.toLowerCase() === category.toLowerCase()
  )
}

/**
 * Get project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find(project => project.slug === slug)
}

/**
 * Get featured projects
 */
export function getFeaturedProjects(): Project[] {
  return projectsData.filter(project => project.featured)
}
