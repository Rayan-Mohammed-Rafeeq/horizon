import { motion, useAnimationFrame } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import './SupplyNetwork.css';

/* ─── Animated arrow-dot that travels along an SVG path ─── */
const FlowDot = ({ pathId, color, duration = 3, delay = 0 }) => {
  const groupRef = useRef(null);
  const startTime = useRef(null);

  useAnimationFrame((time) => {
    if (!groupRef.current) return;
    const path = document.getElementById(pathId);
    if (!path) return;
    if (!startTime.current) startTime.current = time;
    const elapsed = (time - startTime.current + delay * 1000) % (duration * 1000);
    const progress = elapsed / (duration * 1000);
    const totalLength = path.getTotalLength();

    // current position
    const p0 = path.getPointAtLength(Math.max(0, progress * totalLength - 0.5));
    const p1 = path.getPointAtLength(progress * totalLength);

    const angle = Math.atan2(p1.y - p0.y, p1.x - p0.x) * (180 / Math.PI);
    groupRef.current.setAttribute('transform', `translate(${p1.x},${p1.y}) rotate(${angle})`);
  });

  return (
    <g ref={groupRef}>
      {/* small filled circle */}
      <circle r="1.8" fill={color} style={{ filter: `drop-shadow(0 0 3px ${color})` }} />
    </g>
  );
};

/* ─── Pulsing ring for live nodes ─── */
const PulseRing = ({ color }) => (
  <span className="pulse-ring" style={{ '--ring-color': color }} />
);

