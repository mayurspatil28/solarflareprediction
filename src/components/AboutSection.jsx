import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Satellite, Radio, Shield } from 'lucide-react';

const AboutSection = () => {
  const cards = [
    {
      icon: Sun,
      title: 'Solar Flares',
      description: 'Sudden intense bursts of radiation from the Sun\'s surface, primarily in the form of X-rays and UV radiation.',
      color: 'from-yellow-500/20 to-orange-500/10',
    },
    {
      icon: Satellite,
      title: 'Satellite Impact',
      description: 'Solar flares can damage satellites, degrade GPS signals, and disrupt communications systems in orbit.',
      color: 'from-blue-500/20 to-cyan/10',
    },
    {
      icon: Radio,
      title: 'Communication Risk',
      description: 'Radio blackouts and HF signal degradation can affect airlines, emergency services, and broadcast systems.',
      color: 'from-purple-500/20 to-pink-500/10',
    },
    {
      icon: Shield,
      title: 'Protection',
      description: 'Accurate predictions enable timely protective measures to safeguard critical infrastructure and operations.',
      color: 'from-green-500/20 to-cyan/10',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
    hover: {
      y: -5,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div id="about" className="section py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-cyan">
            Understanding Solar Flares
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Solar flares are dynamic phenomena that pose significant risks to modern technology. Understanding and predicting them is crucial for space weather forecasting.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className={`p-6 md:p-8 rounded-xl glassmorphic glow-blue group cursor-pointer`}
              >
                <div className={`inline-block p-3 rounded-lg mb-4 bg-gradient-to-br ${card.color}`}>
                  <Icon className="text-cyan" size={32} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-cyan transition-smooth">
                  {card.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Key Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            { number: '11', label: 'Year Solar Cycle' },
            { number: '1000+', label: 'Annual Flares' },
            { number: '8-10', label: 'Avg per Day' },
            { number: 'Real-time', label: 'Prediction Need' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient-cyan mb-2">
                {stat.number}
              </div>
              <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
