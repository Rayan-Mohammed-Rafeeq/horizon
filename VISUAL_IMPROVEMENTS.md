# HORIZON Visual Improvements Guide

## Color Palette

### Background Layers (Near-Black to Deep Navy)
```
Primary:   #05070D  (deepest)
Secondary: #080B12
Tertiary:  #0C1018
Elevated:  #111620  (lightest layer)
```

### Brand Colors
```
Primary Violet:   #7C5CFF  (Electric violet/indigo)
Primary Dark:     #6D5DFB
Secondary Cyan:   #06B6D4  (Electric blue)
```

### Status Colors
```
Critical:  #EF4A5F  (Red/coral)
Warning:   #F59E0B  (Amber/orange)
Success:   #10B981  (Muted emerald)
Info:      #3B82F6  (Blue)
```

## Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  SIDEBAR (240px)     │  TOP COMMAND BAR                 │
│                      ├──────────────────────────────────┤
│  [HORIZON LOGO]      │                                  │
│  56×56px             │  CONTROL CENTER                  │
│                      │                                  │
│  Energy Continuity   │  [KPI CARDS GRID]               │
│  Intelligence        │  ┌───┐ ┌───┐ ┌───┐ ┌───┐        │
│                      │  │ 1 │ │ 2 │ │ 3 │ │ 4 │        │
│  ◉ Overview          │  └───┘ └───┘ └───┘ └───┘        │
│  ○ Supply Network    │                                  │
│  ○ Early Warning     │  [EARLY WARNING PANEL]          │
│  ○ Scenarios         │  ┌─────┬──────────┬──────┐      │
│  ○ Strategy          │  │Score│ Details  │Route │      │
│  ○ Impact            │  │ 78  │ Signals  │ Viz  │      │
│                      │  └─────┴──────────┴──────┘      │
│                      │                                  │
│  ● SYSTEM AWARE      │  [SUPPLY ROUTES]                │
└──────────────────────┴──────────────────────────────────┘
```

## Component Enhancements

### 1. KPI Metric Cards

**Visual Elements:**
```
┌──────────────────────────────┐
│ [icon] HORMUZ DEPENDENCY     │ ← Icon + Label
│                              │
│ 45%                          │ ← Large Value
│                              │
│ Share of energy supply...    │ ← Description
│                              │
│ ╱╲╱╲╱╲                       │ ← Sparkline
└──────────────────────────────┘
  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
  Status gradient border
```

**States:**
- Rest: Subtle border, dark background
- Hover: Elevated with glow, lighter background
- Active: Status-colored glow (red/amber/violet)

### 2. Early Warning Panel (Centerpiece)

**3-Column Layout:**
```
┌────────────────────────────────────────────────────┐
│ ⚠️ EARLY WARNING                                   │
├───────────┬──────────────────┬────────────────────┤
│           │                  │                    │
│   ●●●●    │ Hormuz Risk      │   Persian Gulf    │
│  ●   78●  │ Increasing       │        ↓          │
│  ●  /100● │                  │   HORMUZ ●●●      │
│   ●●●●    │ Description...   │        ↓          │
│           │                  │      INDIA         │
│ CONFIDENCE│ RECENT SIGNALS:  │                    │
│    78%    │ • Geopolitical   │   45% exposed     │
│           │ • Freight +27%   │                    │
│           │ • Shipping -38%  │                    │
├───────────┴──────────────────┴────────────────────┤
│ Key Signals: [Grid of 4 metrics]                  │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                  │
│ │-38% │ │+27% │ │  4  │ │+19% │                  │
│ └─────┘ └─────┘ └─────┘ └─────┘                  │
├────────────────────────────────────────────────────┤
│                              [REVIEW EXPOSURE →]  │
└────────────────────────────────────────────────────┘
```

**Animations:**
- Risk score ring: Animated on load
- Danger pulse: Continuous pulse on Hormuz node
- Signal dots: Pulsing indicators
- Timeline: Fade-in sequence

### 3. Supply Mix Donut Chart

**NEW ADDITION:**
```
        ┌─────────────┐
        │   ╱╲        │
        │  ╱  ╲       │  Route A: 45%
        │ ╱ 100% ╲    │  Route B: 30%
        │ ╲ SUPPLY ╱  │  Route C: 25%
        │  ╲    ╱     │
        │   ╲╱        │
        └─────────────┘
