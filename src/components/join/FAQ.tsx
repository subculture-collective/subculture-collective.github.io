/**
 * FAQ Component
 *
 * Displays frequently asked questions about joining Subcult
 */

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  entranceAnimations,
  createStaggerContainer,
} from '../../utils/animations'

interface Question {
  question: string
  answer: string
}

interface FAQProps {
  title: string
  questions: Question[]
}

function FAQItem({ question, answer }: Question) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      variants={entranceAnimations.fadeInUp}
      className="cyber-card cursor-pointer hover:shadow-cyber transition-shadow"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-lg text-white flex-1">{question}</h3>
        <motion.button
          className="text-neon-cyan text-2xl font-mono flex-shrink-0 mt-[-4px]"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          aria-label={isOpen ? 'Collapse answer' : 'Expand answer'}
          aria-expanded={isOpen}
        >
          +
        </motion.button>
      </div>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="font-sans text-gray-400 mt-4 pt-4 border-t border-gray-700">
          {answer}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function FAQ({ title, questions }: FAQProps) {
  return (
    <section className="py-20 px-4 bg-deep-gray">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={createStaggerContainer(0.1)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Header */}
        <motion.div
          variants={entranceAnimations.fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl text-electric-blue mb-4">
            {title}
          </h2>
        </motion.div>

        {/* Questions */}
        <div className="space-y-4">
          {questions.map((q, index) => (
            <FAQItem key={index} question={q.question} answer={q.answer} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

FAQ.displayName = 'FAQ'
