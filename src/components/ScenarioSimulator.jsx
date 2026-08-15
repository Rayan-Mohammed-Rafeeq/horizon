import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingDown, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, AlertOctagon, TrendingUp, BarChart3, Shield, ClipboardCheck } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import BarrelInventory from './BarrelInventory';
import { scenarios, getInventoryTimeline, recommendations, whyRecommendation, recommendationConfidence } from '../data/demoData';
import './ScenarioSimulator.css';

const ScenarioSimulator = ({ onNavigate }) => {
  const [selectedDuration, setSelectedDuration] = useState(90);
  const [disruptionType, setDisruptionType] = useState('Strait of Hormuz Closure');
  const [footprintIntensity, setFootprintIntensity] = useState('High');
  const [recoveryAssumption, setRecoveryAssumption] = useState('Slow');
  
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
        className="scenario-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-left">
          <h2 className="scenario-number">SCENARIO SIMULATOR</h2>
          <p className="scenario-subtitle">
            Stress-test the business under multiple what-if scenarios.
          </p>
        </div>
        <div className="live-feed-badge">
          <span className="live-dot"></span>
          LIVE FEED
        </div>
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

      {/* Main Content Grid */}
      <div className="scenario-content-grid">
        {/* Left Column */}
        <div className="scenario-left-column">
          {/* Energy Disruption Runway */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`runway-${selectedDuration}`}
              className="energy-runway-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="panel-title">ENERGY DISRUPTION RUNWAY</h3>
              
              <div className="runway-timeline">
                <div className="timeline-labels">
                  <span className="timeline-label">DAY 1</span>
                  <span className="timeline-label">DAY 10</span>
                  <span className="timeline-label critical">DAY 17</span>
                  <span className="timeline-label">DAY 30</span>
                  <span className="timeline-label">DAY 60</span>
                  <span className="timeline-label">DAY 90</span>
                </div>
                
                <div className="barrel-flow">
                  <div className="barrel-group">
                    <BarrelInventory count={2} total={2} compact={true} />
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="barrel-group">
                    <BarrelInventory count={2} total={2} compact={true} />
                  </div>
                  <div className="flow-arrow dashed">- - →</div>
                  <div className="barrel-group critical-point">
                    <div className="critical-barrels">
                      <BarrelInventory count={2} total={2} compact={true} />
                    </div>
                    <div className="critical-marker">
                      <AlertTriangle size={16} />
                      <span>CRITICAL<br/>TRIGGERED</span>
                    </div>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="barrel-group">
                    <BarrelInventory count={2} total={2} compact={true} />
                  </div>
                  <div className="flow-arrow dashed">- - →</div>
                  <div className="barrel-group">
                    <BarrelInventory count={2} total={2} compact={true} />
                  </div>
                  <div className="flow-arrow long">- - - - - →</div>
                  <div className="barrel-group">
                    <BarrelInventory count={1} total={1} compact={true} />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Inventory Over Time Chart */}
          <motion.div
            className="inventory-chart-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="panel-title">INVENTORY OVER TIME (Days)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="inventoryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="criticalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DC2626" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#DC2626" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  tickLine={false}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  tickLine={false}
                  domain={[0, 30]}
                  ticks={[0, 5, 10, 15, 20, 25, 30]}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(15, 15, 25, 0.95)', 
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="critical" 
                  stroke="#DC2626" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Area 
                  type="monotone" 
                  dataKey="inventory" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  fill="url(#inventoryGradient)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="criticalArea" 
                  stroke="none" 
                  fill="url(#criticalGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-line purple"></div>
                <span>Available Inventory</span>
              </div>
              <div className="legend-item">
                <div className="legend-line red dashed"></div>
                <span>Critical Threshold</span>
              </div>
            </div>
          </motion.div>

          {/* Horizon Recommendation */}
          <motion.div
            className="horizon-recommendation-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="recommendation-icon">
              <BarChart3 size={48} />
            </div>
            <div className="recommendation-content">
              <h3 className="recommendation-header">HORIZON RECOMMENDATION</h3>
              <p className="recommendation-desc">
                Proactive actions to build resilience & business continuity.
              </p>
            </div>
          </motion.div>

          {/* Recommendation Actions */}
          <div className="recommendation-actions-grid">
            <motion.div
              className="action-box"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="action-number-box">01</div>
              <div className="action-text">
                <div className="action-title-small">Secure alternative</div>
                <div className="action-title-small">supply</div>
              </div>
            </motion.div>

            <motion.div
              className="action-box"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <div className="action-number-box">02</div>
              <div className="action-text">
                <div className="action-title-small">Increase inventory</div>
                <div className="action-title-small">buffer</div>
              </div>
            </motion.div>

            <motion.div
              className="action-box"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <div className="action-number-box">03</div>
              <div className="action-text">
                <div className="action-title-small">Reduce non-critical</div>
                <div className="action-title-small">consumption</div>
              </div>
            </motion.div>

            <motion.div
              className="action-box"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <div className="action-number-box">04</div>
              <div className="action-text">
                <div className="action-title-small">Activate contingency</div>
                <div className="action-title-small">plan B</div>
              </div>
            </motion.div>
          </div>

          {/* Quote */}
          <motion.div
            className="scenario-quote"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="quote-icon">❝</div>
            <div className="quote-text">
              Simulate. Prepare. Act early. <span className="highlight-purple">Stay ahead.</span>
            </div>
          </motion.div>

          {/* Process Flow */}
          <motion.div
            className="process-flow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <div className="process-step">
              <AlertTriangle size={20} />
              <span className="step-label">Disruption<br/>Event</span>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <BarChart3 size={20} />
              <span className="step-label">Inventory<br/>Depletion</span>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <TrendingDown size={20} />
              <span className="step-label">Supply Gap<br/>Emerges</span>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <AlertOctagon size={20} />
              <span className="step-label">Production<br/>Impact</span>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <Shield size={20} />
              <span className="step-label">Business<br/>Risk</span>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <ClipboardCheck size={20} />
              <span className="step-label">Strategic<br/>Response</span>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step success">
              <CheckCircle size={20} />
              <span className="step-label">Resilient<br/>Outcome</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="scenario-right-column">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDuration}
              className="scenario-details-panel"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Scenario Title with Date */}
              <div className="scenario-panel-header">
                <div className="date-time">
                  <div className="time-display">10:24 AM IST</div>
                  <div className="date-display">May 14, 2025</div>
                </div>
                <h3 className="scenario-title">{selectedDuration} DAY SCENARIO</h3>
              </div>

              {/* Metrics Grid */}
              <div className="scenario-metrics">
                <div className="metric-row">
                  <span className="metric-label-sm">FOOTPRINT IMPACT</span>
                  <span className="metric-value-sm">{scenario.inventoryRunway} days</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label-sm">PROJECTED SUPPLY GAP</span>
                  <span className="metric-value-sm">{scenario.supplyGap} days</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label-sm">PRODUCTION IMPACT</span>
                  <span className="metric-value-sm critical">{scenario.productionImpact}%</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label-sm">OUTAGE COMMITMENTS</span>
                  <span className="metric-value-sm">{scenario.customerRisk} at risk</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label-sm">RISK LEVEL</span>
                  <span className={`metric-value-sm risk-badge ${scenario.risk === 'CRITICAL' ? 'critical' : 'warning'}`}>
                    {scenario.risk}
                  </span>
                </div>
              </div>

              {/* Scenario Controls */}
              <div className="scenario-controls">
                <h4 className="controls-title">SCENARIO CONTROLS</h4>
                
                <div className="control-group">
                  <label className="control-label">Select Disruption Type</label>
                  <div className="custom-select">
                    <select 
                      value={disruptionType} 
                      onChange={(e) => setDisruptionType(e.target.value)}
                      className="select-input"
                    >
                      <option>Strait of Hormuz Closure</option>
                      <option>Pipeline Disruption</option>
                      <option>Port Strike</option>
                      <option>Weather Event</option>
                    </select>
                    <ChevronDown size={16} className="select-arrow" />
                  </div>
                </div>

                <div className="control-group">
                  <label className="control-label">Footprint Intensity</label>
                  <div className="custom-select">
                    <select 
                      value={footprintIntensity} 
                      onChange={(e) => setFootprintIntensity(e.target.value)}
                      className="select-input"
                    >
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                    <ChevronDown size={16} className="select-arrow" />
                  </div>
                </div>

                <div className="control-group">
                  <label className="control-label">Recovery Assumption</label>
                  <div className="custom-select">
                    <select 
                      value={recoveryAssumption} 
                      onChange={(e) => setRecoveryAssumption(e.target.value)}
                      className="select-input"
                    >
                      <option>Slow</option>
                      <option>Moderate</option>
                      <option>Fast</option>
                    </select>
                    <ChevronDown size={16} className="select-arrow" />
                  </div>
                </div>
              </div>

              {/* Run Scenario Button */}
              <button className="run-scenario-btn">
                RUN SCENARIO ▶
              </button>

              {/* Sensitivity Analysis */}
              <div className="sensitivity-analysis">
                <h4 className="sensitivity-title">SENSITIVITY ANALYSIS</h4>
                <p className="sensitivity-subtitle">
                  Adjust a factor to see potential outcome changes
                </p>

                <div className="sensitivity-sliders">
                  <div className="slider-group">
                    <div className="slider-header">
                      <div className="slider-icon">🌍</div>
                      <span className="slider-label">Global Demand Spike</span>
                      <span className="slider-value">+20%</span>
                    </div>
                    <input 
                      type="range" 
                      min="-50" 
                      max="50" 
                      defaultValue="20" 
                      className="slider red"
                    />
                  </div>

                  <div className="slider-group">
                    <div className="slider-header">
                      <div className="slider-icon">🚢</div>
                      <span className="slider-label">Shipping Delay</span>
                      <span className="slider-value">+15 days</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="30" 
                      defaultValue="15" 
                      className="slider orange"
                    />
                  </div>

                  <div className="slider-group">
                    <div className="slider-header">
                      <div className="slider-icon">🤝</div>
                      <span className="slider-label">Supplier Reliability</span>
                      <span className="slider-value">-10%</span>
                    </div>
                    <input 
                      type="range" 
                      min="-50" 
                      max="50" 
                      defaultValue="-10" 
                      className="slider green"
                    />
                  </div>

                  <div className="slider-group">
                    <div className="slider-header">
                      <div className="slider-icon">💰</div>
                      <span className="slider-label">Price Volatility</span>
                      <span className="slider-value">+25%</span>
                    </div>
                    <input 
                      type="range" 
                      min="-50" 
                      max="100" 
                      defaultValue="25" 
                      className="slider purple"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ScenarioSimulator;