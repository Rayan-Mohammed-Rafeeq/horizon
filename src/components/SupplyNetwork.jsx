import { useEffect, useRef } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  Background,
  BaseEdge,
  getStraightPath,
  getBezierPath,
  MarkerType,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion } from 'framer-motion';
import './SupplyNetwork.css';

/* ─────────────────────────────────────────────
   CUSTOM NODE: Supplier
───────────────────────────────────────────── */
const SupplierNode = ({ data }) => {
  const colorMap = { high: '#ef4444', medium: '#f59e0b', low: '#10b981' };
  const color = colorMap[data.risk];
  return (
    <div className={`sn-node supplier-node ${data.risk}-risk`} style={{ '--node-color': color }}>
      <Handle type="source" position={Position.Right} id="right" />
      <div className="sn-node-glow" />
      <div className="sn-node-header">
        <span className="sn-node-title">{data.label}</span>
        <span className={`sn-risk-pill ${data.risk}`}>{data.risk.toUpperCase()} RISK</span>
      </div>
      <div className="sn-node-sub">{data.sub}</div>
      <div className="sn-node-pct" style={{ color }}>{data.pct}</div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   CUSTOM NODE: Transit (Port, Sea Route)
───────────────────────────────────────────── */
const TransitNode = ({ data }) => (
  <div className="sn-node transit-node">
    <Handle type="target" position={Position.Left} id="left" />
    <Handle type="source" position={Position.Right} id="right" />
    <div className="sn-transit-icon">{data.icon}</div>
    <div className="sn-transit-label">{data.label}</div>
  </div>
);

/* ─────────────────────────────────────────────
   CUSTOM NODE: Chokepoint (Hormuz)
───────────────────────────────────────────── */
const ChokepointNode = ({ data }) => (
  <motion.div
    className="sn-node chokepoint-node"
    animate={{
      boxShadow: [
        '0 0 20px rgba(239,68,68,0.4)',
        '0 0 42px rgba(239,68,68,0.8)',
        '0 0 20px rgba(239,68,68,0.4)',
      ],
    }}
    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
  >
    <Handle type="target" position={Position.Left} id="left" />
    <Handle type="source" position={Position.Right} id="right" />
    <div className="sn-chokepoint-badge">⚠ CRITICAL</div>
    <div className="sn-chokepoint-icon">🔴</div>
    <div className="sn-chokepoint-label">STRAIT OF<br />HORMUZ</div>
  </motion.div>
);

/* ─────────────────────────────────────────────
   CUSTOM NODE: Alt Route
───────────────────────────────────────────── */
const AltRouteNode = ({ data }) => (
  <div className="sn-node alt-route-node">
    <Handle type="target" position={Position.Left} id="left" />
    <Handle type="source" position={Position.Right} id="right" />
    <div className="sn-alt-icon">🔀</div>
    <div className="sn-alt-label">{data.label}</div>
  </div>
);

/* ─────────────────────────────────────────────
   CUSTOM NODE: Hub (Bharat)
───────────────────────────────────────────── */
const HubNode = ({ data }) => (
  <motion.div
    className="sn-node hub-node"
    animate={{
      boxShadow: [
        '0 0 25px rgba(99,102,241,0.35)',
        '0 0 50px rgba(99,102,241,0.75)',
        '0 0 25px rgba(99,102,241,0.35)',
      ],
    }}
    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
  >
    <Handle type="target" position={Position.Left} id="left" />
    <Handle type="source" position={Position.Bottom} id="bottom" />
    <div className="sn-hub-icon">⬡</div>
    <div className="sn-hub-title">BHARAT</div>
    <div className="sn-hub-sub">DOWNSTREAM &<br />MATERIALS HUB</div>
  </motion.div>
);

/* ─────────────────────────────────────────────
   CUSTOM NODE: Refinery
───────────────────────────────────────────── */
const RefineryNode = ({ data }) => (
  <div className="sn-node refinery-node">
    <Handle type="target" position={Position.Top} id="top" />
    <div className="sn-refinery-icon">🏗</div>
    <div className="sn-refinery-label">{data.label}</div>
  </div>
);

/* ─────────────────────────────────────────────
   ANIMATED EDGE with traveling dot
───────────────────────────────────────────── */
const AnimatedFlowEdge = ({
  id, sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition,
  data = {},
  style = {},
  markerEnd,
}) => {
  const [edgePath] = data.curved
    ? getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition })
    : getStraightPath({ sourceX, sourceY, targetX, targetY });

  const dotId = `dot-${id}`;
  const dur = data.duration || 2.5;
  const color = data.color || '#6366f1';

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={style} markerEnd={markerEnd} />
      {/* Traveling dot */}
      <circle r="3.5" fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }}>
        <animateMotion
          dur={`${dur}s`}
          repeatCount="indefinite"
          keyTimes="0;1"
          calcMode="linear"
        >
          <mpath href={`#${id}`} />
        </animateMotion>
      </circle>
    </>
  );
};

