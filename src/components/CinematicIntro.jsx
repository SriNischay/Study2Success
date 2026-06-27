import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass } from 'lucide-react';
import './CinematicIntro.css';

// Sound Synthesis via HTML5 Web Audio API (Zero download, zero latency)
const playSynthSound = (type) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    
    if (type === 'bass-drop') {
      // Cinematic Sub-Bass Drop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(85, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(25, ctx.currentTime + 1.5);
      
      // Lowpass filter to make it deep and heavy
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 180;
      osc.disconnect(gain);
      osc.connect(filter);
      filter.connect(gain);

      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
      
      osc.start();
      osc.stop(ctx.currentTime + 1.5);
    } 
    
    else if (type === 'impact-thud') {
      // Heavy Mechanical Collision Impact
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // Low pitch thud
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.5);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.5);

      // Noise click for metal strike sound
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 600;
      
      const noiseGain = ctx.createGain();
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      
      noiseGain.gain.setValueAtTime(0.3, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      
      noise.start();
    } 
    
    else if (type === 'energy-lock') {
      // Bright Sci-Fi Energy Lock (Chime/Harmonic)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(329.63, ctx.currentTime); // E4
      osc1.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.8);
      
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(493.88, ctx.currentTime); // B4 (Perfect Fifth)
      osc2.frequency.exponentialRampToValueAtTime(987.77, ctx.currentTime + 0.8);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      
      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.8);
      osc2.stop(ctx.currentTime + 0.8);
    }
  } catch (e) {
    console.warn("Audio blocked by browser auto-play settings: ", e.message);
  }
};

export default function CinematicIntro({ onComplete }) {
  // Animation Steps
  // 0: Giant "2" in middle
  // 1: Study slides in from left, hits 2, pushes it to right (with screen shake)
  // 2: Success slides in from right, hits them, pushes back to center (lock chime, flash)
  // 3: Glow state (static)
  const [step, setStep] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    // 0.0s - Play sub-bass drop
    playSynthSound('bass-drop');

    // 1.1s - Study hits 2 (pushes it to right)
    const t1 = setTimeout(() => {
      setStep(1);
      setIsShaking(true);
      playSynthSound('impact-thud');
      setTimeout(() => setIsShaking(false), 300); // Stop shake after 300ms
    }, 1200);

    // 2.3s - Success hits group (pushes back to center + flash)
    const t2 = setTimeout(() => {
      setStep(2);
      setShowFlash(true);
      setIsShaking(true);
      playSynthSound('energy-lock');
      setTimeout(() => setShowFlash(false), 500); // Fade flash after 500ms
      setTimeout(() => setIsShaking(false), 350); // Stop shake
    }, 2400);

    // 3.8s - Complete intro
    const t3 = setTimeout(() => {
      onComplete();
    }, 3800);

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
      {/* Background Cinematic Effects */}
      <div className="intro-bg-effects">
        <div className="space-star star-1"></div>
        <div className="space-star star-2"></div>
        <div className="space-star star-3"></div>
        <div className="space-grid"></div>
      </div>

      {/* Radial backlight glow behind logo */}
      <div className={`intro-backlight ${step >= 2 ? 'backlight-active' : ''}`} />

      {/* Cinematic White Flash Overlay */}
      <AnimatePresence>
        {showFlash && (
          <motion.div 
            className="intro-flash-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

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

        {/* The Brand Container (dynamic positions based on step) */}
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
