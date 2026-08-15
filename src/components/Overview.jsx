import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import MetricCard from './MetricCard';
import RiskAlert from './RiskAlert';
import SupplyRouteCard from './SupplyRouteCard';
import { topMetrics, riskScore, riskExplanation, supplyRoutes } from '../data/demoData';
import './Overview.css';

const Overview = ({ onNavigate }) => {
  return (
    <div className="overview-section" id="overview">
      {/* Header */}
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title">Control Center</h2>
        <p className="section-subtitle">
          Understand your exposure before disruption becomes <span className="highlight-text">interruption.</span>
        </p>
      </motion.div>

      {/* Top Metrics Grid */}
      <div className="metrics-grid">
        {topMetrics.map((metric, index) => (
          <MetricCard
            key={metric.id}
            value={metric.value}
            label={metric.label}
            description={metric.description}
            status={metric.status}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Main Risk Alert Panel */}
      <RiskAlert
        title="Hormuz disruption risk increasing"
        riskScore={riskScore.current}
        confidence={riskScore.confidence}
        signals={riskExplanation.signals}
        onAction={() => onNavigate('early-warning')}
        actionLabel="REVIEW EXPOSURE"
      />

      {/* Supply Routes Section */}
      <motion.div
        className="supply-routes-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="section-subheader">
          <div className="subheader-content">
            <h3 className="section-subtitle-text">Your Energy Exposure</h3>
            <p className="section-description">
              Critical supply routes and current inventory levels
            </p>
          </div>
          
          <div className="consumption-info">
            <span className="consumption-label">Total Daily Consumption</span>
            <span className="consumption-value">10,000 MMBtu</span>
          </div>
        </div>

        <div className="routes-and-mix-container">
          <div className="supply-routes-grid">
            {supplyRoutes.map((route, index) => (
              <SupplyRouteCard
                key={route.id}
                route={route}
                delay={index * 0.15}
              />
            ))}
          </div>

          {/* Supply Mix Donut */}
          <div className="supply-mix-panel">
            <div className="mix-header">SUPPLY MIX</div>
            <div className="mix-donut">
              <svg viewBox="0 0 100 100" className="donut-svg">
                {(() => {
                  const routes = [
                    { name: 'Route A (Hormuz)', value: 45, color: '#EF4A5F' },
                    { name: 'Route B (Russia)', value: 30, color: '#F59E0B' },
                    { name: 'Route C (Brazil)', value: 25, color: '#10B981' }
                  ];
                  let offset = 0;
                  return routes.map((item, i) => {
                    const circumference = 2 * Math.PI * 40;
                    const dashLength = (item.value / 100) * circumference;
                    const dashOffset = -offset * circumference / 100;
                    offset += item.value;
                    return (
                      <circle
                        key={i}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={item.color}
                        strokeWidth="16"
                        strokeDasharray={`${dashLength} ${circumference}`}
                        strokeDashoffset={dashOffset}
                        transform="rotate(-90 50 50)"
                        style={{ transition: 'all 0.5s ease' }}
                      />
                    );
                  });
                })()}
              </svg>
              <div className="donut-center">
                <div className="donut-value">100%</div>
                <div className="donut-label">TOTAL</div>
              </div>
            </div>
            <div className="mix-legend">
              <div className="legend-item">
                <div className="legend-dot" style={{ background: '#EF4A5F' }}></div>
                <span className="legend-text">Route A (Hormuz)</span>
                <span className="legend-value">45%</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ background: '#F59E0B' }}></div>
                <span className="legend-text">Route B (Russia)</span>
                <span className="legend-value">30%</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ background: '#10B981' }}></div>
                <span className="legend-text">Route C (Brazil)</span>
                <span className="legend-value">25%</span>
              </div>
            </div>
            <div className="mix-note">
              Diversification helps. Visibility protects.
            </div>
          </div>
        </div>
      </motion.div>

      {/* Horizon Insight Card */}
      <motion.div
        className="horizon-insight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="insight-icon">💬</div>
        <div className="insight-content">
          <div className="insight-quote">
            "You can't control disruptions. But you can control how prepared you are."
          </div>
          <div className="insight-tagline">
            <span className="horizon-brand">HORIZON</span> turns uncertainty into actionable advantage.
          </div>
        </div>
        <div className="insight-decoration">
          <svg className="signal-wave" viewBox="0 0 200 40" preserveAspectRatio="none">
            <path
              d="M0,20 Q25,10 50,20 T100,20 T150,20 T200,20"
              fill="none"
              stroke="url(#waveGradient)"
              strokeWidth="2"
            >
              <animate
                attributeName="d"
                dur="3s"
                repeatCount="indefinite"
                values="
                  M0,20 Q25,10 50,20 T100,20 T150,20 T200,20;
                  M0,20 Q25,30 50,20 T100,20 T150,20 T200,20;
                  M0,20 Q25,10 50,20 T100,20 T150,20 T200,20
                "
              />
            </path>
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
                <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default Overview;
