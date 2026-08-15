import { motion } from 'framer-motion';
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
          Understand your exposure before disruption becomes interruption.
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
        description="These signals do not predict a disruption with certainty. They indicate increasing exposure that may warrant preparation."
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
          <h3 className="section-subtitle-text">Your Energy Exposure</h3>
          <p className="section-description">
            Critical supply routes and current inventory levels
          </p>
        </div>

        <div className="supply-routes-grid">
          {supplyRoutes.map((route, index) => (
            <SupplyRouteCard
              key={route.id}
              route={route}
              delay={index * 0.15}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Overview;
