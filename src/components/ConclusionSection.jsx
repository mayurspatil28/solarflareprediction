import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Github, BookOpen, Lightbulb } from 'lucide-react';

const ConclusionSection = () => {
  const features = [
    {
      icon: Lightbulb,
      title: 'Deep Learning Insights',
      description: 'Explore how neural networks can solve real-world problems in space weather forecasting.',
    },
    {
      icon: Rocket,
      title: 'Practical Application',
      description: 'See how LSTM models translate theoretical knowledge into actionable predictions.',
    },
    {
      icon: BookOpen,
      title: 'Educational Value',
      description: 'Learn time-series prediction, neural network architecture, and domain-specific applications.',
    },
    {
      icon: Lightbulb,
      title: 'Future Extensions',
      description: 'Build on this foundation with multi-feature models and ensemble methods.',
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div id="conclusion" className="section py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Conclusion */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 text-gradient-cyan leading-tight"
          >
            LSTM for Time-Series <br /> Forecasting: A Success Story
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            This case study demonstrates the power of LSTM neural networks in capturing complex temporal patterns. From solar flares to stock prices, LSTM-based models are at the forefront of modern time-series prediction.
          </motion.p>
        </motion.div>

        {/* Key Points */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                className="glassmorphic rounded-xl p-8 glow-blue hover:glow-blue-strong transition-smooth"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Icon className="text-cyan" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Next Steps */}
        <motion.div
          className="glassmorphic rounded-xl p-12 border-2 border-cyan/30 text-center mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gradient-cyan mb-6">
            Ready to Explore Further?
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
            Dive deeper into the model implementation, experiment with different hyperparameters, or extend the model with additional space weather features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="https://github.com/mayurspatil28/solarflareprediction"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg font-semibold text-black bg-gradient-to-r from-cyan to-cyan-light glow-cyan-strong cursor-pointer transition-smooth flex items-center justify-center gap-2"
            >
              <Github size={20} />
              View Source Code
            </motion.a>
            <motion.a
              href="#lstm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg font-semibold text-cyan border border-cyan/30 hover:bg-cyan/10 transition-smooth flex items-center justify-center gap-2"
            >
              <BookOpen size={20} />
              Learn More
            </motion.a>
          </div>
        </motion.div>

        {/* Footer Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { number: '2', label: 'LSTM Layers' },
            { number: '100', label: 'Total Units' },
            { number: '10', label: 'Sequence Length' },
            { number: '∞', label: 'Possibilities' },
          ].map((stat, index) => (
            <div key={index} className="glassmorphic rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-gradient-cyan mb-2">
                {stat.number}
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default ConclusionSection;
