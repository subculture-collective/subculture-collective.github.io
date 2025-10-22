/**
 * ValuesGrid Component
 *
 * Displays Subcult's core values in a card grid layout
 */

import { motion } from 'framer-motion'
import {
  entranceAnimations,
  createStaggerContainer,
  microInteractions,
} from '../../utils/animations'

interface ValueCard {
  icon: string
  title: string
  description: string
}

interface ValuesGridProps {
  title: string
  subtitle: string
  cards: ValueCard[]
}

export default function ValuesGrid({
  title,
  subtitle,
  cards,
}: ValuesGridProps) {
  return (
    <section className="py-20 px-4 bg-deep-gray/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={entranceAnimations.fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="font-display text-4xl md:text-6xl text-neon-green mb-4">
            {title}
          </h2>
          <p className="font-mono text-glitch-yellow text-lg">
            &gt; {subtitle}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={createStaggerContainer(0.1)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={entranceAnimations.scaleIn}
              whileHover="hover"
              className="cyber-card group relative overflow-hidden"
            >
              <motion.div
                variants={microInteractions.card}
                className="relative z-10"
              >
                <div
                  className="text-5xl mb-4"
                  role="img"
                  aria-label={card.title}
                >
                  {card.icon}
                </div>
                <h3 className="font-display text-2xl text-white mb-3 group-hover:text-neon-cyan transition-colors">
                  {card.title}
                </h3>
                <p className="font-sans text-gray-400 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-neon-cyan/0 to-electric-blue/0 group-hover:from-neon-cyan/10 group-hover:to-electric-blue/10 transition-all duration-300 pointer-events-none"
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

ValuesGrid.displayName = 'ValuesGrid'
