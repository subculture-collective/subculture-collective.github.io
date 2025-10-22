/**
 * ApplicationProcess Component
 *
 * Displays the step-by-step process for joining Subcult
 */

import { motion } from 'framer-motion'
import {
  entranceAnimations,
  createStaggerContainer,
} from '../../utils/animations'

interface Step {
  number: string
  title: string
  description: string
}

interface ApplicationProcessProps {
  title: string
  subtitle: string
  steps: Step[]
  timeline: string
  requirements: string[]
}

export default function ApplicationProcess({
  title,
  subtitle,
  steps,
  timeline,
  requirements,
}: ApplicationProcessProps) {
  return (
    <section className="py-20 px-4 bg-cyber-black">
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
          <h2 className="font-display text-4xl md:text-5xl text-glitch-magenta mb-4">
            {title}
          </h2>
          <p className="font-sans text-xl text-gray-300">{subtitle}</p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={entranceAnimations.fadeInUp}
              className="cyber-card relative"
            >
              <div
                className="font-mono text-5xl text-neon-cyan/20 absolute top-4 right-4"
                aria-hidden="true"
              >
                {step.number}
              </div>
              <div className="relative">
                <div className="font-mono text-sm text-electric-blue mb-2">
                  STEP {step.number}
                </div>
                <h3 className="font-display text-xl text-white mb-3">
                  {step.title}
                </h3>
                <p className="font-sans text-gray-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline and Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Timeline */}
          <motion.div
            variants={entranceAnimations.fadeInUp}
            className="cyber-card bg-deep-gray border-l-4 border-neon-green"
          >
            <h3 className="font-display text-xl text-neon-green mb-4">
              Timeline
            </h3>
            <p className="font-sans text-gray-300">{timeline}</p>
          </motion.div>

          {/* Requirements */}
          <motion.div
            variants={entranceAnimations.fadeInUp}
            className="cyber-card bg-deep-gray border-l-4 border-electric-blue"
          >
            <h3 className="font-display text-xl text-electric-blue mb-4">
              Requirements
            </h3>
            <ul className="space-y-2">
              {requirements.map((requirement, index) => (
                <li
                  key={index}
                  className="font-sans text-gray-300 text-sm flex items-start gap-2"
                >
                  <span className="text-neon-cyan mt-1" aria-hidden="true">
                    •
                  </span>
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

ApplicationProcess.displayName = 'ApplicationProcess'
