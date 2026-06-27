import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, AlertCircle, Heart, DollarSign, Target, Award } from 'lucide-react';
import { PARENT_GUIDE_DATA } from '../data/careerData';
import './ParentGuide.css';

export default function ParentGuide() {
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  const getAdviceIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('comparison')) return <Heart className="advice-icon pink" size={24} />;
    if (t.includes('financial') || t.includes('budget')) return <DollarSign className="advice-icon green" size={24} />;
    if (t.includes('alternative') || t.includes('plan b')) return <Target className="advice-icon cyan" size={24} />;
    return <Award className="advice-icon purple" size={24} />;
  };

  return (
    <div className="guide-container">
      <div className="section-header">
        <h1 className="text-gradient">Parents & Students Advisory</h1>
        <p className="section-subtitle">
          Dedicated guidance covering common educational dilemmas, stress management, financial guidelines, and actionable tips for families.
        </p>
      </div>

      <div className="guide-layout-grid">
        
        {/* FAQs Panel */}
        <div className="faqs-panel">
          <h2 className="panel-title">
            <HelpCircle className="title-icon cyan" />
            <span>Parent-Student FAQ Accordion</span>
          </h2>
          <p className="panel-desc">We answer critical questions regarding local admissions, math anxiety, and financial aid systems in AP.</p>
          
          <div className="faqs-stack">
            {PARENT_GUIDE_DATA.faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className={`faq-item glass-panel ${isOpen ? 'active' : ''}`}>
                  <button className="faq-question-btn" onClick={() => toggleFaq(idx)}>
                    <span className="faq-question-text">{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} className="chevron" /> : <ChevronDown size={18} className="chevron" />}
                  </button>
                  
                  {isOpen && (
                    <div className="faq-answer-box">
                      <div className="divider" />
                      <p className="faq-answer-text">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Advisory Panel */}
        <div className="advisory-panel">
          <h2 className="panel-title">
            <AlertCircle className="title-icon orange" />
            <span>Stress & Financial Advisory</span>
          </h2>
          <p className="panel-desc">Practical frameworks for parents and students to handle exam results, rank comparisons, and counseling pressure.</p>
          
          <div className="advisory-stack">
            {PARENT_GUIDE_DATA.stressManagement.map((advice, idx) => (
              <div key={idx} className="advice-card glass-panel">
                <div className="advice-card-header">
                  <div className="advice-icon-wrapper">
                    {getAdviceIcon(advice.title)}
                  </div>
                  <h3>{advice.title}</h3>
                </div>
                <p className="advice-desc">{advice.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
