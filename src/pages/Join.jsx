import { motion } from 'framer-motion';
import { useState } from 'react';

const Join = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-subcult-black">
      <div className="max-w-3xl mx-auto">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold font-mono mb-8 text-subcult-green"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Join the Collective
        </motion.h1>
        
        <motion.p 
          className="text-xl text-white font-sans mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Interested in collaborating? We're always looking for creative minds to join our community.
        </motion.p>

        <motion.form 
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div>
            <label htmlFor="name" className="block text-subcult-yellow font-mono mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-subcult-black border-2 border-subcult-purple text-white font-mono focus:border-subcult-green focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-subcult-yellow font-mono mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-subcult-black border-2 border-subcult-purple text-white font-mono focus:border-subcult-green focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="skills" className="block text-subcult-yellow font-mono mb-2">
              Skills / Interests
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-subcult-black border-2 border-subcult-purple text-white font-mono focus:border-subcult-green focus:outline-none transition-colors"
              placeholder="e.g., art, code, music, writing..."
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-subcult-yellow font-mono mb-2">
              Tell us about yourself
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 bg-subcult-black border-2 border-subcult-purple text-white font-mono focus:border-subcult-green focus:outline-none transition-colors resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-4 bg-subcult-green border-2 border-subcult-green text-subcult-black font-mono font-bold hover:bg-transparent hover:text-subcult-green transition-all duration-300"
          >
            Submit Application
          </button>
        </motion.form>

        <motion.div 
          className="mt-12 p-6 border-2 border-subcult-orange bg-subcult-purple bg-opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-mono text-subcult-orange mb-3">
            What happens next?
          </h3>
          <ul className="space-y-2 text-white font-sans">
            <li>• We'll review your application</li>
            <li>• Invite you to our community chat</li>
            <li>• Connect you with ongoing projects</li>
            <li>• Help you start contributing!</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Join;
