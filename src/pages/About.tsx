/**
 * About Page
 *
 * Showcases Subcult's mission, cooperative structure, origin story,
 * and core values with engaging animations and layout
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import MissionStatement from '../components/about/MissionStatement'
import CooperativeStructure from '../components/about/CooperativeStructure'
import OriginStory from '../components/about/OriginStory'
import ValuesGrid from '../components/about/ValuesGrid'
import GlitchText from '../components/motion/GlitchText'
import SEOHead from '../components/seo/SEOHead'
import { pageSEO, organizationSchema } from '../data/seo-config'
import { generateBreadcrumbSchema } from '../utils/seo'
import { entranceAnimations } from '../utils/animations'
import aboutContent from '../content/about.json'

function About() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ])

  return (
    <>
      <SEOHead
        pageSEO={pageSEO.about!}
        structuredData={[organizationSchema, breadcrumb]}
      />
      <div className="min-h-screen bg-cyber-black">
        {/* Mission Statement Section */}
        <MissionStatement
          title={aboutContent.mission.title}
          manifesto={aboutContent.mission.manifesto}
          tagline={aboutContent.mission.tagline}
        />

        {/* Cooperative Structure Section */}
        <CooperativeStructure
          title={aboutContent.cooperative.title}
          description={aboutContent.cooperative.description}
          structure={aboutContent.cooperative.structure}
          benefits={aboutContent.cooperative.benefits}
        />

        {/* Origin Story Section */}
        <OriginStory
          title={aboutContent.origin.title}
          narrative={aboutContent.origin.narrative}
          timeline={aboutContent.origin.timeline}
        />

        {/* Values & Principles Section */}
        <ValuesGrid
          title={aboutContent.values.title}
          subtitle={aboutContent.values.subtitle}
          cards={aboutContent.values.cards}
        />

        {/* Call to Action Section */}
        <motion.section
          className="py-20 px-4"
          variants={entranceAnimations.fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <GlitchText
              type="both"
              triggerOnHover
              as="h2"
              className="font-display text-4xl md:text-6xl text-white mb-6 cursor-default"
            >
              {aboutContent.cta.title}
            </GlitchText>
            <p className="font-sans text-gray-300 text-lg md:text-xl mb-8">
              {aboutContent.cta.description}
            </p>
            <Link
              to={aboutContent.cta.buttonLink}
              className="btn-neon inline-block text-lg px-8 py-4"
            >
              {aboutContent.cta.buttonText} →
            </Link>
          </div>
        </motion.section>
      </div>
    </>
  )
}

About.displayName = 'About'

export default About
