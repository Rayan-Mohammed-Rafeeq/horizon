import { useState, useEffect } from 'react';
import { Menu, Zap, Shield, Globe, ChevronDown, Sun, Moon } from 'lucide-react';
import { company } from '../data/demoData';
import './Topbar.css';

const Topbar = ({ onMenuClick, showMenuButton = false, theme, onToggleTheme }) => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="topbar">
      {/* Animated scan line */}
      <div className="topbar-scanline" />

      <div className="topbar-content">

        {/* ── LEFT ───────────────────────────── */}
        <div className="topbar-left">
          {showMenuButton && (
            <button className="btn btn-ghost menu-button" onClick={onMenuClick}>
              <Menu size={18} />
            </button>
          )}

          {/* Company pill */}
          <div className="company-pill">
            <div className="company-pill-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21v-4a3 3 0 0 1 6 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="company-pill-text">
              <span className="company-pill-name">{company.name}</span>
              <span className="company-pill-meta">{company.country} · {company.type}</span>
            </div>
            <ChevronDown size={13} className="company-pill-chevron" />
          </div>

          {/* Divider */}
          <div className="topbar-divider" />

          {/* System health chips */}
          <div className="health-chips">
            <div className="health-chip chip-green">
              <Zap size={11} />
              <span>AI Engine</span>
              <span className="chip-status">ACTIVE</span>
            </div>
            <div className="health-chip chip-blue">
              <Globe size={11} />
              <span>Signal Feed</span>
              <span className="chip-status">LIVE</span>
            </div>
            <div className="health-chip chip-violet">
              <Shield size={11} />
              <span>Risk Model</span>
              <span className="chip-status">v2.4</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT ──────────────────────────── */}
        <div className="topbar-right">

          {/* Theme toggle */}
          <button 
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun size={16} strokeWidth={2} />
            ) : (
              <Moon size={16} strokeWidth={2} />
            )}
          </button>

          {/* Demo badge */}
          <div className="demo-pill">
            <span className="demo-pill-dot" />
            <span>DEMO</span>
          </div>

          {/* Clock */}
          <div className="clock-block">
            <span className="clock-time">{time}</span>
            <span className="clock-date">IST · {date}</span>
          </div>

          {/* Avatar */}
          <div className="tb-avatar">
            <span>BM</span>
            <div className="avatar-ring" />
          </div>
        </div>
      </div>

      {/* ── Bottom gradient border ─────────── */}
      <div className="topbar-bottom-line" />
    </header>
  );
};

export default Topbar;
