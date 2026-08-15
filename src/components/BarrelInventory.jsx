import { motion } from 'framer-motion';
import './BarrelInventory.css';

const Barrel = ({ filled, delay = 0 }) => {
  return (
    <motion.div
      className="barrel-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.1 }}
    >
      <svg
        className={`barrel ${filled ? 'filled' : 'empty'}`}
        viewBox="0 0 40 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Barrel body */}
        <path
          d="M8 5 C8 3, 10 1, 20 1 C30 1, 32 3, 32 5 L32 45 C32 47, 30 49, 20 49 C10 49, 8 47, 8 45 Z"
          className="barrel-body"
          strokeWidth="1.5"
        />
        {/* Barrel top */}
        <ellipse
          cx="20"
          cy="5"
          rx="12"
          ry="4"
          className="barrel-top"
          strokeWidth="1.5"
        />
        {/* Barrel bands */}
        <line x1="8" y1="15" x2="32" y2="15" className="barrel-band" strokeWidth="1" />
        <line x1="8" y1="25" x2="32" y2="25" className="barrel-band" strokeWidth="1" />
        <line x1="8" y1="35" x2="32" y2="35" className="barrel-band" strokeWidth="1" />
      </svg>
    </motion.div>
  );
};

const BarrelInventory = ({ count, total = 5, daysRemaining, label }) => {
  const barrels = Array.from({ length: total }, (_, i) => i < count);

  return (
    <div className="barrel-inventory">
      {label && <div className="inventory-label">{label}</div>}
      
      <div className="barrels-grid">
        {barrels.map((filled, index) => (
          <Barrel key={index} filled={filled} delay={index * 0.1} />
        ))}
      </div>

      {daysRemaining !== undefined && (
        <div className="inventory-status">
          <span className="days-value">{daysRemaining}</span>
          <span className="days-label">DAYS REMAINING</span>
        </div>
      )}
    </div>
  );
};

export default BarrelInventory;
