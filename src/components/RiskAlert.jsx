import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, TrendingUp, Activity } from 'lucide-react';
import './RiskAlert.css';

const RiskAlert = ({ 
  title, 
  description, 
  riskScore, 
  confidence, 
  signals = [],
  onAction,
  actionLabel = "REVIEW EXPOSURE"
}) => {
  return (
    <motion.div
      className="risk-alert"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="risk-alert-header">
        <div className="risk-alert-icon">
          <AlertTriangle size={24} />
        </div>
        <div className="risk-alert-title-section">
          <div className="risk-alert-badge">
            <Activity size={12} className="pulse-icon" />
            EARLY WARNING
          </div>
          <h3 className="risk-alert-title">{title}</h3>
        </div>
      </div>

      {/* Risk Score */}
      <div className="risk-metrics">
        <div className="risk-metric">
          <div className="risk-metric-label">Risk Score</div>
          <div className="risk-metric-value">
            <span className="score-current">{riskScore}</span>
            <span className="score-max">/ 100</span>
          </div>
        </div>
        
        <div className="risk-metric">
          <div className="risk-metric-label">Confidence</div>
          <div className="risk-metric-value">
            <span className="confidence-value">{confidence}%</span>
          </div>
        </div>
      </div>

      {/* Signals */}
      {signals.length > 0 && (
        <div className="risk-signals">
          <div className="signals-label">Signals detected</div>
          <div className="signals-grid">
            {signals.map((signal, index) => (
              <motion.div
                key={index}
                className="signal-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="signal-name">{signal.label}</div>
                <div className={`signal-value ${signal.value.includes('↓') ? 'negative' : 'positive'}`}>
                  {signal.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="risk-alert-description">
          {description}
        </div>
      )}

      {/* Action Button */}
      {onAction && (
        <button className="btn btn-warning risk-alert-action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
};

export default RiskAlert;