/* ─────────────────────────────────────────────
   NODE & EDGE TYPES REGISTRY
───────────────────────────────────────────── */
const nodeTypes = {
  supplier: SupplierNode,
  transit: TransitNode,
  chokepoint: ChokepointNode,
  altRoute: AltRouteNode,
  hub: HubNode,
  refinery: RefineryNode,
};

const edgeTypes = {
  animatedFlow: AnimatedFlowEdge,
};

/* ─────────────────────────────────────────────
   INITIAL NODES
   Layout is a 900×480 logical canvas.
   ReactFlow uses pixel positions for `position`.
───────────────────────────────────────────── */
const initialNodes = [
  // ── Suppliers (left column)
  {
    id: 'gulf',
    type: 'supplier',
    position: { x: 10, y: 30 },
    data: { label: 'Gulf Supplier', sub: 'Raw Oil / Crude', pct: '41%', risk: 'high' },
  },
  {
    id: 'russia',
    type: 'supplier',
    position: { x: 10, y: 195 },
    data: { label: 'Russian Supplier', sub: 'Crude Oil', pct: '27%', risk: 'medium' },
  },
  {
    id: 'brazil',
    type: 'supplier',
    position: { x: 10, y: 360 },
    data: { label: 'Brazilian Supplier', sub: 'LPG / LNG', pct: '32%', risk: 'low' },
  },

  // ── Port terminal
  {
    id: 'port',
    type: 'transit',
    position: { x: 270, y: 40 },
    data: { label: 'Port / Export\nTerminal', icon: '🏭' },
  },

  // ── Strait of Hormuz (chokepoint)
  {
    id: 'hormuz',
    type: 'chokepoint',
    position: { x: 420, y: 20 },
    data: {},
  },

  // ── Sea Route
  {
    id: 'seaRoute',
    type: 'transit',
    position: { x: 595, y: 40 },
    data: { label: 'Sea\nRoute', icon: '⛴' },
  },

  // ── Alt routes
  {
    id: 'alt1',
    type: 'altRoute',
    position: { x: 320, y: 205 },
    data: { label: 'Alt Maritime\nRoute' },
  },
  {
    id: 'alt2',
    type: 'altRoute',
    position: { x: 320, y: 368 },
    data: { label: 'Alt Maritime\nRoute' },
  },

  // ── Bharat Hub
  {
    id: 'hub',
    type: 'hub',
    position: { x: 620, y: 185 },
    data: {},
  },

  // ── Refineries
  {
    id: 'ref1',
    type: 'refinery',
    position: { x: 555, y: 385 },
    data: { label: 'Refinery 01' },
  },
  {
    id: 'ref2',
    type: 'refinery',
    position: { x: 710, y: 385 },
    data: { label: 'Refinery 02' },
  },
];

/* helper to build edge */
const mkEdge = (id, source, target, color, dur, opts = {}) => ({
  id,
  source,
  target,
  sourceHandle: opts.sourceHandle || 'right',
  targetHandle: opts.targetHandle || 'left',
  type: 'animatedFlow',
  data: { color, duration: dur, curved: opts.curved ?? false },
  style: {
    stroke: color,
    strokeWidth: opts.width ?? 2,
    strokeDasharray: opts.dashed ? '6 4' : undefined,
    opacity: opts.opacity ?? 0.9,
  },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color,
    width: 16,
    height: 16,
  },
  animated: false, // We handle animation with our custom edge
  ...opts.extra,
});

