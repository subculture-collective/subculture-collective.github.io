/**
 * Join Us Page
 *
 * Main page for joining the Subcult cooperative with application form
 */

import { motion } from 'framer-motion'
import GlitchText from '../components/motion/GlitchText'
import WhyJoin from '../components/join/WhyJoin'
import CooperativeInfo from '../components/join/CooperativeInfo'
import ApplicationProcess from '../components/join/ApplicationProcess'
import FAQ from '../components/join/FAQ'
import ContactForm from '../components/join/ContactForm'
import { entranceAnimations } from '../utils/animations'
import joinContent from '../content/join.json'

function Join() {
  return (
    <div className="min-h-screen bg-cyber-black">
      {/* Hero Section */}
      <motion.section
        className="py-20 px-4 bg-cyber-black"
        variants={entranceAnimations.fadeInUp}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-4xl mx-auto text-center">
          <GlitchText
            as="h1"
            type="rgbSplit"
            className="font-display text-5xl md:text-7xl text-neon-cyan text-shadow-neon mb-6"
          >
            {joinContent.hero.title}
          </GlitchText>
          <p className="font-display text-2xl text-glitch-magenta mb-4">
            {joinContent.hero.tagline}
          </p>
          <p className="font-sans text-xl text-gray-300 max-w-3xl mx-auto">
            {joinContent.hero.description}
          </p>
        </div>
      </motion.section>

      {/* Why Join Section */}
      <WhyJoin
        title={joinContent.whyJoin.title}
        subtitle={joinContent.whyJoin.subtitle}
        benefits={joinContent.whyJoin.benefits}
        lookingFor={joinContent.whyJoin.lookingFor}
      />

      {/* Cooperative Info Section */}
      <CooperativeInfo
        title={joinContent.cooperative.title}
        description={joinContent.cooperative.description}
        structure={joinContent.cooperative.structure}
      />

      {/* Application Process Section */}
      <ApplicationProcess
        title={joinContent.applicationProcess.title}
        subtitle={joinContent.applicationProcess.subtitle}
        steps={joinContent.applicationProcess.steps}
        timeline={joinContent.applicationProcess.timeline}
        requirements={joinContent.applicationProcess.requirements}
      />

      {/* FAQ Section */}
      <FAQ
        title={joinContent.faq.title}
        questions={joinContent.faq.questions}
      />

      {/* Contact Form Section */}
      <ContactForm
        title={joinContent.contactForm.title}
        subtitle={joinContent.contactForm.subtitle}
        fields={joinContent.contactForm.fields}
        submitButton={joinContent.contactForm.submitButton}
        successMessage={joinContent.contactForm.successMessage}
        errorMessage={joinContent.contactForm.errorMessage}
      />
    </div>
  )
}

Join.displayName = 'Join'

export default Join