```

- Colors match route risk levels
- Immediately shows concentration
- Center displays total
- Legend with percentages

### 4. Supply Route Cards

**Enhanced Design:**
```
┌────────────────────────────┐
│ ROUTE A            [HIGH]  │ ← Name + Badge
├────────────────────────────┤
│ ● Gulf Supplier            │
│     ↓                      │
│ ● STRAIT OF HORMUZ ●●●     │ ← Danger pulse
│     ↓                      │
│ ● India → Factory          │
├────────────────────────────┤
│ Dependency  │  Inventory   │
│    45%      │   17 days    │
├────────────────────────────┤
│   ⚫ ⚫ ⚫ ⚫ ⚫              │ ← Barrels
│                            │
└────────────────────────────┘
  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
  Gradient status border
```

### 5. Barrel Visualization

**SVG Design (Not Emojis):**
```
  ╭───╮
 ╱     ╲   ← Ellipse top
│   ─   │  ← Bands
│   ─   │
│   ─   │
 ╲     ╱
  ╰───╯

Filled:  Orange/amber with metallic gradient
Empty:   Outline only, subtle border
Hover:   Glow effect, tooltip with days
```

### 6. Horizon Insight Card

**NEW ADDITION:**
```
┌────────────────────────────────────────────────┐
│                                                │
│  "You can't control disruptions.               │
│   But you can control how prepared you are."   │
│                                                │
│  HORIZON turns uncertainty into                │
│  actionable advantage.                         │
│                                                │
│  ╱╲╱╲╱╲╱╲╱╲  ← Animated signal wave           │
└────────────────────────────────────────────────┘
```

## Sidebar Active State

**Navigation Item States:**
```
Rest:     ○ Overview     (Gray, no background)
Hover:    ○ Overview     (Light bg, white text)
Active:   ● Overview     (Violet bg, border, glow, left indicator)
          │
          └─ 3px violet bar
```

## Top Command Bar Layout

```
┌──────────────────────────────────────────────────┐
│  Control     BHARAT INDUSTRIAL      ⚙️ SIM  👤  │
│  Center           MATERIALS          MODE   BM  │
│              India · Manufacturing              │
└──────────────────────────────────────────────────┘
```

## Glow Effects Usage

**Applied To:**
- Active sidebar items: Violet glow
- Metric cards on hover: Status-colored glow
- Risk score ring: Red glow
- Danger indicators: Pulsing red glow
- Filled barrels: Amber glow
- Primary buttons: Violet/amber glow
- Hormuz chokepoint: Red danger glow

**NOT Applied To:**
- Body text
- Normal cards at rest
- Regular borders
- Background elements

## Typography Scale

```
Headings:
  H1 (Page title):     2.5rem  Weight 800  Letter-spacing -0.02em
  H2 (Section):        1.75rem Weight 700  Letter-spacing -0.01em
  H3 (Subsection):     1.5rem  Weight 600

Metrics:
  Large value:         2.5rem  Weight 800  (KPI cards)
  Medium value:        1.5rem  Weight 700  (Route metrics)
  
Labels:
  Uppercase small:     0.7rem  Weight 700  Letter-spacing 0.05em
  Body text:           0.95rem Weight 400

Micro text:
  Timestamps/meta:     0.65rem Weight 600
```

## Spacing System (8px base)

```
xs:   4px   (0.25rem)  - Icon gaps
sm:   8px   (0.5rem)   - Small gaps
md:   16px  (1rem)     - Card internal
lg:   24px  (1.5rem)   - Card gaps
xl:   32px  (2rem)     - Section internal
2xl:  48px  (3rem)     - Between sections
3xl:  64px  (4rem)     - Major sections
```

## Border Radius

```
sm:  6px  - Small badges
md:  8px  - Buttons, inputs
lg:  12px - Cards
xl:  16px - Major panels
```

## Shadow Scale

```
sm:  Small cards at rest
md:  Cards on hover
lg:  Major panels, modal-like elements
xl:  Dialogs, popups

Glow shadows:
  Primary:   0 0 20px rgba(124, 92, 255, 0.4)
  Critical:  0 0 20px rgba(239, 74, 95, 0.4)
  Warning:   0 0 20px rgba(245, 158, 11, 0.4)
```

## Animation Timing

```
Fast:   150ms  - Hover states
Base:   250ms  - Standard transitions
Slow:   350ms  - Complex animations

Easing: cubic-bezier(0.4, 0, 0.2, 1)
```

## Responsive Breakpoints

```
Desktop:  > 1024px   Full sidebar + 4-column grid
Tablet:   768-1024px Sidebar + 2-column grid
Mobile:   < 768px    Overlay sidebar + 1-column stack
```

---

**Key Principle:** Restrained elegance. Neon accents appear only where they matter. The interface feels alive but never distracting.
