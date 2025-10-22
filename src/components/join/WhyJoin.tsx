/**
 * WhyJoin Component
 *
 * Displays benefits of joining Subcult and what we're looking for in members
 */

import { motion } from 'framer-motion'
import {
  entranceAnimations,
  createStaggerContainer,
} from '../../utils/animations'

interface Benefit {
  icon: string
  title: string
  description: string
}

interface WhyJoinProps {
  title: string
  subtitle: string
  benefits: Benefit[]
  lookingFor: {
    title: string
    qualities: string[]
  }
}

export default function WhyJoin({
  title,
  subtitle,
  benefits,
  lookingFor,
}: WhyJoinProps) {
  return (
    <section className="py-20 px-4 bg-deep-gray">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={createStaggerContainer(0.1)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Header */}
        <motion.div
          variants={entranceAnimations.fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl text-neon-cyan mb-4">
            {title}
          </h2>
          <p className="font-sans text-xl text-gray-300">{subtitle}</p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={entranceAnimations.fadeInUp}
              className="cyber-card group hover:shadow-neon transition-shadow"
            >
              <div className="text-4xl mb-4" aria-hidden="true">
                {benefit.icon}
              </div>
              <h3 className="font-display text-xl text-white mb-3">
                {benefit.title}
              </h3>
              <p className="font-sans text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* What We're Looking For */}
        <motion.div
          variants={entranceAnimations.fadeInUp}
          className="cyber-card bg-cyber-black border-2 border-electric-blue"
        >
          <h3 className="font-display text-2xl text-electric-blue mb-6">
            {lookingFor.title}
          </h3>
          <ul className="space-y-3">
            {lookingFor.qualities.map((quality, index) => (
              <li
                key={index}
                className="font-sans text-gray-300 flex items-start gap-3"
              >
                <span className="text-neon-green mt-1" aria-hidden="true">
                  ⚡
                </span>
                <span>{quality}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  )
}

WhyJoin.displayName = 'WhyJoin'
