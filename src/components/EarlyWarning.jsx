import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, Activity } from 'lucide-react';
import { earlyWarningSignals, riskScore, riskExplanation } from '../data/demoData';
import './EarlyWarning.css';

const SignalCard = ({ signal, delay = 0 }) => {
  const getTrendIcon = () => {
    switch (signal.trend) {
      case 'down':
        return <TrendingDown size={20} />;
      case 'up':
        return <TrendingUp size={20} />;
      default:
        return <Activity size={20} />;
    }
  };

  const getStatusClass = () => {
    switch (signal.status) {
      case 'critical':
        return 'status-critical';
      case 'warning':
        return 'status-warning';
      default:
        return 'status-normal';
    }
  };

  return (
    <motion.div
      className={`signal-card ${getStatusClass()}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="signal-icon">{getTrendIcon()}</div>
      <div className="signal-content">
        <div className="signal-category">{signal.category}</div>
        <div className="signal-value-large">{signal.value}</div>
        <div className="signal-description">{signal.label}</div>
      </div>
    </motion.div>
  );
};

const EarlyWarning = ({ onNavigate }) => {
  return (
    <div className="early-warning-section" id="early-warning">
      {/* Header */}
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title">Early Warning</h2>
        <p className="section-subtitle">
          External signals translated into company-specific exposure.
        </p>
      </motion.div>

      {/* Signal Cards Grid */}
      <div className="signals-grid-large">
        {earlyWarningSignals.map((signal, index) => (
          <SignalCard key={signal.id} signal={signal} delay={index * 0.1} />
        ))}
      </div>

      {/* Risk Assessment */}
      <motion.div
        className="risk-assessment"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="assessment-grid">
          {/* Risk Score */}
          <div className="assessment-card">
            <div className="assessment-label">RISK SCORE</div>
            <div className="assessment-value critical">
              <span className="score-large">{riskScore.current}</span>
              <span className="score-max-large">/ {riskScore.max}</span>
            </div>
          </div>

          {/* Exposure Level */}
          <div className="assessment-card">
            <div className="assessment-label">EXPOSURE</div>
            <div className="assessment-value critical">
              {riskScore.level}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Why It Matters */}
      <motion.div
        className="why-matters"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="why-matters-title">Why It Matters</h3>
        <div className="why-matters-content">
          <p className="why-matters-text">{riskExplanation.dependency}</p>
          <p className="why-matters-text">{riskExplanation.runway}</p>
        </div>
      </motion.div>

      {/* Action Button */}
      <motion.div
        className="action-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <button 
          className="btn btn-primary btn-large"
          onClick={() => onNavigate('scenarios')}
        >
          SIMULATE DISRUPTION
        </button>
      </motion.div>
    </div>
  );
};

export default EarlyWarning;