const initialEdges = [
  // === CRITICAL RED PATH: Gulf → Port → Hormuz → Sea → Hub ===
  mkEdge('e-gulf-port',    'gulf',     'port',     '#ef4444', 3.0, { width: 2.5 }),
  mkEdge('e-port-hormuz',  'port',     'hormuz',   '#ef4444', 3.5, { width: 2.5 }),
  mkEdge('e-hormuz-sea',   'hormuz',   'seaRoute', '#ef4444', 3.5, { width: 2.5 }),
  mkEdge('e-sea-hub',      'seaRoute', 'hub',      '#ef4444', 4.0, { curved: true, width: 2.5 }),

  // === MEDIUM RISK ORANGE PATH: Russia → Alt1 → Hub ===
  mkEdge('e-russia-alt1',  'russia',   'alt1',     '#f59e0b', 2.8, { width: 2.2 }),
  mkEdge('e-alt1-hub',     'alt1',     'hub',      '#f59e0b', 3.2, { curved: true, width: 2.2 }),

  // === LOW RISK GREEN PATH: Brazil → Alt2 → Hub ===
  mkEdge('e-brazil-alt2',  'brazil',   'alt2',     '#10b981', 2.5, { width: 2.2 }),
  mkEdge('e-alt2-hub',     'alt2',     'hub',      '#10b981', 3.5, { curved: true, width: 2.2 }),

  // === DOWNSTREAM PURPLE: Hub → Refineries ===
  mkEdge('e-hub-ref1',     'hub',      'ref1',     '#8b5cf6', 2.2, { 
    curved: true, 
    width: 2,
    sourceHandle: 'bottom',
    targetHandle: 'top'
  }),
  mkEdge('e-hub-ref2',     'hub',      'ref2',     '#8b5cf6', 2.2, { 
    curved: true, 
    width: 2,
    sourceHandle: 'bottom',
    targetHandle: 'top'
  }),
];

