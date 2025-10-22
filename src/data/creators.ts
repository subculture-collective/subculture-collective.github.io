/**
 * Creators Data
 *
 * Sample creator profiles for the Creators page.
 * This data can be easily expanded with real creator information.
 */

import type { CreatorProfile, CreatorId } from '../types'

export const creatorsData: CreatorProfile[] = [
  {
    id: 'creator-001' as CreatorId,
    name: 'Alex Cipher',
    displayName: 'CipherAlex',
    slug: 'alex-cipher',
    bio: 'Digital artist and VJ specializing in glitch aesthetics and cyberpunk visuals. Creating immersive experiences through code and motion.',
    avatar: '/assets/creators/placeholder-1.svg',
    location: 'Tokyo, Japan',
    website: 'https://example.com',
    socials: [
      {
        platform: 'twitter',
        url: 'https://twitter.com/cipheralex',
        handle: '@cipheralex',
      },
      {
        platform: 'instagram',
        url: 'https://instagram.com/cipheralex',
        handle: '@cipheralex',
      },
      { platform: 'github', url: 'https://github.com/cipheralex' },
    ],
    skills: ['Visual Art', 'VJing', 'Motion Graphics', 'WebGL', 'Shaders'],
    joinedAt: new Date('2024-01-15'),
    isActive: true,
  },
  {
    id: 'creator-002' as CreatorId,
    name: 'Neon Dreams',
    displayName: 'NeonDreams',
    slug: 'neon-dreams',
    bio: 'Electronic music producer crafting cyberpunk soundscapes. Blending dark synthwave with experimental beats to create sonic experiences.',
    avatar: '/assets/creators/placeholder-2.svg',
    location: 'Berlin, Germany',
    website: 'https://example.com',
    socials: [
      { platform: 'twitter', url: 'https://twitter.com/neondreams' },
      { platform: 'youtube', url: 'https://youtube.com/neondreams' },
      { platform: 'twitch', url: 'https://twitch.tv/neondreams' },
    ],
    skills: ['Music Production', 'Sound Design', 'DJing', 'Live Performance'],
    joinedAt: new Date('2024-02-20'),
    isActive: true,
  },
  {
    id: 'creator-003' as CreatorId,
    name: 'Zero Cool',
    displayName: 'Zero',
    slug: 'zero-cool',
    bio: 'Full-stack developer and creative coder. Building interactive installations and web experiences with a cyberpunk edge.',
    avatar: '/assets/creators/placeholder-3.svg',
    location: 'San Francisco, USA',
    website: 'https://example.com',
    socials: [
      { platform: 'github', url: 'https://github.com/zerocool' },
      { platform: 'twitter', url: 'https://twitter.com/zerocool' },
      { platform: 'website', url: 'https://zerocool.dev' },
    ],
    skills: [
      'Web Development',
      'Creative Coding',
      'Three.js',
      'React',
      'TypeScript',
    ],
    joinedAt: new Date('2024-03-10'),
    isActive: true,
  },
  {
    id: 'creator-004' as CreatorId,
    name: 'Pixel Witch',
    displayName: 'PixelWitch',
    slug: 'pixel-witch',
    bio: 'Pixel artist and game designer creating retro-futuristic worlds. Specializing in cyberpunk environments and character design.',
    avatar: '/assets/creators/placeholder-4.svg',
    location: 'Seoul, South Korea',
    socials: [
      { platform: 'twitter', url: 'https://twitter.com/pixelwitch' },
      { platform: 'instagram', url: 'https://instagram.com/pixelwitch' },
    ],
    skills: ['Pixel Art', 'Game Design', 'Character Design', 'Animation'],
    joinedAt: new Date('2024-04-05'),
    isActive: true,
  },
  {
    id: 'creator-005' as CreatorId,
    name: 'Ghost Protocol',
    displayName: 'GhostProtocol',
    slug: 'ghost-protocol',
    bio: '3D artist and motion designer. Creating futuristic environments and abstract visualizations for the digital age.',
    avatar: '/assets/creators/placeholder-5.svg',
    location: 'London, UK',
    website: 'https://example.com',
    socials: [
      { platform: 'instagram', url: 'https://instagram.com/ghostprotocol' },
      { platform: 'twitter', url: 'https://twitter.com/ghostprotocol' },
    ],
    skills: [
      '3D Art',
      'Motion Design',
      'Cinema 4D',
      'Blender',
      'After Effects',
    ],
    joinedAt: new Date('2024-05-12'),
    isActive: true,
  },
]

/**
 * Get all unique skills from creators
 */
export function getAllSkills(): string[] {
  const skills = new Set<string>()
  creatorsData.forEach(creator => {
    creator.skills?.forEach(skill => skills.add(skill))
  })
  return Array.from(skills).sort()
}

/**
 * Filter creators by skill
 */
export function filterCreatorsBySkill(skill: string): CreatorProfile[] {
  return creatorsData.filter(creator =>
    creator.skills?.some(s => s.toLowerCase() === skill.toLowerCase())
  )
}

/**
 * Get creator by slug
 */
export function getCreatorBySlug(slug: string): CreatorProfile | undefined {
  return creatorsData.find(creator => creator.slug === slug)
}
