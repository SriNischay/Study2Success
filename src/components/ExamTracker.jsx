import React, { useState, useEffect } from 'react';
import { Search, Calendar, FileText, Globe, HelpCircle, AlertCircle, Award } from 'lucide-react';
import { EXAM_DATA } from '../data/careerData';
import './ExamTracker.css';

export default function ExamTracker({ searchQueryGlobal, setSearchQueryGlobal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStream, setSelectedStream] = useState('all'); // all, engineering, medical, law, other
  const [selectedLevel, setSelectedLevel] = useState('all'); // all, national, ap

  // Sync search query from global (Hero search redirects)
  useEffect(() => {
    if (searchQueryGlobal) {
      setSearchQuery(searchQueryGlobal);
      // Reset after consuming it
      setSearchQueryGlobal('');
    }
  }, [searchQueryGlobal, setSearchQueryGlobal]);

  // Clean stream input mapping
  const matchesStream = (examStream, filter) => {
    if (filter === 'all') return true;
    const estream = examStream.toLowerCase();
    
    if (filter === 'engineering') return estream.includes('engineering') || estream.includes('architecture') || estream.includes('diploma');
    if (filter === 'medical') return estream.includes('medical') || estream.includes('pharmacy') || estream.includes('healthcare');
    if (filter === 'law') return estream.includes('law');
    if (filter === 'other') return !estream.includes('engineering') && !estream.includes('medical') && !estream.includes('law') && !estream.includes('architecture');
    return true;
  };

  const filteredExams = EXAM_DATA.filter(exam => {
    const matchesSearch = 
      exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.stream.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStreamFilter = matchesStream(exam.stream, selectedStream);

    const matchesLevelFilter = 
      selectedLevel === 'all' || 
      (selectedLevel === 'national' && exam.level === 'National') || 
      (selectedLevel === 'ap' && exam.level === 'AP State');

    return matchesSearch && matchesStreamFilter && matchesLevelFilter;
  });

  return (
    <div className="tracker-container">
      <div className="section-header">
        <h1 className="text-gradient">Entrance Exams Directory</h1>
        <p className="section-subtitle">
          Search and track application schedules, key dates, syllabus streams, and official links for major national exams and AP state exams.
        </p>
      </div>

      {/* Filter and Search Bar Panel */}
      <div className="control-panel glass-panel">
        {/* Search */}
        <div className="tracker-search-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search exams by name, syllabus, or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="filters-wrapper">
          <div className="filter-group">
            <span className="filter-label">Stream:</span>
            <select 
              value={selectedStream} 
              onChange={(e) => setSelectedStream(e.target.value)}
              className="tracker-select"
            >
              <option value="all">All Streams</option>
              <option value="engineering">Engineering / Tech</option>
              <option value="medical">Medical / Pharmacy</option>
              <option value="law">Law Systems</option>
              <option value="other">Other Streams (Arts/NDA/CUET)</option>
            </select>
          </div>

          <div className="filter-group">
            <span className="filter-label">Scope:</span>
            <select 
              value={selectedLevel} 
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="tracker-select"
            >
              <option value="all">All Scales</option>
              <option value="national">National Level</option>
              <option value="ap">AP State Level</option>
            </select>
          </div>
        </div>
      </div>

      {/* Warning Notice about Official Dates */}
      <div className="exam-notice glass-panel">
        <AlertCircle className="notice-icon" size={20} />
        <p>
          <strong>Notice:</strong> Exam dates and portals are subject to notification schedules from official exam boards (NTA, APSCHE, UPSC). Always crosscheck dates on the official portals provided.
        </p>
      </div>

      {/* Grid of Exam Cards */}
      {filteredExams.length > 0 ? (
        <div className="exams-grid-tracker cards-grid">
          {filteredExams.map((exam) => {
            const isAp = exam.level === 'AP State';
            return (
              <div key={exam.id} className={`exam-card-detailed glass-panel ${isAp ? 'ap-exam-border' : ''}`}>
                <div className="exam-card-header">
                  <span className={`badge ${isAp ? 'badge-ap' : 'badge-national'}`}>
                    {exam.level}
                  </span>
                  {isAp && (
                    <span className="ap-badge-icon">
                      <Award size={16} />
                    </span>
                  )}
                </div>

                <h3 className="exam-title">{exam.name}</h3>
                
                <div className="exam-info-stack">
                  <div className="info-line">
                    <FileText size={16} className="info-icon" />
                    <span><strong>Stream:</strong> {exam.stream}</span>
                  </div>
                  <div className="info-line">
                    <HelpCircle size={16} className="info-icon" />
                    <span><strong>Eligibility:</strong> {exam.eligibility}</span>
                  </div>
                  <div className="info-line schedule-highlight">
                    <Calendar size={16} className="info-icon schedule-icon" />
                    <span><strong>Schedule:</strong> {exam.dates}</span>
                  </div>
                </div>

                <p className="exam-desc">{exam.description}</p>

                <div className="exam-card-actions">
                  <a 
                    href={exam.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-secondary exam-url-btn"
                  >
                    <Globe size={16} />
                    <span>Official Portal</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-results glass-panel">
          <HelpCircle size={40} className="no-results-icon" />
          <h3>No Entrance Exams Found</h3>
          <p>Try clearing your search query or adjusting filters to discover alternative options.</p>
          <button 
            className="btn-primary" 
            onClick={() => {
              setSearchQuery('');
              setSelectedStream('all');
              setSelectedLevel('all');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
