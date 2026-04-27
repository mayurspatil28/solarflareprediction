import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroSection = ({ onExploreClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div id="hero" className="section relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <motion.div
        className="max-w-4xl mx-auto px-4 text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="text-gradient-cyan">Solar Flare</span>
          <br />
          <span className="text-white">Prediction using LSTM</span>
        </motion.h1>

        {/* Subtitle Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Harnessing the power of Long Short-Term Memory neural networks to forecast solar flares and protect critical infrastructure
        </motion.p>

        {/* CTA Button */}
        <motion.button
          variants={itemVariants}
          onClick={onExploreClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 md:px-12 py-4 rounded-lg font-semibold text-black bg-gradient-to-r from-cyan to-cyan-light glow-cyan-strong cursor-pointer transition-smooth"
        >
          Explore Model
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="text-cyan" size={32} />
        </motion.div>
      </motion.div>

      {/* Animated accent shapes */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 rounded-lg border border-cyan/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-32 left-10 w-40 h-40 rounded-lg border border-purple-500/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export default HeroSection;
