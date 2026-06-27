import React, { useState } from 'react';
import { Menu, X, Compass, Award, HelpCircle, BookOpen, Layers, CheckSquare, Sun, Moon } from 'lucide-react';
import './Header.css';

export default function Header({ activeTab, setActiveTab, theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'pathways', label: 'Career Paths', icon: Layers },
    { id: 'ap-portal', label: 'AP Student Portal', icon: Award },
    { id: 'quiz', label: 'Career Quiz', icon: CheckSquare },
    { id: 'exams', label: 'Exams Tracker', icon: BookOpen },
    { id: 'parents-guide', label: "Parents' Guide", icon: HelpCircle },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  return (
    <header className="main-header glass-panel">
      <div className="header-container">
        {/* Logo */}
        <div className="logo-section" onClick={() => setActiveTab('dashboard')}>
          <div className="logo-icon-wrapper">
            <Compass className="logo-icon" />
          </div>
          <div className="logo-text">
            <span className="logo-title">Study2Success</span>
            <span className="logo-subtitle">Career Guide</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link ${isActive ? 'active' : ''} ${item.id === 'ap-portal' ? 'nav-ap-special' : ''}`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
                {item.id === 'ap-portal' && <span className="ap-dot animate-pulse-glow" />}
              </button>
            );
          })}
        </nav>

        {/* Highlight Badge & Theme Toggle */}
        <div className="header-actions">
          <button onClick={toggleTheme} className="theme-toggle-btn glass-panel" aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <div className="ap-header-badge">
            <span className="badge badge-ap">AP Region Active</span>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="mobile-drawer glass-panel">
          <nav className="mobile-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
