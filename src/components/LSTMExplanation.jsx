import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

const LSTMExplanation = () => {
  const [hoveredGate, setHoveredGate] = useState(null);

  const gates = [
    {
      id: 'forget',
      name: 'Forget Gate',
      description: 'Decides which information from the previous state should be discarded.',
      color: 'from-red-500 to-red-600',
      position: 'left',
    },
    {
      id: 'input',
      name: 'Input Gate',
      description: 'Determines which new information should be added to the cell state.',
      color: 'from-blue-500 to-blue-600',
      position: 'top',
    },
    {
      id: 'cell',
      name: 'Cell State',
      description: 'Carries information throughout the sequence, updated by the gates.',
      color: 'from-yellow-500 to-yellow-600',
      position: 'center',
    },
    {
      id: 'output',
      name: 'Output Gate',
      description: 'Selects which information from the cell state should be passed as output.',
      color: 'from-green-500 to-green-600',
      position: 'right',
    },
  ];

  const features = [
    {
      title: 'Sequential Processing',
      description: 'Processes data one step at a time, maintaining context of past information.',
    },
    {
      title: 'Memory Cells',
      description: 'Special units that can learn to preserve important information over time.',
    },
    {
      title: 'Vanishing Gradient Solution',
      description: 'Overcomes the limitations of standard RNNs in learning long-term dependencies.',
    },
    {
      title: 'Time-Series Prediction',
      description: 'Ideal for forecasting tasks where past values influence future outcomes.',
    },
  ];

  return (
    <div id="lstm" className="section py-20">
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
            LSTM Architecture
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Long Short-Term Memory networks are specially designed to handle sequential data and learn temporal patterns effectively.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Interactive LSTM Diagram */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative w-full h-96 glassmorphic rounded-xl p-8 flex items-center justify-center">
              {/* LSTM Cell Visualization */}
              <svg viewBox="0 0 400 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Input */}
                <line x1="10" y1="150" x2="60" y2="150" stroke="rgba(0, 198, 255, 0.5)" strokeWidth="2" />
                <text x="20" y="140" fill="rgba(0, 198, 255, 0.8)" className="text-xs font-semibold">Input</text>

                {/* Main cell body */}
                <motion.rect
                  x="80" y="80" width="240" height="140"
                  rx="10"
                  fill="rgba(0, 198, 255, 0.1)"
                  stroke="rgba(0, 198, 255, 0.3)"
                  strokeWidth="2"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Forget Gate */}
                <g
                  onMouseEnter={() => setHoveredGate('forget')}
                  onMouseLeave={() => setHoveredGate(null)}
                  className="cursor-pointer"
                >
                  <motion.circle
                    cx="120" cy="120"
                    r="25"
                    fill={hoveredGate === 'forget' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(239, 68, 68, 0.2)'}
                    stroke="rgb(239, 68, 68)"
                    strokeWidth="2"
                    animate={hoveredGate === 'forget' ? { scale: 1.2 } : { scale: 1 }}
                  />
                  <text x="120" y="125" textAnchor="middle" fill="rgb(239, 68, 68)" className="text-xs font-bold">
                    f
                  </text>
                </g>

                {/* Input Gate */}
                <g
                  onMouseEnter={() => setHoveredGate('input')}
                  onMouseLeave={() => setHoveredGate(null)}
                  className="cursor-pointer"
                >
                  <motion.circle
                    cx="200" cy="100"
                    r="25"
                    fill={hoveredGate === 'input' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.2)'}
                    stroke="rgb(59, 130, 246)"
                    strokeWidth="2"
                    animate={hoveredGate === 'input' ? { scale: 1.2 } : { scale: 1 }}
                  />
                  <text x="200" y="105" textAnchor="middle" fill="rgb(59, 130, 246)" className="text-xs font-bold">
                    i
                  </text>
                </g>

                {/* Cell State */}
                <g
                  onMouseEnter={() => setHoveredGate('cell')}
                  onMouseLeave={() => setHoveredGate(null)}
                  className="cursor-pointer"
                >
                  <motion.circle
                    cx="200" cy="150"
                    r="30"
                    fill={hoveredGate === 'cell' ? 'rgba(234, 179, 8, 0.4)' : 'rgba(234, 179, 8, 0.2)'}
                    stroke="rgb(234, 179, 8)"
                    strokeWidth="2"
                    animate={hoveredGate === 'cell' ? { scale: 1.2 } : { scale: 1 }}
                  />
                  <text x="200" y="155" textAnchor="middle" fill="rgb(234, 179, 8)" className="text-xs font-bold">
                    C
                  </text>
                </g>

                {/* Output Gate */}
                <g
                  onMouseEnter={() => setHoveredGate('output')}
                  onMouseLeave={() => setHoveredGate(null)}
                  className="cursor-pointer"
                >
                  <motion.circle
                    cx="280" cy="120"
                    r="25"
                    fill={hoveredGate === 'output' ? 'rgba(34, 197, 94, 0.4)' : 'rgba(34, 197, 94, 0.2)'}
                    stroke="rgb(34, 197, 94)"
                    strokeWidth="2"
                    animate={hoveredGate === 'output' ? { scale: 1.2 } : { scale: 1 }}
                  />
                  <text x="280" y="125" textAnchor="middle" fill="rgb(34, 197, 94)" className="text-xs font-bold">
                    o
                  </text>
                </g>

                {/* Output line */}
                <line x1="330" y1="150" x2="380" y2="150" stroke="rgba(34, 197, 94, 0.5)" strokeWidth="2" />
                <text x="345" y="140" fill="rgba(34, 197, 94, 0.8)" className="text-xs font-semibold">Output</text>
              </svg>

              {/* Tooltip */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-space-900 to-transparent rounded-b-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredGate ? 1 : 0 }}
              >
                {hoveredGate && (
                  <div className="text-center">
                    <p className="font-semibold text-cyan mb-1">
                      {gates.find(g => g.id === hoveredGate)?.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {gates.find(g => g.id === hoveredGate)?.description}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Features */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glassmorphic p-6 rounded-lg glow-blue group hover:glow-blue-strong transition-smooth"
                whileHover={{ x: 5 }}
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Info className="text-cyan mt-1" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan transition-smooth">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Why LSTM for Time Series */}
        <motion.div
          className="glassmorphic rounded-xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-gradient-cyan mb-4">
            Why LSTM for Solar Flare Prediction?
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Solar activity follows complex temporal patterns with long-term dependencies. LSTM networks excel at capturing these patterns because they can selectively remember important information from months or years past while forgetting irrelevant details. This makes them ideal for forecasting solar flares based on sunspot and solar activity time series data.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LSTMExplanation;
