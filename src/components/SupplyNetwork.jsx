import { motion } from 'framer-motion';
import { useState } from 'react';
import { networkNodes, networkConnections } from '../data/demoData';
import './SupplyNetwork.css';

const SupplyNetwork = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);

  const getNodeClass = (node) => {
    let className = `network-node ${node.type}`;
    if (node.critical) className += ' critical';
    if (selectedRoute && selectedRoute.includes(node.id)) className += ' selected';
    return className;
  };

  const getConnectionClass = (connection) => {
    let className = `network-connection ${connection.risk}`;
    if (selectedRoute && selectedRoute.includes(connection.from) && selectedRoute.includes(connection.to)) {
      className += ' selected';
    }
    return className;
  };

  const handleNodeClick = (nodeId) => {
    // Highlight the main Hormuz route when clicking Hormuz or related nodes
    if (['gulf', 'persian-gulf', 'hormuz', 'india', 'bharat'].includes(nodeId)) {
      setSelectedRoute(['gulf', 'persian-gulf', 'hormuz', 'india', 'bharat']);
    } else if (nodeId === 'russia') {
      setSelectedRoute(['russia', 'india', 'bharat']);
    } else if (nodeId === 'brazil') {
      setSelectedRoute(['brazil', 'india', 'bharat']);
    } else {
      setSelectedRoute(null);
    }
  };

  return (
    <div className="supply-network-section" id="supply-network">
      {/* Header */}
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title">Supply Network</h2>
        <p className="section-subtitle">
          Critical energy routes and chokepoints
        </p>
      </motion.div>

      {/* Network Visualization */}
      <motion.div
        className="network-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <svg className="network-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* Draw connections first (behind nodes) */}
          {networkConnections.map((conn, index) => {
            const fromNode = networkNodes.find(n => n.id === conn.from);
            const toNode = networkNodes.find(n => n.id === conn.to);
            
            if (!fromNode || !toNode) return null;
            
            return (
              <motion.line
                key={`conn-${index}`}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                className={getConnectionClass(conn)}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              />
            );
          })}

          {/* Draw nodes */}
          {networkNodes.map((node, index) => (
            <g key={node.id}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.critical ? 3 : 2}
                className={getNodeClass(node)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                onClick={() => handleNodeClick(node.id)}
                style={{ cursor: 'pointer' }}
              />
              <motion.text
                x={node.x}
                y={node.y - 4}
                className={`node-label ${node.type}`}
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
              >
                {node.label}
              </motion.text>
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Route Legend */}
      <motion.div
        className="network-legend"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="legend-title">Route Risk Levels</div>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-indicator high"></div>
            <span>High Risk (45% dependency)</span>
          </div>
          <div className="legend-item">
            <div className="legend-indicator medium"></div>
            <span>Medium Risk (30% dependency)</span>
          </div>
          <div className="legend-item">
            <div className="legend-indicator low"></div>
            <span>Low Risk (25% dependency)</span>
          </div>
        </div>
      </motion.div>

      {/* Route Details Panel */}
      {selectedRoute && (
        <motion.div
          className="route-details-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="panel-header">
            <h4>Route Details</h4>
            <button 
              className="btn btn-ghost btn-sm" 
              onClick={() => setSelectedRoute(null)}
            >
              Close
            </button>
          </div>
          <div className="panel-content">
            {selectedRoute.includes('hormuz') && (
              <>
                <div className="detail-item">
                  <span className="detail-label">Route:</span>
                  <span className="detail-value">Gulf → Hormuz → India</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Dependency:</span>
                  <span className="detail-value critical">45%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Critical Chokepoint:</span>
                  <span className="detail-value">Strait of Hormuz</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Inventory:</span>
                  <span className="detail-value">17 days</span>
                </div>
              </>
            )}
            {selectedRoute.includes('russia') && !selectedRoute.includes('hormuz') && (
              <>
                <div className="detail-item">
                  <span className="detail-label">Route:</span>
                  <span className="detail-value">Russia → India</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Dependency:</span>
                  <span className="detail-value warning">30%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Inventory:</span>
                  <span className="detail-value">23 days</span>
                </div>
              </>
            )}
            {selectedRoute.includes('brazil') && (
              <>
                <div className="detail-item">
                  <span className="detail-label">Route:</span>
                  <span className="detail-value">Brazil → India</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Dependency:</span>
                  <span className="detail-value success">25%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Inventory:</span>
                  <span className="detail-value">31 days</span>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SupplyNetwork;
