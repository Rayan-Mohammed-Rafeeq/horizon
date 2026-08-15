// HORIZON - Demo Data
// All data is illustrative for prototype purposes only

export const company = {
  name: "Bharat Industrial Materials",
  country: "India",
  industry: "Manufacturing",
  type: "Energy-Intensive Manufacturing"
};

export const topMetrics = [
  {
    id: 1,
    value: "45%",
    label: "HORMUZ DEPENDENCY",
    description: "Share of energy supply exposed to the route",
    status: "critical"
  },
  {
    id: 2,
    value: "17 DAYS",
    label: "INVENTORY RUNWAY",
    description: "Estimated operational coverage",
    status: "warning"
  },
  {
    id: 3,
    value: "HIGH",
    label: "EXPOSURE LEVEL",
    description: "Current concentration risk",
    status: "critical"
  },
  {
    id: 4,
    value: "3",
    label: "CONTINGENCY PLANS",
    description: "Prepared response scenarios",
    status: "normal"
  }
];

export const supplyRoutes = [
  {
    id: "route-a",
    name: "ROUTE A",
    origin: "Gulf Supplier",
    chokepoint: "Strait of Hormuz",
    destination: "India → Factory",
    dependency: 45,
    inventoryDays: 17,
    risk: "HIGH",
    barrelCount: 5,
    color: "#ef4444"
  },
  {
    id: "route-b",
    name: "ROUTE B",
    origin: "Russian Supplier",
    chokepoint: null,
    destination: "India → Factory",
    dependency: 30,
    inventoryDays: 23,
    risk: "MEDIUM",
    barrelCount: 3,
    color: "#f59e0b"
  },
  {
    id: "route-c",
    name: "ROUTE C",
    origin: "Brazilian Supplier",
    chokepoint: null,
    destination: "India → Factory",
    dependency: 25,
    inventoryDays: 31,
    risk: "LOW",
    barrelCount: 2,
    color: "#10b981"
  }
];

export const earlyWarningSignals = [
  {
    id: 1,
    category: "SHIPPING",
    value: "-38%",
    label: "Activity declining",
    trend: "down",
    status: "critical"
  },
  {
    id: 2,
    category: "MARKET",
    value: "+27%",
    label: "Freight costs increasing",
    trend: "up",
    status: "warning"
  },
  {
    id: 3,
    category: "GEOPOLITICAL",
    value: "4",
    label: "Elevated signals",
    trend: "neutral",
    status: "warning"
  },
  {
    id: 4,
    category: "PORT",
    value: "+19%",
    label: "Congestion increasing",
    trend: "up",
    status: "warning"
  }
];

export const riskScore = {
  current: 78,
  max: 100,
  confidence: 78,
  level: "HIGH"
};

export const riskExplanation = {
  dependency: "45% of the company's energy supply depends on the affected route.",
  runway: "Current inventory provides approximately 17 days of operational runway.",
  signals: [
    { label: "Shipping activity", value: "↓ 38%" },
    { label: "Freight rates", value: "↑ 27%" },
    { label: "Geopolitical signals", value: "4 elevated signals" },
    { label: "Port congestion", value: "↑ 19%" }
  ]
};

export const scenarios = {
  30: {
    duration: 30,
    inventoryRunway: 17,
    supplyGap: 0,
    productionImpact: -4,
    risk: "MEDIUM",
    costImpact: 8,
    customerRisk: 0,
    description: "Minimal disruption expected with current inventory buffer"
  },
  90: {
    duration: 90,
    inventoryRunway: 17,
    supplyGap: 13,
    productionImpact: -18,
    risk: "CRITICAL",
    costImpact: 12,
    customerRisk: 3,
    description: "Significant supply gap emerges after inventory depletion"
  },
  180: {
    duration: 180,
    inventoryRunway: 17,
    supplyGap: 38,
    productionImpact: -41,
    risk: "CRITICAL",
    costImpact: 24,
    customerRisk: 7,
    description: "Severe operational impact without alternative supply"
  }
};

// Inventory timeline data for charts
export const getInventoryTimeline = (duration) => {
  const data = [];
  const inventoryRunway = 17;
  
  for (let day = 0; day <= duration; day += Math.ceil(duration / 20)) {
    let inventory = 100;
    
    if (day > inventoryRunway) {
      inventory = 0;
    } else {
      inventory = Math.max(0, 100 - (day / inventoryRunway) * 100);
    }
    
    data.push({
      day,
      inventory: Math.round(inventory),
      critical: day > inventoryRunway
    });
  }
  
  return data;
};

export const recommendations = {
  90: {
    title: "Prepare alternative supply before the current inventory buffer becomes critical.",
    actions: [
      {
        id: 1,
        title: "SECURE ALTERNATIVE SUPPLY",
        description: "Increase alternative supplier allocation."
      },
      {
        id: 2,
        title: "INCREASE INVENTORY BUFFER",
        description: "Target additional 12 days of coverage."
      },
      {
        id: 3,
        title: "REDUCE NON-CRITICAL CONSUMPTION",
        description: "Protect critical production capacity."
      }
    ],
    impact: {
      supplyGapBefore: 13,
      supplyGapAfter: 0,
      continuitBefore: 82,
      continuityAfter: 96,
      riskBefore: "CRITICAL",
      riskAfter: "MEDIUM"
    }
  },
  180: {
    title: "Immediate action required to secure long-term alternative supply and reduce dependency.",
    actions: [
      {
        id: 1,
        title: "DIVERSIFY SUPPLY BASE",
        description: "Establish contracts with alternative suppliers."
      },
      {
        id: 2,
        title: "INCREASE STRATEGIC RESERVES",
        description: "Build 30+ day inventory buffer."
      },
      {
        id: 3,
        title: "OPTIMIZE CONSUMPTION",
        description: "Reduce energy intensity across operations."
      }
    ],
    impact: {
      supplyGapBefore: 38,
      supplyGapAfter: 5,
      continuityBefore: 59,
      continuityAfter: 89,
      riskBefore: "CRITICAL",
      riskAfter: "MEDIUM"
    }
  }
};

