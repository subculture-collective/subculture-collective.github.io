/**
 * Social Media Configuration
 *
 * Centralized configuration for social media links and contact information.
 * Update these values to reflect the collective's social media presence.
 */

import type { SocialLink } from '../types/content'

/**
 * Main social media links for the collective
 */
export const socialLinks: readonly SocialLink[] = [
  {
    platform: 'twitter',
    url: 'https://twitter.com/subcult',
    handle: '@subcult',
  },
  {
    platform: 'instagram',
    url: 'https://instagram.com/subcult',
    handle: '@subcult',
  },
  {
    platform: 'youtube',
    url: 'https://youtube.com/@subcult',
    handle: '@subcult',
  },
  {
    platform: 'github',
    url: 'https://github.com/subculture-collective',
    handle: '@subculture-collective',
  },
]

/**
 * Contact information
 */
export const contactInfo = {
  email: 'hello@subcult.tv',
  // RSS feed URL (when implemented)
  rss: '/feed.xml',
} as const

/**
 * Footer navigation links
 */
export const footerLinks = {
  about: [
    { label: 'About Subcult', href: '/about' },
    { label: 'Mission', href: '/about#mission' },
  ],
  quickLinks: [
    { label: 'Home', href: '/' },
    { label: 'Creators', href: '/creators' },
    { label: 'Projects', href: '/projects' },
    { label: 'Journal', href: '/journal' },
    { label: 'Join', href: '/join' },
  ],
  connect: [
    { label: 'Contact', href: `mailto:${contactInfo.email}` },
    { label: 'RSS Feed', href: contactInfo.rss },
  ],
} as const

/**
 * Copyright and legal information
 */
export const legalInfo = {
  copyrightYear: 2024,
  organizationName: 'Subculture Collective',
  // License information (update as needed)
  license: {
    name: 'MIT License',
    url: 'https://github.com/subculture-collective/subculture-collective.github.io/blob/main/LICENSE',
  },
} as const
