import { motion } from 'framer-motion';
import './MetricCard.css';

const MetricCard = ({ value, label, description, status = 'normal', delay = 0 }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'critical':
        return 'status-critical';
      case 'warning':
        return 'status-warning';
      case 'success':
        return 'status-success';
      default:
        return 'status-normal';
    }
  };

  return (
    <motion.div
      className={`metric-card ${getStatusClass()}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="metric-value">{value}</div>
      <div className="metric-label">{label}</div>
      {description && (
        <div className="metric-description">{description}</div>
      )}
      <div className={`metric-indicator ${getStatusClass()}`} />
    </motion.div>
  );
};

export default MetricCard;
