import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const FloatingNavbar = ({ sections }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActive(sectionId);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-smooth"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
          backgroundColor: scrolled ? 'rgba(10, 14, 39, 0.8)' : 'rgba(10, 14, 39, 0)',
          borderBottom: scrolled ? '1px solid rgba(0, 198, 255, 0.1)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`transition-smooth relative text-sm font-medium ${
                  active === section.id ? 'text-cyan' : 'text-gray-400 hover:text-cyan'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {section.label}
                {active === section.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan to-cyan-light"
                    layoutId="navbar-underline"
                    transition={{ type: 'spring', bounce: 0.2 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cyan"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className="md:hidden glassmorphic border-t border-cyan/10"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-4 space-y-3">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left py-2 px-3 rounded transition-smooth ${
                  active === section.id
                    ? 'bg-cyan/10 text-cyan'
                    : 'text-gray-400 hover:text-cyan'
                }`}
                whileHover={{ x: 5 }}
              >
                {section.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
};

export default FloatingNavbar;
