# HORIZON - Energy Continuity Intelligence

A premium enterprise AI control-room interface for energy-intensive businesses to understand their exposure to critical energy routes, detect disruption risk, simulate prolonged disruptions, and prepare continuity strategies.

## Demo Product

**IMPORTANT:** This is a hackathon prototype with illustrative demo data only.

**Demo Customer:** Bharat Industrial Materials (India · Energy-Intensive Manufacturing)

**What it does NOT include:**
- Authentication or user management
- Backend API or database
- Payment processing
- Production SaaS infrastructure

**What it DOES include:**
- Complete interactive frontend with React + Vite
- Premium dark enterprise UI design
- Interactive scenario simulation (30/90/180 days)
- Supply network visualization
- Early warning signal detection
- Strategy selection and planning
- Emergency response protocols
- Smooth Framer Motion animations
- Fully responsive design (desktop, tablet, mobile)

## Features

### 1. Control Center (Overview)
- Large metric cards showing key KPIs (Hormuz dependency, inventory runway, exposure level)
- Real-time risk alert panel with signal detection
- Supply route visualization with barrel inventory indicators

### 2. Supply Network
- Interactive CSS/SVG network diagram
- Clickable nodes showing Gulf → Hormuz → India routes
- Alternative supply routes (Russia, Brazil)
- Route details panel with dependency analysis

### 3. Early Warning
- Signal detection cards (Shipping, Market, Geopolitical, Port)
- Risk score calculation and confidence metrics
- Exposure assessment and impact explanation

### 4. Scenario Simulator
- Interactive duration selector (30/90/180 days)
- Dynamic inventory visualization
- Recharts timeline showing depletion
- Recommendation engine with reasoning
- Before/after impact comparison

### 5. Strategy Planner
- Multiple selectable strategies (Alternative Supplier, Inventory Buffer, Demand Adjustment)
- Combined impact calculation
- Plan activation workflow

### 6. Impact Analysis
- Downstream customer risk assessment
- Emergency response protocols
- "What if early warning fails?" scenarios
- System architecture overview

## Tech Stack

- **React 19** - UI framework
- **Vite 8** - Build tool and dev server
- **Framer Motion 13** - Smooth animations
- **Recharts 3** - Data visualization
- **Lucide React** - Icon system
- **CSS3** - Custom design system with variables

## Design System

### Colors
- Near-black backgrounds (#0a0a0b)
- Dark charcoal panels (#1a1b23)
- Blue/violet accents (#6366f1, #8b5cf6)
- Amber warnings (#f59e0b)
- Red critical states (#ef4444)
- Muted green success (#10b981)

### Typography
- Inter font family
- Large numerical metrics (3rem+)
- Clean hierarchy with proper spacing
- Uppercase labels with letter-spacing

### Components
- Thin borders with subtle glass effects
- Smooth transitions (150-350ms)
- Restrained glow on interactive elements
- Generous spacing and information density balance

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
horizon/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx              # Navigation sidebar
│   │   ├── Topbar.jsx               # Top navigation bar
│   │   ├── MetricCard.jsx           # Reusable metric display
│   │   ├── BarrelInventory.jsx      # SVG barrel visualization
│   │   ├── RiskAlert.jsx            # Alert panel component
│   │   ├── SupplyRouteCard.jsx      # Route card component
│   │   ├── Overview.jsx             # Control Center section
│   │   ├── SupplyNetwork.jsx        # Network visualization
│   │   ├── EarlyWarning.jsx         # Signal detection section
│   │   ├── ScenarioSimulator.jsx    # What-if simulator
│   │   ├── Strategy.jsx             # Strategy planning
│   │   └── Impact.jsx               # Impact analysis
│   ├── data/
│   │   └── demoData.js              # All demo data centralized
│   ├── App.jsx                      # Main application
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Design system & global styles
├── index.html
├── package.json
└── vite.config.js
```

## Key Interactions

1. **Navigation:** Click sidebar items or use smooth scroll
2. **Route Selection:** Click supply route cards to see details
3. **Network Exploration:** Click nodes in supply network diagram
4. **Scenario Testing:** Select 30/90/180 day durations to see impact
5. **Strategy Selection:** Click strategy cards to select/deselect
6. **Plan Activation:** Activate combined strategy plans
7. **Emergency Planning:** Generate emergency response plans

## Responsive Breakpoints

- **Desktop:** > 768px (sidebar always visible)
- **Tablet:** 769px - 1024px (adapted layouts)
- **Mobile:** ≤ 768px (hamburger menu, stacked layouts)

## Performance Considerations

- Lightweight bundle (no Three.js or heavy 3D libraries)
- CSS/SVG for visual effects (no particle systems)
- Optimized animations with Framer Motion
- Respects `prefers-reduced-motion`
- Efficient React component structure

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT

## Notes

This is a prototype for demonstration purposes. All data is illustrative and does not represent real-time information, actual companies, or production systems.

**Environment:** DEMO ENVIRONMENT · ILLUSTRATIVE DATA
