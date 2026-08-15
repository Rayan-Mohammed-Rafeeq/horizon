import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertOctagon, ChevronRight, CheckCircle, Users } from 'lucide-react';
import { emergencyResponse, downstreamCustomers, systemArchitecture } from '../data/demoData';
import './Impact.css';

const Impact = () => {
  const [emergencyPlanGenerated, setEmergencyPlanGenerated] = useState(false);

  return (
    <div className="impact-section" id="impact">
      {/* Header */}
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title">Impact</h2>
        <p className="section-subtitle">
          Understanding downstream effects and emergency protocols.
        </p>
      </motion.div>

      {/* Downstream Impact */}
      <motion.div
        className="downstream-impact"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="subsection-title">Downstream Impact</h3>
        <p className="subsection-description">
          Energy availability impacts factory capacity and customer commitments
        </p>

        <div className="impact-flow">
          <div className="flow-node">Energy Availability</div>
          <ChevronRight size={20} className="flow-arrow" />
          <div className="flow-node">Factory Capacity</div>
          <ChevronRight size={20} className="flow-arrow" />
          <div className="flow-node">Customer Commitments</div>
        </div>

        <div className="customers-grid">
          {downstreamCustomers.map((customer, index) => (
            <motion.div
              key={customer.id}
              className={`customer-card risk-${customer.risk.toLowerCase()}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            >
              <div className="customer-icon">
                <Users size={20} />
              </div>
              <div className="customer-info">
                <h4 className="customer-name">{customer.name}</h4>
                <div className="customer-industry">{customer.industry}</div>
              </div>
              <div className="customer-risk">
                <span className={`badge badge-${customer.risk.toLowerCase()}`}>
                  {customer.risk}
                </span>
                <div className="priority-label">{customer.priority} Priority</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="priority-note">
          <AlertOctagon size={16} />
          <p>Prioritize critical customers when supply becomes constrained.</p>
        </div>
      </motion.div>

      {/* Emergency Response */}
      <motion.div
        className="emergency-response"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="subsection-title">What if Horizon didn't see it coming?</h3>
        
        <div className="emergency-scenario">
          <div className="scenario-alert">
            <AlertOctagon size={24} />
            <div>
              <div className="alert-badge">EARLY WARNING MISSED</div>
              <div className="alert-text">{emergencyResponse.scenario}</div>
            </div>
          </div>

          <div className="emergency-metrics">
            <div className="emergency-metric">
              <div className="metric-label-small">Current Inventory</div>
              <div className="metric-value-medium">{emergencyResponse.currentInventory} days</div>
            </div>
            <div className="emergency-metric">
              <div className="metric-label-small">Projected Shortage</div>
              <div className="metric-value-medium critical">Day {emergencyResponse.projectedShortage}</div>
            </div>
          </div>

          <div className="emergency-actions">
            <h4 className="actions-title">Emergency Response</h4>
            <div className="actions-list">
              {emergencyResponse.actions.map((action, index) => (
                <div key={index} className="action-item">
                  <CheckCircle size={16} />
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="btn btn-danger btn-block"
            onClick={() => setEmergencyPlanGenerated(true)}
            disabled={emergencyPlanGenerated}
          >
            {emergencyPlanGenerated ? 'EMERGENCY PLAN GENERATED' : 'GENERATE EMERGENCY PLAN'}
          </button>

          <AnimatePresence>
            {emergencyPlanGenerated && (
              <motion.div
                className="emergency-plan"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h4 className="plan-title">Emergency Plan</h4>
                <div className="plan-details">
                  <div className="plan-item">
                    <span className="plan-label">Alternative Supply:</span>
                    <span className="plan-value">{emergencyResponse.plan.alternativeSupply}</span>
                  </div>
                  <div className="plan-item">
                    <span className="plan-label">Demand Reduction:</span>
                    <span className="plan-value">{emergencyResponse.plan.demandReduction}</span>
                  </div>
                  <div className="plan-item">
                    <span className="plan-label">Priority:</span>
                    <span className="plan-value">{emergencyResponse.plan.priority}</span>
                  </div>
                </div>
                <div className="plan-result">
                  <CheckCircle size={18} />
                  <span>{emergencyResponse.plan.result}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="preparedness-note">
            <p>
              Horizon does not depend on perfect prediction. Preparedness and response 
              remain available when early warning fails.
            </p>
          </div>
        </div>
      </motion.div>

      {/* System Overview */}
      <motion.div
        className="system-overview"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h3 className="subsection-title">How Horizon Works</h3>
        <p className="subsection-description">
          End-to-end continuity intelligence architecture
        </p>

        <div className="architecture-flow">
          {systemArchitecture.map((step, index) => (
            <div key={step.id} className="architecture-step">
              <motion.div
                className="step-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <div className="step-number">{String(step.id).padStart(2, '0')}</div>
                <div className="step-content">
                  <h4 className="step-title">{step.label}</h4>
                  <p className="step-description">{step.description}</p>
                </div>
              </motion.div>
              {index < systemArchitecture.length - 1 && (
                <div className="step-connector">
                  <ChevronRight size={20} />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Impact;
