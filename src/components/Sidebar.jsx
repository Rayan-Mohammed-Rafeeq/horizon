import { Home, Network, AlertTriangle, Activity, Shield, TrendingDown, X, ChevronsLeft, ChevronsRight, Zap, BookOpen } from 'lucide-react';
import './Sidebar.css';

const navigationItems = [
  { id: 'overview',        label: 'Overview',        icon: Home,          shortcut: '01' },
  { id: 'supply-network',  label: 'Supply Network',  icon: Network,       shortcut: '02' },
  { id: 'early-warning',   label: 'Early Warning',   icon: AlertTriangle, shortcut: '03', alert: true },
  { id: 'scenarios',       label: 'Scenarios',       icon: Activity,      shortcut: '04' },
  { id: 'strategy',        label: 'Strategy',        icon: Shield,        shortcut: '05' },
  { id: 'impact',          label: 'Impact',          icon: TrendingDown,  shortcut: '06' },
];

const docsItem = { id: 'docs', label: 'Docs', icon: BookOpen, shortcut: '07' };

const Sidebar = ({ activeSection, onNavigate, isOpen, onClose, isMobile, isCollapsed, onToggleCollapse }) => {
  const handleNavClick = (sectionId) => {
    onNavigate(sectionId);
    if (isMobile && onClose) onClose();
  };

  return (
    <>
      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''} ${isCollapsed && !isMobile ? 'collapsed' : ''}`}>

        {/* Noise texture */}
        <div className="sidebar-noise" />

        {/* Desktop Toggle — only show when expanded */}
        {!isMobile && !isCollapsed && (
          <button 
            className="sidebar-toggle" 
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
          >
            <ChevronsLeft size={14} />
          </button>
        )}

        {/* Expand tab — only show when collapsed, sits on right edge */}
        {!isMobile && isCollapsed && (
          <button
            className="sidebar-expand-tab"
            onClick={onToggleCollapse}
            aria-label="Expand sidebar"
          >
            <ChevronsRight size={13} />
          </button>
        )}

        {isMobile && (
          <button className="sidebar-close" onClick={onClose}>
            <X size={18} />
          </button>
        )}

        {/* ── Logo ─────────────────────────── */}
        {!isCollapsed ? (
          <div className="sidebar-header">
            <div className="logo-lockup">
              <div className="logo-ring">
                <img src="/logo.svg" alt="Horizon" className="logo-image" />
              </div>
              <div className="sidebar-brand">
                <div className="brand-name">HORIZON</div>
                <div className="brand-tagline">Energy Continuity Intelligence</div>
              </div>
            </div>
            {/* Risk pulse bar */}
            <div className="risk-pulse-bar">
              <div className="rpb-label">RISK LEVEL</div>
              <div className="rpb-track">
                <div className="rpb-fill" />
              </div>
              <div className="rpb-value">78</div>
            </div>
          </div>
        ) : (
          <div className="sidebar-header-collapsed">
            <div className="logo-ring small">
              <img src="/logo.svg" alt="Horizon" className="logo-image-small" />
            </div>
          </div>
        )}

        {/* ── Nav label ────────────────────── */}
        {!isCollapsed && (
          <div className="nav-section-label">NAVIGATION</div>
        )}

        {/* ── Navigation ───────────────────── */}
        <nav className="sidebar-nav">
          <div className="nav-items">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  title={isCollapsed ? item.label : undefined}
                >
                  {isActive && <div className="nav-item-glow" />}
                  <div className={`nav-icon-wrap ${isActive ? 'active' : ''}`}>
                    <Icon size={15} strokeWidth={isActive ? 2.5 : 2} />
                    {item.alert && !isActive && (
                      <span className="nav-alert-dot" />
                    )}
                  </div>
                  {!isCollapsed && (
                    <>
                      <span className="nav-label">{item.label}</span>
                      <span className="nav-shortcut">{item.shortcut}</span>
                    </>
                  )}
                </button>
              );
            })}

            {/* ── Docs divider + item ── */}
            <div className="nav-divider">
              {!isCollapsed && <span className="nav-divider-label">RESOURCES</span>}
            </div>

            {(() => {
              const Icon = docsItem.icon;
              const isActive = activeSection === docsItem.id;
              return (
                <button
                  className={`nav-item docs-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(docsItem.id)}
                  title={isCollapsed ? docsItem.label : undefined}
                >
                  {isActive && <div className="nav-item-glow" />}
                  <div className={`nav-icon-wrap ${isActive ? 'active' : ''}`}>
                    <Icon size={15} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  {!isCollapsed && (
                    <>
                      <span className="nav-label">{docsItem.label}</span>
                      <span className="nav-shortcut">{docsItem.shortcut}</span>
                    </>
                  )}
                </button>
              );
            })()}
          </div>
        </nav>

        {/* ── Footer ───────────────────────── */}
        {!isCollapsed && (
          <div className="sidebar-footer">
            {/* Version */}
            <div className="sidebar-version">
              <span className="version-label">HORIZON</span>
              <span className="version-num">v1.0</span>
              <div className="version-divider" />
              <span className="version-copy">© 2028 Horizon Intelligence</span>
            </div>

            {/* Status row */}
            <div className="footer-status">
              <div className="fs-dot" />
              <span className="fs-label">Always-on Vigilance</span>
              <Zap size={10} className="fs-zap" />
            </div>
          </div>
        )}

        {isCollapsed && !isMobile && (
          <div className="sidebar-footer-collapsed">
            <div className="fs-dot" />
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;