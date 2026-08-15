import { Menu, Activity } from 'lucide-react';
import { company } from '../data/demoData';
import './Topbar.css';

const Topbar = ({ onMenuClick, showMenuButton = false }) => {
  return (
    <header className="topbar">
      <div className="topbar-content">
        {/* Left Section */}
        <div className="topbar-left">
          {showMenuButton && (
            <button 
              className="btn btn-ghost menu-button"
              onClick={onMenuClick}
              aria-label="Toggle menu"
            >
              <Menu size={20} />
            </button>
          )}
          
          <div className="topbar-brand">
            <h1 className="brand-name">HORIZON</h1>
            <div className="live-indicator">
              <Activity size={12} className="pulse-icon" />
              <span>LIVE DEMO</span>
            </div>
          </div>
        </div>

        {/* Center Section */}
        <div className="topbar-center">
          <div className="company-info">
            <h2 className="company-name">{company.name}</h2>
            <div className="company-meta">
              {company.country} · {company.industry}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="topbar-right">
          <div className="risk-status">
            <div className="risk-label">Risk Status</div>
            <div className="risk-value high">HIGH EXPOSURE</div>
          </div>
          
          <div className="timestamp">
            <div className="timestamp-label">Simulation environment</div>
            <div className="timestamp-value">
              {new Date().toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Demo Environment Banner */}
      <div className="demo-banner">
        <span className="demo-banner-text">
          DEMO ENVIRONMENT · ILLUSTRATIVE DATA
        </span>
      </div>
    </header>
  );
};

export default Topbar;
