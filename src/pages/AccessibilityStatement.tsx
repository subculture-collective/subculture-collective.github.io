/**
 * Accessibility Statement Page
 *
 * Documents the website's accessibility features and commitment to WCAG 2.1 AA standards
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { entranceAnimations, staggerChildren } from '../utils/animations'

function AccessibilityStatement() {
  return (
    <div className="bg-cyber-black py-20">
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={staggerChildren.container}
        initial="initial"
        animate="animate"
      >
        {/* Header */}
        <motion.header variants={entranceAnimations.fadeInUp} className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-neon-cyan mb-6">
            Accessibility Statement
          </h1>
          <p className="font-sans text-xl text-gray-300">
            SUBCULT.TV is committed to ensuring digital accessibility for people
            of all abilities.
          </p>
        </motion.header>

        {/* Our Commitment */}
        <motion.section
          variants={entranceAnimations.fadeInUp}
          className="mb-12"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-electric-blue mb-4">
            Our Commitment
          </h2>
          <div className="cyber-card">
            <p className="font-sans text-gray-300 mb-4">
              We are committed to making our website accessible to all users,
              including those with disabilities. We strive to meet the Web
              Content Accessibility Guidelines (WCAG) 2.1 Level AA standards to
              ensure our content is perceivable, operable, understandable, and
              robust for everyone.
            </p>
            <p className="font-sans text-gray-300">
              Accessibility is an ongoing effort, and we continuously work to
              improve the user experience for all visitors.
            </p>
          </div>
        </motion.section>

        {/* Accessibility Features */}
        <motion.section
          variants={entranceAnimations.fadeInUp}
          className="mb-12"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-glitch-magenta mb-4">
            Accessibility Features
          </h2>
          <div className="cyber-card space-y-4">
            <div>
              <h3 className="font-display text-xl text-white mb-2">
                Keyboard Navigation
              </h3>
              <p className="font-sans text-gray-400">
                All interactive elements are accessible via keyboard. Use Tab to
                navigate forward, Shift+Tab to navigate backward, and Enter or
                Space to activate elements.
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl text-white mb-2">
                Skip Navigation
              </h3>
              <p className="font-sans text-gray-400">
                A "Skip to main content" link appears when you first press Tab,
                allowing you to bypass navigation and jump directly to the main
                content.
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl text-white mb-2">
                Screen Reader Support
              </h3>
              <ul className="font-sans text-gray-400 list-disc list-inside space-y-2">
                <li>Semantic HTML structure with proper heading hierarchy</li>
                <li>Alternative text for all meaningful images</li>
                <li>ARIA labels for complex interactive elements</li>
                <li>Form labels properly associated with inputs</li>
                <li>Error messages announced to screen readers</li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-xl text-white mb-2">
                Reduced Motion
              </h3>
              <p className="font-sans text-gray-400">
                We respect the prefers-reduced-motion setting. If you have
                enabled "Reduce motion" in your operating system settings, our
                website will minimize or remove animations to reduce the risk of
                discomfort or disorientation.
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl text-white mb-2">
                Color and Contrast
              </h3>
              <p className="font-sans text-gray-400">
                Our design maintains a minimum contrast ratio of 4.5:1 for
                normal text and 3:1 for large text, meeting WCAG 2.1 Level AA
                standards. Information is not conveyed by color alone.
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl text-white mb-2">
                Form Accessibility
              </h3>
              <ul className="font-sans text-gray-400 list-disc list-inside space-y-2">
                <li>All form fields have associated labels</li>
                <li>Required fields are clearly marked</li>
                <li>Error messages are specific and helpful</li>
                <li>Form validation provides clear feedback</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Testing */}
        <motion.section
          variants={entranceAnimations.fadeInUp}
          className="mb-12"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-neon-green mb-4">
            Accessibility Testing
          </h2>
          <div className="cyber-card">
            <p className="font-sans text-gray-300 mb-4">
              We regularly test our website using:
            </p>
            <ul className="font-sans text-gray-300 list-disc list-inside space-y-2">
              <li>
                Automated accessibility testing tools (axe, WAVE, Lighthouse)
              </li>
              <li>Manual keyboard-only navigation testing</li>
              <li>Screen reader testing (NVDA, VoiceOver)</li>
              <li>Color contrast analyzers</li>
              <li>Real user feedback from people with disabilities</li>
            </ul>
          </div>
        </motion.section>

        {/* Known Issues */}
        <motion.section
          variants={entranceAnimations.fadeInUp}
          className="mb-12"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-glitch-yellow mb-4">
            Known Issues & Limitations
          </h2>
          <div className="cyber-card">
            <p className="font-sans text-gray-300 mb-4">
              While we strive for full accessibility, we are aware of the
              following limitations:
            </p>
            <ul className="font-sans text-gray-300 list-disc list-inside space-y-2">
              <li>
                Some complex animations may cause visual distraction, though
                they respect reduced-motion preferences
              </li>
              <li>
                Third-party embedded content may not meet the same accessibility
                standards
              </li>
            </ul>
            <p className="font-sans text-gray-300 mt-4">
              We are actively working to address these issues in future updates.
            </p>
          </div>
        </motion.section>

        {/* Technical Specifications */}
        <motion.section
          variants={entranceAnimations.fadeInUp}
          className="mb-12"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-electric-blue mb-4">
            Technical Specifications
          </h2>
          <div className="cyber-card">
            <p className="font-sans text-gray-300 mb-4">
              Our website's accessibility relies on the following technologies:
            </p>
            <ul className="font-sans text-gray-300 list-disc list-inside space-y-2">
              <li>HTML5 for semantic structure</li>
              <li>CSS3 for responsive design and styling</li>
              <li>JavaScript (React) for interactive features</li>
              <li>ARIA (Accessible Rich Internet Applications) attributes</li>
            </ul>
            <p className="font-sans text-gray-300 mt-4">
              These technologies are relied upon for conformance with the
              accessibility standards used.
            </p>
          </div>
        </motion.section>

        {/* Feedback */}
        <motion.section
          variants={entranceAnimations.fadeInUp}
          className="mb-12"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-neon-cyan mb-4">
            Feedback
          </h2>
          <div className="cyber-card">
            <p className="font-sans text-gray-300 mb-4">
              We welcome your feedback on the accessibility of SUBCULT.TV. If
              you encounter accessibility barriers or have suggestions for
              improvement, please let us know:
            </p>
            <ul className="font-sans text-gray-300 space-y-2">
              <li>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:contact@subcult.tv"
                  className="text-neon-cyan hover:text-electric-blue transition-colors"
                >
                  contact@subcult.tv
                </a>
              </li>
              <li>
                <strong>Contact Form:</strong>{' '}
                <Link
                  to="/join"
                  className="text-neon-cyan hover:text-electric-blue transition-colors"
                >
                  Visit our contact page
                </Link>
              </li>
            </ul>
            <p className="font-sans text-gray-300 mt-4">
              We aim to respond to accessibility feedback within 5 business days
              and to implement necessary improvements as quickly as possible.
            </p>
          </div>
        </motion.section>

        {/* Standards & Conformance */}
        <motion.section
          variants={entranceAnimations.fadeInUp}
          className="mb-12"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-glitch-magenta mb-4">
            Standards & Conformance
          </h2>
          <div className="cyber-card">
            <p className="font-sans text-gray-300 mb-4">
              This website aims to conform to the{' '}
              <a
                href="https://www.w3.org/WAI/WCAG21/quickref/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-cyan hover:text-electric-blue transition-colors underline"
              >
                Web Content Accessibility Guidelines (WCAG) 2.1
              </a>{' '}
              at Level AA. These guidelines explain how to make web content more
              accessible for people with disabilities.
            </p>
            <p className="font-sans text-gray-300">
              Conformance status:{' '}
              <strong className="text-neon-green">Partial conformance</strong> -
              We are actively working toward full Level AA conformance.
            </p>
          </div>
        </motion.section>

        {/* Last Updated */}
        <motion.footer
          variants={entranceAnimations.fadeInUp}
          className="text-center"
        >
          <p className="font-mono text-sm text-gray-500">
            This statement was last updated on{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </motion.footer>
      </motion.div>
    </div>
  )
}

AccessibilityStatement.displayName = 'AccessibilityStatement'

export default AccessibilityStatement
