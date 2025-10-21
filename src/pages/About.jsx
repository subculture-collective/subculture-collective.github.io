import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-subcult-black">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold font-mono mb-8 text-subcult-yellow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About subcult.tv
        </motion.h1>
        
        <motion.div 
          className="space-y-6 text-lg text-white font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p>
            <span className="text-subcult-green font-mono">subcult.tv</span> is a hacker-zine-style creative cooperative where artists, developers, and makers come together to create experimental projects.
          </p>
          
          <p>
            We believe in open collaboration, creative freedom, and pushing boundaries. Our community spans across digital art, code, music, writing, and everything in between.
          </p>
          
          <p className="text-subcult-orange font-mono text-xl">
            We're not just building projects—we're building a culture.
          </p>

          <div className="border-l-4 border-subcult-purple pl-6 my-8">
            <h2 className="text-2xl font-mono text-subcult-green mb-4">Our Values</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Open-source and open-knowledge</li>
              <li>Creative experimentation</li>
              <li>Community-driven collaboration</li>
              <li>Inclusive and supportive environment</li>
              <li>Challenging the status quo</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
