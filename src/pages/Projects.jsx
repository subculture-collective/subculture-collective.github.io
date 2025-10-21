import { motion } from 'framer-motion';

const projects = [
  { 
    title: 'Glitch Gallery', 
    description: 'An experimental digital art exhibition',
    color: 'subcult-yellow',
    status: 'Active'
  },
  { 
    title: 'Code Poetry', 
    description: 'Where programming meets creative writing',
    color: 'subcult-green',
    status: 'Active'
  },
  { 
    title: 'Sonic Experiments', 
    description: 'Collaborative sound art and music',
    color: 'subcult-orange',
    status: 'In Progress'
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-subcult-black">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold font-mono mb-12 text-subcult-orange"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Projects
        </motion.h1>
        
        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className={`p-8 border-2 border-${project.color} bg-subcult-black hover:bg-subcult-purple transition-all duration-300`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className={`text-3xl font-mono font-bold text-${project.color}`}>
                  {project.title}
                </h3>
                <span className="text-subcult-green font-mono text-sm mt-2 md:mt-0">
                  [{project.status}]
                </span>
              </div>
              <p className="text-white font-sans text-lg">
                {project.description}
              </p>
            </motion.div>
          ))}
          
          <motion.div
            className="p-8 border-2 border-dashed border-subcult-green bg-subcult-black hover:bg-subcult-purple transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: projects.length * 0.1 }}
          >
            <h3 className="text-3xl font-mono font-bold text-subcult-green mb-4">
              Propose a Project
            </h3>
            <p className="text-white font-sans text-lg">
              Have an idea? We're always looking for new collaborative projects. Join our community and share your vision.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