/* ─────────────────────────────────────────────
   PULSE RING helper
───────────────────────────────────────────── */
const PulseRing = ({ color }) => (
  <span className="pulse-ring" style={{ '--ring-color': color }} />
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const SupplyNetworkInner = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  /* vigilance sparkline */
  const vigilancePoints = useRef(
    Array.from({ length: 40 }, (_, i) => ({
      x: i,
      y: 20 + Math.sin(i * 0.4) * 8 + Math.random() * 4,
    }))
  );
  const vPath = vigilancePoints.current
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x * 3} ${40 - p.y}`)
    .join(' ');

  const recentActivities = [
    { id: 1, text: 'Shipping delay on Route A', time: '2h ago', status: 'critical', emoji: '🚨' },
    { id: 2, text: 'Freight rates on Gulf route increased', time: '6h ago', status: 'warning', emoji: '⚠️' },
    { id: 3, text: 'Shipping activity high on alt route', time: '9h ago', status: 'success', emoji: '✅' },
    { id: 4, text: 'Contingency Plan B activated', time: '12h ago', status: 'info', emoji: '🔵' },
  ];

  return (
    <div className="supply-network-section" id="supply-network">

      {/* ════ HEADER ════ */}
      <motion.div
        className="sn-header"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className="sn-header-left">
          <div className="sn-eyebrow">SECTION 02 • LIVE TRACKING</div>
          <h2 className="sn-section-title">
            <span className="grad-text">Supply</span> Network
          </h2>
          <p className="sn-section-subtitle">
            How energy flows from global sources to your operations — in real time.
          </p>
        </div>
      </motion.div>

      {/* ════ RISK LEGEND ════ */}
      <motion.div
        className="sn-risk-legend"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        {[
          { label: 'HIGH RISK',     color: '#ef4444', type: 'dot' },
          { label: 'MEDIUM RISK',   color: '#f59e0b', type: 'dot' },
          { label: 'LOW RISK',      color: '#10b981', type: 'dot' },
          { label: 'FLOW OF SUPPLY',color: '#8b5cf6', type: 'arrow' },
        ].map(({ label, color, type }) => (
          <div className="sn-legend-item" key={label}>
            {type === 'dot' ? (
              <span className="sn-legend-dot" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
            ) : (
              <span className="sn-legend-line" style={{ background: color }}>
                <span className="sn-legend-arrow-tip" style={{ borderLeftColor: color }} />
              </span>
            )}
            <span>{label}</span>
          </div>
        ))}
      </motion.div>

      {/* ════ MAIN GRID ════ */}
      <motion.div
        className="sn-main-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >

        {/* ── REACT FLOW CANVAS ── */}
        <div className="sn-network-area">
          <div className="sn-network-canvas">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              fitView
              fitViewOptions={{ padding: 0.12 }}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
              panOnDrag={false}
              zoomOnScroll={false}
              zoomOnPinch={false}
              zoomOnDoubleClick={false}
              preventScrolling={false}
              proOptions={{ hideAttribution: true }}
              style={{ background: 'transparent' }}
            >
              <Background
                color="rgba(99,102,241,0.06)"
                gap={36}
                size={1}
                style={{ borderRadius: '14px' }}
              />
            </ReactFlow>

            {/* ── Process legend bar ── */}
            <div className="sn-canvas-legend">
              {[
                { icon: '📦', title: 'Source',      sub: 'Suppliers' },
                { icon: '🏭', title: 'Export',       sub: 'Ports' },
                { icon: '⛴',  title: 'Transit',      sub: 'Routes' },
                { icon: '⬡',  title: 'Destination',  sub: 'Hub' },
                { icon: '🏗',  title: 'Processing',   sub: 'Refineries' },
                { icon: '⚡',  title: 'End Use',      sub: 'Operations' },
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
          <motion.div
            className="sn-glass-card"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <div className="sn-card-header">
              <span className="sn-card-title">Supply Mix</span>
              <span className="sn-card-badge">BY SOURCE</span>
            </div>
            <div className="sn-donut-wrap">
              <svg width="150" height="150" viewBox="0 0 140 140">
                <defs>
                  <filter id="donut-glow">
                    <feGaussianBlur stdDeviation="2.5" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <circle cx="70" cy="70" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="18" />
                <circle cx="70" cy="70" r="50" fill="none" stroke="#ef4444" strokeWidth="18"
                  strokeDasharray="129 314" transform="rotate(-90 70 70)" filter="url(#donut-glow)" opacity="0.9" />
                <circle cx="70" cy="70" r="50" fill="none" stroke="#f59e0b" strokeWidth="18"
                  strokeDasharray="85 314" strokeDashoffset="-129" transform="rotate(-90 70 70)" filter="url(#donut-glow)" opacity="0.9" />
                <circle cx="70" cy="70" r="50" fill="none" stroke="#10b981" strokeWidth="18"
                  strokeDasharray="100 314" strokeDashoffset="-214" transform="rotate(-90 70 70)" filter="url(#donut-glow)" opacity="0.9" />
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
          <motion.div
            className="sn-glass-card"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <div className="sn-card-header">
              <span className="sn-card-title">Recent Activity</span>
              <span className="sn-view-all">View all →</span>
            </div>
            <div className="sn-activity-list">
              {recentActivities.map((a, i) => (
                <motion.div
                  key={a.id}
                  className={`sn-activity-item ${a.status}`}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.08 }}
                >
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
          <motion.div
            className="sn-glass-card vigilance-card"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <div className="sn-card-header">
              <span className="sn-card-title">Always-On Vigilance</span>
              <PulseRing color="#8b5cf6" />
            </div>
            <div className="sn-vigilance-sub">Monitoring critical supply signals 24/7</div>
            <div className="sn-sparkline-wrap">
              <svg width="100%" height="56" viewBox="0 0 120 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={`${vPath} L 117 40 L 0 40 Z`} fill="url(#spark-fill)" />
                <path d={vPath} fill="none" stroke="#8b5cf6" strokeWidth="1.5"
                  style={{ filter: 'drop-shadow(0 0 3px #8b5cf6)' }} />
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
      <motion.div
        className="sn-instruction-bar"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.65 }}
      >
        <span className="sn-instr-icon">💬</span>
        <span>
          Hover or click any route to see details and{' '}
          <span className="sn-highlight">explore alternatives</span>.
        </span>
      </motion.div>
    </div>
  );
};

/* Wrap in provider — required by React Flow */
const SupplyNetwork = () => (
  <ReactFlowProvider>
    <SupplyNetworkInner />
  </ReactFlowProvider>
);

export default SupplyNetwork;
