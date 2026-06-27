import React, { useState } from 'react';
import { Search, Compass, ShieldAlert, Sparkles, BookOpen, GraduationCap, Users } from 'lucide-react';
import { EXAM_DATA, PATHWAY_DATA } from '../data/careerData';
import './Hero.css';

export default function Hero({ setActiveTab, setSearchQueryGlobal }) {
  const [localQuery, setLocalQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const val = e.target.value;
    setLocalQuery(val);

    if (val.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = val.toLowerCase();
    const results = [];

    // Search exams
    EXAM_DATA.forEach(exam => {
      if (exam.name.toLowerCase().includes(query) || exam.stream.toLowerCase().includes(query) || exam.description.toLowerCase().includes(query)) {
        results.push({
          type: 'Exam',
          title: exam.name,
          desc: exam.description,
          tab: 'exams',
          tag: exam.level
        });
      }
    });

    // Search pathways
    PATHWAY_DATA.schooling.options.forEach(opt => {
      if (opt.title.toLowerCase().includes(query) || opt.focus.toLowerCase().includes(query)) {
        results.push({
          type: 'Pathway option',
          title: opt.title,
          desc: opt.focus,
          tab: 'pathways',
          tag: 'Schooling'
        });
      }
      opt.streams.forEach(stream => {
        if (stream.toLowerCase().includes(query)) {
          results.push({
            type: 'Branch/Stream',
            title: `${opt.title} - ${stream}`,
            desc: `Explore pathways in ${stream} after 10th.`,
            tab: 'pathways',
            tag: stream
          });
        }
      });
    });

    PATHWAY_DATA.intermediateStreams.streams.forEach(stream => {
      if (stream.name.toLowerCase().includes(query) || stream.description.toLowerCase().includes(query)) {
        results.push({
          type: 'Intermediate Stream',
          title: stream.name,
          desc: stream.description,
          tab: 'pathways',
          tag: '10+2'
        });
      }
      stream.paths.forEach(p => {
        if (p.name.toLowerCase().includes(query) || p.info.toLowerCase().includes(query)) {
          results.push({
            type: 'Career Target',
            title: `${stream.id} -> ${p.name}`,
            desc: p.info,
            tab: 'pathways',
            tag: p.name
          });
        }
      });
    });

    setSearchResults(results.slice(0, 5));
  };

  const selectResult = (item) => {
    if (item.tab === 'exams') {
      setSearchQueryGlobal(localQuery);
    }
    setActiveTab(item.tab);
  };

  return (
    <div className="hero-section">
      {/* Background blobs */}
      <div className="bg-glow-purple" />
      <div className="bg-glow-cyan" />

      {/* Main Hero Container */}
      <div className="hero-content">
        <div className="hero-badge animate-float">
          <Sparkles size={14} className="sparkle-icon" />
          <span>Complete Guidance Portal for Indian Students</span>
        </div>

        <h1 className="hero-title">
          Navigate Your Future with <br />
          <span className="text-gradient-purple-cyan font-extrabold">Study2Success</span>
        </h1>
        
        <p className="hero-description">
          An advanced repository of all career paths, entrance exams, and academic directions. 
          Featuring a specialized portal for <strong className="ap-highlight-text">Andhra Pradesh Students</strong> to excel.
        </p>

        {/* Search Bar */}
        <div className="search-container glass-panel">
          <div className="search-input-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search careers, exams (e.g. B.Tech, NEET, AP EAPCET, ECET)..."
              value={localQuery}
              onChange={handleSearch}
            />
          </div>

          {/* Search Dropdown Results */}
          {searchResults.length > 0 && (
            <div className="search-results-dropdown glass-panel">
              {searchResults.map((res, index) => (
                <div 
                  key={index} 
                  className="search-result-item"
                  onClick={() => selectResult(res)}
                >
                  <div className="result-meta">
                    <span className="result-type">{res.type}</span>
                    <span className="result-tag">{res.tag}</span>
                  </div>
                  <h4 className="result-title">{res.title}</h4>
                  <p className="result-desc">{res.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Metrics Grid */}
        <div className="hero-metrics">
          <div className="metric-card glass-panel">
            <GraduationCap className="metric-icon purple" />
            <div className="metric-info">
              <span className="metric-number">40+</span>
              <span className="metric-label">Career Streams Mapped</span>
            </div>
          </div>
          <div className="metric-card glass-panel">
            <BookOpen className="metric-icon cyan" />
            <div className="metric-info">
              <span className="metric-number">15+</span>
              <span className="metric-label">National & AP Exams</span>
            </div>
          </div>
          <div className="metric-card glass-panel">
            <Users className="metric-icon orange" />
            <div className="metric-info">
              <span className="metric-number">100%</span>
              <span className="metric-label">Free AP Scholarship Help</span>
            </div>
          </div>
        </div>

        {/* Quick Nav Cards */}
        <div className="quick-nav-section">
          <h2 className="section-title">Interactive Navigation Hub</h2>
          <div className="quick-grid">
            {/* Card 1 */}
            <div className="quick-card glass-panel" onClick={() => setActiveTab('pathways')}>
              <div className="card-header-icon bg-purple">
                <Compass />
              </div>
              <h3>Career Path Visualizer</h3>
              <p>Explore step-by-step interactive flows from 10th standard through intermediate/diploma to final professional jobs.</p>
              <span className="card-link">Launch Visualizer &rarr;</span>
            </div>

            {/* Card 2 */}
            <div className="quick-card glass-panel nav-card-ap" onClick={() => setActiveTab('ap-portal')}>
              <div className="card-header-icon bg-orange">
                <GraduationCap />
              </div>
              <h3>AP Student Portal</h3>
              <p>Dedicated guide for AP students: learn local reservation zones, fee reimbursement (JVD), and top AP engineering colleges.</p>
              <span className="card-link orange-text">Explore AP Opportunities &rarr;</span>
            </div>

            {/* Card 3 */}
            <div className="quick-card glass-panel" onClick={() => setActiveTab('quiz')}>
              <div className="card-header-icon bg-cyan">
                <Sparkles />
              </div>
              <h3>Career Matcher Quiz</h3>
              <p>Confused about what to select? Take our quick interest matcher quiz designed for both students and parents.</p>
              <span className="card-link cyan-text">Take the Quiz &rarr;</span>
            </div>

            {/* Card 4 */}
            <div className="quick-card glass-panel" onClick={() => setActiveTab('exams')}>
              <div className="card-header-icon bg-pink">
                <BookOpen />
              </div>
              <h3>Exams Calendar</h3>
              <p>Browse syllabus, direct application URLs, eligibility criteria, and important dates for national and AP state-level exams.</p>
              <span className="card-link pink-text">Open Exam Tracker &rarr;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
