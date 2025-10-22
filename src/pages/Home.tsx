import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroSection from '../components/hero/HeroSection'
import GlitchText from '../components/motion/GlitchText'
import { entranceAnimations, staggerChildren } from '../utils/animations'

// Hero images - using gradient fallbacks for now
// Replace these with actual image paths when images are available
const heroImages: string[] = [
  // Add hero image paths here when available
  // Example: '/assets/hero/hero-1.jpg'
]

function Home() {
  return (
    <div className="bg-cyber-black">
      {/* Hero Section */}
      <HeroSection
        images={heroImages}
        interval={6000}
        ctaLink="#about"
        tagline="The underground doesn't die — it mutates."
        subtext="Subcult is a cooperative for creators and radicals."
      />

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-deep-gray">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={staggerChildren.container}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            variants={entranceAnimations.fadeInUp}
            className="text-center mb-16"
          >
            <GlitchText
              as="h2"
              type="rgbSplit"
              className="font-display text-4xl md:text-5xl font-bold text-neon-cyan mb-4"
              triggerOnHover
            >
              WHAT IS SUBCULT?
            </GlitchText>
            <p className="font-sans text-xl text-gray-300 max-w-3xl mx-auto">
              A collective of creators, radicals, and cultural agitators
              building the next wave of underground digital culture.
            </p>
          </motion.div>

          <motion.div
            variants={entranceAnimations.fadeInUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="cyber-card">
              <div className="text-neon-cyan text-3xl mb-4">🎨</div>
              <h3 className="font-display text-xl text-white mb-2">Create</h3>
              <p className="font-sans text-gray-400">
                Push boundaries. Make art that matters. No corporate
                gatekeepers.
              </p>
            </div>

            <div className="cyber-card">
              <div className="text-glitch-magenta text-3xl mb-4">🔥</div>
              <h3 className="font-display text-xl text-white mb-2">
                Collaborate
              </h3>
              <p className="font-sans text-gray-400">
                Join forces with other creators. Cooperatives over corporations.
              </p>
            </div>

            <div className="cyber-card">
              <div className="text-neon-green text-3xl mb-4">⚡</div>
              <h3 className="font-display text-xl text-white mb-2">Disrupt</h3>
              <p className="font-sans text-gray-400">
                Challenge the status quo. Build alternative systems and spaces.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cyber-black">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={staggerChildren.container}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            variants={entranceAnimations.fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-electric-blue mb-4">
              FEATURED PROJECTS
            </h2>
            <p className="font-sans text-xl text-gray-300 max-w-3xl mx-auto">
              Experimental works from our collective members
            </p>
          </motion.div>

          <motion.div
            variants={entranceAnimations.fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          >
            <div className="cyber-card group cursor-pointer hover:shadow-neon transition-shadow">
              <div className="h-48 bg-gradient-to-br from-neon-cyan/20 to-electric-blue/20 mb-4 rounded"></div>
              <h3 className="font-display text-xl text-neon-cyan mb-2">
                Project Alpha
              </h3>
              <p className="font-sans text-gray-400 mb-4">
                Experimental digital art pushing the boundaries of web
                aesthetics
              </p>
              <span className="font-mono text-sm text-glitch-green">
                → View Project
              </span>
            </div>

            <div className="cyber-card group cursor-pointer hover:shadow-neon transition-shadow">
              <div className="h-48 bg-gradient-to-br from-glitch-magenta/20 to-glitch-red/20 mb-4 rounded"></div>
              <h3 className="font-display text-xl text-glitch-magenta mb-2">
                Project Beta
              </h3>
              <p className="font-sans text-gray-400 mb-4">
                Interactive installations merging physical and digital spaces
              </p>
              <span className="font-mono text-sm text-glitch-green">
                → View Project
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={entranceAnimations.scaleIn}
            className="text-center"
          >
            <Link to="/projects" className="btn-neon">
              View All Projects
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Journal Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-deep-gray">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={staggerChildren.container}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            variants={entranceAnimations.fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-glitch-magenta mb-4">
              LATEST FROM THE JOURNAL
            </h2>
            <p className="font-sans text-xl text-gray-300 max-w-3xl mx-auto">
              Thoughts, manifestos, and dispatches from the underground
            </p>
          </motion.div>

          <motion.div
            variants={entranceAnimations.fadeInUp}
            className="space-y-6 mb-12"
          >
            <div className="cyber-card hover:shadow-cyber transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="text-neon-cyan font-mono text-sm">01</div>
                <div className="flex-1">
                  <h3 className="font-display text-xl text-white mb-2">
                    Against the Algorithm: Building Digital Autonomy
                  </h3>
                  <p className="font-sans text-gray-400 mb-2">
                    How independent creators are reclaiming the internet...
                  </p>
                  <span className="font-mono text-xs text-gray-500">
                    Posted 3 days ago
                  </span>
                </div>
              </div>
            </div>

            <div className="cyber-card hover:shadow-cyber transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="text-electric-blue font-mono text-sm">02</div>
                <div className="flex-1">
                  <h3 className="font-display text-xl text-white mb-2">
                    Cooperative Culture: A New Model for Creative Work
                  </h3>
                  <p className="font-sans text-gray-400 mb-2">
                    Why artist cooperatives are the future of creative
                    production...
                  </p>
                  <span className="font-mono text-xs text-gray-500">
                    Posted 1 week ago
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={entranceAnimations.scaleIn}
            className="text-center"
          >
            <Link to="/journal" className="btn-neon">
              Read More
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cyber-black">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={staggerChildren.container}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={entranceAnimations.fadeInUp}>
            <GlitchText
              as="h2"
              type="both"
              className="font-display text-4xl md:text-6xl font-bold text-white mb-6"
              triggerOnHover
            >
              READY TO JOIN?
            </GlitchText>
          </motion.div>

          <motion.p
            variants={entranceAnimations.fadeInUp}
            className="font-sans text-xl text-gray-300 mb-8"
          >
            Subcult is open to creators, developers, artists, and cultural
            workers who want to build something different.
          </motion.p>

          <motion.div variants={entranceAnimations.scaleIn}>
            <Link to="/join" className="btn-neon text-xl px-12 py-4">
              Apply to Join
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

Home.displayName = 'Home'

export default Home
