import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import PathVisualizer from './components/PathVisualizer';
import ApPortal from './components/ApPortal';
import CareerQuiz from './components/CareerQuiz';
import ExamTracker from './components/ExamTracker';
import ParentGuide from './components/ParentGuide';
import CinematicIntro from './components/CinematicIntro';
import { Compass } from 'lucide-react';
import './App.css';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQueryGlobal, setSearchQueryGlobal] = useState('');
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  };

  // Page switcher mapping with transitions
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <Hero setActiveTab={setActiveTab} setSearchQueryGlobal={setSearchQueryGlobal} />
          </motion.div>
        );
      case 'pathways':
        return (
          <motion.div
            key="pathways"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <PathVisualizer />
          </motion.div>
        );
      case 'ap-portal':
        return (
          <motion.div
            key="ap-portal"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <ApPortal />
          </motion.div>
        );
      case 'quiz':
        return (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <CareerQuiz />
          </motion.div>
        );
      case 'exams':
        return (
          <motion.div
            key="exams"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <ExamTracker 
              searchQueryGlobal={searchQueryGlobal} 
              setSearchQueryGlobal={setSearchQueryGlobal} 
            />
          </motion.div>
        );
      case 'parents-guide':
        return (
          <motion.div
            key="parents-guide"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <ParentGuide />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <CinematicIntro key="intro" onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {!showIntro && (
        <motion.div 
          className="app-layout"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header Navigation */}
          <Header activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} toggleTheme={toggleTheme} />

          {/* Main Content Area with Transitions */}
          <main className="main-content-wrapper">
            <AnimatePresence mode="wait">
              {renderTabContent()}
            </AnimatePresence>
          </main>

          {/* Glassmorphic Footer */}
          <footer className="main-footer glass-panel">
            <div className="footer-top">
              <div className="footer-logo">
                <Compass size={22} className="footer-logo-icon" />
                <span>Study2Success</span>
              </div>
              <p className="footer-mission">
                Empowering Indian students with comprehensive academic direction, career path mappings, entrance exam indices, and dedicated financial scheme alerts for AP students.
              </p>
            </div>
            
            <div className="footer-divider" />
            
            <div className="footer-bottom">
              <span className="copyright">&copy; 2026 Study2Success Career Guidance. All Rights Reserved.</span>
              <div className="footer-links">
                <span className="badge badge-ap">AP Region Active</span>
                <span className="badge badge-national">National Index</span>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </>
  );
}
