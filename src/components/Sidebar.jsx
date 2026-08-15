import { Home, Network, AlertTriangle, Activity, Shield, TrendingDown, X, ChevronLeft, ChevronRight } from 'lucide-react';
import './Sidebar.css';

const navigationItems = [
  { id: 'overview', label: 'OVERVIEW', icon: Home },
  { id: 'supply-network', label: 'SUPPLY NETWORK', icon: Network },
  { id: 'early-warning', label: 'EARLY WARNING', icon: AlertTriangle },
  { id: 'scenarios', label: 'SCENARIOS', icon: Activity },
  { id: 'strategy', label: 'STRATEGY', icon: Shield },
  { id: 'impact', label: 'IMPACT', icon: TrendingDown },
];

const Sidebar = ({ activeSection, onNavigate, isOpen, onClose, isMobile, isCollapsed, onToggleCollapse }) => {
  const handleNavClick = (sectionId) => {
    onNavigate(sectionId);
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}
      
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''} ${isCollapsed && !isMobile ? 'collapsed' : ''}`}>
        {/* Mobile Close Button */}
        {isMobile && (
          <button className="sidebar-close" onClick={onClose}>
            <X size={20} />
          </button>
        )}
        
        {/* Desktop Toggle Button */}
        {!isMobile && (
          <button 
            className="sidebar-toggle" 
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        )}
        
        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-items">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon size={18} className="nav-icon" />
                  {!isCollapsed && <span className="nav-label">{item.label}</span>}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Bottom Branding */}
        {!isCollapsed && (
          <div className="sidebar-footer">
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/logo.svg" alt="Horizon Logo" className="logo-image" />
              </div>
              <div className="footer-text">
                <div className="footer-title">HORIZON</div>
                <div className="footer-subtitle">Energy Continuity Intelligence</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Collapsed Footer - Just Logo */}
        {isCollapsed && !isMobile && (
          <div className="sidebar-footer-collapsed">
            <img src="/logo.svg" alt="Horizon Logo" className="logo-image-small" />
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
