import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Play, RotateCcw } from 'lucide-react';

const InteractivePrediction = () => {
  const [horizon, setHorizon] = useState(10);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);

  // Generate realistic sunspot data (mock data)
  const chartData = useMemo(() => {
    const data = [];
    const historicalPoints = 60;

    // Generate historical data with solar cycle pattern
    for (let i = 0; i < historicalPoints; i++) {
      const cycle = Math.sin((i / historicalPoints) * Math.PI * 2);
      const noise = Math.random() * 10 - 5;
      data.push({
        month: `M${i + 1}`,
        actual: Math.max(0, 50 + cycle * 40 + noise),
        predicted: null,
      });
    }

    // Add predicted values
    if (showPrediction) {
      let lastValue = data[historicalPoints - 1].actual;
      for (let i = 0; i < horizon; i++) {
        const trend = Math.sin(((historicalPoints + i) / (historicalPoints + horizon)) * Math.PI * 2);
        const momentum = lastValue * 0.7 + 50 * 0.3 + trend * 10 + (Math.random() - 0.5) * 5;
        lastValue = Math.max(0, momentum);
        data.push({
          month: `M${historicalPoints + i + 1}`,
          actual: null,
          predicted: lastValue,
        });
      }
    }

    return data;
  }, [horizon, showPrediction]);

  const handleRunPrediction = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowPrediction(true);
      setIsAnimating(false);
    }, 600);
  };

  const handleReset = () => {
    setShowPrediction(false);
    setHorizon(10);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glassmorphic rounded-lg p-3 border border-cyan/20">
          <p className="text-cyan font-semibold text-sm">
            {payload[0].payload.month}
          </p>
          {payload[0].value !== null && (
            <p className="text-white text-sm">
              {payload[0].dataKey === 'actual' ? 'Actual' : 'Predicted'}: {payload[0].value.toFixed(1)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div id="prediction" className="section py-20">
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
            Interactive Prediction
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Adjust the prediction horizon and visualize forecasted solar activity
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="glassmorphic rounded-xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="space-y-8">
            {/* Slider */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-lg font-semibold text-white">
                  Prediction Horizon
                </label>
                <span className="text-3xl font-bold text-gradient-cyan">
                  {horizon} months
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={horizon}
                onChange={(e) => setHorizon(parseInt(e.target.value))}
                disabled={isAnimating}
                className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>1 month</span>
                <span>30 months</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 leading-relaxed">
              Set the prediction horizon to forecast solar flares for the next 1-30 months. The model will use historical patterns and learned temporal dependencies to generate predictions.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 flex-wrap">
              <motion.button
                onClick={handleRunPrediction}
                disabled={isAnimating}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-lg font-semibold text-black bg-gradient-to-r from-cyan to-cyan-light glow-cyan-strong cursor-pointer transition-smooth flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play size={20} />
                Run Prediction
              </motion.button>

              <motion.button
                onClick={handleReset}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-lg font-semibold text-cyan border border-cyan/30 hover:bg-cyan/10 transition-smooth flex items-center gap-2"
              >
                <RotateCcw size={20} />
                Reset
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Chart */}
        <motion.div
          className="glassmorphic rounded-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            animate={isAnimating ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
            transition={{ duration: 0.6, repeat: isAnimating ? Infinity : 0 }}
          >
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00c6ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00c6ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 198, 255, 0.1)" />
                <XAxis
                  dataKey="month"
                  stroke="rgba(224, 224, 224, 0.5)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="rgba(224, 224, 224, 0.5)"
                  style={{ fontSize: '12px' }}
                  label={{ value: 'Sunspot Count', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  contentStyle={{
                    background: 'rgba(10, 14, 39, 0.8)',
                    border: '1px solid rgba(0, 198, 255, 0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#00c6ff"
                  strokeWidth={3}
                  dot={false}
                  fillOpacity={1}
                  fill="url(#colorActual)"
                  name="Actual Sunspots"
                  isAnimationActive={true}
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#a855f7"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={false}
                  fillOpacity={1}
                  fill="url(#colorPredicted)"
                  name="Predicted Sunspots"
                  isAnimationActive={showPrediction}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Chart Info */}
          <motion.div
            className="mt-8 grid md:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="p-4 rounded-lg bg-cyan/10 border border-cyan/20">
              <p className="text-gray-400 text-sm mb-1">Historical Data</p>
              <p className="text-cyan font-semibold">60 months</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <p className="text-gray-400 text-sm mb-1">Prediction Period</p>
              <p className="text-purple-300 font-semibold">{horizon} months</p>
            </div>
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-gray-400 text-sm mb-1">Model Status</p>
              <p className="text-green-300 font-semibold">{showPrediction ? 'Active' : 'Ready'}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractivePrediction;
