import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import BarrelInventory from './BarrelInventory';
import './SupplyRouteCard.css';

const SupplyRouteCard = ({ route, delay = 0, onClick }) => {
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
      className={`supply-route-card risk-${route.risk.toLowerCase()}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
    >
      {/* Route Name */}
      <div className="route-header">
        <h4 className="route-name">{route.name}</h4>
        <span className={`badge ${getRiskBadgeClass(route.risk)}`}>
          {route.risk}
        </span>
      </div>

      {/* Route Path */}
      <div className="route-path">
        <div className="route-node">
          <div className="node-label">{route.origin}</div>
        </div>
        
        <ArrowRight size={16} className="route-arrow" />
        
        {route.chokepoint && (
          <>
            <div className="route-node chokepoint">
              <div className="node-label">{route.chokepoint}</div>
            </div>
            <ArrowRight size={16} className="route-arrow" />
          </>
        )}
        
        <div className="route-node">
          <div className="node-label">{route.destination}</div>
        </div>
      </div>

      {/* Route Metrics */}
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
        />
      </div>
    </motion.div>
  );
};

export default SupplyRouteCard;
