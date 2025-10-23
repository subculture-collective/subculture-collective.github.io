/**
 * ContactForm Component
 *
 * Renders the application/contact form with validation and submission handling
 */

import { motion } from 'framer-motion'
import { useContactForm } from '../../hooks/useContactForm'
import {
  entranceAnimations,
  createStaggerContainer,
} from '../../utils/animations'

interface FormField {
  label: string
  placeholder: string
  required: boolean
  type: string
  rows?: number
}

interface ContactFormProps {
  title: string
  subtitle: string
  fields: {
    name: FormField
    email: FormField
    location: FormField
    practice: FormField
    portfolio: FormField
    message: FormField
  }
  submitButton: string
  successMessage: string
  errorMessage: string
}

export default function ContactForm({
  title,
  subtitle,
  fields,
  submitButton,
  successMessage,
  errorMessage,
}: ContactFormProps) {
  const {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    isError,
    handleChange,
    handleSubmit,
  } = useContactForm()

  return (
    <section className="py-20 px-4 bg-cyber-black">
      <motion.div
        className="max-w-3xl mx-auto"
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
          <h2 className="font-display text-4xl md:text-5xl text-neon-cyan mb-4">
            {title}
          </h2>
          <p className="font-sans text-xl text-gray-300">{subtitle}</p>
        </motion.div>

        {/* Success Message */}
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="cyber-card bg-neon-green/10 border-2 border-neon-green mb-8"
          >
            <p className="font-sans text-neon-green text-center">
              ✓ {successMessage}
            </p>
          </motion.div>
        )}

        {/* Error Message */}
        {isError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="cyber-card bg-glitch-red/10 border-2 border-glitch-red mb-8"
          >
            <p className="font-sans text-glitch-red text-center">
              ✗ {errorMessage}
            </p>
          </motion.div>
        )}

        {/* Form */}
        <motion.form
          variants={entranceAnimations.fadeInUp}
          onSubmit={handleSubmit}
          className="cyber-card"
        >
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block font-display text-white mb-2"
              >
                {fields.name.label}
                {fields.name.required && (
                  <span className="text-glitch-red ml-1">*</span>
                )}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={fields.name.placeholder}
                autoComplete="name"
                className={`w-full bg-deep-gray border ${
                  errors.name ? 'border-glitch-red' : 'border-gray-700'
                } text-white px-4 py-3 rounded focus:outline-none focus:border-neon-cyan transition-colors font-sans`}
                aria-required={fields.name.required}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p
                  id="name-error"
                  className="text-glitch-red text-sm mt-1 font-sans"
                  role="alert"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block font-display text-white mb-2"
              >
                {fields.email.label}
                {fields.email.required && (
                  <span className="text-glitch-red ml-1">*</span>
                )}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={fields.email.placeholder}
                autoComplete="email"
                className={`w-full bg-deep-gray border ${
                  errors.email ? 'border-glitch-red' : 'border-gray-700'
                } text-white px-4 py-3 rounded focus:outline-none focus:border-neon-cyan transition-colors font-sans`}
                aria-required={fields.email.required}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="text-glitch-red text-sm mt-1 font-sans"
                  role="alert"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Location Field */}
            <div>
              <label
                htmlFor="location"
                className="block font-display text-white mb-2"
              >
                {fields.location.label}
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder={fields.location.placeholder}
                className="w-full bg-deep-gray border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-neon-cyan transition-colors font-sans"
              />
            </div>

            {/* Practice Field */}
            <div>
              <label
                htmlFor="practice"
                className="block font-display text-white mb-2"
              >
                {fields.practice.label}
                {fields.practice.required && (
                  <span className="text-glitch-red ml-1">*</span>
                )}
              </label>
              <input
                type="text"
                id="practice"
                name="practice"
                value={formData.practice}
                onChange={handleChange}
                placeholder={fields.practice.placeholder}
                className={`w-full bg-deep-gray border ${
                  errors.practice ? 'border-glitch-red' : 'border-gray-700'
                } text-white px-4 py-3 rounded focus:outline-none focus:border-neon-cyan transition-colors font-sans`}
                aria-required={fields.practice.required}
                aria-invalid={!!errors.practice}
                aria-describedby={
                  errors.practice ? 'practice-error' : undefined
                }
              />
              {errors.practice && (
                <p
                  id="practice-error"
                  className="text-glitch-red text-sm mt-1 font-sans"
                  role="alert"
                >
                  {errors.practice}
                </p>
              )}
            </div>

            {/* Portfolio Field */}
            <div>
              <label
                htmlFor="portfolio"
                className="block font-display text-white mb-2"
              >
                {fields.portfolio.label}
              </label>
              <input
                type="url"
                id="portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder={fields.portfolio.placeholder}
                autoComplete="url"
                className={`w-full bg-deep-gray border ${
                  errors.portfolio ? 'border-glitch-red' : 'border-gray-700'
                } text-white px-4 py-3 rounded focus:outline-none focus:border-neon-cyan transition-colors font-sans`}
                aria-invalid={!!errors.portfolio}
                aria-describedby={
                  errors.portfolio ? 'portfolio-error' : undefined
                }
              />
              {errors.portfolio && (
                <p
                  id="portfolio-error"
                  className="text-glitch-red text-sm mt-1 font-sans"
                  role="alert"
                >
                  {errors.portfolio}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block font-display text-white mb-2"
              >
                {fields.message.label}
                {fields.message.required && (
                  <span className="text-glitch-red ml-1">*</span>
                )}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={fields.message.placeholder}
                rows={fields.message.rows || 6}
                className={`w-full bg-deep-gray border ${
                  errors.message ? 'border-glitch-red' : 'border-gray-700'
                } text-white px-4 py-3 rounded focus:outline-none focus:border-neon-cyan transition-colors font-sans resize-y`}
                aria-required={fields.message.required}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p
                  id="message-error"
                  className="text-glitch-red text-sm mt-1 font-sans"
                  role="alert"
                >
                  {errors.message}
                </p>
              )}
              <p className="text-gray-500 text-xs mt-1 font-sans">
                Minimum 50 characters
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-neon w-full disabled:opacity-50 disabled:cursor-not-allowed"
              aria-busy={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : submitButton}
            </button>
          </div>
        </motion.form>
      </motion.div>
    </section>
  )
}

ContactForm.displayName = 'ContactForm'
