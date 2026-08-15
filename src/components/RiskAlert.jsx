import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, TrendingUp, Activity, ArrowRight, AlertCircle } from 'lucide-react';
import NasaGlobe from './NasaGlobe';
import './RiskAlert.css';

const RiskAlert = ({ 
  title, 
  riskScore, 
  confidence, 
  signals = [],
  onAction,
  actionLabel = "REVIEW EXPOSURE"
}) => {
  return (
    <motion.div
      className="risk-alert-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="risk-alert-grid">
        {/* Left Section: Risk Score & Details */}
        <div className="risk-left-section">
          {/* Warning Badge */}
          <div className="warning-badge">
            <AlertTriangle size={16} />
            <span>EARLY WARNING</span>
          </div>

          {/* Title */}
          <h3 className="risk-title">{title}</h3>

          {/* Risk Metrics Row */}
          <div className="risk-metrics-row">
            <div className="risk-score-display">
              <div className="score-circle">
                <svg className="score-ring" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="var(--color-surface-elevated)"
                    strokeWidth="6"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="6"
                    strokeDasharray={`${(riskScore / 100) * 263.89} 263.89`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    className="score-progress"
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EF4A5F" />
                      <stop offset="100%" stopColor="#F59E0B" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="score-content">
                  <span className="score-number">{riskScore}</span>
                  <span className="score-max">/100</span>
                </div>
              </div>
              <div className="score-label">RISK SCORE</div>
            </div>

            <div className="confidence-box">
              <div className="confidence-label">CONFIDENCE</div>
              <div className="confidence-value">{confidence}%</div>
            </div>
          </div>

          {/* Key Signals Detected */}
          <div className="key-signals-section">
            <div className="signals-header">KEY SIGNALS DETECTED</div>
            <div className="signals-list">
              <div className="signal-row">
                <TrendingDown size={14} className="signal-icon negative" />
                <span className="signal-label">Shipping activity</span>
                <span className="signal-value negative">-38%</span>
              </div>
              <div className="signal-row">
                <TrendingUp size={14} className="signal-icon positive" />
                <span className="signal-label">Freight rates</span>
                <span className="signal-value positive">+27%</span>
              </div>
              <div className="signal-row">
                <AlertCircle size={14} className="signal-icon warning" />
                <span className="signal-label">Geopolitical signals</span>
                <span className="signal-value warning">4 elevated</span>
              </div>
              <div className="signal-row">
                <Activity size={14} className="signal-icon positive" />
                <span className="signal-label">Port congestion</span>
                <span className="signal-value positive">+19%</span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="risk-disclaimer">
            <AlertCircle size={14} />
            <p>These signals do not predict a disruption with certainty. They indicate increasing exposure that may warrant preparation.</p>
          </div>
        </div>

        {/* Right Section: NASA Globe */}
        <div className="risk-right-section">
          <div className="map-container">
            <NasaGlobe />
          </div>

          {/* Action Button */}
          <button className="review-button" onClick={onAction}>
            {actionLabel}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Recent Activity Sidebar */}
      <div className="recent-activity-sidebar">
        <div className="activity-header">
          <span>RECENT ACTIVITY</span>
          <button className="view-all-btn">View All</button>
        </div>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon critical">
              <AlertTriangle size={12} />
            </div>
            <div className="activity-details">
              <div className="activity-title">Geopolitical tension reported in Persian Gulf region</div>
              <div className="activity-time">10 min ago</div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon warning">
              <TrendingUp size={12} />
            </div>
            <div className="activity-details">
              <div className="activity-title">Freight rates on Gulf route increased by 27%</div>
              <div className="activity-time">35 min ago</div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon critical">
              <TrendingDown size={12} />
            </div>
            <div className="activity-details">
              <div className="activity-title">Shipping activity through Hormuz declined by 38%</div>
              <div className="activity-time">1 hr ago</div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon info">
              <Activity size={12} />
            </div>
            <div className="activity-details">
              <div className="activity-title">Contingency Plan B updated</div>
              <div className="activity-time">2 hrs ago</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RiskAlert;
