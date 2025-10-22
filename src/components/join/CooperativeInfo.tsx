/**
 * CooperativeInfo Component
 *
 * Displays information about how the cooperative works
 */

import { motion } from 'framer-motion'
import {
  entranceAnimations,
  createStaggerContainer,
} from '../../utils/animations'

interface StructureItem {
  icon: string
  title: string
  points: string[]
}

interface CooperativeInfoProps {
  title: string
  description: string
  structure: StructureItem[]
}

export default function CooperativeInfo({
  title,
  description,
  structure,
}: CooperativeInfoProps) {
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
          <h2 className="font-display text-4xl md:text-5xl text-neon-green mb-4">
            {title}
          </h2>
          <p className="font-sans text-xl text-gray-300 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Structure Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {structure.map((item, index) => (
            <motion.div
              key={index}
              variants={entranceAnimations.fadeInUp}
              className="cyber-card bg-deep-gray hover:shadow-neon transition-shadow"
            >
              <div className="text-4xl mb-4" aria-hidden="true">
                {item.icon}
              </div>
              <h3 className="font-display text-xl text-white mb-4">
                {item.title}
              </h3>
              <ul className="space-y-2">
                {item.points.map((point, pointIndex) => (
                  <li
                    key={pointIndex}
                    className="font-sans text-gray-400 text-sm flex items-start gap-2"
                  >
                    <span className="text-neon-green mt-1" aria-hidden="true">
                      →
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

CooperativeInfo.displayName = 'CooperativeInfo'
