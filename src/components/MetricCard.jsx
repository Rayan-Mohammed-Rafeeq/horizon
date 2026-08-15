import { motion } from 'framer-motion';
import { AlertTriangle, Package, Activity, Shield, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import './MetricCard.css';

const CARD_CONFIG = {
  'HORMUZ DEPENDENCY': {
    Icon: AlertTriangle,
    gradient: 'linear-gradient(135deg, rgba(239,74,95,0.18) 0%, rgba(239,74,95,0.04) 100%)',
    glowColor: 'rgba(239,74,95,0.5)',
    accentColor: '#EF4A5F',
    accentRgb: '239,74,95',
    tag: 'CRITICAL ROUTE',
    trend: 'up',
    trendLabel: '+7% this week',
    sparkData: [38, 40, 42, 41, 43, 45, 45],
  },
  'INVENTORY RUNWAY': {
    Icon: Package,
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.18) 0%, rgba(245,158,11,0.04) 100%)',
    glowColor: 'rgba(245,158,11,0.5)',
    accentColor: '#F59E0B',
    accentRgb: '245,158,11',
    tag: 'DEPLETING',
    trend: 'down',
    trendLabel: '-7 days since last week',
    sparkData: [24, 22, 20, 19, 18, 17, 17],
  },
  'EXPOSURE LEVEL': {
    Icon: Activity,
    gradient: 'linear-gradient(135deg, rgba(239,74,95,0.18) 0%, rgba(239,74,95,0.04) 100%)',
    glowColor: 'rgba(239,74,95,0.5)',
    accentColor: '#EF4A5F',
    accentRgb: '239,74,95',
    tag: 'ELEVATED',
    trend: 'up',
    trendLabel: 'Risk increasing',
    sparkData: [60, 65, 68, 70, 72, 75, 78],
  },
  'CONTINGENCY PLANS': {
    Icon: Shield,
    gradient: 'linear-gradient(135deg, rgba(124,92,255,0.18) 0%, rgba(124,92,255,0.04) 100%)',
    glowColor: 'rgba(124,92,255,0.5)',
    accentColor: '#7C5CFF',
    accentRgb: '124,92,255',
    tag: 'PREPARED',
    trend: 'neutral',
    trendLabel: 'No change',
    sparkData: [2, 2, 2, 3, 3, 3, 3],
  },
};

// Finds config by checking if label includes any key
const getConfig = (label) => {
  const key = Object.keys(CARD_CONFIG).find(k => label.toUpperCase().includes(k));
  return CARD_CONFIG[key] ?? CARD_CONFIG['CONTINGENCY PLANS'];
};

// Filled area sparkline with gradient
const Sparkline = ({ data, accentColor, accentRgb }) => {
  const w = 100;
  const h = 36;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pad = 2;

  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = pad + ((1 - (v - min) / range) * (h - pad * 2));
    return [x, y];
  });

  const linePath = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L${w},${h} L0,${h} Z`;

  const gradId = `sg-${accentRgb.replace(/,/g, '')}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="mc-sparkline-svg">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.35" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* filled area */}
      <path d={areaPath} fill={`url(#${gradId})`} />
      {/* line */}
      <path d={linePath} fill="none" stroke={accentColor} strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round" />
      {/* end dot */}
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3"
        fill={accentColor} />
    </svg>
  );
};

const TrendIcon = ({ trend }) => {
  if (trend === 'up') return <TrendingUp size={11} />;
  if (trend === 'down') return <TrendingDown size={11} />;
  return <Minus size={11} />;
};

const MetricCard = ({ value, label, description, delay = 0 }) => {
  const cfg = getConfig(label);
  const { Icon, gradient, glowColor, accentColor, accentRgb, tag, trend, trendLabel, sparkData } = cfg;

  return (
    <motion.div
      className="mc-card"
      style={{ '--accent': accentColor, '--accent-rgb': accentRgb, '--glow': glowColor, '--gradient': gradient }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      {/* Noise texture overlay */}
      <div className="mc-noise" />

      {/* Gradient background fill */}
      <div className="mc-gradient-fill" />

      {/* Animated corner highlight */}
      <div className="mc-highlight" />

      {/* Top row: icon + tag */}
      <div className="mc-top">
        <div className="mc-icon-wrap">
          <Icon size={15} strokeWidth={2.5} />
        </div>
        <span className="mc-tag">{tag}</span>
      </div>

      {/* Label */}
      <div className="mc-label">{label}</div>

      {/* Value */}
      <div className="mc-value">{value}</div>

      {/* Description */}
      {description && <div className="mc-desc">{description}</div>}

      {/* Sparkline */}
      <div className="mc-spark-wrap">
        <Sparkline data={sparkData} accentColor={accentColor} accentRgb={accentRgb} />
      </div>

      {/* Trend row */}
      <div className={`mc-trend mc-trend--${trend}`}>
        <TrendIcon trend={trend} />
        <span>{trendLabel}</span>
      </div>

      {/* Bottom accent bar */}
      <div className="mc-bar" />
    </motion.div>
  );
};

export default MetricCard;
