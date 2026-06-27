import React, { useState, useEffect } from 'react';
import { Award, Landmark, MapPin, CheckCircle, Info, BookOpen, ShieldCheck, GraduationCap, Calculator, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { AP_PORTAL_DATA } from '../data/careerData';
import './ApPortal.css';

export default function ApPortal() {
  const [activeSubSection, setActiveSubSection] = useState('matcher'); // matcher, info, colleges
  const [collegeFilter, setCollegeFilter] = useState('all'); // all, state, national

  // Simulator States
  const [examType, setExamType] = useState('EAPCET'); // EAPCET, ECET, POLYCET
  const [marks, setMarks] = useState(85);
  const [caste, setCaste] = useState('BC');
  const [region, setRegion] = useState('AU');
  const [income, setIncome] = useState('under-2.5');
  const [branch, setBranch] = useState('CSE');
  const [hometown, setHometown] = useState('all'); // all, vijayawada-guntur, visakhapatnam, kakinada-godavari, tirupati-nellore, anantapur-kadapa
  const [expandedCollege, setExpandedCollege] = useState(null); // Tracks index of college details expanded
  const [showAll, setShowAll] = useState(false); // Toggle to show all matched colleges instead of top 4

  // Adjust default marks when switching exam type
  useEffect(() => {
    if (examType === 'EAPCET') {
      setMarks(85);
    } else if (examType === 'ECET') {
      setMarks(110);
    } else {
      setMarks(75);
    }
    setExpandedCollege(null); // Reset college detail expansions
    setShowAll(false); // Reset Show All toggle
  }, [examType]);

  // Reset expansions when filters change
  useEffect(() => {
    setExpandedCollege(null);
    setShowAll(false); // Reset Show All toggle
  }, [caste, region, income, branch, hometown]);

  // Simulator Logic
  const getSimulatedRank = () => {
    let baseRank = 100000;
    
    if (examType === 'EAPCET') {
      if (marks >= 120) baseRank = 800;
      else if (marks >= 100) baseRank = 2500;
      else if (marks >= 80) baseRank = 9000;
      else if (marks >= 60) baseRank = 24000;
      else if (marks >= 40) baseRank = 65000;
      else baseRank = 95000;
    } else if (examType === 'ECET') {
      // ECET out of 200 marks
      if (marks >= 160) baseRank = 150;
      else if (marks >= 140) baseRank = 500;
      else if (marks >= 120) baseRank = 1800;
      else if (marks >= 100) baseRank = 4000;
      else if (marks >= 80) baseRank = 10000;
      else if (marks >= 50) baseRank = 22000;
      else baseRank = 40000;
    } else {
      // POLYCET out of 120 marks
      if (marks >= 100) baseRank = 600;
      else if (marks >= 80) baseRank = 2200;
      else if (marks >= 60) baseRank = 7500;
      else if (marks >= 50) baseRank = 16000;
      else if (marks >= 36) baseRank = 35000;
      else baseRank = 65000;
    }
    
    // Category adjustments
    let modifier = 1.0;
    if (caste === 'BC') modifier = 0.85;
    if (caste === 'SC' || caste === 'ST') modifier = 0.6;
    if (caste === 'EWS') modifier = 0.9;
    
    return Math.max(1, Math.round(baseRank * modifier));
  };

  const getScholarshipEligibility = () => {
    const isPoly = examType === 'POLYCET';
    const amountText = isPoly ? "₹15,000/year allowance" : "₹20,000/year allowance";

    if (income === 'under-2.5') {
      return {
        eligible: true,
        jvd: `Eligible for Jagananna Vidya Deevena (100% Tuition Fee covered)`,
        javad: `Eligible for Jagananna Vasathi Deevena (${amountText} for hostel/mess)`,
        statusClass: "status-eligible"
      };
    } else if (income === '2.5-5' && (caste === 'SC' || caste === 'ST' || caste === 'BC')) {
      return {
        eligible: true,
        jvd: `Eligible for Jagananna Vidya Deevena (100% Tuition Fee covered)`,
        javad: `Eligible for Jagananna Vasathi Deevena (${amountText} for hostel/mess)`,
        statusClass: "status-eligible"
      };
    } else {
      return {
        eligible: false,
        jvd: "Not eligible for JVD Full Fee Reimbursement (Requires Income < ₹2.5 Lakhs)",
        javad: "Not eligible for JAVAD hostel support",
        statusClass: "status-ineligible"
      };
    }
  };

  const getCollegeMatches = (rank) => {
    // Select correct database (ECET maps to topColleges too since it is B.Tech entry)
    const colleges = examType === 'POLYCET' ? AP_PORTAL_DATA.polytechnicColleges : AP_PORTAL_DATA.topColleges;
    
    // Filter by hometown region if selected
    const regionFiltered = hometown === 'all' 
      ? colleges 
      : colleges.filter(col => col.cityRegion === hometown);

    return regionFiltered.map(col => {
      // ECET has 10x fewer seats (only 10% lateral entry), so make cutoff base rank 2.5x more difficult
      const scalingFactor = examType === 'ECET' ? 0.4 : 1.0;
      const cutoff = (col.baseCutoff || 25000) * scalingFactor;
      
      // university area local advantage (85% quota)
      let localAdvantage = 1.0;
      if (region === 'AU' && (col.cityRegion === 'vijayawada-guntur' || col.cityRegion === 'visakhapatnam' || col.cityRegion === 'kakinada-godavari')) {
        localAdvantage = 1.30; 
      }
      if (region === 'SVU' && (col.cityRegion === 'tirupati-nellore' || col.cityRegion === 'anantapur-kadapa')) {
        localAdvantage = 1.30; 
      }
      
      const adjustedCutoff = cutoff * localAdvantage;
      
      let chance = 'Low Chance';
      let chanceClass = 'chance-low';
      if (rank <= adjustedCutoff * 0.75) {
        chance = 'High Chance';
        chanceClass = 'chance-high';
      } else if (rank <= adjustedCutoff * 1.25) {
        chance = 'Medium Chance';
        chanceClass = 'chance-med';
      }
      
      return {
        ...col,
        chance,
        chanceClass
      };
    }).sort((a, b) => {
      const order = { 'High Chance': 3, 'Medium Chance': 2, 'Low Chance': 1 };
      return order[b.chance] - order[a.chance];
    });

    return showAll ? sorted : sorted.slice(0, 4); // return all if showAll is active, otherwise top 4
  };

  const simulatedRank = getSimulatedRank();
  const scholarship = getScholarshipEligibility();
  const matchedColleges = getCollegeMatches(simulatedRank);
  
  // Calculate total count of matching colleges for the current region filter
  const totalMatchedCount = (examType === 'POLYCET' ? AP_PORTAL_DATA.polytechnicColleges : AP_PORTAL_DATA.topColleges)
    .filter(col => hometown === 'all' ? true : col.cityRegion === hometown).length;

  const filteredColleges = AP_PORTAL_DATA.topColleges.filter(c => {
    if (collegeFilter === 'all') return true;
    if (collegeFilter === 'state') return c.type.includes('State');
    if (collegeFilter === 'national') return c.type.includes('National') || c.type.includes('PPP');
    return true;
  });

  const toggleExpandCollege = (idx) => {
    if (expandedCollege === idx) {
      setExpandedCollege(null);
    } else {
      setExpandedCollege(idx);
    }
  };

  return (
    <div className="ap-portal-container">
      {/* Hero Header */}
      <div className="ap-portal-hero glass-panel">
        <div className="ap-hero-badge">
          <Award size={16} />
          <span>Andhra Pradesh Student Hub</span>
        </div>
        <h1 className="ap-title">
          Opportunities & Resources For <br />
          <span className="orange-gradient-text">AP State Students</span>
        </h1>
        <p className="ap-subtitle">
          Your portal for local college admissions, rank simulators, Jagananna education schemes, and regional university directories.
        </p>
      </div>

      {/* Segment Navigation */}
      <div className="ap-segment-tabs glass-panel">
        <button 
          className={`segment-btn ${activeSubSection === 'matcher' ? 'active' : ''}`}
          onClick={() => setActiveSubSection('matcher')}
        >
          <Calculator size={18} />
          <span>College & Scholarship Predictor</span>
        </button>
        <button 
          className={`segment-btn ${activeSubSection === 'info' ? 'active' : ''}`}
          onClick={() => setActiveSubSection('info')}
        >
          <GraduationCap size={18} />
          <span>Admission info & Schemes</span>
        </button>
        <button 
          className={`segment-btn ${activeSubSection === 'colleges' ? 'active' : ''}`}
          onClick={() => setActiveSubSection('colleges')}
        >
          <BookOpen size={18} />
          <span>Browse Top Colleges</span>
        </button>
      </div>

      {/* SECTION 1: EAPCET / ECET / POLYCET Predictor Matcher */}
      {activeSubSection === 'matcher' && (
        <div className="tab-matcher">
          <div className="matcher-grid">
            
            {/* Left: Input Form */}
            <div className="matcher-form glass-panel">
              <div className="form-header">
                <Calculator className="form-icon purple" />
                <h3>Eligibility & Rank Predictor</h3>
              </div>
              <p className="form-intro-text">
                Select your target entrance exam, enter your marks, category, and preferred hometown region to view matched colleges.
              </p>

              {/* Exam Selector Toggles */}
              <div className="form-group">
                <label className="form-label">Target State Entrance Exam:</label>
                <div className="exam-toggle-row">
                  <button 
                    type="button"
                    className={`exam-toggle-btn ${examType === 'EAPCET' ? 'active' : ''}`}
                    onClick={() => setExamType('EAPCET')}
                  >
                    AP EAPCET (B.Tech)
                  </button>
                  <button 
                    type="button"
                    className={`exam-toggle-btn ${examType === 'ECET' ? 'active' : ''}`}
                    onClick={() => setExamType('ECET')}
                  >
                    AP ECET (Lateral)
                  </button>
                  <button 
                    type="button"
                    className={`exam-toggle-btn ${examType === 'POLYCET' ? 'active' : ''}`}
                    onClick={() => setExamType('POLYCET')}
                  >
                    AP POLYCET (Diploma)
                  </button>
                </div>
              </div>

              {/* Slider (160 marks for EAPCET, 200 for ECET, 120 marks for POLYCET) */}
              <div className="form-group">
                <label className="form-label-with-val">
                  <span>Expected Marks:</span>
                  <strong className="slider-value">
                    {marks} / {examType === 'EAPCET' ? 160 : examType === 'ECET' ? 200 : 120}
                  </strong>
                </label>
                <input 
                  type="range" 
                  min={examType === 'EAPCET' ? 40 : examType === 'ECET' ? 50 : 25} 
                  max={examType === 'EAPCET' ? 150 : examType === 'ECET' ? 190 : 115} 
                  value={marks} 
                  onChange={(e) => setMarks(Number(e.target.value))}
                  className="marks-slider"
                />
                <span className="slider-hint">
                  {examType === 'EAPCET' && "Qualifying mark: 40/160 (General). No minimum for SC/ST."}
                  {examType === 'ECET' && "Qualifying mark: 50/200 (25% for General). No minimum for SC/ST."}
                  {examType === 'POLYCET' && "Qualifying mark: 36/120 (30% for General). No minimum for SC/ST."}
                </span>
              </div>

              {/* Category & Reservation zone */}
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Caste / Category:</label>
                  <select value={caste} onChange={(e) => setCaste(e.target.value)} className="tracker-select select-full">
                    <option value="OC">OC (General)</option>
                    <option value="BC">BC (OBC)</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="EWS">EWS</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Local Reservation Zone:</label>
                  <select value={region} onChange={(e) => setRegion(e.target.value)} className="tracker-select select-full">
                    <option value="AU">AU Area (Andhra University)</option>
                    <option value="SVU">SVU Area (Sri Venkateswara Univ)</option>
                  </select>
                </div>
              </div>

              {/* Hometown Region & Family Income */}
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Hometown / Nearby Region:</label>
                  <select value={hometown} onChange={(e) => setHometown(e.target.value)} className="tracker-select select-full">
                    <option value="all">All AP Districts (No Preference)</option>
                    <option value="vijayawada-guntur">Vijayawada / Guntur (Krishna / Guntur / NTR / Palnadu)</option>
                    <option value="visakhapatnam">Visakhapatnam / Vizianagaram / Srikakulam</option>
                    <option value="kakinada-godavari">Kakinada / Rajahmundry / East & West Godavari</option>
                    <option value="tirupati-nellore">Tirupati / Nellore / Chittoor / Tirupati City</option>
                    <option value="anantapur-kadapa">Anantapur / Kadapa / Kurnool / Nandyal</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Annual Family Income:</label>
                  <select value={income} onChange={(e) => setIncome(e.target.value)} className="tracker-select select-full">
                    <option value="under-2.5">Under ₹2.5 Lakhs (Eligible for JVD)</option>
                    <option value="2.5-5">₹2.5 Lakhs to ₹5 Lakhs</option>
                    <option value="above-5">Over ₹5 Lakhs</option>
                  </select>
                </div>
              </div>

              {/* Branch options (B.Tech fields vs Diploma fields) */}
              <div className="form-group">
                <label className="form-label">Interested Branch / Stream:</label>
                {examType === 'POLYCET' ? (
                  <select value={branch} onChange={(e) => setBranch(e.target.value)} className="tracker-select select-full">
                    <option value="CSE">Diploma in Computer Engineering (CME)</option>
                    <option value="ECE">Diploma in Electronics & Comm (DECE)</option>
                    <option value="EEE">Diploma in Electrical & Electronics (DEEE)</option>
                    <option value="Mech">Diploma in Mechanical Engineering (DME)</option>
                    <option value="Civil">Diploma in Civil Engineering (DCE)</option>
                    <option value="Pharmacy">Diploma in Pharmacy (D.Pharm)</option>
                  </select>
                ) : (
                  <select value={branch} onChange={(e) => setBranch(e.target.value)} className="tracker-select select-full">
                    <option value="CSE">Computer Science & Engg (CSE)</option>
                    <option value="AIDS">AI & Data Science / ML</option>
                    <option value="IT">Information Technology (IT)</option>
                    <option value="ECE">Electronics & Comm (ECE)</option>
                    <option value="EEE">Electrical & Electronics (EEE)</option>
                    <option value="Mech">Mechanical Engineering (Mech)</option>
                    <option value="Civil">Civil Engineering (Civil)</option>
                    <option value="Chem">Chemical Engineering (Chem)</option>
                    <option value="Biotech">Biotechnology (Biotech)</option>
                  </select>
                )}
              </div>
            </div>

            {/* Right: Outputs */}
            <div className="matcher-results">
              
              {/* Rank Estimation */}
              <div className="result-block-rank glass-panel">
                <div className="rank-title-row">
                  <span>Predicted {examType} Rank:</span>
                  <Sparkles size={16} className="sparkle-icon" />
                </div>
                <div className="rank-value-display">
                  ~ {simulatedRank.toLocaleString()}
                </div>
                <p className="rank-disclaimer">
                  Based on expected marks of <strong>{marks}</strong> in {examType} under <strong>{caste}</strong> category. Ranks vary dynamically based on exam difficulty.
                </p>
              </div>

              {/* JVD Schemes Coverage */}
              <div className={`result-block-scheme glass-panel ${scholarship.statusClass}`}>
                <div className="scheme-status-header">
                  <Landmark size={18} />
                  <h4>Scholarship Eligibility (AP Government)</h4>
                </div>
                {scholarship.eligible ? (
                  <div className="eligible-perks">
                    <div className="perk-row">
                      <CheckCircle className="perk-check" size={16} />
                      <span>{scholarship.jvd}</span>
                    </div>
                    <div className="perk-row">
                      <CheckCircle className="perk-check" size={16} />
                      <span>{scholarship.javad}</span>
                    </div>
                  </div>
                ) : (
                  <div className="eligible-perks">
                    <p className="ineligible-text">{scholarship.jvd}</p>
                    <span className="ineligible-hint">Note: JVD fee reimbursement requires state counseling category admissions.</span>
                  </div>
                )}
              </div>

              {/* Matched Colleges List */}
              <div className="result-block-colleges glass-panel">
                <div className="colleges-box-header">
                  <h4>Suggested Local Colleges ({branch} Branch)</h4>
                  {totalMatchedCount > 4 && (
                    <button 
                      type="button"
                      className="show-all-col-btn"
                      onClick={() => {
                        setShowAll(!showAll);
                        setExpandedCollege(null);
                      }}
                    >
                      {showAll ? "Show Top 4" : `Show All (${totalMatchedCount})`}
                    </button>
                  )}
                </div>
                <span className="expand-hint-lbl">Click a college row to view fee structure</span>
                {matchedColleges.length > 0 ? (
                  <div className="colleges-matcher-list">
                    {matchedColleges.map((col, idx) => (
                      <div key={idx} className="match-college-container">
                        <div 
                          className={`match-college-row clickable ${expandedCollege === idx ? 'expanded-header' : ''}`}
                          onClick={() => toggleExpandCollege(idx)}
                        >
                          <div className="match-col-info">
                            <h5>{col.name}</h5>
                            <span>{col.location} &bull; {col.ratings}</span>
                          </div>
                          <div className="match-chance-row-right">
                            <div className={`match-chance-badge ${col.chanceClass}`}>
                              {col.chance}
                            </div>
                            {expandedCollege === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </div>
                        </div>

                        {/* Expandable college details / fee structure */}
                        {expandedCollege === idx && (
                          <div className="match-college-details glass-panel">
                            <div className="details-grid">
                              <div className="details-col">
                                <span className="detail-label">Location / Region:</span>
                                <span className="detail-value">{col.location} ({col.cityRegion.toUpperCase()} region)</span>
                              </div>
                              <div className="details-col">
                                <span className="detail-label">College Type:</span>
                                <span className="detail-value">{col.type}</span>
                              </div>
                              <div className="details-col">
                                <span className="detail-label">Ratings / Grade:</span>
                                <span className="detail-value">{col.ratings}</span>
                              </div>
                              <div className="details-col">
                                <span className="detail-label">Popular For:</span>
                                <span className="detail-value">{col.popularFor}</span>
                              </div>
                            </div>

                            <div className="college-fees-breakdown">
                              <span className="fees-section-title">Annual Fee Structure By Quota:</span>
                              <div className="fees-grid">
                                <div className="fee-card glass-panel">
                                  <span className="quota-title">Category-A (Convenor)</span>
                                  <strong className="quota-fee-val">{col.fees?.convenor || "₹4,700/year"}</strong>
                                  <span className="quota-fee-desc">
                                    {scholarship.eligible 
                                      ? "✅ 100% Free via JVD Scholarship" 
                                      : "Paid by student (counseling allotment)"}
                                  </span>
                                </div>
                                <div className="fee-card glass-panel">
                                  <span className="quota-title">Category-B (Management)</span>
                                  <strong className="quota-fee-val">{col.fees?.management || "N/A"}</strong>
                                  <span className="quota-fee-desc">JEE/Marks intake (no JVD scheme)</span>
                                </div>
                                <div className="fee-card glass-panel">
                                  <span className="quota-title">NRI Quota Seat</span>
                                  <strong className="quota-fee-val">{col.fees?.nri || "N/A"}</strong>
                                  <span className="quota-fee-desc">Direct admission (high fees)</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-matches-predictor">
                    <Info size={16} className="info-icon" />
                    <span>No colleges match in this specific region tier. Try selecting "All AP Districts" or adjusting marks.</span>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

      {/* SECTION 2: Quotas, Schemes, Zones, and Counseling steps */}
      {activeSubSection === 'info' && (
        <div className="ap-content-grid">
          {/* Left Side */}
          <div className="ap-left-panel">
            {/* Schemes Section */}
            <section className="ap-section">
              <h2 className="section-heading">
                <Landmark className="section-icon orange" />
                <span>AP Government Incentive Schemes</span>
              </h2>
              <p className="section-desc">Highly beneficial financial assistance schemes sponsored by the Government of Andhra Pradesh for local students.</p>
              
              <div className="schemes-stack">
                {AP_PORTAL_DATA.schemes.map((scheme, idx) => (
                  <div key={idx} className="scheme-card glass-panel">
                    <div className="scheme-header">
                      <h3>{scheme.name}</h3>
                      <span className="scheme-type">{scheme.type}</span>
                    </div>
                    <div className="scheme-body">
                      <p className="scheme-benefits">
                        <strong>Financial Benefits:</strong> {scheme.benefits}
                      </p>
                      <div className="eligibility-box">
                        <Info size={14} className="info-icon" />
                        <span><strong>Eligibility:</strong> {scheme.eligibility}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Admission Quotas Section */}
            <section className="ap-section">
              <h2 className="section-heading">
                <ShieldCheck className="section-icon pink" />
                <span>Admission Categories & Seat Quotas</span>
              </h2>
              <p className="section-desc">
                Understand how seats are allocated in local AP colleges. Knowing these channels is essential for managing admissions and scholarship eligibility.
              </p>
              
              <div className="quotas-stack">
                {AP_PORTAL_DATA.admissionQuotas.map((quota, idx) => (
                  <div key={idx} className="quota-row glass-panel">
                    <div className="quota-header">
                      <h4>{quota.name}</h4>
                      <span className="quota-share">{quota.share}</span>
                    </div>
                    <p className="quota-details"><strong>Criteria:</strong> {quota.criteria}</p>
                    <p className="quota-benefits-text"><strong>Scholarship Status:</strong> {quota.benefits}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Zones Section */}
            <section className="ap-section">
              <h2 className="section-heading">
                <MapPin className="section-icon cyan" />
                <span>Local Reservation Areas (Districts)</span>
              </h2>
              <p className="section-desc">
                APSCHE reserves <strong>85% of seats</strong> for local candidates in respective university areas. Check where your home district falls.
              </p>
              
              <div className="zones-grid">
                {AP_PORTAL_DATA.reservationZones.map((zone, idx) => (
                  <div key={idx} className="zone-card glass-panel">
                    <h3>{zone.name}</h3>
                    <p className="zone-districts"><strong>Districts Covered:</strong> {zone.districts}</p>
                    <div className="zone-quota-badge">
                      <ShieldCheck size={14} />
                      <span>{zone.quota}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Side: Counseling Steps */}
          <div className="ap-right-panel">
            <section className="ap-section sticky-sidebar">
              <h2 className="section-heading">
                <GraduationCap className="section-icon purple" />
                <span>APSCHE Admission Counseling Roadmap</span>
              </h2>
              <p className="section-desc">
                The standardized web counseling workflow for AP EAPCET, ECET, and POLYCET admissions.
              </p>
              
              <div className="counseling-checklist">
                {AP_PORTAL_DATA.admissionSteps.map((step, idx) => (
                  <div key={idx} className="checklist-item glass-panel">
                    <div className="checklist-marker">
                      <CheckCircle className="check-icon-active" size={18} />
                    </div>
                    <div className="checklist-info">
                      <h4>{step.phase}</h4>
                      <p>{step.details}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="counseling-tip glass-panel">
                <div className="tip-header">
                  <Info className="tip-icon" size={18} />
                  <strong>Critical Counseling Tip: Web Options</strong>
                </div>
                <p>
                  During counseling, always select a mix of dream colleges and backup colleges. Do not freeze options until you have filled at least 30-40 choices to avoid missing seat allotments!
                </p>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* SECTION 3: College Directory Section */}
      {activeSubSection === 'colleges' && (
        <section className="ap-section college-directory-section">
          <div className="college-header-row">
            <div>
              <h2 className="section-heading">
                <BookOpen className="section-icon pink" />
                <span>Top Academic Institutes in AP</span>
              </h2>
              <p className="section-desc">Premier national-level institutes and state-owned universities located within Andhra Pradesh.</p>
            </div>
            
            <div className="college-filter-tabs glass-panel">
              <button
                className={`filter-btn ${collegeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setCollegeFilter('all')}
              >
                All Colleges
              </button>
              <button
                className={`filter-btn ${collegeFilter === 'state' ? 'active' : ''}`}
                onClick={() => setCollegeFilter('state')}
              >
                State Universities
              </button>
              <button
                className={`filter-btn ${collegeFilter === 'national' ? 'active' : ''}`}
                onClick={() => setCollegeFilter('national')}
              >
                National Institutes
              </button>
            </div>
          </div>

          <div className="colleges-grid cards-grid">
            {filteredColleges.map((college, idx) => (
              <div key={idx} className="college-card glass-panel">
                <div className="college-meta">
                  <span className="college-type-badge">{college.type}</span>
                  <span className="college-rating">{college.ratings}</span>
                </div>
                <h3>{college.name}</h3>
                <p className="college-location">
                  <MapPin size={14} />
                  <span>{college.location}</span>
                </p>
                <div className="divider" />
                <p className="college-popular">
                  <strong>Popular Streams:</strong> {college.popularFor}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
