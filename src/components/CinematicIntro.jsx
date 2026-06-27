import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass } from 'lucide-react';
import './CinematicIntro.css';

// Sound Synthesis via HTML5 Web Audio API
const playSynthSound = (type) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    
    if (type === 'bass-drop') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(90, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 1.6);
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 160;
      osc.disconnect(gain);
      osc.connect(filter);
      filter.connect(gain);

      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6);
      
      osc.start();
      osc.stop(ctx.currentTime + 1.6);
    } 
    
    else if (type === 'impact-thud') {
      // Heavy mechanical thud
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.6);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      gain.gain.setValueAtTime(0.6, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.6);

      // Noise burst for mechanical collision friction
      const bufferSize = ctx.sampleRate * 0.12;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 500;
      
      const noiseGain = ctx.createGain();
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      
      noiseGain.gain.setValueAtTime(0.4, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      
      noise.start();
    } 
    
    else if (type === 'energy-lock') {
      // Harmonic lock chime
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(329.63, ctx.currentTime); // E4
      osc1.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 1.0); // G5
      
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc2.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 1.0); // C6
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
      
      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 1.0);
      osc2.stop(ctx.currentTime + 1.0);
    }
  } catch (e) {
    console.warn("Audio blocked by browser config: ", e.message);
  }
};

export default function CinematicIntro({ onComplete }) {
  // Steps:
  // 0: Giant "2" in middle
  // 1: Study charges in, knocks 2 to extreme right (with screen shake + shockwave)
  // 2: Success charges from right, hits 2, pushes all back to center (chime, screen shake, large shockwave)
  const [step, setStep] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [shockwaves, setShockwaves] = useState([]); // Array of active shockwaves

  // Trigger shockwave rings
  const triggerShockwave = (type) => {
    const id = Date.now() + Math.random();
    setShockwaves(prev => [...prev, { id, type }]);
    setTimeout(() => {
      setShockwaves(prev => prev.filter(sw => sw.id !== id));
    }, 600);
  };

  useEffect(() => {
    // 0.0s - Play sub-bass drop
    playSynthSound('bass-drop');

    // 1.2s - Study hits 2 (pushes it to full right)
    const t1 = setTimeout(() => {
      setStep(1);
      setIsShaking(true);
      triggerShockwave('shockwave-1');
      playSynthSound('impact-thud');
      setTimeout(() => setIsShaking(false), 300);
    }, 1200);

    // 2.4s - Success hits group (pushes back to center)
    const t2 = setTimeout(() => {
      setStep(2);
      setIsShaking(true);
      triggerShockwave('shockwave-2');
      playSynthSound('energy-lock');
      setTimeout(() => setIsShaking(false), 350);
    }, 2400);

    // 4.0s - Complete intro
    const t3 = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <motion.div 
      className={`intro-overlay ${isShaking ? 'screen-shake' : ''}`}
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.08,
        filter: "blur(12px)",
        transition: { duration: 0.8, ease: "easeInOut" } 
      }}
    >
      {/* Background space elements */}
      <div className="intro-bg-effects">
        <div className="space-star star-1"></div>
        <div className="space-star star-2"></div>
        <div className="space-star star-3"></div>
        <div className="space-grid"></div>
      </div>

      {/* Radial backlight glow */}
      <div className={`intro-backlight ${step >= 2 ? 'backlight-active' : ''}`} />

      {/* Dynamic shockwave elements */}
      {shockwaves.map(sw => (
        <div key={sw.id} className={`shockwave ${sw.type}`} />
      ))}

      <div className="intro-content-container">
        {/* Animated Compass Icon above */}
        <motion.div
          className="intro-icon-wrapper"
          initial={{ opacity: 0, y: -80, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <Compass className="intro-compass-icon" />
        </motion.div>

        {/* The Brand Composition Container */}
        <div className={`brand-composition-box step-${step}`}>
          
          {/* STUDY: Entering from left */}
          <div className="brand-text-wrapper study-wrapper">
            <span className="brand-text text-left-side">Study</span>
          </div>

          {/* NUMBER 2: Center core element */}
          <div className="brand-number-wrapper">
            <span className="brand-number">2</span>
          </div>

          {/* SUCCESS: Entering from right */}
          <div className="brand-text-wrapper success-wrapper">
            <span className="brand-text text-right-side">Success</span>
          </div>

        </div>

        {/* Cinematic Tagline */}
        <div className="intro-tagline-wrapper">
          {step >= 2 && (
            <motion.p
              className="intro-tagline"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Navigate Your Future Path
            </motion.p>
          )}
        </div>
      </div>

      {/* Skip Intro */}
      <motion.button
        className="skip-intro-btn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        whileHover={{ opacity: 1, scale: 1.05 }}
        onClick={onComplete}
        transition={{ delay: 1.2, duration: 0.4 }}
      >
        Skip Intro &rarr;
      </motion.button>
    </motion.div>
  );
}