export const whyRecommendation = [
  {
    id: 1,
    title: "INVENTORY RUNWAY",
    value: "17 days remaining"
  },
  {
    id: 2,
    title: "ROUTE DEPENDENCY",
    value: "45% of supply exposed"
  },
  {
    id: 3,
    title: "ALTERNATIVE CAPACITY",
    value: "20% currently available"
  },
  {
    id: 4,
    title: "PRODUCTION PRIORITY",
    value: "Factory 02 has highest criticality"
  },
  {
    id: 5,
    title: "CUSTOMER COMMITMENTS",
    value: "3 priority contracts at risk"
  }
];

export const recommendationConfidence = {
  value: 78,
  uncertainty: "Alternative port capacity"
};

export const strategies = [
  {
    id: "strategy-a",
    title: "Alternative Supplier",
    description: "Secure supply from non-Hormuz routes",
    cost: "+12%",
    costValue: 12,
    arrival: "8 days",
    arrivalDays: 8,
    risk: "MEDIUM",
    impactOnGap: -8,
    impactOnContinuity: 10
  },
  {
    id: "strategy-b",
    title: "Inventory Buffer",
    description: "Increase strategic reserves",
    cost: "+7%",
    costValue: 7,
    coverage: "+12 days",
    coverageDays: 12,
    risk: "LOW",
    impactOnGap: -5,
    impactOnContinuity: 8
  },
  {
    id: "strategy-c",
    title: "Demand Adjustment",
    description: "Reduce non-critical production",
    production: "-8%",
    productionValue: -8,
    coverage: "+5 days",
    coverageDays: 5,
    risk: "LOW",
    impactOnGap: -3,
    impactOnContinuity: 4
  }
];

export const emergencyResponse = {
  scenario: "Hormuz disruption confirmed",
  currentInventory: 17,
  projectedShortage: 11,
  actions: [
    "Alternative supplier activation",
    "Alternative route utilization",
    "Demand reduction protocols",
    "Production prioritization"
  ],
  plan: {
    alternativeSupply: "+20%",
    demandReduction: "-5%",
    priority: "Factory 02",
    result: "Projected supply gap: 0 days"
  }
};

export const downstreamCustomers = [
  {
    id: 1,
    name: "Auto Co.",
    industry: "Automotive",
    risk: "HIGH",
    priority: "Critical"
  },
  {
    id: 2,
    name: "Airline Co.",
    industry: "Aviation",
    risk: "MEDIUM",
    priority: "High"
  },
  {
    id: 3,
    name: "Construction Co.",
    industry: "Construction",
    risk: "LOW",
    priority: "Standard"
  }
];

export const networkNodes = [
  {
    id: "gulf",
    label: "Gulf Supplier",
    type: "supplier",
    x: 20,
    y: 10
  },
  {
    id: "russia",
    label: "Russian Supplier",
    type: "supplier",
    x: 10,
    y: 50
  },
  {
    id: "brazil",
    label: "Brazilian Supplier",
    type: "supplier",
    x: 10,
    y: 90
  },
  {
    id: "persian-gulf",
    label: "Persian Gulf",
    type: "transit",
    x: 35,
    y: 10
  },
  {
    id: "hormuz",
    label: "STRAIT OF HORMUZ",
    type: "chokepoint",
    x: 50,
    y: 10,
    critical: true
  },
  {
    id: "india",
    label: "India",
    type: "destination",
    x: 70,
    y: 40
  },
  {
    id: "bharat",
    label: "Bharat Industrial Materials",
    type: "company",
    x: 85,
    y: 40
  },
  {
    id: "factory-1",
    label: "Factory 01",
    type: "facility",
    x: 95,
    y: 30
  },
  {
    id: "factory-2",
    label: "Factory 02",
    type: "facility",
    x: 95,
    y: 40
  },
  {
    id: "factory-3",
    label: "Factory 03",
    type: "facility",
    x: 95,
    y: 50
  }
];

export const networkConnections = [
  { from: "gulf", to: "persian-gulf", risk: "high", dependency: 45 },
  { from: "persian-gulf", to: "hormuz", risk: "high", dependency: 45 },
  { from: "hormuz", to: "india", risk: "high", dependency: 45 },
  { from: "russia", to: "india", risk: "medium", dependency: 30 },
  { from: "brazil", to: "india", risk: "low", dependency: 25 },
  { from: "india", to: "bharat", risk: "low", dependency: 100 },
  { from: "bharat", to: "factory-1", risk: "low", dependency: 30 },
  { from: "bharat", to: "factory-2", risk: "low", dependency: 40 },
  { from: "bharat", to: "factory-3", risk: "low", dependency: 30 }
];

export const systemArchitecture = [
  { id: 1, label: "External Signals", description: "Shipping, market, geopolitical data" },
  { id: 2, label: "AI Risk Engine", description: "Pattern detection and risk scoring" },
  { id: 3, label: "Company Exposure", description: "Route dependency analysis" },
  { id: 4, label: "Scenario Engine", description: "What-if simulation" },
  { id: 5, label: "Recommendation Engine", description: "Strategy optimization" },
  { id: 6, label: "Human Approval", description: "Decision authority" },
  { id: 7, label: "Action", description: "Supply chain adjustment" },
  { id: 8, label: "Continuous Monitoring", description: "Real-time tracking" }
];
