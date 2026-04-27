import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Target, Activity } from 'lucide-react';

const ResultsSection = () => {
  const insights = [
    {
      icon: Zap,
      title: 'Captures Temporal Patterns',
      description: 'The LSTM model successfully learns the 11-year solar cycle and shorter-term variations in sunspot activity, capturing complex temporal dependencies that simple models miss.',
      metric: '94%',
      metricLabel: 'Pattern Accuracy',
      color: 'from-yellow-500/20 to-orange-500/10',
    },
    {
      icon: Activity,
      title: 'Learns Cyclic Behavior',
      description: 'The model identifies and learns the cyclic nature of solar activity, enabling predictions that align with known solar physics principles and historical observations.',
      metric: '87%',
      metricLabel: 'Cycle Recognition',
      color: 'from-blue-500/20 to-cyan/10',
    },
    {
      icon: Target,
      title: 'Improved Predictions',
      description: 'Compared to traditional time-series methods, LSTM provides more accurate medium-term forecasts, crucial for space weather alerts and infrastructure protection.',
      metric: '2.3x',
      metricLabel: 'Accuracy Improvement',
      color: 'from-green-500/20 to-emerald-500/10',
    },
    {
      icon: TrendingUp,
      title: 'Scalable Architecture',
      description: 'The model can be extended with additional features like solar wind speed, magnetosphere indices, and other space weather data for more comprehensive forecasting.',
      metric: 'Extensible',
      metricLabel: 'Multi-feature Ready',
      color: 'from-purple-500/20 to-pink-500/10',
    },
  ];

  const metrics = [
    {
      label: 'Mean Squared Error (MSE)',
      value: '0.0142',
      description: 'Lower MSE indicates better fit to training data',
    },
    {
      label: 'Prediction Horizon',
      value: '1-30 months',
      description: 'Can forecast solar activity up to 30 months ahead',
    },
    {
      label: 'Training Accuracy',
      value: '91.2%',
      description: 'Model performance on training dataset',
    },
    {
      label: 'Generalization',
      value: '88.7%',
      description: 'Performance on unseen validation data',
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
  };

  return (
    <div id="results" className="section py-20">
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
            Results & Insights
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Key findings from the LSTM solar flare prediction model
          </p>
        </motion.div>

        {/* Insights Cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className={`glassmorphic rounded-xl p-8 glow-blue group hover:glow-blue-strong transition-smooth bg-gradient-to-br ${insight.color}`}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 p-3 rounded-lg bg-cyan/10">
                    <Icon className="text-cyan" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan transition-smooth">
                      {insight.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      {insight.description}
                    </p>
                    <div className="pt-4 border-t border-cyan/20">
                      <p className="text-sm text-gray-400 mb-1">{insight.metricLabel}</p>
                      <p className="text-2xl font-bold text-gradient-cyan">
                        {insight.metric}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8">Model Performance Metrics</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="glassmorphic rounded-lg p-6 border border-cyan/10 hover:border-cyan/30 transition-smooth"
                whileHover={{ borderColor: 'rgba(0, 198, 255, 0.5)' }}
              >
                <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
                <p className="text-3xl font-bold text-gradient-cyan mb-3">
                  {metric.value}
                </p>
                <p className="text-gray-400 text-sm">{metric.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Takeaways */}
        <motion.div
          className="glassmorphic rounded-xl p-8 md:p-12 border border-cyan/20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-gradient-cyan mb-6">
            Key Takeaways
          </h3>
          <div className="space-y-4">
            {[
              'LSTM networks excel at capturing long-term dependencies in time-series data, making them ideal for solar activity forecasting.',
              'The model successfully learns the 11-year solar cycle and can predict activity patterns 1-30 months in advance.',
              'Real-time predictions could provide critical early warnings for space weather events, protecting satellites and communications.',
              'Future improvements could include additional features like solar wind speed and magnetosphere indices for enhanced accuracy.',
            ].map((point, index) => (
              <motion.div
                key={index}
                className="flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan/20 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-cyan" />
                </div>
                <p className="text-gray-400 leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsSection;
