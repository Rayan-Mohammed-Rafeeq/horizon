import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, DollarSign, Clock, TrendingDown, Shield } from 'lucide-react';
import { strategies } from '../data/demoData';
import './Strategy.css';

const StrategyCard = ({ strategy, isSelected, onToggle, delay = 0 }) => {
  const getRiskBadgeClass = (risk) => {
    switch (risk) {
      case 'HIGH':
        return 'badge-critical';
      case 'MEDIUM':
        return 'badge-warning';
      case 'LOW':
        return 'badge-success';
      default:
        return 'badge-neutral';
    }
  };

  return (
    <motion.div
      className={`strategy-card ${isSelected ? 'selected' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={onToggle}
    >
      {isSelected && (
        <div className="selected-indicator">
          <CheckCircle size={20} />
        </div>
      )}

      <div className="strategy-header">
        <h4 className="strategy-title">{strategy.title}</h4>
        <span className={`badge ${getRiskBadgeClass(strategy.risk)}`}>
          {strategy.risk}
        </span>
      </div>

      <p className="strategy-description">{strategy.description}</p>

      <div className="strategy-metrics">
        {strategy.cost && (
          <div className="strategy-metric">
            <DollarSign size={16} />
            <div>
              <div className="metric-label-tiny">Cost</div>
              <div className="metric-value-tiny">{strategy.cost}</div>
            </div>
          </div>
        )}

        {strategy.arrival && (
          <div className="strategy-metric">
            <Clock size={16} />
            <div>
              <div className="metric-label-tiny">Arrival</div>
              <div className="metric-value-tiny">{strategy.arrival}</div>
            </div>
          </div>
        )}

        {strategy.coverage && (
          <div className="strategy-metric">
            <Shield size={16} />
            <div>
              <div className="metric-label-tiny">Coverage</div>
              <div className="metric-value-tiny">{strategy.coverage}</div>
            </div>
          </div>
        )}

        {strategy.production && (
          <div className="strategy-metric">
            <TrendingDown size={16} />
            <div>
              <div className="metric-label-tiny">Production</div>
              <div className="metric-value-tiny">{strategy.production}</div>
            </div>
          </div>
        )}
      </div>

      <button 
        className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'} btn-block`}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        {isSelected ? 'SELECTED' : 'SELECT'}
      </button>
    </motion.div>
  );
};

const Strategy = () => {
  const [selectedStrategies, setSelectedStrategies] = useState([]);
  const [planActivated, setPlanActivated] = useState(false);

  const handleToggleStrategy = (strategyId) => {
    setSelectedStrategies(prev => {
      if (prev.includes(strategyId)) {
        return prev.filter(id => id !== strategyId);
      } else {
        return [...prev, strategyId];
      }
    });
    setPlanActivated(false);
  };

  const calculateCombinedImpact = () => {
    const selected = strategies.filter(s => selectedStrategies.includes(s.id));
    
    let totalGapReduction = selected.reduce((sum, s) => sum + (s.impactOnGap || 0), 0);
    let totalContinuityIncrease = selected.reduce((sum, s) => sum + (s.impactOnContinuity || 0), 0);
    
    const baseGap = 13; // From 90-day scenario
    const baseContinuity = 82;
    
    const projectedGap = Math.max(0, baseGap + totalGapReduction);
    const projectedContinuity = Math.min(100, baseContinuity + totalContinuityIncrease);
    
    return {
      supplyGap: projectedGap,
      continuity: projectedContinuity
    };
  };

  const impact = calculateCombinedImpact();

  return (
    <div className="strategy-section" id="strategy">
      {/* Header */}
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title">Prepare</h2>
        <p className="section-subtitle">
          Choose the continuity strategy that best protects operations.
        </p>
      </motion.div>

      {/* Strategy Cards */}
      <div className="strategies-grid">
        {strategies.map((strategy, index) => (
          <StrategyCard
            key={strategy.id}
            strategy={strategy}
            isSelected={selectedStrategies.includes(strategy.id)}
            onToggle={() => handleToggleStrategy(strategy.id)}
            delay={index * 0.15}
          />
        ))}
      </div>

      {/* Combined Impact Summary */}
      <AnimatePresence>
        {selectedStrategies.length > 0 && (
          <motion.div
            className="combined-impact"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="impact-header">
              <h3 className="impact-title">Selected Strategy</h3>
              <div className="selected-strategies">
                {selectedStrategies.map((id, index) => {
                  const strategy = strategies.find(s => s.id === id);
                  return (
                    <span key={id} className="strategy-tag">
                      {strategy?.title}
                      {index < selectedStrategies.length - 1 && ' + '}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="impact-results">
              <div className="result-card">
                <div className="result-label">Projected Supply Gap</div>
                <div className={`result-value ${impact.supplyGap === 0 ? 'success' : 'warning'}`}>
                  {impact.supplyGap} days
                </div>
              </div>

              <div className="result-card">
                <div className="result-label">Production Continuity</div>
                <div className="result-value success">
                  {impact.continuity}%
                </div>
              </div>
            </div>

            <button 
              className={`btn ${planActivated ? 'btn-success' : 'btn-primary'} btn-large btn-block`}
              onClick={() => setPlanActivated(true)}
              disabled={planActivated}
            >
              {planActivated ? (
                <>
                  <CheckCircle size={20} />
                  PLAN ACTIVATED
                </>
              ) : (
                'ACTIVATE PLAN'
              )}
            </button>

            {planActivated && (
              <motion.div
                className="activation-success"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle size={18} />
                <p>
                  Continuity plan activated. All relevant teams have been notified
                  and implementation is underway.
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Strategy;
