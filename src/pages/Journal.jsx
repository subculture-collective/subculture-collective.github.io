import { motion } from 'framer-motion';

const journalEntries = [
  {
    date: '2025-10-15',
    title: 'Building the Collective',
    excerpt: 'Today we launched subcult.tv, a space for creative hackers and artists to collaborate...',
    author: 'The Collective',
  },
  {
    date: '2025-10-10',
    title: 'The Art of Code',
    excerpt: 'Exploring the intersection of programming and creative expression...',
    author: 'Alice Chen',
  },
  {
    date: '2025-10-05',
    title: 'Glitch Aesthetics',
    excerpt: 'Why we embrace the beauty of digital imperfection and experimental visuals...',
    author: 'Bob Martinez',
  },
];

const Journal = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-subcult-black">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold font-mono mb-12 text-subcult-yellow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Journal
        </motion.h1>
        
        <div className="space-y-8">
          {journalEntries.map((entry, index) => (
            <motion.article
              key={entry.title}
              className="border-l-4 border-subcult-green pl-6 py-4 hover:border-subcult-yellow transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-2 text-subcult-green font-mono text-sm">
                <time>{entry.date}</time>
                <span>•</span>
                <span>{entry.author}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-mono font-bold text-subcult-yellow mb-3">
                {entry.title}
              </h2>
              <p className="text-white font-sans text-lg">
                {entry.excerpt}
              </p>
              <a 
                href="#" 
                className="inline-block mt-4 text-subcult-orange font-mono hover:text-subcult-yellow transition-colors"
              >
                Read more →
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Journal;
