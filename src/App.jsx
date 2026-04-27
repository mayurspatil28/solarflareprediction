import React from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import FloatingNavbar from './components/FloatingNavbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import LSTMExplanation from './components/LSTMExplanation';
import ModelPipeline from './components/ModelPipeline';
import InteractivePrediction from './components/InteractivePrediction';
import ResultsSection from './components/ResultsSection';
import ConclusionSection from './components/ConclusionSection';

function App() {
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'lstm', label: 'LSTM' },
    { id: 'pipeline', label: 'Pipeline' },
    { id: 'prediction', label: 'Prediction' },
    { id: 'results', label: 'Results' },
    { id: 'conclusion', label: 'Conclusion' },
  ];

  const handleExploreClick = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full min-h-screen bg-space-900 text-white overflow-x-hidden">
      {/* Background */}
      <AnimatedBackground />

      {/* Navigation */}
      <FloatingNavbar sections={sections} />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection onExploreClick={handleExploreClick} />
        <AboutSection />
        <LSTMExplanation />
        <ModelPipeline />
        <InteractivePrediction />
        <ResultsSection />
        <ConclusionSection />
      </main>
    </div>
  );
}

export default App;
