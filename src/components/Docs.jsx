import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowDown, ChevronRight } from 'lucide-react';
import './Docs.css';

/* ─────────────────────────────────────────────
   Reusable animated section wrapper
───────────────────────────────────────────── */
const Section = ({ id, children, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });
  return (
    <motion.section
      id={id}
      ref={ref}
      className={`docs-section-block ${className}`}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.section>
  );
};

/* ─────────────────────────────────────────────
   Diagram panel (SVG hero)
───────────────────────────────────────────── */
const DiagramPanel = ({ src, alt, accent = 'violet', delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  return (
    <motion.div
      ref={ref}
      className={`docs-diagram-panel docs-diagram-panel--${accent}`}
      initial={{ opacity: 0, scale: 0.975 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="docs-diagram-inner">
        <img src={src} alt={alt} className="docs-diagram-img" loading="lazy" />
      </div>
    </motion.div>
  );
};

const SectionLabel = ({ children }) => (
  <div className="docs-section-label">{children}</div>
);

const Chain = ({ items, accent = 'default' }) => (
  <div className={`docs-chain docs-chain--${accent}`}>
    {items.map((item, i) => (
      <span key={i} className="docs-chain-group">
        <span className="docs-chain-item">{item}</span>
        {i < items.length - 1 && (
          <ChevronRight size={12} className="docs-chain-arrow" />
        )}
      </span>
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   Main Docs component
───────────────────────────────────────────── */
const NAV_SECTIONS = [
  { id: 'docs-s01', label: '01  Problem' },
  { id: 'docs-s02', label: '02  Decision' },
  { id: 'docs-s03', label: '03  Horizon Loop' },
  { id: 'docs-s04', label: '04  Failure' },
  { id: 'docs-s05', label: '05  Business' },
];

const Docs = () => {
  const pageRef = useRef(null);
  const [activeNav, setActiveNav] = useState('docs-s01');

  // .docs-page's parent is .docs-standalone — the actual scroll container
  const getContainer = () => pageRef.current?.parentElement ?? null;

  useEffect(() => {
    const container = getContainer();
    if (!container) return;

    const handleScroll = () => {
      const containerTop = container.getBoundingClientRect().top;
      const threshold = containerTop + 90;
      let current = NAV_SECTIONS[0].id;
      for (const { id } of NAV_SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) current = id;
      }
      setActiveNav(current);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const container = getContainer();
    const el = document.getElementById(id);
    if (!container || !el) return;
    const target =
      container.scrollTop +
      el.getBoundingClientRect().top -
      container.getBoundingClientRect().top -
      50;
    container.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    /* Outer shell — NOT zoomed, fills the standalone container */
    <div className="docs-page" ref={pageRef}>

      {/* ── Sticky nav — outside the zoom wrapper ── */}
      <div className="docs-sticky-nav" role="navigation" aria-label="Page sections">
        <div className="docs-sticky-nav-inner">
          {NAV_SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              className={`docs-nav-pill ${activeNav === id ? 'active' : ''}`}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Zoomed content wrapper ── */}
      <div className="docs-zoomed">

        {/* ══════════════════════════════════════
            PAGE HEADER
        ══════════════════════════════════════ */}
        <motion.div
          className="docs-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="docs-hero-grid-bg" aria-hidden="true" />
          <div className="docs-hero-inner">
            <div className="docs-hero-left">
              <motion.div
                className="docs-eyebrow"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                HORIZON / PRODUCT BRIEF
              </motion.div>

              <motion.h1
                className="docs-hero-heading"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
              >
                Designing for the disruption,<br />
                <span className="docs-grad">not predicting it.</span>
              </motion.h1>

              <motion.p
                className="docs-hero-body"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.26 }}
              >
                Horizon is an energy continuity decision-support platform that helps
                businesses understand exposure, simulate disruption scenarios, prepare
                response strategies, and maintain continuity when critical supply routes
                become unavailable.
              </motion.p>

              <motion.div
                className="docs-demo-badge"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.35 }}
              >
                DEMO ENVIRONMENT · ILLUSTRATIVE DATA
              </motion.div>
            </div>

            <motion.div
              className="docs-hero-meta"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="docs-meta-row">
                <div className="docs-meta-key">DESIGN CHALLENGE</div>
                <div className="docs-meta-val">Strait of Hormuz: Design an Alternative</div>
              </div>
              <div className="docs-meta-divider" />
              <div className="docs-meta-row">
                <div className="docs-meta-key">INITIAL BEACHHEAD</div>
                <div className="docs-meta-val">Energy-intensive manufacturing</div>
              </div>
              <div className="docs-meta-divider" />
              <div className="docs-meta-row">
                <div className="docs-meta-key">CORE QUESTION</div>
                <div className="docs-meta-val">What happens when a critical route disappears?</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════
            THESIS STRIP
        ══════════════════════════════════════ */}
        <motion.div
          className="docs-thesis"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <div className="docs-thesis-statement">
            <span>Don't wait for certainty.</span>
            <span className="docs-thesis-dot">·</span>
            <span>Understand exposure.</span>
            <span className="docs-thesis-dot">·</span>
            <span>Prepare before the runway disappears.</span>
          </div>
          <div className="docs-thesis-blocks">
            <div className="docs-thesis-block">
              <div className="docs-thesis-num">01</div>
              <div className="docs-thesis-label">UNDERSTAND<br />EXPOSURE</div>
            </div>
            <div className="docs-thesis-block-arrow"><ChevronRight size={14} /></div>
            <div className="docs-thesis-block">
              <div className="docs-thesis-num">02</div>
              <div className="docs-thesis-label">SIMULATE<br />CONSEQUENCES</div>
            </div>
            <div className="docs-thesis-block-arrow"><ChevronRight size={14} /></div>
            <div className="docs-thesis-block">
              <div className="docs-thesis-num">03</div>
              <div className="docs-thesis-label">PREPARE FOR<br />MULTIPLE OUTCOMES</div>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════
            SECTION 01 — THE PROBLEM
        ══════════════════════════════════════ */}
        <Section id="docs-s01">
          <SectionLabel>01 / THE PROBLEM</SectionLabel>
          <h2 className="docs-section-heading">
            How a route disruption becomes a business disruption
          </h2>
          <p className="docs-section-body docs-section-body--narrow">
            The Strait of Hormuz is not the business problem by itself. The problem is
            what happens when a company's dependence on that route collides with finite
            inventory, production requirements, and customer commitments.
          </p>
          <DiagramPanel src="/diagrams/hormuz-impact.svg" alt="Hormuz disruption impact chain" accent="violet" delay={0.1} />
          <div className="docs-insight-row">
            <Chain items={['ROUTE', 'ENERGY', 'INVENTORY', 'PRODUCTION', 'CUSTOMER']} />
          </div>
          <div className="docs-highlight-statement">
            "The disruption propagates. Horizon is designed to make that propagation
            visible before it becomes an interruption."
          </div>
        </Section>

        {/* ══════════════════════════════════════
            SECTION 02 — THE DECISION
        ══════════════════════════════════════ */}
        <Section id="docs-s02">
          <SectionLabel>02 / THE DECISION</SectionLabel>
          <h2 className="docs-section-heading">
            The real question isn't "Will Hormuz close?"
          </h2>
          <div className="docs-big-question">
            <span className="docs-big-question-lead">It's:</span>
            <span className="docs-big-question-text">
              "If it does, how long can we operate,<br />
              and what should we do now?"
            </span>
          </div>
          <div className="docs-decision-cards">
            {[
              { num: '01', title: 'HOW MUCH IS EXPOSED?',      items: ['Supplier concentration', 'Route dependency', 'Inventory runway'],                         accent: 'red' },
              { num: '02', title: 'HOW LONG CAN WE ABSORB IT?',items: ['Inventory', 'Alternative supply', 'Production flexibility'],                              accent: 'amber' },
              { num: '03', title: 'WHAT SHOULD WE DO?',        items: ['Secure supply', 'Increase buffer', 'Adjust demand', 'Prioritize production'],             accent: 'violet' },
            ].map((card, i) => (
              <motion.div
                key={card.num}
                className={`docs-decision-card docs-decision-card--${card.accent}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <div className="docs-decision-num">{card.num}</div>
                <div className="docs-decision-title">{card.title}</div>
                <ul className="docs-decision-list">
                  {card.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </motion.div>
            ))}
          </div>
          <div className="docs-section-divider" />
        </Section>

        {/* ══════════════════════════════════════
            SECTION 03 — HOW HORIZON WORKS
        ══════════════════════════════════════ */}
        <Section id="docs-s03">
          <SectionLabel>03 / THE HORIZON LOOP</SectionLabel>
          <h2 className="docs-section-heading">From external signal to business action</h2>
          <p className="docs-section-body docs-section-body--narrow">
            Horizon connects changes in the external world to the company's actual
            exposure, then turns that exposure into scenarios and decisions.
          </p>
          <DiagramPanel src="/diagrams/horizon-workflow.svg" alt="Horizon signal-to-decision workflow" accent="cyan" delay={0.1} />
          <div className="docs-loop-row">
            <div className="docs-loop-label">THE LOOP</div>
            <Chain items={['MONITOR', 'DETECT', 'ASSESS', 'SIMULATE', 'PREPARE', 'DECIDE', 'ACT', 'REASSESS']} accent="cyan" />
          </div>
          <div className="docs-highlight-statement docs-highlight-statement--cyan">
            "Horizon recommends. Humans decide."
          </div>
          <p className="docs-callout-sub">
            The system is designed as decision support, not autonomous control.
          </p>
        </Section>

        {/* ══════════════════════════════════════
            SECTION 04 — FAILURE RESILIENCE
        ══════════════════════════════════════ */}
        <Section id="docs-s04" className="docs-section-block--failure">
          <SectionLabel>04 / FAILURE RESILIENCE</SectionLabel>
          <h2 className="docs-section-heading">What if Horizon doesn't see it coming?</h2>
          <p className="docs-section-body docs-section-body--narrow">
            Horizon should not depend on perfect prediction. A disruption can become
            visible through external confirmation, suppliers, operators, or the
            company's own operational state.
          </p>
          <DiagramPanel src="/diagrams/horizon-failure.svg" alt="Horizon failure resilience paths" accent="red" delay={0.1} />
          <div className="docs-failure-statement">
            PREDICTION CAN FAIL.<br />
            <span className="docs-failure-statement-accent">PREPAREDNESS SHOULDN'T.</span>
          </div>
          <div className="docs-paths">
            <motion.div className="docs-path docs-path--green" initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.45 }}>
              <div className="docs-path-label">EARLY DETECTION</div>
              <Chain items={['Signal', 'Exposure', 'Preparation', 'Continuity']} accent="green" />
            </motion.div>
            <motion.div className="docs-path docs-path--red" initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.45, delay: 0.1 }}>
              <div className="docs-path-label">LATE DETECTION</div>
              <Chain items={['Confirmation', 'Inventory assessment', 'Emergency options', 'Human approval', 'Continuity']} accent="red" />
            </motion.div>
          </div>
        </Section>

        {/* ══════════════════════════════════════
            SECTION 05 — THE BUSINESS
        ══════════════════════════════════════ */}
        <Section id="docs-s05">
          <SectionLabel>05 / FROM PRODUCT TO BUSINESS</SectionLabel>
          <h2 className="docs-section-heading">Start narrow. Earn the right to expand.</h2>
          <p className="docs-section-body docs-section-body--narrow">
            Horizon begins with a specific high-value problem: helping energy-intensive
            manufacturers understand and manage exposure to critical energy routes.
          </p>
          <DiagramPanel src="/diagrams/horizon-business.svg" alt="Horizon business model and expansion" accent="violet" delay={0.1} />
          <div className="docs-business-cols">
            <div className="docs-biz-col">
              <div className="docs-biz-col-label">BEACHHEAD</div>
              <div className="docs-biz-col-value">Energy-intensive manufacturers</div>
            </div>
            <div className="docs-biz-col-divider" />
            <div className="docs-biz-col">
              <div className="docs-biz-col-label">USERS</div>
              <ul className="docs-biz-list">
                <li>Supply chain</li><li>Procurement</li><li>Operations</li><li>Risk</li>
              </ul>
            </div>
            <div className="docs-biz-col-divider" />
            <div className="docs-biz-col">
              <div className="docs-biz-col-label">BUYERS</div>
              <ul className="docs-biz-list">
                <li>COO</li><li>CSCO</li><li>CFO</li><li>Risk leadership</li>
              </ul>
            </div>
          </div>
          <div className="docs-expansion">
            <div className="docs-exp-step docs-exp-step--active">
              <div className="docs-exp-label">INITIAL USE CASE</div>
              <div className="docs-exp-desc">Critical energy route exposure</div>
            </div>
            <div className="docs-exp-arrow"><ArrowDown size={14} /></div>
            <div className="docs-exp-step">
              <div className="docs-exp-label">EXPANSION</div>
              <div className="docs-exp-desc">Additional routes · Additional commodities · Additional facilities</div>
            </div>
            <div className="docs-exp-arrow"><ArrowDown size={14} /></div>
            <div className="docs-exp-step">
              <div className="docs-exp-label">LONG-TERM PLATFORM</div>
              <div className="docs-exp-desc">Enterprise continuity intelligence</div>
            </div>
            <div className="docs-exp-note">Future direction — not an existing product claim.</div>
          </div>
        </Section>

        {/* ══════════════════════════════════════
            SECTION 06 — THE PRINCIPLE
        ══════════════════════════════════════ */}
        <motion.section
          className="docs-principle"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="docs-principle-eyebrow">BUILT AROUND ONE PRINCIPLE</div>
          <div className="docs-principle-text">
            "You don't need to predict<br />
            the future perfectly.<br />
            You need to be better prepared<br />
            <span className="docs-grad">for more than one future."</span>
          </div>
          <div className="docs-principle-pillars">
            {['DETECT', 'ASSESS', 'SIMULATE', 'PREPARE', 'RESPOND'].map((p, i) => (
              <motion.div key={p} className="docs-pillar" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.07 }}>
                {p}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ══════════════════════════════════════
            FINAL SUMMARY CARD
        ══════════════════════════════════════ */}
        <motion.div
          className="docs-summary-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
        >
          <div className="docs-summary-glow" aria-hidden="true" />
          <div className="docs-summary-inner">
            <div className="docs-summary-left">
              <div className="docs-summary-brand">HORIZON</div>
              <div className="docs-summary-tagline">Energy Continuity Intelligence</div>
              <div className="docs-summary-sub">"From disruption signal to business decision."</div>
              <div className="docs-demo-badge docs-demo-badge--sm" style={{ marginTop: '1rem' }}>
                DEMO ENVIRONMENT · ILLUSTRATIVE DATA
              </div>
            </div>
            <div className="docs-summary-loop">
              {['EXTERNAL SIGNAL', 'COMPANY EXPOSURE', 'SCENARIO', 'STRATEGY', 'CONTINUITY'].map((step, i, arr) => (
                <div key={step} className="docs-summary-loop-group">
                  <div className="docs-summary-step">{step}</div>
                  {i < arr.length - 1 && <div className="docs-summary-step-arrow">↓</div>}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div style={{ height: '3rem' }} />
      </div>{/* end .docs-zoomed */}
    </div>
  );
};

export default Docs;
