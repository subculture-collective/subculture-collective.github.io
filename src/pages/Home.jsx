import { motion } from 'framer-motion';
import Hero from '../components/Hero';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="relative z-10">
        <div className="h-screen flex flex-col items-center justify-center text-center px-4">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold font-mono mb-6 text-subcult-yellow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            subcult.tv
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl max-w-2xl mb-8 text-subcult-green font-mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A hacker-zine-style creative coop
          </motion.p>
          
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a 
              href="/about" 
              className="px-6 py-3 bg-subcult-purple border-2 border-subcult-yellow text-subcult-yellow font-mono hover:bg-subcult-yellow hover:text-subcult-purple transition-all duration-300"
            >
              Learn More
            </a>
            <a 
              href="/join" 
              className="px-6 py-3 bg-subcult-orange border-2 border-subcult-orange text-white font-mono hover:bg-transparent hover:text-subcult-orange transition-all duration-300"
            >
              Join Us
            </a>
          </motion.div>
        </div>

        <div className="min-h-screen bg-subcult-black py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold font-mono mb-12 text-subcult-green"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              What We Do
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Create', color: 'subcult-yellow', desc: 'Collaborative art, code, and media projects' },
                { title: 'Collaborate', color: 'subcult-green', desc: 'A collective of creators and hackers' },
                { title: 'Share', color: 'subcult-orange', desc: 'Open knowledge and experimental ideas' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className={`p-6 border-2 border-${item.color} bg-subcult-black hover:bg-subcult-purple transition-all duration-300`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className={`text-2xl font-mono font-bold mb-4 text-${item.color}`}>
                    {item.title}
                  </h3>
                  <p className="text-white font-sans">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
