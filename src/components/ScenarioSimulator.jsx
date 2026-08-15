import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingDown, AlertTriangle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import BarrelInventory from './BarrelInventory';
import { scenarios, getInventoryTimeline, recommendations, whyRecommendation, recommendationConfidence } from '../data/demoData';
import './ScenarioSimulator.css';

const ScenarioSimulator = ({ onNavigate }) => {
  const [selectedDuration, setSelectedDuration] = useState(90);
  const [showWhyRecommendation, setShowWhyRecommendation] = useState(false);
  
  const scenario = scenarios[selectedDuration];
  const recommendation = recommendations[selectedDuration] || recommendations[90];
  const timelineData = getInventoryTimeline(selectedDuration);

  const getDurationClass = (duration) => {
    return selectedDuration === duration ? 'active' : '';
  };

  const getBarrelCount = () => {
    if (selectedDuration === 30) return 4;
    if (selectedDuration === 90) return 2;
    return 0;
  };

  return (
    <div className="scenario-simulator-section" id="scenarios">
      {/* Header */}
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title">What If?</h2>
        <p className="section-subtitle">
          Stress-test the business before reality does.
        </p>
      </motion.div>

      {/* Duration Selector */}
      <motion.div
        className="duration-selector"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <button
          className={`duration-btn ${getDurationClass(30)}`}
          onClick={() => setSelectedDuration(30)}
        >
          30 DAYS
        </button>
        <button
          className={`duration-btn ${getDurationClass(90)}`}
          onClick={() => setSelectedDuration(90)}
        >
          90 DAYS
        </button>
        <button
          className={`duration-btn ${getDurationClass(180)}`}
          onClick={() => setSelectedDuration(180)}
        >
          180 DAYS
        </button>
      </motion.div>

      {/* Scenario Summary */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDuration}
          className="scenario-summary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <div className="summary-grid">
            <div className="summary-card">
              <div className="summary-label">Inventory Runway</div>
              <div className="summary-value">{scenario.inventoryRunway} days</div>
            </div>
            
            <div className="summary-card">
              <div className="summary-label">Projected Supply Gap</div>
              <div className={`summary-value ${scenario.supplyGap > 0 ? 'critical' : 'success'}`}>
                {scenario.supplyGap > 0 ? `${scenario.supplyGap} days` : '0 days'}
              </div>
            </div>
            
            <div className="summary-card">
              <div className="summary-label">Production Impact</div>
              <div className="summary-value critical">{scenario.productionImpact}%</div>
            </div>
            
            <div className="summary-card">
              <div className="summary-label">Risk Level</div>
              <div className={`summary-value ${scenario.risk === 'CRITICAL' ? 'critical' : 'warning'}`}>
                {scenario.risk}
              </div>
            </div>
          </div>
          
          <div className="scenario-description">
            <AlertTriangle size={18} />
            <p>{scenario.description}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Inventory Visualization */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`barrels-${selectedDuration}`}
          className="inventory-visualization"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="viz-title">Inventory Timeline</h3>
          <BarrelInventory 
            count={getBarrelCount()} 
            total={5}
            label="Current Inventory Status"
          />
          
          {scenario.supplyGap > 0 && (
            <div className="critical-threshold">
              <AlertTriangle size={16} />
              <span>CRITICAL THRESHOLD REACHED ON DAY {scenario.inventoryRunway}</span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Business Impact Chart */}
      <motion.div
        className="impact-chart-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="chart-title">Inventory Depletion Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={timelineData}>
            <defs>
              <linearGradient id="inventoryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="day" 
              stroke="rgba(255,255,255,0.5)"
              label={{ value: 'Days', position: 'insideBottom', offset: -5, fill: 'rgba(255,255,255,0.7)' }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)"
              label={{ value: 'Inventory %', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.7)' }}
            />
            <Tooltip 
              contentStyle={{ 
                background: '#1a1b23', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="inventory" 
              stroke="#f59e0b" 
              strokeWidth={2}
              fill="url(#inventoryGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Projected Business Impact */}
      <motion.div
        className="business-impact"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="impact-title">Projected Business Impact</h3>
        <div className="impact-metrics">
          <div className="impact-metric">
            <div className="impact-label">Cost Impact</div>
            <div className="impact-value warning">+{scenario.costImpact}%</div>
          </div>
          <div className="impact-metric">
            <div className="impact-label">Production Impact</div>
            <div className="impact-value critical">{scenario.productionImpact}%</div>
          </div>
          <div className="impact-metric">
            <div className="impact-label">Customer Commitments at Risk</div>
            <div className="impact-value critical">{scenario.customerRisk}</div>
          </div>
        </div>
      </motion.div>

      {/* Recommendation Panel */}
      {selectedDuration >= 90 && (
        <motion.div
          className="recommendation-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="recommendation-header">
            <h3 className="recommendation-title">Horizon Recommendation</h3>
            <span className="confidence-badge">
              Confidence: {recommendationConfidence.value}%
            </span>
          </div>
          
          <p className="recommendation-text">{recommendation.title}</p>
          
          <div className="recommendation-actions">
            {recommendation.actions.map((action) => (
              <div key={action.id} className="action-card">
                <div className="action-number">{String(action.id).padStart(2, '0')}</div>
                <div className="action-content">
                  <div className="action-title">{action.title}</div>
                  <div className="action-description">{action.description}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="recommendation-impact">
            <h4 className="impact-subtitle">Projected Impact of Recommendation</h4>
            <div className="impact-comparison">
              <div className="comparison-item">
                <div className="comparison-label">Supply Gap</div>
                <div className="comparison-values">
                  <span className="before critical">{recommendation.impact.supplyGapBefore} days</span>
                  <span className="arrow">→</span>
                  <span className="after success">{recommendation.impact.supplyGapAfter} days</span>
                </div>
              </div>
              
              <div className="comparison-item">
                <div className="comparison-label">Production Continuity</div>
                <div className="comparison-values">
                  <span className="before warning">{recommendation.impact.continuityBefore}%</span>
                  <span className="arrow">→</span>
                  <span className="after success">{recommendation.impact.continuityAfter}%</span>
                </div>
              </div>
              
              <div className="comparison-item">
                <div className="comparison-label">Risk Level</div>
                <div className="comparison-values">
                  <span className="before critical">{recommendation.impact.riskBefore}</span>
                  <span className="arrow">→</span>
                  <span className="after warning">{recommendation.impact.riskAfter}</span>
                </div>
              </div>
            </div>
          </div>

          <button 
            className="btn btn-primary btn-full"
            onClick={() => onNavigate('strategy')}
          >
            VIEW STRATEGY
          </button>

          {/* Why Recommendation Expandable */}
          <div className="why-recommendation">
            <button 
              className="why-btn"
              onClick={() => setShowWhyRecommendation(!showWhyRecommendation)}
            >
              <span>Why this recommendation?</span>
              {showWhyRecommendation ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            <AnimatePresence>
              {showWhyRecommendation && (
                <motion.div
                  className="why-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="reasoning-items">
                    {whyRecommendation.map((item) => (
                      <div key={item.id} className="reasoning-item">
                        <div className="reasoning-number">{String(item.id).padStart(2, '0')}</div>
                        <div className="reasoning-content">
                          <div className="reasoning-title">{item.title}</div>
                          <div className="reasoning-value">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="uncertainty-note">
                    <div className="uncertainty-label">Biggest Uncertainty</div>
                    <div className="uncertainty-value">{recommendationConfidence.uncertainty}</div>
                    <p className="uncertainty-disclaimer">
                      This is a prototype explanation. Do not claim the AI has perfect knowledge.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ScenarioSimulator;
