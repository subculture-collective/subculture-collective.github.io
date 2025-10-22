/**
 * Footer Component
 *
 * Site-wide footer with links, social media, and collective information.
 * Features responsive multi-column layout and dark cyberpunk styling.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SocialLinks from './SocialLinks'
import {
  socialLinks,
  footerLinks,
  legalInfo,
  contactInfo,
} from '../../config/social'
import {
  entranceAnimations,
  createStaggerContainer,
} from '../../utils/animations'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-cyber-black border-t border-light-gray mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main footer content - multi-column layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
          variants={createStaggerContainer(0.1, 0.2)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* About Subcult Section */}
          <motion.div variants={entranceAnimations.fadeInUp}>
            <h3 className="font-display text-neon-cyan text-lg mb-4 uppercase tracking-wider">
              About Subcult
            </h3>
            <p className="font-sans text-gray-400 text-sm mb-4 leading-relaxed">
              A collective of creators pushing boundaries in digital art, music,
              and culture.
            </p>
            <div className="space-y-2">
              {footerLinks.about.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block font-mono text-gray-500 hover:text-neon-cyan text-sm transition-colors duration-200"
                >
                  → {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div variants={entranceAnimations.fadeInUp}>
            <h3 className="font-display text-electric-blue text-lg mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <div className="space-y-2">
              {footerLinks.quickLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block font-mono text-gray-500 hover:text-electric-blue text-sm transition-colors duration-200"
                >
                  → {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Connect Section */}
          <motion.div variants={entranceAnimations.fadeInUp}>
            <h3 className="font-display text-glitch-green text-lg mb-4 uppercase tracking-wider">
              Connect
            </h3>
            <div className="space-y-2 mb-4">
              {footerLinks.connect.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block font-mono text-gray-500 hover:text-glitch-green text-sm transition-colors duration-200"
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    link.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                >
                  → {link.label}
                </a>
              ))}
            </div>
            <p className="font-mono text-gray-500 text-xs mb-1">Email:</p>
            <a
              href={`mailto:${contactInfo.email}`}
              className="font-mono text-neon-cyan hover:text-electric-blue text-sm transition-colors duration-200"
            >
              {contactInfo.email}
            </a>
          </motion.div>

          {/* Social Media Section */}
          <motion.div variants={entranceAnimations.fadeInUp}>
            <h3 className="font-display text-glitch-magenta text-lg mb-4 uppercase tracking-wider">
              Follow Us
            </h3>
            <SocialLinks links={socialLinks} className="mb-4" />
            <p className="font-mono text-gray-600 text-xs mt-4">
              Join the collective. Push boundaries.
            </p>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-deep-gray mb-6"></div>

        {/* Bottom bar - Copyright and Legal */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          variants={entranceAnimations.fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Copyright */}
          <div className="font-mono text-gray-500 text-xs text-center md:text-left">
            <p>
              ©{' '}
              {legalInfo.copyrightYear === currentYear
                ? currentYear
                : `${legalInfo.copyrightYear}-${currentYear}`}{' '}
              {legalInfo.organizationName}
            </p>
            <p className="text-gray-600 mt-1">All rights reserved.</p>
          </div>

          {/* License Info */}
          <div className="font-mono text-xs text-center md:text-right">
            <a
              href={legalInfo.license.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-neon-cyan transition-colors duration-200"
            >
              {legalInfo.license.name}
            </a>
            <p className="text-gray-600 mt-1">
              Built with ⚡ by the collective
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'

export default Footer
