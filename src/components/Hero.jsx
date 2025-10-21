import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Default images if none provided
  const heroImages = images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920',
    'https://images.unsplash.com/photo-1563089145-599997674d42?w=1920',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 w-full h-full"
          initial={{ 
            opacity: 0,
            x: Math.random() > 0.5 ? 20 : -20,
            filter: 'blur(10px)',
          }}
          animate={{ 
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
          }}
          exit={{ 
            opacity: 0,
            x: Math.random() > 0.5 ? -20 : 20,
            filter: 'blur(10px)',
          }}
          transition={{ 
            duration: 0.5,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
        >
          <div className="relative w-full h-full">
            <img 
              src={heroImages[currentIndex]} 
              alt={`Hero ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Glitch overlay effect */}
            <motion.div
              className="absolute inset-0 bg-subcult-purple mix-blend-multiply"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.3, 0, 0.5, 0],
              }}
              transition={{
                duration: 0.3,
                times: [0, 0.25, 0.5, 0.75, 1],
                delay: 0.2,
              }}
            />
            <motion.div
              className="absolute inset-0 bg-subcult-green mix-blend-screen"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.1, 0, 0.2, 0],
              }}
              transition={{
                duration: 0.3,
                times: [0, 0.25, 0.5, 0.75, 1],
                delay: 0.15,
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
    </div>
  );
};

export default Hero;
