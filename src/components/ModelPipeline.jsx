import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Settings, Brain, TrendingUp, ChevronDown } from 'lucide-react';

const ModelPipeline = () => {
  const [expandedStep, setExpandedStep] = useState(null);

  const steps = [
    {
      id: 1,
      icon: Database,
      title: 'Dataset',
      shortDesc: 'Sunspot Activity',
      fullDesc: 'Collect historical sunspot count data spanning multiple solar cycles (11-year periods). The dataset contains hundreds of monthly observations from the SILSO International Sunspot Number database.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      icon: Settings,
      title: 'Preprocessing',
      shortDesc: 'Normalization & Scaling',
      fullDesc: 'Normalize data to 0-1 range using MinMaxScaler. Split data into sequences of 10 timesteps to capture temporal patterns. Each sequence becomes an input-output pair for training.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 3,
      icon: Brain,
      title: 'LSTM Model',
      shortDesc: 'Architecture & Training',
      fullDesc: 'Build a 2-layer LSTM network with 50 units per layer. Train on historical sequences with Adam optimizer and MSE loss function for 10 epochs with batch size of 32.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 4,
      icon: TrendingUp,
      title: 'Prediction',
      shortDesc: 'Forecasting Future',
      fullDesc: 'Use trained model to predict future sunspot activity. Generate predictions for the next 1-30 timesteps. Inverse transform predictions to original scale for interpretation.',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div id="pipeline" className="section py-20">
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
            Model Pipeline
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Complete workflow from data collection to predictions
          </p>
        </motion.div>

        {/* Desktop Pipeline View */}
        <div className="hidden lg:block mb-16">
          <div className="flex items-center justify-between gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  className="flex items-center flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {/* Step Card */}
                  <div className="flex-1">
                    <div className={`bg-gradient-to-br ${step.color} p-6 rounded-lg glassmorphic glow-blue group hover:glow-blue-strong transition-smooth`}>
                      <Icon className="text-white mb-3" size={32} />
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan transition-smooth">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-300 mb-4">{step.shortDesc}</p>
                      <button
                        onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                        className="text-cyan text-sm font-semibold hover:text-cyan-light transition-smooth flex items-center gap-2"
                      >
                        Learn More
                        <ChevronDown size={16} className={`transition-transform ${expandedStep === step.id ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className="w-8 h-0.5 bg-gradient-to-r from-cyan to-transparent mx-2" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile Pipeline View */}
        <div className="lg:hidden space-y-4 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <button
                  onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                  className="w-full"
                >
                  <div className={`bg-gradient-to-br ${step.color} p-6 rounded-lg glassmorphic glow-blue hover:glow-blue-strong transition-smooth text-left`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Icon className="text-white" size={28} />
                        <div>
                          <h3 className="text-lg font-bold text-white">{step.title}</h3>
                          <p className="text-sm text-gray-300">{step.shortDesc}</p>
                        </div>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`text-cyan transition-transform ${expandedStep === step.id ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Expanded Description */}
        <AnimatePresence>
          {expandedStep && (
            <motion.div
              className="glassmorphic rounded-xl p-8 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${steps.find(s => s.id === expandedStep)?.color} flex items-center justify-center`}>
                  {React.createElement(steps.find(s => s.id === expandedStep)?.icon || Database, {
                    className: 'text-white',
                    size: 24,
                  })}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-cyan mb-2">
                    {steps.find(s => s.id === expandedStep)?.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {steps.find(s => s.id === expandedStep)?.fullDesc}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Key Metrics */}
        <motion.div
          className="grid md:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            { label: 'Training Epochs', value: '10' },
            { label: 'LSTM Layers', value: '2' },
            { label: 'Units per Layer', value: '50' },
            { label: 'Sequence Length', value: '10' },
          ].map((metric, index) => (
            <div
              key={index}
              className="glassmorphic rounded-lg p-4 text-center"
            >
              <div className="text-3xl font-bold text-gradient-cyan mb-2">
                {metric.value}
              </div>
              <p className="text-gray-400 text-sm">{metric.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ModelPipeline;
