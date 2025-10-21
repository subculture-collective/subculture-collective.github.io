import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/creators', label: 'Creators' },
    { path: '/projects', label: 'Projects' },
    { path: '/journal', label: 'Journal' },
    { path: '/join', label: 'Join' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-subcult-black bg-opacity-90 backdrop-blur-sm border-b border-subcult-purple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className="font-mono text-2xl font-bold text-subcult-yellow glitch-text">
              subcult.tv
            </span>
          </Link>
          
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-4 py-2 font-mono text-sm"
              >
                <span className={`${
                  location.pathname === item.path 
                    ? 'text-subcult-green' 
                    : 'text-white hover:text-subcult-yellow'
                } transition-colors duration-200`}>
                  {item.label}
                </span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-subcult-green"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-subcult-yellow">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
