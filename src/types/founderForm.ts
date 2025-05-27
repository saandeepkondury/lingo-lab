
// Form structure that founders will fill out to generate their narrative articles
export interface FounderFormData {
  // Basic Company Information
  company: string;
  founderName: string;
  founderTitle: string;
  fundingRaised: string;
  valuation: string;
  industry: string;
  foundedYear: string;
  employeeCount: string;
  headquarters: string;
  
  // Key Narrative Elements
  keyPhrase: string;
  tagline: string;
  
  // Market Context Questions
  marketBefore: string; // "Describe what your market/industry was like before your company"
  founderInsight: string; // "What key insight did you have about the market that others missed?"
  marketTransformation: string; // "How is your company transforming this market?"
  strategicVision: string; // "What does the future look like with your vision realized?"
  competitiveAdvantage: string; // "How do you position against competitors?"
  
  // Market Intelligence (form dropdowns/checkboxes)
  marketThemes: string[]; // Multi-select: API Economy, Developer Experience, etc.
  strategicPatterns: string[]; // Multi-select: Platform Strategy, Community-Led Growth, etc.
  transformationType: string; // Dropdown: Market Redefinition, Category Creation, etc.
  narrativeArchetype: string; // Dropdown: Infrastructure Play, Consolidation Play, etc.
  
  // Metrics (form fields)
  metrics: {
    scale: {
      revenue: string;
      users: string;
      marketShare: string;
      geographicReach: string;
    };
    speed: {
      categoryDefinition: string;
      marketLeadership: string;
      globalExpansion: string;
    };
    adoption: {
      industryStandard: string;
      competitorResponse: string;
      marketEducation: string;
    };
  };
  
  // Strategic Takeaways (form text areas)
  strategicInsights: string[]; // 3-4 key insights/lessons
  
  // Market Landscape (form fields)
  marketLandscape: {
    beforeCompany: string;
    companyPosition: string;
    competitorResponse: string;
    futureState: string;
  };
}

// Transformation options for form dropdowns
export const transformationTypes = [
  "Market Redefinition",
  "Category Creation", 
  "Category Unification",
  "Workflow Revolution",
  "Technology Breakthrough",
  "Industry Disruption",
  "Communication Revolution"
];

export const narrativeArchetypes = [
  "Infrastructure Play",
  "Consolidation Play",
  "Collaborative Play", 
  "Intelligence Play",
  "Experience Play",
  "Workflow Play",
  "Platform Play"
];

export const marketThemeOptions = [
  "API Economy",
  "Developer Experience",
  "Financial Infrastructure",
  "Future of Work",
  "Real-time Collaboration", 
  "Artificial Intelligence",
  "Sharing Economy",
  "Digital Transformation",
  "Automation",
  "Data-Driven Decisions"
];

export const strategicPatternOptions = [
  "Platform Strategy",
  "Developer-First GTM",
  "Category Creation",
  "Community-Led Growth",
  "Product Virality",
  "Incumbent Disruption",
  "Viral Launch",
  "Two-Sided Marketplace",
  "Bottom-up Adoption",
  "Network Effects"
];
