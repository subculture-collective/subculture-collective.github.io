/**
 * OriginStory Component
 *
 * Displays Subcult's founding story and timeline
 */

import { motion } from 'framer-motion'
import {
  entranceAnimations,
  createStaggerContainer,
} from '../../utils/animations'

interface TimelineEvent {
  year: string
  event: string
  description: string
}

interface OriginStoryProps {
  title: string
  narrative: string
  timeline: TimelineEvent[]
}

export default function OriginStory({
  title,
  narrative,
  timeline,
}: OriginStoryProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={entranceAnimations.fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="font-display text-4xl md:text-6xl text-glitch-magenta mb-6">
            {title}
          </h2>
          <p className="font-sans text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            {narrative}
          </p>
        </motion.div>

        <motion.div
          className="relative"
          variants={createStaggerContainer(0.2)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Timeline line */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-neon-cyan via-electric-blue to-glitch-magenta opacity-30"
            aria-hidden="true"
          />

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              variants={entranceAnimations.fadeInUp}
              className={`relative mb-12 flex items-center ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-neon-cyan rounded-full border-2 border-cyber-black shadow-neon" />

              {/* Content card */}
              <div
                className={`w-full md:w-5/12 ${
                  index % 2 === 0 ? 'md:pr-8 text-right' : 'md:pl-8 text-left'
                }`}
              >
                <div className="cyber-card group hover:border-neon-cyan transition-colors">
                  <div className="font-mono text-glitch-green text-sm mb-2">
                    {item.year}
                  </div>
                  <h3 className="font-display text-2xl text-white mb-3 group-hover:text-neon-cyan transition-colors">
                    {item.event}
                  </h3>
                  <p className="font-sans text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Spacer for other side on mobile */}
              <div className="hidden md:block w-5/12" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

OriginStory.displayName = 'OriginStory'
