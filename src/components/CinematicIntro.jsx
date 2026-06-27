import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Play } from 'lucide-react';
import './CinematicIntro.css';

// Sound Synthesis via HTML5 Web Audio API
const playSynthSound = (ctx, type) => {
  try {
    if (!ctx) return;
    
    // Resume context if suspended
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (type === 'bass-drop') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sawtooth';
      // Shift start/end frequencies upward so phone speakers can project them (above 100Hz cutoff)
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 1.6);
      
      // Raise lowpass filter limit so the sawtooth harmonics pass through clearly
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 350;
      osc.disconnect(gain);
      osc.connect(filter);
      filter.connect(gain);

      gain.gain.setValueAtTime(0.85, ctx.currentTime); // Louder amplitude
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6);
      
      osc.start();
      osc.stop(ctx.currentTime + 1.6);
    } 
    
    else if (type === 'impact-thud') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      // Raise pitch so impact thud resonates on smaller speakers
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.6);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      gain.gain.setValueAtTime(0.9, ctx.currentTime); // Substantially louder impact
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.6);

      // Noise click - shift pitch range into highly sensitive 1.2kHz area
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200; // Peak human hearing range
      
      const noiseGain = ctx.createGain();
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      
      noiseGain.gain.setValueAtTime(0.7, ctx.currentTime); // Louder noise click
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      
      noise.start();
    } 
    
    else if (type === 'energy-lock') {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = 'triangle';
      // Transpose up to a crisp treble register (E5 to E6)
      osc1.frequency.setValueAtTime(659.25, ctx.currentTime); 
      osc1.frequency.exponentialRampToValueAtTime(1318.51, ctx.currentTime + 1.0); 
      
      osc2.type = 'sine';
      // Transpose second voice up to (C6 to C7)
      osc2.frequency.setValueAtTime(1046.50, ctx.currentTime); 
      osc2.frequency.exponentialRampToValueAtTime(2093.00, ctx.currentTime + 1.0); 
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      gain.gain.setValueAtTime(0.75, ctx.currentTime); // Substantially louder chime lock
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
      
      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 1.0);
      osc2.stop(ctx.currentTime + 1.0);
    }
  } catch (e) {
    console.warn("Audio Context trigger failed: ", e.message);
  }
};

export default function CinematicIntro({ onComplete }) {
  const [hasInteracted, setHasInteracted] = useState(false); // Controls user click approval
  const [step, setStep] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [shockwaves, setShockwaves] = useState([]);
  
  const audioCtxRef = useRef(null); // Local reference to Web Audio Context

  // Trigger shockwave rings
  const triggerShockwave = (type) => {
    const id = Date.now() + Math.random();
    setShockwaves(prev => [...prev, { id, type }]);
    setTimeout(() => {
      setShockwaves(prev => prev.filter(sw => sw.id !== id));
    }, 600);
  };

  // Launch Cinematic Experience on user click
  const handleStartExperience = () => {
    // Create audio context (browser registers user click gesture!)
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;
    
    setHasInteracted(true);
    playSynthSound(ctx, 'bass-drop'); // Bass drop plays immediately!
  };

  useEffect(() => {
    if (!hasInteracted) return;

    const ctx = audioCtxRef.current;

    // 1.2s - Study hits 2
    const t1 = setTimeout(() => {
      setStep(1);
      setIsShaking(true);
      triggerShockwave('shockwave-1');
      playSynthSound(ctx, 'impact-thud');
      setTimeout(() => setIsShaking(false), 300);
    }, 1200);

    // 2.4s - Success hits group
    const t2 = setTimeout(() => {
      setStep(2);
      setIsShaking(true);
      triggerShockwave('shockwave-2');
      playSynthSound(ctx, 'energy-lock');
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
  }, [hasInteracted, onComplete]);

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

      <AnimatePresence mode="wait">
        {!hasInteracted ? (
          /* Landing screen to capture browser gesture consent */
          <motion.div 
            key="start-screen"
            className="intro-start-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Compass className="start-pulse-icon" />
            <h1 className="start-portal-title">Study2Success</h1>
            <p className="start-portal-tag">Career Guidance Portal</p>
            
            <button 
              type="button" 
              className="enter-portal-btn"
              onClick={handleStartExperience}
            >
              <Play size={18} fill="currentColor" />
              <span>Enter Portal</span>
            </button>
            <span className="audio-notice-lbl">Optimized with cinematic sound effects</span>
          </motion.div>
        ) : (
          /* Cinematic Animation sequence */
          <motion.div 
            key="cinematic-seq"
            className="intro-animation-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Radial backlight glow */}
            <div className={`intro-backlight ${step >= 2 ? 'backlight-active' : ''}`} />

            {/* Dynamic shockwave elements */}
            {shockwaves.map(sw => (
              <div key={sw.id} className={`shockwave ${sw.type}`} />
            ))}

            <div className="intro-content-container">
              {/* Animated Compass Icon above */}
              <div className="intro-icon-wrapper">
                <Compass className="intro-compass-icon" />
              </div>

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
          </motion.div>
        )}
      </AnimatePresence>

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