const SupplyNetwork = () => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [tick, setTick] = useState(0);

  /* live clock */
  const [clock, setClock] = useState(() => {
    const now = new Date();
    return {
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) + ' IST',
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
  });

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      setClock({
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) + ' IST',
        date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      });
      setTick(t => t + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  /* vigilance sparkline */
  const vigilancePoints = useRef(Array.from({ length: 40 }, (_, i) => ({
    x: i,
    y: 20 + Math.sin(i * 0.4) * 8 + Math.random() * 4,
  })));
  const vPath = vigilancePoints.current.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${p.x * 3} ${40 - p.y}`
  ).join(' ');

  const recentActivities = [
    { id: 1, text: 'Shipping delay on Route A', time: '2h ago', status: 'critical', emoji: '🚨' },
    { id: 2, text: 'Freight rates on Gulf route increased', time: '6h ago', status: 'warning', emoji: '⚠️' },
    { id: 3, text: 'Shipping activity high on alt route', time: '9h ago', status: 'success', emoji: '✅' },
    { id: 4, text: 'Contingency Plan B activated', time: '12h ago', status: 'info', emoji: '🔵' },
  ];

  /*
   * Flow paths — coords in the 900×520 SVG viewBox.
   * Canvas is now 520px tall. Node positions:
   *   Gulf Supplier    top:5%→26px,   h≈95  → midY=73,  right edge=194
   *   Port Terminal    top:5%→26px,   h≈80  → midY=66,  left=279 right=359
   *   Hormuz           top:3%→16px,   h≈100 → midY=66,  left=414 right=529
   *   Sea Route        top:8%→42px,   h≈68  → midY=76,  left=630
   *   Russian Supplier top:38%→198px, h≈95  → midY=245, right=194
   *   Alt Route 1      top:41%→213px, h≈68  → midY=247, left=351 right=439
   *   Brazilian Sup.   top:68%→354px, h≈95  → midY=401, right=194
   *   Alt Route 2      top:68%→354px, h≈68  → midY=388, left=351 right=439
   *   Bharat Hub       top:33%→172px, h≈110 → midY=227, left=639
   *   Refinery 01      top:72%→374px, h≈65  → midY=407, left=567
   *   Refinery 02      top:72%→374px, h≈65  → midY=407, left=720
   */
  const flowPaths = [
    { id: 'fp-gulf-port',   d: 'M 194 73  L 279 66',                        color: '#ef4444', dur: 2.2, delay: 0   },
    { id: 'fp-port-hormuz', d: 'M 359 66  L 414 66',                        color: '#ef4444', dur: 2.5, delay: 0.3 },
    { id: 'fp-hormuz-sea',  d: 'M 529 66  L 630 76',                        color: '#ef4444', dur: 2.8, delay: 0.6 },
    { id: 'fp-sea-hub',     d: 'M 666 110 Q 668 175 639 217',               color: '#6366f1', dur: 2.6, delay: 0.2 },
    { id: 'fp-port-down',   d: 'M 319 106 Q 330 180 351 237',               color: '#6366f1', dur: 3.0, delay: 0.4 },
    { id: 'fp-hormuz-down', d: 'M 471 116 Q 460 175 439 237',               color: '#6366f1', dur: 3.0, delay: 0.7 },
    { id: 'fp-russia-alt',  d: 'M 194 245 L 351 247',                       color: '#f59e0b', dur: 2.3, delay: 0.1 },
    { id: 'fp-alt1-hub',    d: 'M 439 247 L 639 227',                       color: '#6366f1', dur: 2.4, delay: 0.5 },
    { id: 'fp-brazil-alt',  d: 'M 194 401 L 351 388',                       color: '#10b981', dur: 2.6, delay: 0   },
    { id: 'fp-alt2-hub',    d: 'M 439 388 Q 560 370 639 282',               color: '#6366f1', dur: 3.0, delay: 0.6 },
    { id: 'fp-hub-ref1',    d: 'M 680 282 Q 650 360 602 374',               color: '#8b5cf6', dur: 2.0, delay: 0   },
    { id: 'fp-hub-ref2',    d: 'M 746 282 Q 752 360 755 374',               color: '#8b5cf6', dur: 2.0, delay: 0.4 },
  ];

  return (
    <div className="supply-network-section" id="supply-network">

      {/* ════ HEADER ════ */}
      <motion.div className="sn-header"
        initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
        <div className="sn-header-left">
          <div className="sn-header-content">
            <div className="sn-eyebrow">SECTION 02 • LIVE TRACKING</div>
            <h2 className="sn-section-title">
              <span className="grad-text">Supply</span> Network
            </h2>
            <p className="sn-section-subtitle">
              How energy flows from global sources to your operations — in real time.
            </p>
          </div>
        </div>

        <div className="sn-header-right">
          <div className="sn-live-pill">
            <PulseRing color="#10b981" />
            <span>LIVE FEED</span>
          </div>
          <div className="sn-clock-block">
            <div className="sn-time">{clock.time}</div>
            <div className="sn-date">{clock.date}</div>
          </div>
          <div className="sn-demo-badge">DEMO ENV • ILLUSTRATIVE</div>
        </div>
      </motion.div>

      {/* ════ RISK LEGEND ════ */}
      <motion.div className="sn-risk-legend"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}>
        {[
          { label: 'HIGH RISK',   color: '#ef4444', type: 'dot' },
          { label: 'MEDIUM RISK', color: '#f59e0b', type: 'dot' },
          { label: 'LOW RISK',    color: '#10b981', type: 'dot' },
          { label: 'FLOW OF SUPPLY', color: '#8b5cf6', type: 'arrow' },
        ].map(({ label, color, type }) => (
          <div className="sn-legend-item" key={label}>
            {type === 'dot'
              ? <span className="sn-legend-dot" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
              : <span className="sn-legend-line" style={{ background: color }}>
                  <span className="sn-legend-arrow-tip" style={{ borderLeftColor: color }} />
                </span>
            }
            <span>{label}</span>
          </div>
        ))}
      </motion.div>

      {/* ════ MAIN GRID ════ */}
      <motion.div className="sn-main-grid"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>

        {/* ── NETWORK CANVAS ── */}
        <div className="sn-network-area">
          <div className="sn-network-canvas">

            {/* ── SUPPLIER NODES ── */}
            {[
              { risk: 'high',   title: 'Gulf Supplier',     sub: 'Raw Oil / Crude', pct: '41%', top: '5%',  left: '1%',  color: '#ef4444' },
              { risk: 'medium', title: 'Russian Supplier',  sub: 'Crude Oil',       pct: '27%', top: '38%', left: '1%',  color: '#f59e0b' },
              { risk: 'low',    title: 'Brazilian Supplier',sub: 'LPG / LNG',       pct: '32%', top: '68%', left: '1%',  color: '#10b981' },
            ].map(({ risk, title, sub, pct, top, left, color }) => (
              <motion.div
                key={title}
                className={`sn-supplier-node ${risk}-risk`}
                style={{ top, left, '--node-color': color }}
                onHoverStart={() => setHoveredNode(title)}
                onHoverEnd={() => setHoveredNode(null)}
                whileHover={{ scale: 1.04, y: -3 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <div className="sn-node-glow" />
                <div className="sn-node-header">
                  <span className="sn-node-title">{title}</span>
                  <span className={`sn-risk-pill ${risk}`}>{risk.toUpperCase()} RISK</span>
                </div>
                <div className="sn-node-sub">{sub}</div>
                <div className="sn-node-pct" style={{ color }}>{pct}</div>
              </motion.div>
            ))}

            {/* ── PORT / EXPORT TERMINAL ── */}
            <motion.div className="sn-transit-node" style={{ top: '5%', left: '31%' }}
              whileHover={{ scale: 1.08 }} transition={{ type: 'spring', stiffness: 300 }}>
              <div className="sn-transit-icon">🏭</div>
              <div className="sn-transit-label">Port / Export<br />Terminal</div>
            </motion.div>

            {/* ── STRAIT OF HORMUZ ── CHOKEPOINT */}
            <motion.div className="sn-chokepoint-node" style={{ top: '3%', left: '46%' }}
              whileHover={{ scale: 1.06 }}
              animate={{ boxShadow: ['0 0 20px rgba(239,68,68,0.4)', '0 0 38px rgba(239,68,68,0.75)', '0 0 20px rgba(239,68,68,0.4)'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="sn-chokepoint-badge">⚠ CRITICAL</div>
              <div className="sn-chokepoint-icon">🔴</div>
              <div className="sn-chokepoint-label">STRAIT OF<br />HORMUZ</div>
            </motion.div>

            {/* ── SEA ROUTE ── */}
            <motion.div className="sn-transit-node" style={{ top: '8%', left: '70%' }}
              whileHover={{ scale: 1.08 }} transition={{ type: 'spring', stiffness: 300 }}>
              <div className="sn-transit-icon">⛴</div>
              <div className="sn-transit-label">Sea<br />Route</div>
            </motion.div>

            {/* ── ALT ROUTES ── */}
            {[{ top: '41%', left: '39%' }, { top: '68%', left: '39%' }].map((pos, i) => (
              <motion.div key={i} className="sn-alt-route-node" style={pos}
                whileHover={{ scale: 1.06 }} transition={{ type: 'spring', stiffness: 280 }}>
                <div className="sn-alt-icon">🔀</div>
                <div className="sn-alt-label">Alt Maritime<br />Route</div>
              </motion.div>
            ))}

            {/* ── BHARAT HUB ── */}
            <motion.div className="sn-hub-node" style={{ top: '33%', left: '71%' }}
              whileHover={{ scale: 1.05 }}
              animate={{ boxShadow: ['0 0 25px rgba(99,102,241,0.4)', '0 0 45px rgba(99,102,241,0.7)', '0 0 25px rgba(99,102,241,0.4)'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="sn-hub-inner">
                <div className="sn-hub-icon">⬡</div>
                <div className="sn-hub-title">BHARAT</div>
                <div className="sn-hub-sub">DOWNSTREAM &<br />MATERIALS HUB</div>
              </div>
            </motion.div>

            {/* ── REFINERIES ── */}
            {[
              { label: 'Refinery 01', top: '72%', left: '63%' },
              { label: 'Refinery 02', top: '72%', left: '80%' },
            ].map(({ label, top, left }) => (
              <motion.div key={label} className="sn-refinery-node" style={{ top, left }}
                whileHover={{ scale: 1.07 }} transition={{ type: 'spring', stiffness: 280 }}>
                <div className="sn-refinery-icon">🏗</div>
                <div className="sn-refinery-label">{label}</div>
              </motion.div>
            ))}

            {/* ── SVG FLOW LINES + ANIMATED DOTS ── */}
            <svg className="sn-flow-lines" viewBox="0 0 900 520" preserveAspectRatio="xMidYMid meet">
              <defs>
                {[
                  { id: 'ar-red',    c: '#ef4444' },
                  { id: 'ar-orange', c: '#f59e0b' },
                  { id: 'ar-green',  c: '#10b981' },
                  { id: 'ar-indigo', c: '#6366f1' },
                  { id: 'ar-violet', c: '#8b5cf6' },
                ].map(({ id, c }) => (
                  <marker key={id} id={id} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                    <path d="M0,0 L0,7 L7,3.5 z" fill={c} />
                  </marker>
                ))}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              <path id="fp-gulf-port"   d="M 194 73  L 279 66"            stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6,4" fill="none" markerEnd="url(#ar-red)"    filter="url(#glow)" opacity="0.85"/>
              <path id="fp-port-hormuz" d="M 359 66  L 414 66"            stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6,4" fill="none" markerEnd="url(#ar-red)"    filter="url(#glow)" opacity="0.85"/>
              <path id="fp-hormuz-sea"  d="M 529 66  L 630 76"            stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6,4" fill="none" markerEnd="url(#ar-red)"    filter="url(#glow)" opacity="0.85"/>
              <path id="fp-sea-hub"     d="M 666 110 Q 668 175 639 217"   stroke="#6366f1" strokeWidth="1.5" strokeDasharray="6,4" fill="none" markerEnd="url(#ar-indigo)" filter="url(#glow)" opacity="0.75"/>
              <path id="fp-port-down"   d="M 319 106 Q 330 180 351 237"   stroke="#6366f1" strokeWidth="1"   strokeDasharray="4,4" fill="none"                             opacity="0.5"/>
              <path id="fp-hormuz-down" d="M 471 116 Q 460 175 439 237"   stroke="#6366f1" strokeWidth="1"   strokeDasharray="4,4" fill="none"                             opacity="0.5"/>
              <path id="fp-russia-alt"  d="M 194 245 L 351 247"           stroke="#f59e0b" strokeWidth="1.8" fill="none"           markerEnd="url(#ar-orange)"              filter="url(#glow)" opacity="0.9"/>
              <path id="fp-alt1-hub"    d="M 439 247 L 639 227"           stroke="#6366f1" strokeWidth="1.5" strokeDasharray="6,4" fill="none" markerEnd="url(#ar-indigo)" filter="url(#glow)" opacity="0.75"/>
              <path id="fp-brazil-alt"  d="M 194 401 L 351 388"           stroke="#10b981" strokeWidth="1.8" fill="none"           markerEnd="url(#ar-green)"               filter="url(#glow)" opacity="0.9"/>
              <path id="fp-alt2-hub"    d="M 439 388 Q 560 370 639 282"   stroke="#6366f1" strokeWidth="1.5" strokeDasharray="6,4" fill="none" markerEnd="url(#ar-indigo)" filter="url(#glow)" opacity="0.75"/>
              <path id="fp-hub-ref1"    d="M 680 282 Q 650 360 602 374"   stroke="#8b5cf6" strokeWidth="1.5" fill="none"           markerEnd="url(#ar-violet)"              filter="url(#glow)" opacity="0.8"/>
              <path id="fp-hub-ref2"    d="M 746 282 Q 752 360 755 374"   stroke="#8b5cf6" strokeWidth="1.5" fill="none"           markerEnd="url(#ar-violet)"              filter="url(#glow)" opacity="0.8"/>

              {flowPaths.map(fp => (
                <FlowDot key={fp.id} pathId={fp.id} color={fp.color} duration={fp.dur} delay={fp.delay} />
              ))}
            </svg>

            {/* ── PROCESS LEGEND — fills the empty bottom strip ── */}
            <div className="sn-canvas-legend">
              {[
                { icon: '📦', title: 'Source',      sub: 'Suppliers' },
                { icon: '🏭', title: 'Export',      sub: 'Ports' },
                { icon: '⛴',  title: 'Transit',     sub: 'Routes' },
                { icon: '⬡',  title: 'Destination', sub: 'Hub' },
                { icon: '🏗',  title: 'Processing',  sub: 'Refineries' },
                { icon: '⚡',  title: 'End Use',     sub: 'Operations' },
              ].map(({ icon, title, sub }, i, arr) => (
                <div className="sn-canvas-proc-wrap" key={title}>
                  <div className="sn-canvas-proc-step">
                    <span className="sn-proc-icon">{icon}</span>
                    <span className="sn-proc-title">{title}</span>
                    <span className="sn-proc-sub">({sub})</span>
                  </div>
                  {i < arr.length - 1 && <span className="sn-proc-arrow">→</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="sn-info-area">

          {/* Supply Mix */}
          <motion.div className="sn-glass-card"
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.35 }}>
            <div className="sn-card-header">
              <span className="sn-card-title">Supply Mix</span>
              <span className="sn-card-badge">BY SOURCE</span>
            </div>
            <div className="sn-donut-wrap">
              <svg width="150" height="150" viewBox="0 0 140 140">
                <defs>
                  <filter id="donut-glow">
                    <feGaussianBlur stdDeviation="2.5" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>
                {/* track */}
                <circle cx="70" cy="70" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="18"/>
                {/* Gulf 41% */}
                <circle cx="70" cy="70" r="50" fill="none" stroke="#ef4444" strokeWidth="18"
                  strokeDasharray="129 314" transform="rotate(-90 70 70)" filter="url(#donut-glow)" opacity="0.9"/>
                {/* Russia 27% */}
                <circle cx="70" cy="70" r="50" fill="none" stroke="#f59e0b" strokeWidth="18"
                  strokeDasharray="85 314" strokeDashoffset="-129" transform="rotate(-90 70 70)" filter="url(#donut-glow)" opacity="0.9"/>
                {/* Brazil 32% */}
                <circle cx="70" cy="70" r="50" fill="none" stroke="#10b981" strokeWidth="18"
                  strokeDasharray="100 314" strokeDashoffset="-214" transform="rotate(-90 70 70)" filter="url(#donut-glow)" opacity="0.9"/>
                <text x="70" y="62" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="800">100%</text>
                <text x="70" y="79" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="600" letterSpacing="1">TOTAL</text>
              </svg>
            </div>
            <div className="sn-supply-rows">
              {[
                { label: 'Gulf & Partner',   pct: '41%', color: '#ef4444' },
                { label: 'Russia & Partner', pct: '27%', color: '#f59e0b' },
                { label: 'Brazil & Others',  pct: '32%', color: '#10b981' },
              ].map(({ label, pct, color }) => (
                <div className="sn-supply-row" key={label}>
                  <span className="sn-supply-swatch" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
                  <span className="sn-supply-label">{label}</span>
                  <span className="sn-supply-pct" style={{ color }}>{pct}</span>
                </div>
              ))}
            </div>
            <div className="sn-supply-note">
              ✦ Diversification strengthens resilience against disruptions.
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div className="sn-glass-card"
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.45 }}>
            <div className="sn-card-header">
              <span className="sn-card-title">Recent Activity</span>
              <span className="sn-view-all">View all →</span>
            </div>
            <div className="sn-activity-list">
              {recentActivities.map((a, i) => (
                <motion.div key={a.id} className={`sn-activity-item ${a.status}`}
                  initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.08 }}>
                  <span className="sn-act-emoji">{a.emoji}</span>
                  <div className="sn-act-body">
                    <div className="sn-act-text">{a.text}</div>
                    <div className="sn-act-time">{a.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Always-on Vigilance */}
          <motion.div className="sn-glass-card vigilance-card"
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.55 }}>
            <div className="sn-card-header">
              <span className="sn-card-title">Always-On Vigilance</span>
              <PulseRing color="#8b5cf6" />
            </div>
            <div className="sn-vigilance-sub">Monitoring critical supply signals 24/7</div>
            <div className="sn-sparkline-wrap">
              <svg width="100%" height="56" viewBox="0 0 120 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35"/>
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d={`${vPath} L 117 40 L 0 40 Z`} fill="url(#spark-fill)"/>
                <path d={vPath} fill="none" stroke="#8b5cf6" strokeWidth="1.5"
                  style={{ filter: 'drop-shadow(0 0 3px #8b5cf6)' }}/>
              </svg>
            </div>
            <div className="sn-vigilance-stats">
              <div className="sn-vstat"><span className="sn-vstat-val">24/7</span><span className="sn-vstat-label">Monitoring</span></div>
              <div className="sn-vstat"><span className="sn-vstat-val">3</span><span className="sn-vstat-label">Active Alerts</span></div>
              <div className="sn-vstat"><span className="sn-vstat-val">99.9%</span><span className="sn-vstat-label">Uptime</span></div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ════ INSTRUCTION BAR ════ */}
      <motion.div className="sn-instruction-bar"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.65 }}>
        <span className="sn-instr-icon">💬</span>
        <span>Hover or click any route to see details and <span className="sn-highlight">explore alternatives</span>.</span>
      </motion.div>
    </div>
  );
};

export default SupplyNetwork;
