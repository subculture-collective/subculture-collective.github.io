import { useState } from 'react'
import { Link } from 'react-router-dom'
import GlitchText from '../components/motion/GlitchText'
import { motion } from 'framer-motion'
import { microInteractions, entranceAnimations } from '../utils/animations'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="font-display text-neon-cyan text-shadow-neon mb-4 animate-glitch-slow">
            SUBCULT.TV
          </h1>
          <p className="font-sans text-gray-300 text-lg mb-2">
            TailwindCSS v3 Theme Successfully Installed
          </p>
          <p className="font-mono text-glitch-green text-sm">
            ./configure --theme=cyberpunk --status=ready
          </p>
        </div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Color Palette Card */}
          <div className="cyber-card">
            <h3 className="font-display text-electric-blue mb-4">Color Palette</h3>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-neon-cyan rounded"></div>
                <span>neon-cyan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-electric-blue rounded"></div>
                <span>electric-blue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-glitch-magenta rounded"></div>
                <span>glitch-magenta</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-glitch-green rounded"></div>
                <span>glitch-green</span>
              </div>
            </div>
          </div>

          {/* Interactive Card */}
          <div className="cyber-card">
            <h3 className="font-display text-neon-green mb-4">Interactive Demo</h3>
            <div className="space-y-4">
              <button 
                onClick={() => setCount((count) => count + 1)}
                className="btn-neon w-full"
              >
                Count: {count}
              </button>
              <p className="font-sans text-gray-400 text-sm">
                Click the button to test interactivity
              </p>
            </div>
          </div>
        </div>

        {/* Glitch Text Demo */}
        <div className="text-center mb-8">
          <h2 className="text-glitch font-display text-4xl mb-2">
            Hover for Glitch Effect
          </h2>
          <p className="font-mono text-glitch-yellow text-xs">
            &gt; animation: glitch 1s infinite
          </p>
        </div>

        {/* Typography Demo */}
        <div className="cyber-card mb-8">
          <h4 className="font-display text-glitch-magenta mb-4">Typography System</h4>
          <div className="space-y-3">
            <p className="font-display text-white">
              Display Font: Space Grotesk, Rajdhani, Orbitron
            </p>
            <p className="font-sans text-gray-300">
              Sans Font: Inter, system-ui, -apple-system
            </p>
            <p className="font-mono text-glitch-green text-sm">
              Mono Font: JetBrains Mono, Fira Code, Roboto Mono
            </p>
            <code className="block mt-2">
              console.log('Styled code block with custom theme');
            </code>
          </div>
        </div>

        {/* Framer Motion Demo Section */}
        <div className="cyber-card mb-8">
          <h3 className="font-display text-electric-blue mb-6 text-2xl">
            ✨ Framer Motion Animations
          </h3>
          
          <div className="space-y-6">
            {/* Glitch Text Demo */}
            <div>
              <h4 className="font-mono text-neon-cyan text-sm mb-3">GlitchText Component:</h4>
              <GlitchText type="rgbSplit" className="font-display text-3xl text-white mb-2">
                RGB SPLIT EFFECT
              </GlitchText>
              <GlitchText type="textGlitch" className="font-display text-2xl text-glitch-magenta mb-2">
                POSITION GLITCH
              </GlitchText>
              <GlitchText type="both" className="font-display text-2xl text-neon-cyan">
                COMBINED EFFECTS
              </GlitchText>
            </div>

            {/* Interactive Buttons with Motion */}
            <div>
              <h4 className="font-mono text-neon-cyan text-sm mb-3">Hover Interactions:</h4>
              <div className="flex gap-3 flex-wrap">
                <motion.button
                  className="btn-neon"
                  variants={microInteractions.button}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  Hover Me
                </motion.button>
                <GlitchText 
                  type="both" 
                  triggerOnHover 
                  className="btn-neon cursor-pointer inline-block"
                  as="button"
                >
                  Glitch on Hover
                </GlitchText>
              </div>
            </div>

            {/* Entrance Animations */}
            <div>
              <h4 className="font-mono text-neon-cyan text-sm mb-3">Entrance Animations:</h4>
              <div className="space-y-2">
                <motion.div
                  className="cyber-card"
                  variants={entranceAnimations.fadeInUp}
                  initial="initial"
                  animate="animate"
                >
                  <p className="font-mono text-sm">Fade In Up ↑</p>
                </motion.div>
                <motion.div
                  className="cyber-card"
                  variants={entranceAnimations.scaleIn}
                  initial="initial"
                  animate="animate"
                >
                  <p className="font-mono text-sm">Scale In ⚡</p>
                </motion.div>
              </div>
            </div>

            <p className="font-mono text-gray-500 text-xs mt-4">
              💫 Page transitions enabled • Respects reduced motion preferences
            </p>
            
            {/* Test Page Transitions */}
            <div className="mt-4 flex gap-3">
              <Link to="/about" className="btn-neon text-sm">
                Test Page Transition →
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="font-mono text-gray-500 text-sm">
            See <code className="text-neon-cyan">TAILWIND_THEME.md</code> for complete documentation
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
