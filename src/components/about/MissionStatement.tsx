/**
 * MissionStatement Component
 *
 * Displays Subcult's mission and manifesto with glitch text effects
 */

import { motion } from 'framer-motion'
import GlitchText from '../motion/GlitchText'
import {
  entranceAnimations,
  createStaggerContainer,
} from '../../utils/animations'

interface MissionStatementProps {
  title: string
  manifesto: string
  tagline: string
}

export default function MissionStatement({
  title,
  manifesto,
  tagline,
}: MissionStatementProps) {
  return (
    <motion.section
      className="py-20 px-4"
      variants={createStaggerContainer(0.2)}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div variants={entranceAnimations.fadeInDown}>
          <GlitchText
            type="rgbSplit"
            as="h2"
            className="font-display text-5xl md:text-7xl text-neon-cyan text-shadow-neon mb-8"
          >
            {title}
          </GlitchText>
        </motion.div>

        <motion.div variants={entranceAnimations.fadeInUp} className="relative">
          <p className="font-display text-xl md:text-3xl text-white leading-relaxed mb-8 px-4">
            {manifesto}
          </p>
          <div
            className="absolute inset-0 bg-glitch-gradient opacity-5 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
        </motion.div>

        <motion.div
          variants={entranceAnimations.scaleIn}
          className="inline-block"
        >
          <GlitchText
            type="textGlitch"
            triggerOnHover
            as="p"
            className="font-mono text-glitch-magenta text-lg md:text-xl cursor-default"
          >
            {tagline}
          </GlitchText>
        </motion.div>
      </div>
    </motion.section>
  )
}

MissionStatement.displayName = 'MissionStatement'
