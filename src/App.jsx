import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Overview from './components/Overview';
import SupplyNetwork from './components/SupplyNetwork';
import EarlyWarning from './components/EarlyWarning';
import ScenarioSimulator from './components/ScenarioSimulator';
import Strategy from './components/Strategy';
import Impact from './components/Impact';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Close mobile sidebar after navigation
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'supply-network', 'early-warning', 'scenarios', 'strategy', 'impact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <div className={`main-content ${isMobile ? '' : 'with-sidebar'}`}>
        {/* Topbar */}
        <Topbar 
          onMenuClick={handleMenuClick} 
          showMenuButton={isMobile}
        />

        {/* Content Area */}
        <motion.div 
          className="content-area"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
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
      </div>
    </div>
  );
}

export default App;
