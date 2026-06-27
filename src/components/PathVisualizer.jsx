import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { PATHWAY_DATA } from '../data/careerData';
import './PathVisualizer.css';

export default function PathVisualizer() {
  const [activeSubTab, setActiveSubTab] = useState('schooling'); // schooling, intermediate, diploma-lateral
  const [selected10thOption, setSelected10thOption] = useState(null);
  const [selectedInterStream, setSelectedInterStream] = useState('MPC');

  // Dynamic Lucide Icon Helper
  const RenderIcon = ({ name, size = 20, className = "" }) => {
    const IconComponent = Icons[name] || Icons.HelpCircle;
    return <IconComponent size={size} className={className} />;
  };

  const currentInterData = PATHWAY_DATA.intermediateStreams.streams.find(
    s => s.id === selectedInterStream
  );

  return (
    <div className="visualizer-container">
      <div className="section-header">
        <h1 className="text-gradient">Career Path Visualizer</h1>
        <p className="section-subtitle">
          Click through streams and academic pathways to map out options from high school to professional employment.
        </p>
      </div>

      {/* Selector Navigation */}
      <div className="sub-tab-nav glass-panel">
        <button
          className={`sub-tab-btn ${activeSubTab === 'schooling' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('schooling')}
        >
          <Icons.GraduationCap size={18} />
          <span>After 10th Grade Options</span>
        </button>
        <button
          className={`sub-tab-btn ${activeSubTab === 'intermediate' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('intermediate')}
        >
          <Icons.Layers size={18} />
          <span>Intermediate (10+2) Pathways</span>
        </button>
        <button
          className={`sub-tab-btn ${activeSubTab === 'diploma-lateral' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('diploma-lateral')}
        >
          <Icons.Zap size={18} />
          <span>Diploma & Lateral Entry (AP ECET)</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="visualizer-content">
        
        {/* TAB 1: After 10th options */}
        {activeSubTab === 'schooling' && (
          <div className="tab-schooling">
            <p className="tab-intro">{PATHWAY_DATA.schooling.description}</p>
            
            <div className="schooling-options-grid">
              {PATHWAY_DATA.schooling.options.map((opt) => (
                <div
                  key={opt.id}
                  className={`schooling-card glass-panel ${selected10thOption === opt.id ? 'expanded' : ''}`}
                  onClick={() => setSelected10thOption(selected10thOption === opt.id ? null : opt.id)}
                >
                  <div className="card-top">
                    <div className={`icon-circle ${opt.id}`}>
                      <RenderIcon name={opt.icon} size={24} />
                    </div>
                    <div className="card-summary">
                      <h3>{opt.title}</h3>
                      <span className="duration-tag">{opt.duration}</span>
                    </div>
                  </div>
                  
                  <p className="card-focus"><strong>Focus:</strong> {opt.focus}</p>
                  
                  {selected10thOption === opt.id ? (
                    <div className="card-expanded-content">
                      <div className="divider" />
                      <div className="info-block">
                        <strong>Who is it for?</strong>
                        <p>{opt.suitability}</p>
                      </div>
                      <div className="info-block">
                        <strong>Target Careers:</strong>
                        <p>{opt.nextSteps}</p>
                      </div>
                      <div className="info-block">
                        <strong>Available Branches:</strong>
                        <div className="branches-tags">
                          {opt.streams.map((s, idx) => (
                            <span key={idx} className="branch-tag">{s}</span>
                          ))}
                        </div>
                      </div>
                      <span className="expand-indicator">Click to Collapse</span>
                    </div>
                  ) : (
                    <span className="expand-indicator">Click to Expand & Explore Branches</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Intermediate Stream Branching Tree */}
        {activeSubTab === 'intermediate' && (
          <div className="tab-intermediate">
            <p className="tab-intro">{PATHWAY_DATA.intermediateStreams.description}</p>
            
            <div className="inter-selector-row">
              {PATHWAY_DATA.intermediateStreams.streams.map(s => (
                <button
                  key={s.id}
                  className={`inter-btn ${selectedInterStream === s.id ? 'active' : ''}`}
                  onClick={() => setSelectedInterStream(s.id)}
                >
                  {s.id}
                </button>
              ))}
            </div>

            <div className="branching-workspace">
              {/* Left Side: Stream node */}
              <div className="source-node-container">
                <div className="source-node glass-panel animate-float">
                  <div className="node-icon bg-purple">
                    <Icons.BookOpen size={24} />
                  </div>
                  <h3>{currentInterData.name}</h3>
                  <p>{currentInterData.description}</p>
                </div>
                <div className="connector-line-main" />
              </div>

              {/* Right Side: Branched Nodes */}
              <div className="branched-nodes-container">
                {currentInterData.paths.map((p, idx) => (
                  <div key={idx} className="branched-card-wrapper">
                    <div className="connector-branch-line" />
                    <div className="branched-node-card glass-panel">
                      <div className="node-head">
                        <h4>{p.name}</h4>
                        <span className="duration-pill">{p.duration}</span>
                      </div>
                      <p>{p.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Diploma Lateral Entry Timeline */}
        {activeSubTab === 'diploma-lateral' && (
          <div className="tab-lateral">
            <div className="lateral-intro-box glass-panel">
              <h3><Icons.Zap className="zap-icon animate-pulse-glow" size={20} /> {PATHWAY_DATA.diplomaLateral.title}</h3>
              <p>{PATHWAY_DATA.diplomaLateral.description}</p>
              
              <div className="benefits-list">
                {PATHWAY_DATA.diplomaLateral.benefits.map((b, idx) => (
                  <div key={idx} className="benefit-item">
                    <Icons.CheckCircle className="check-icon" size={16} />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Flow */}
            <h3 className="timeline-heading">Step-by-Step Lateral Entry Roadmap</h3>
            <div className="timeline-flow-container">
              {PATHWAY_DATA.diplomaLateral.flow.map((f, idx) => (
                <div key={idx} className="timeline-step">
                  <div className="timeline-node-wrapper">
                    <div className="timeline-circle">{f.step}</div>
                    {idx < PATHWAY_DATA.diplomaLateral.flow.length - 1 && <div className="timeline-connector-bar" />}
                  </div>
                  
                  <div className="timeline-content-card glass-panel">
                    <h4>{f.title}</h4>
                    <p>{f.details}</p>
                    {f.title.includes("ECET") && (
                      <span className="badge badge-ap ap-timeline-badge">Andhra Pradesh Specific</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
