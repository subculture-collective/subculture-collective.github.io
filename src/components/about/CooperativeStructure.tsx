/**
 * CooperativeStructure Component
 *
 * Explains how Subcult operates as a cooperative
 */

import { motion } from 'framer-motion'
import {
  entranceAnimations,
  createStaggerContainer,
} from '../../utils/animations'

interface StructureItem {
  heading: string
  description: string
}

interface Benefits {
  title: string
  items: string[]
}

interface CooperativeStructureProps {
  title: string
  description: string
  structure: StructureItem[]
  benefits: Benefits
}

export default function CooperativeStructure({
  title,
  description,
  structure,
  benefits,
}: CooperativeStructureProps) {
  return (
    <section className="py-20 px-4 bg-deep-gray/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={entranceAnimations.fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="font-display text-4xl md:text-6xl text-electric-blue mb-6">
            {title}
          </h2>
          <p className="font-sans text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={createStaggerContainer(0.15)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          {structure.map((item, index) => (
            <motion.div
              key={index}
              variants={entranceAnimations.fadeInUp}
              className="cyber-card group hover:border-electric-blue transition-colors"
            >
              <h3 className="font-display text-2xl text-neon-cyan mb-4 group-hover:text-electric-blue transition-colors">
                {item.heading}
              </h3>
              <p className="font-sans text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="cyber-card max-w-3xl mx-auto"
          variants={entranceAnimations.scaleIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h3 className="font-display text-3xl text-neon-green mb-6 text-center">
            {benefits.title}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.items.map((item, index) => (
              <motion.li
                key={index}
                className="font-sans text-gray-300 flex items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-neon-cyan mr-2 mt-1">▸</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

CooperativeStructure.displayName = 'CooperativeStructure'
