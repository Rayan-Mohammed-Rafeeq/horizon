import { motion } from 'framer-motion';
import './SupplyNetwork.css';

const SupplyNetwork = () => {
  const getCurrentDateTime = () => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    const date = now.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    return { time: `${time} IST`, date };
  };

  const { time, date } = getCurrentDateTime();

  // Recent activities
  const recentActivities = [
    { id: 1, text: 'Shipping delay on Route A', time: '2h ago', status: 'critical' },
    { id: 2, text: 'Freight rates on Gulf route increased', time: '6h ago', status: 'warning' },
    { id: 3, text: 'Shipping activity high on alternative route', time: '9h ago', status: 'success' },
    { id: 4, text: 'Contingency Plan B activated', time: '12h ago', status: 'info' }
  ];

  // Generate simple line chart data for vigilance
  const vigilanceData = Array.from({ length: 30 }, (_, i) => ({
    x: i,
    y: 20 + Math.sin(i * 0.3) * 10 + Math.random() * 5
  }));

  const vigilancePath = vigilanceData.map((point, i) => 
    `${i === 0 ? 'M' : 'L'} ${point.x * 3} ${40 - point.y}`
  ).join(' ');

  return (
    <div className="supply-network-section" id="supply-network">
      {/* Section Header */}
      <motion.div
        className="sn-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="sn-header-left">
          <div className="sn-section-number">02</div>
          <div className="sn-header-content">
            <h2 className="sn-section-title">SUPPLY NETWORK</h2>
            <p className="sn-section-subtitle">Understand how energy flows from global sources to your operations.</p>
          </div>
        </div>
        <div className="sn-header-right">
          <div className="sn-live-indicator">
            <span className="sn-live-dot"></span>
            <span>LIVE FEED</span>
          </div>
          <div className="sn-datetime">
            <div className="sn-time">{time}</div>
            <div className="sn-date">{date}</div>
          </div>
          <div className="sn-demo-badge">DEMO ENVIRONMENT • ILLUSTRATIVE DATA</div>
        </div>
      </motion.div>

      {/* Risk Legend */}
      <motion.div
        className="sn-risk-legend"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="sn-legend-item">
          <div className="sn-legend-dot high-risk"></div>
          <span>HIGH RISK</span>
        </div>
        <div className="sn-legend-item">
          <div className="sn-legend-dot medium-risk"></div>
          <span>MEDIUM RISK</span>
        </div>
        <div className="sn-legend-item">
          <div className="sn-legend-dot low-risk"></div>
          <span>LOW RISK</span>
        </div>
        <div className="sn-legend-item">
          <div className="sn-legend-arrow"></div>
          <span>FLOW OF SUPPLY</span>
        </div>
      </motion.div>

      {/* Main Network Visualization Container */}
      <motion.div
        className="sn-main-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Left Side: Network Diagram + Left Vigilance */}
        <div className="sn-network-area">
          <div className="sn-network-canvas">
            {/* Supplier Nodes - Left Side */}
            <div className="sn-supplier-node high-risk" style={{ top: '10%', left: '2%' }}>
              <div className="sn-node-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className="sn-node-content">
                <div className="sn-node-title">Gulf Supplier</div>
                <div className="sn-node-subtitle">Raw Oil / Crude</div>
                <div className="sn-node-percentage">41%</div>
                <div className="sn-node-risk">HIGH RISK</div>
              </div>
            </div>

            <div className="sn-supplier-node medium-risk" style={{ top: '40%', left: '2%' }}>
              <div className="sn-node-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <div className="sn-node-content">
                <div className="sn-node-title">Russian Supplier</div>
                <div className="sn-node-subtitle">Crude Oil</div>
                <div className="sn-node-percentage">27%</div>
                <div className="sn-node-risk">MEDIUM RISK</div>
              </div>
            </div>

            <div className="sn-supplier-node low-risk" style={{ top: '70%', left: '2%' }}>
              <div className="sn-node-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                </svg>
              </div>
              <div className="sn-node-content">
                <div className="sn-node-title">Brazilian Supplier</div>
                <div className="sn-node-subtitle">LPG / LNG</div>
                <div className="sn-node-percentage">32%</div>
                <div className="sn-node-risk">LOW RISK</div>
              </div>
            </div>

            {/* Port/Export Terminal */}
            <div className="sn-transit-node" style={{ top: '10%', left: '32%' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="10" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <div className="sn-transit-label">Port / Export<br/>Terminal</div>
            </div>

            {/* Strait of Hormuz - Critical Chokepoint */}
            <div className="sn-chokepoint-node" style={{ top: '8%', left: '48%' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <div className="sn-chokepoint-label">STRAIT OF<br/>HORMUZ</div>
            </div>

            {/* Sea Route */}
            <div className="sn-transit-node" style={{ top: '13%', left: '71%' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
                <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-3.5 7"/>
              </svg>
              <div className="sn-transit-label">Sea<br/>Route</div>
            </div>

            {/* Alternative Maritime Routes */}
            <div className="sn-alt-route-node" style={{ top: '43%', left: '40%' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 16 16 12 12 8"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              <div className="sn-alt-route-label">Alternative<br/>Maritime Route</div>
            </div>

            <div className="sn-alt-route-node" style={{ top: '73%', left: '40%' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 16 16 12 12 8"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              <div className="sn-alt-route-label">Alternative<br/>Maritime Route</div>
            </div>

            {/* Bharat Downstream & Materials Hub */}
            <div className="sn-hub-node" style={{ top: '38%', left: '72%' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
              <div className="sn-hub-label">
                <div className="sn-hub-title">BHARAT</div>
                <div className="sn-hub-subtitle">DOWNSTREAM</div>
                <div className="sn-hub-subtitle">&</div>
                <div className="sn-hub-subtitle">MATERIALS HUB</div>
              </div>
            </div>

            {/* Refineries */}
            <div className="sn-refinery-node" style={{ top: '75%', left: '65%' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 20h20"/>
                <path d="M7 20V10l5-5 5 5v10"/>
              </svg>
              <div className="sn-refinery-label">Refinery 01</div>
            </div>

            <div className="sn-refinery-node" style={{ top: '75%', left: '82%' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 20h20"/>
                <path d="M7 20V10l5-5 5 5v10"/>
              </svg>
              <div className="sn-refinery-label">Refinery 02</div>
            </div>

            {/* Flow Lines - SVG Overlay */}
            <svg className="sn-flow-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                {/* Smaller, thinner arrow markers */}
                <marker id="arrow-red" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill="#ef4444"/>
                </marker>
                <marker id="arrow-orange" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill="#f59e0b"/>
                </marker>
                <marker id="arrow-green" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill="#10b981"/>
                </marker>
                <marker id="arrow-blue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill="#6366f1"/>
                </marker>
              </defs>
              
              {/* Gulf to Port - Red dashed arrow */}
              <path d="M 18 10 L 30 10" className="sn-flow-line high-risk" strokeDasharray="3,2" markerEnd="url(#arrow-red)"/>
              
              {/* Port to Hormuz - Red dashed arrow */}
              <path d="M 37 10 L 47 9" className="sn-flow-line high-risk" strokeDasharray="3,2" markerEnd="url(#arrow-red)"/>
              
              {/* Port vertical connection down */}
              <path d="M 33.5 13 L 33.5 30" className="sn-flow-line-connection" strokeDasharray="2,2" stroke="#6366f1"/>
              
              {/* Hormuz to Sea Route - Red dashed arrow */}
              <path d="M 58 11 L 69 13" className="sn-flow-line high-risk" strokeDasharray="3,2" markerEnd="url(#arrow-red)"/>
              
              {/* Hormuz vertical connection down */}
              <path d="M 53.5 16 L 53.5 32" className="sn-flow-line-connection" strokeDasharray="2,2" stroke="#6366f1"/>
              
              {/* Sea Route to Hub - Blue dashed arrow */}
              <path d="M 75 17 L 75 36" className="sn-flow-line-connection" strokeDasharray="2,2" stroke="#6366f1" markerEnd="url(#arrow-blue)"/>
              
              {/* Russia to Alt Route - Orange solid arrow */}
              <path d="M 18 40 L 38 40" className="sn-flow-line medium-risk" markerEnd="url(#arrow-orange)"/>
              
              {/* Alt Route (Russia) to Hormuz connection */}
              <path d="M 45 37 L 52 33" className="sn-flow-line-connection" strokeDasharray="2,2" stroke="#6366f1"/>
              
              {/* Alt Route (Russia) to Hub - Blue dashed arrow */}
              <path d="M 52 40 L 70 40" className="sn-flow-line-connection" strokeDasharray="2,2" stroke="#6366f1" markerEnd="url(#arrow-blue)"/>
              
              {/* Brazil to Alt Route - Green solid arrow */}
              <path d="M 18 70 L 38 70" className="sn-flow-line low-risk" markerEnd="url(#arrow-green)"/>
              
              {/* Alt Route (Brazil) to Hub - Blue dashed curved arrow */}
              <path d="M 52 70 L 60 65 Q 68 58 71 50" className="sn-flow-line-connection" strokeDasharray="2,2" stroke="#6366f1" markerEnd="url(#arrow-blue)" fill="none"/>
              
              {/* Hub to Refinery 01 - Blue arrow */}
              <path d="M 73 56 L 68 77" className="sn-flow-line-connection" stroke="#6366f1" markerEnd="url(#arrow-blue)"/>
              
              {/* Hub to Refinery 02 - Blue arrow */}
              <path d="M 83 56 L 85 77" className="sn-flow-line-connection" stroke="#6366f1" markerEnd="url(#arrow-blue)"/>
            </svg>
          </div>

          {/* Always-on Vigilance Card - Left (REMOVED) */}
        </div>

        {/* Right Side: Information Cards */}
        <div className="sn-info-area">
          {/* Supply Mix Card */}
          <motion.div
            className="sn-supply-mix-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="sn-card-title">SUPPLY MIX (BY SOURCE)</div>
            <div className="sn-donut-container">
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="50" fill="none" stroke="#ef4444" strokeWidth="20" 
                  strokeDasharray="129 314" transform="rotate(-90 70 70)"/>
                <circle cx="70" cy="70" r="50" fill="none" stroke="#f59e0b" strokeWidth="20" 
                  strokeDasharray="85 314" strokeDashoffset="-129" transform="rotate(-90 70 70)"/>
                <circle cx="70" cy="70" r="50" fill="none" stroke="#10b981" strokeWidth="20" 
                  strokeDasharray="100 314" strokeDashoffset="-214" transform="rotate(-90 70 70)"/>
                <text x="70" y="65" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="700">100%</text>
                <text x="70" y="82" textAnchor="middle" fill="#a1a1aa" fontSize="11" fontWeight="600">TOTAL</text>
              </svg>
            </div>
            <div className="sn-supply-breakdown">
              <div className="sn-supply-item">
                <div className="sn-supply-dot" style={{ background: '#ef4444' }}></div>
                <span className="sn-supply-label">Gulf & Partner</span>
                <span className="sn-supply-percent">41%</span>
              </div>
              <div className="sn-supply-item">
                <div className="sn-supply-dot" style={{ background: '#f59e0b' }}></div>
                <span className="sn-supply-label">Russia & Partner</span>
                <span className="sn-supply-percent">27%</span>
              </div>
              <div className="sn-supply-item">
                <div className="sn-supply-dot" style={{ background: '#10b981' }}></div>
                <span className="sn-supply-label">Brazil & Others</span>
                <span className="sn-supply-percent">32%</span>
              </div>
            </div>
            <div className="sn-supply-message">
              Diversification strengthens resilience against disruptions.
            </div>
          </motion.div>

          {/* Recent Activity Card */}
          <motion.div
            className="sn-activity-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="sn-activity-header">
              <span className="sn-card-title">RECENT ACTIVITY</span>
              <span className="sn-view-all">View all</span>
            </div>
            <div className="sn-activity-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="sn-activity-item">
                  <div className={`sn-activity-icon ${activity.status}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div className="sn-activity-content">
                    <div className="sn-activity-text">{activity.text}</div>
                    <div className="sn-activity-time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Always-on Vigilance Card - Right */}
          <motion.div
            className="sn-vigilance-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="sn-card-title">ALWAYS-ON VIGILANCE</div>
            <div className="sn-vigilance-subtitle">Monitoring critical supply signals 24/7</div>
            <div className="sn-vigilance-chart">
              <svg width="100%" height="60" viewBox="0 0 90 40" preserveAspectRatio="none">
                <path d={vigilancePath} fill="rgba(139, 92, 246, 0.1)" stroke="rgba(139, 92, 246, 0.6)" strokeWidth="1.5"/>
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Instruction Bar */}
      <motion.div
        className="sn-instruction-bar"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span>Hover or click on any route to see details and <span className="highlight">explore alternatives</span>.</span>
      </motion.div>

      {/* Bottom Supply Chain Legend */}
      <motion.div
        className="sn-process-legend"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="sn-process-step">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          </svg>
          <div className="sn-process-label">
            <div className="sn-process-title">Source</div>
            <div className="sn-process-subtitle">(Suppliers)</div>
          </div>
        </div>
        <div className="sn-process-arrow">→</div>
        <div className="sn-process-step">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="10" rx="2"/>
          </svg>
          <div className="sn-process-label">
            <div className="sn-process-title">Export</div>
            <div className="sn-process-subtitle">(Ports)</div>
          </div>
        </div>
        <div className="sn-process-arrow">→</div>
        <div className="sn-process-step">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
          </svg>
          <div className="sn-process-label">
            <div className="sn-process-title">Transit</div>
            <div className="sn-process-subtitle">(Routes)</div>
          </div>
        </div>
        <div className="sn-process-arrow">→</div>
        <div className="sn-process-step">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
          </svg>
          <div className="sn-process-label">
            <div className="sn-process-title">Destination</div>
            <div className="sn-process-subtitle">(Hub)</div>
          </div>
        </div>
        <div className="sn-process-arrow">→</div>
        <div className="sn-process-step">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 20h20"/>
            <path d="M7 20V10l5-5 5 5v10"/>
          </svg>
          <div className="sn-process-label">
            <div className="sn-process-title">Processing</div>
            <div className="sn-process-subtitle">(Refineries)</div>
          </div>
        </div>
        <div className="sn-process-arrow">→</div>
        <div className="sn-process-step">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
          </svg>
          <div className="sn-process-label">
            <div className="sn-process-title">End Use</div>
            <div className="sn-process-subtitle">(Operations)</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SupplyNetwork;