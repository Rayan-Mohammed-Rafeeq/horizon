import { motion } from 'framer-motion';
import { ArrowRight, MapPin, AlertTriangle, Factory } from 'lucide-react';
import BarrelInventory from './BarrelInventory';
import './SupplyRouteCard.css';

const SupplyRouteCard = ({ route, delay = 0, onClick }) => {
  const getRiskBadgeClass = (risk) => {
    switch (risk) {
      case 'HIGH':   return 'badge-critical';
      case 'MEDIUM': return 'badge-warning';
      case 'LOW':    return 'badge-success';
      default:       return 'badge-neutral';
    }
  };

  return (
    <motion.div
      className={`supply-route-card risk-${route.risk.toLowerCase()}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* Header */}
      <div className="route-header">
        <h4 className="route-name">{route.name}</h4>
        <span className={`badge ${getRiskBadgeClass(route.risk)}`}>{route.risk}</span>
      </div>

      {/* Route Path — horizontal flow */}
      <div className="route-path-flow">
        {/* Origin */}
        <div className="flow-node">
          <div className="flow-icon origin">
            <MapPin size={12} />
          </div>
          <div className="flow-label" data-full-text={route.origin}>{route.origin}</div>
        </div>

        <div className="flow-connector">
          <div className="flow-line" />
          <ArrowRight size={12} className="flow-arrow" />
        </div>

        {/* Chokepoint */}
        {route.chokepoint && (
          <>
            <div className="flow-node">
              <div className="flow-icon chokepoint">
                <AlertTriangle size={12} />
              </div>
              <div className="flow-label danger" data-full-text={route.chokepoint}>{route.chokepoint}</div>
            </div>
            <div className="flow-connector">
              <div className="flow-line" />
              <ArrowRight size={12} className="flow-arrow" />
            </div>
          </>
        )}

        {/* Destination */}
        <div className="flow-node">
          <div className="flow-icon destination">
            <Factory size={12} />
          </div>
          <div className="flow-label" data-full-text={route.destination}>{route.destination}</div>
        </div>
      </div>

      {/* Metrics */}
      <div className="route-metrics">
        <div className="route-metric">
          <div className="metric-label-small">Dependency</div>
          <div className="metric-value-small">{route.dependency}%</div>
        </div>
        <div className="route-metric">
          <div className="metric-label-small">Inventory</div>
          <div className="metric-value-small">{route.inventoryDays} days</div>
        </div>
      </div>

      {/* Barrel Visualization */}
      <div className="route-inventory">
        <BarrelInventory
          count={route.barrelCount}
          total={5}
          daysRemaining={route.inventoryDays}
          compact={true}
        />
      </div>

      <div className={`route-glow risk-${route.risk.toLowerCase()}`} />
    </motion.div>
  );
};

export default SupplyRouteCard;
