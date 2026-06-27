import React, { useState } from 'react';
import { HelpCircle, RefreshCw, ChevronLeft, Sparkles, BookOpen, Trophy } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/careerData';
import './CareerQuiz.css';

export default function CareerQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]); // List of selected option types
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState(null);

  const handleOptionSelect = (type) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIdx] = type;
    setAnswers(updatedAnswers);

    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // End of quiz, calculate results
      calculateResults(updatedAnswers);
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const calculateResults = (finalAnswers) => {
    const counts = { engineering: 0, medical: 0, commerce: 0, humanities: 0 };
    
    finalAnswers.forEach(ans => {
      if (counts[ans] !== undefined) {
        counts[ans] += 1;
      }
    });

    const total = finalAnswers.length;
    const scores = {
      engineering: Math.round((counts.engineering / total) * 100),
      medical: Math.round((counts.medical / total) * 100),
      commerce: Math.round((counts.commerce / total) * 100),
      humanities: Math.round((counts.humanities / total) * 100),
    };

    // Find top stream
    let topStream = 'engineering';
    let maxVal = -1;
    Object.entries(scores).forEach(([stream, val]) => {
      if (val > maxVal) {
        maxVal = val;
        topStream = stream;
      }
    });

    setResults({
      scores,
      topStream,
      details: getStreamDetails(topStream)
    });
    setIsCompleted(true);
  };

  const getStreamDetails = (stream) => {
    const info = {
      engineering: {
        title: "Engineering & Technical Sciences (MPC)",
        desc: "You have a strong affinity for logical reasoning, maths, structures, and building software or systems. You should focus on physical sciences and mathematics.",
        courses: "B.Tech/B.E (Computer Science, ECE, AI & DS, Mechanical, Civil), BCA, B.Sc (Data Science, Math, Physics), B.Arch.",
        exams: "JEE Main, JEE Advanced, AP EAPCET, AP ECET (for diploma holders), NATA.",
        salary: "₹5 Lakhs to ₹25+ Lakhs per annum (varies by specialization and college)"
      },
      medical: {
        title: "Medical & Life Sciences (BiPC)",
        desc: "You are highly compassionate, detail-oriented, and interested in human biology, clinical care, animal sciences, or biotechnology.",
        courses: "MBBS, BDS, BAMS, BHMS, BVSc (Veterinary), B.Sc Agriculture, B.Pharm, Pharm.D, B.Sc Biotechnology/Nursing.",
        exams: "NEET UG, AP EAPCET (Agriculture & Pharmacy tracks).",
        salary: "₹4 Lakhs to ₹18+ Lakhs per annum (grows significantly with specialization like MD/MS)"
      },
      commerce: {
        title: "Commerce, Finance & Business (MEC / CEC)",
        desc: "You enjoy analyzing financial patterns, accounting, corporate structures, trade, and economic policies. You possess business-oriented problem-solving skills.",
        courses: "CA (Chartered Accountancy), CS (Company Secretary), B.Com (Computers/Honours), BBA, B.Sc Economics, Actuarial Science.",
        exams: "ICAI Foundation, ICSI CSEET, CUET UG, AP ICET (postgraduate).",
        salary: "₹5 Lakhs to ₹20+ Lakhs per annum (highly lucrative for CA and top-tier BBA/MBA graduates)"
      },
      humanities: {
        title: "Arts, Law & Humanities (HEC / CEC)",
        desc: "You possess high verbal intelligence, writing skills, interest in social structures, public policy, civil laws, or creative graphic design/journalism.",
        courses: "Integrated Law (BA LLB / BBA LLB), BA (Honours in Economics/Pol Sci/Psychology), Bachelor of Journalism & Mass Communication, B.Design.",
        exams: "CLAT, AP LAWCET, NIFT, UCEED, CUET UG.",
        salary: "₹4 Lakhs to ₹15+ Lakhs per annum (high salaries in corporate law, design, and administrative roles)"
      }
    };
    return info[stream];
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setAnswers([]);
    setIsCompleted(false);
    setResults(null);
  };

  const progressPct = Math.round(((currentIdx) / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="quiz-container">
      <div className="section-header">
        <h1 className="text-gradient">Career Matcher Quiz</h1>
        <p className="section-subtitle">
          Not sure which intermediate stream or career path to pick? Take our 6-question interest profile designed for students and parents.
        </p>
      </div>

      <div className="quiz-card-wrapper">
        {!isCompleted ? (
          <div className="quiz-active-card glass-panel">
            {/* Header progress info */}
            <div className="quiz-progress-section">
              <div className="progress-text-row">
                <span className="question-count">Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
                <span className="pct-complete">{progressPct}% Complete</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
              </div>
            </div>

            {/* Question title */}
            <div className="question-body">
              <div className="question-icon-circle">
                <HelpCircle size={22} className="q-icon animate-float" />
              </div>
              <h2>{QUIZ_QUESTIONS[currentIdx].question}</h2>
            </div>

            {/* Options list */}
            <div className="options-stack">
              {QUIZ_QUESTIONS[currentIdx].options.map((opt, index) => {
                const isSelected = answers[currentIdx] === opt.type;
                return (
                  <button
                    key={index}
                    className={`quiz-option-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect(opt.type)}
                  >
                    <span className="option-marker">{String.fromCharCode(65 + index)}</span>
                    <span className="option-text">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Footer buttons */}
            <div className="quiz-footer-actions">
              {currentIdx > 0 ? (
                <button className="btn-secondary btn-back" onClick={handleBack}>
                  <ChevronLeft size={16} />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        ) : (
          <div className="quiz-results-card glass-panel">
            {/* Header */}
            <div className="results-badge animate-float">
              <Trophy size={18} className="trophy-icon" />
              <span>Assessment Completed!</span>
            </div>
            
            <h2 className="results-main-title">Your Personalized Career Fit</h2>
            <p className="results-subtitle">
              Based on your answers, here is a compatibility score across the major academic streams in India:
            </p>

            {/* Score Indicators */}
            <div className="scores-meters-box">
              {Object.entries(results.scores).map(([stream, val]) => {
                const labelMap = {
                  engineering: { name: 'Engineering & Technology (MPC)', color: 'purple' },
                  medical: { name: 'Medical & Life Sciences (BiPC)', color: 'pink' },
                  commerce: { name: 'Commerce & Finance (MEC/CEC)', color: 'cyan' },
                  humanities: { name: 'Humanities, Law & Arts (HEC)', color: 'orange' }
                };
                const info = labelMap[stream];
                
                return (
                  <div key={stream} className="meter-row">
                    <div className="meter-info">
                      <span className="meter-name">{info.name}</span>
                      <span className="meter-val">{val}% Match</span>
                    </div>
                    <div className="meter-bar-bg">
                      <div 
                        className={`meter-bar-fill ${info.color}`} 
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detailed Top Recommendation */}
            <div className="recommendation-details glass-panel">
              <div className="rec-header">
                <Sparkles size={20} className="sparkle-icon" />
                <h3>Primary Fit: {results.details.title}</h3>
              </div>
              
              <p className="rec-desc">{results.details.desc}</p>
              
              <div className="divider" />
              
              <div className="rec-grid">
                <div className="rec-item">
                  <strong>Recommended Degrees:</strong>
                  <p>{results.details.courses}</p>
                </div>
                <div className="rec-item">
                  <strong>Target Entrance Exams:</strong>
                  <p>{results.details.exams}</p>
                </div>
                <div className="rec-item">
                  <strong>Average Starting Salary:</strong>
                  <p>{results.details.salary}</p>
                </div>
              </div>
            </div>

            {/* CTA action */}
            <div className="results-actions">
              <button className="btn-primary" onClick={resetQuiz}>
                <RefreshCw size={16} />
                <span>Retake Assessment Quiz</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
