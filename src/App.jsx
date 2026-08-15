import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Overview from './components/Overview';
import SupplyNetwork from './components/SupplyNetwork';
import EarlyWarning from './components/EarlyWarning';
import ScenarioSimulator from './components/ScenarioSimulator';
import Strategy from './components/Strategy';
import Impact from './components/Impact';
import Docs from './components/Docs';
import './App.css';

const DASHBOARD_SECTIONS = ['overview', 'supply-network', 'early-warning', 'scenarios', 'strategy', 'impact'];

function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // true when the Docs view is open — completely separate from the scroll layout
  const isDocsMode = activeSection === 'docs';

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);

    if (sectionId === 'docs') {
      // Docs is a separate view — no scroll needed, just swap
      if (isMobile) setSidebarOpen(false);
      return;
    }

    // Scroll to the section within the dashboard
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (isMobile) setSidebarOpen(false);
  };

  // Scroll-spy — only active when NOT in docs mode
  useEffect(() => {
    if (isDocsMode) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of DASHBOARD_SECTIONS) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDocsMode]);

  const sidebarClass = isMobile ? '' : sidebarCollapsed ? 'with-sidebar-collapsed' : 'with-sidebar';

  return (
    <div className="app">
      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(c => !c)}
      />

      <div className={`main-content ${sidebarClass}`}>
        <Topbar onMenuClick={() => setSidebarOpen(o => !o)} showMenuButton={isMobile} />

        <AnimatePresence mode="wait">
          {isDocsMode ? (
            /* ── DOCS MODE — completely isolated, no scroll connection ── */
            <motion.div
              key="docs"
              className="content-area docs-standalone"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Docs />
            </motion.div>
          ) : (
            /* ── DASHBOARD MODE — normal scrollable layout ── */
            <motion.div
              key="dashboard"
              className="content-area"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="container">
                <Overview onNavigate={handleNavigate} />
                <SupplyNetwork />
                <EarlyWarning onNavigate={handleNavigate} />
                <ScenarioSimulator onNavigate={handleNavigate} />
                <Strategy />
                <Impact />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
