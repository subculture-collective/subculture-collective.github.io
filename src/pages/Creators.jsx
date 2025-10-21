import { motion } from 'framer-motion';

const creators = [
  { name: 'Alice Chen', role: 'Digital Artist', color: 'subcult-yellow' },
  { name: 'Bob Martinez', role: 'Developer', color: 'subcult-green' },
  { name: 'Charlie Kim', role: 'Writer', color: 'subcult-orange' },
  { name: 'Dana Patel', role: 'Musician', color: 'subcult-purple' },
];

const Creators = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-subcult-black">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold font-mono mb-12 text-subcult-green"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Creators
        </motion.h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator, index) => (
            <motion.div
              key={creator.name}
              className={`p-6 border-2 border-${creator.color} bg-subcult-black hover:bg-subcult-purple transition-all duration-300`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="aspect-square bg-gradient-to-br from-subcult-purple to-subcult-black mb-4"></div>
              <h3 className={`text-xl font-mono font-bold mb-2 text-${creator.color}`}>
                {creator.name}
              </h3>
              <p className="text-white font-sans">{creator.role}</p>
            </motion.div>
          ))}
          
          <motion.div
            className="p-6 border-2 border-dashed border-subcult-yellow bg-subcult-black hover:bg-subcult-purple transition-all duration-300 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: creators.length * 0.1 }}
          >
            <div className="text-center">
              <p className="text-subcult-yellow font-mono text-xl mb-2">Join Us</p>
              <p className="text-white font-sans">Become a creator</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Creators;
