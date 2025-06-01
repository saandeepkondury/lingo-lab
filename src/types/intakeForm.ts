
// Comprehensive intake form for founders to submit their strategic narrative case studies
export interface FounderIntakeFormData {
  // Basic Company Information
  companyName: string;
  founderName: string;
  founderTitle: string;
  companyWebsite: string;
  companyEmail: string;
  
  // Company Details
  industry: string;
  foundedYear: string;
  headquarters: string;
  employeeCount: string;
  currentRevenue: string;
  fundingRaised: string;
  currentValuation: string;
  investorNames: string[];
  
  // Strategic Narrative Core
  keyPhrase: string; // Their main strategic narrative/positioning
  tagline: string;
  elevatorPitch: string;
  
  // Market Context & Transformation
  marketBefore: string; // "How would you describe your market/industry before your company?"
  keyInsight: string; // "What critical insight about the market did you have that others missed?"
  marketTransformation: string; // "How is your company transforming this market?"
  futureVision: string; // "What does the future look like with your vision realized?"
  competitivePositioning: string; // "How do you position against competitors?"
  
  // Strategic Language & Communication
  commonLingo: string[]; // Terms/language they use that spreads
  narrativeEvolution: string; // How their messaging has evolved
  communicationChannels: string[]; // Where they share their narrative
  
  // Business Impact & Metrics
  keyMetrics: {
    userGrowth: string;
    revenueGrowth: string;
    marketShare: string;
    geographicReach: string;
    customerRetention: string;
  };
  
  // Strategic Insights & Lessons
  keyStrategicInsights: string[]; // 3-5 key strategic lessons
  whatWorked: string; // Why their narrative succeeded
  marketResponse: string; // How the market responded
  competitorResponse: string; // How competitors reacted
  
  // Market & Industry Impact
  marketsImpacted: string[]; // Which markets/industries benefit
  businessesHelped: string; // Types of businesses that benefit
  industryChanges: string; // Changes they've driven in the industry
  
  // Narrative Classification
  transformationType: string; // Market Creation, Category Redefinition, etc.
  narrativeArchetype: string; // Infrastructure Play, Platform Play, etc.
  marketThemes: string[]; // API Economy, Future of Work, etc.
  strategicPatterns: string[]; // Developer-First, Community-Led, etc.
  
  // Content & Media
  availableContent: {
    founderInterviews: boolean;
    companyBlog: boolean;
    investorDecks: boolean;
    publicTalks: boolean;
    pressReleases: boolean;
    customerTestimonials: boolean;
  };
  
  // Publication Preferences
  publicationConsent: boolean;
  attributionPreference: string; // Full attribution, Anonymous, Company only
  reviewBeforePublication: boolean;
  marketingParticipation: boolean; // Willing to participate in marketing
  
  // Additional Context
  uniqueChallenges: string; // Unique challenges they overcame
  unexpectedLearnings: string; // Surprising insights during their journey
  adviceForFounders: string; // Advice for other founders
  
  // Contact & Follow-up
  preferredContactMethod: string;
  bestTimeToContact: string;
  additionalNotes: string;
}

// Form field options for dropdowns
export const intakeFormOptions = {
  industries: [
    "Financial Technology",
    "Software as a Service",
    "E-commerce",
    "Healthcare Technology",
    "Education Technology",
    "Real Estate Technology",
    "Marketing Technology",
    "Developer Tools",
    "Infrastructure",
    "Artificial Intelligence",
    "Cybersecurity",
    "Other"
  ],
  
  employeeCounts: [
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1000+"
  ],
  
  revenueRanges: [
    "Pre-revenue",
    "$0-$1M",
    "$1M-$10M",
    "$10M-$50M",
    "$50M-$100M",
    "$100M+"
  ],
  
  fundingStages: [
    "Bootstrap",
    "Pre-seed",
    "Seed",
    "Series A",
    "Series B",
    "Series C+",
    "Public"
  ],
  
  transformationTypes: [
    "Market Creation",
    "Category Redefinition",
    "Industry Disruption",
    "Workflow Revolution",
    "Technology Breakthrough",
    "Communication Revolution",
    "Experience Transformation"
  ],
  
  narrativeArchetypes: [
    "Infrastructure Play",
    "Platform Play",
    "Experience Play",
    "Intelligence Play",
    "Workflow Play",
    "Collaborative Play",
    "Consolidation Play"
  ],
  
  marketThemes: [
    "API Economy",
    "Developer Experience",
    "Financial Infrastructure",
    "Future of Work",
    "Real-time Collaboration",
    "Artificial Intelligence",
    "Digital Transformation",
    "Automation",
    "Data-Driven Decisions",
    "Creator Economy"
  ],
  
  strategicPatterns: [
    "Developer-First GTM",
    "Community-Led Growth",
    "Product-Led Growth",
    "Platform Strategy",
    "Network Effects",
    "Viral Growth",
    "Bottom-up Adoption",
    "Category Creation",
    "Incumbent Disruption",
    "Two-Sided Marketplace"
  ],
  
  communicationChannels: [
    "Company Blog",
    "Social Media",
    "Industry Conferences",
    "Podcasts",
    "Webinars",
    "Press Releases",
    "Investor Updates",
    "Customer Communications",
    "Developer Documentation",
    "Community Forums"
  ]
};

// Key questions for the intake form
export const intakeQuestions = {
  strategicNarrative: [
    "What is your company's core strategic narrative or key phrase?",
    "How do you describe what your company does in one sentence?",
    "What's your elevator pitch to investors?",
    "What language or terms do you use that others in your industry have started adopting?"
  ],
  
  marketContext: [
    "How would you describe your market/industry before your company existed?",
    "What critical insight about the market did you have that others missed?",
    "How is your company transforming this market?",
    "What does the future look like with your vision realized?",
    "How do you position against competitors?"
  ],
  
  businessImpact: [
    "What are your key growth metrics over the past 2 years?",
    "Which markets or industries directly benefit from your transformation?",
    "How has the market responded to your narrative?",
    "How have competitors responded to your approach?",
    "What unexpected changes have you driven in your industry?"
  ],
  
  strategicInsights: [
    "What are the 3-5 key strategic lessons from your journey?",
    "Why do you think your narrative succeeded where others failed?",
    "What were the most surprising insights during your journey?",
    "What unique challenges did you overcome that others should know about?",
    "What advice would you give to other founders building their narrative?"
  ],
  
  content: [
    "Do you have founder interviews or talks available?",
    "Can you share investor deck materials (redacted if needed)?",
    "Are there customer testimonials that showcase your impact?",
    "Do you have blog posts or content about your strategic thinking?",
    "Are there press releases or media coverage we can reference?"
  ]
};
