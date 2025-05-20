
// Sample case studies data
export const allCaseStudies = [
  {
    id: "stripe-financial-infrastructure",
    company: "stripe",
    companyName: "Stripe",
    lingo: "Financial Infrastructure",
    impact: "Raised $600M at $95B valuation by positioning as infrastructure rather than payments",
    rating: 5,
    narrativeType: "Market Creation",
    industry: "Fintech",
    stage: "Series H",
    lingoStyle: "Metaphor",
    year: 2021,
    targetAudience: "Developers"
  },
  {
    id: "notion-all-in-one-workspace",
    company: "notion",
    companyName: "Notion",
    lingo: "All-in-one Workspace",
    impact: "Grew to 20M+ users with a narrative that unified multiple product categories",
    rating: 4.8,
    narrativeType: "Product Positioning",
    industry: "SaaS",
    stage: "Series C",
    lingoStyle: "Movement",
    year: 2020,
    targetAudience: "Teams"
  },
  {
    id: "figma-multiplayer-design",
    company: "figma",
    companyName: "Figma",
    lingo: "Multiplayer Design",
    impact: "Differentiated from Adobe by focusing on collaboration, acquired for $20B",
    rating: 4.9,
    narrativeType: "Competitive Positioning",
    industry: "Design",
    stage: "Acquisition",
    lingoStyle: "Metaphor",
    year: 2022,
    targetAudience: "Designers"
  },
  {
    id: "open-ai-chatgpt",
    company: "openai",
    companyName: "OpenAI",
    lingo: "ChatGPT",
    impact: "Created a new product category that reached 100M users in 2 months",
    rating: 5,
    narrativeType: "Product Launch",
    industry: "AI",
    stage: "Late Growth",
    lingoStyle: "Meme",
    year: 2022,
    targetAudience: "General Public"
  },
  {
    id: "airbnb-belong-anywhere",
    company: "airbnb",
    companyName: "Airbnb",
    lingo: "Belong Anywhere",
    impact: "Transformed from rental marketplace to global hospitality brand",
    rating: 4.7,
    narrativeType: "Brand Positioning",
    industry: "Consumer",
    stage: "Pre-IPO",
    lingoStyle: "Movement",
    year: 2014,
    targetAudience: "Travelers"
  },
  {
    id: "slack-where-work-happens",
    company: "slack",
    companyName: "Slack",
    lingo: "Where Work Happens",
    impact: "Grew to $27B valuation by positioning as the future of workplace communication",
    rating: 4.8,
    narrativeType: "Market Creation",
    industry: "SaaS",
    stage: "Series H",
    lingoStyle: "Anti-villain",
    year: 2019,
    targetAudience: "Businesses"
  },
];

// Normalized filter groups with unique values for better performance
export const filterGroups = [
  {
    name: "Narrative Type",
    options: [
      { value: "Market Creation", label: "Market Creation" },
      { value: "Product Positioning", label: "Product Positioning" },
      { value: "Competitive Positioning", label: "Competitive Positioning" },
      { value: "Product Launch", label: "Product Launch" },
      { value: "Brand Positioning", label: "Brand Positioning" },
      { value: "Fundraising", label: "Fundraising" },
      { value: "Sales", label: "Sales" },
      { value: "Hiring", label: "Hiring" }
    ]
  },
  {
    name: "Lingo Style",
    options: [
      { value: "Meme", label: "Meme" },
      { value: "Metaphor", label: "Metaphor" },
      { value: "Anti-villain", label: "Anti-villain" },
      { value: "Scarcity", label: "Scarcity" },
      { value: "Movement", label: "Movement" }
    ]
  },
  {
    name: "Stage",
    options: [
      { value: "Pre-seed", label: "Pre-Seed" },
      { value: "Seed", label: "Seed" },
      { value: "Series A", label: "Series A" },
      { value: "Series B", label: "Series B" },
      { value: "Series C", label: "Series C" },
      { value: "Late Growth", label: "Late Growth" },
      { value: "Pre-IPO", label: "Pre-IPO" },
      { value: "Acquisition", label: "Acquisition" }
    ]
  },
  {
    name: "Industry",
    options: [
      { value: "SaaS", label: "SaaS" },
      { value: "Fintech", label: "Fintech" },
      { value: "AI", label: "AI" },
      { value: "Design", label: "Design" },
      { value: "Consumer", label: "Consumer" },
      { value: "Healthtech", label: "Healthtech" },
      { value: "E-commerce", label: "E-commerce" },
      { value: "Education", label: "Education" }
    ]
  },
  {
    name: "Target Audience",
    options: [
      { value: "Developers", label: "Developers" },
      { value: "Designers", label: "Designers" },
      { value: "Teams", label: "Teams" },
      { value: "Businesses", label: "Businesses" },
      { value: "General Public", label: "General Public" },
      { value: "Travelers", label: "Travelers" }
    ]
  }
];

// Create lookup maps for faster filtering
export const getFilterOptions = () => {
  const narrativeTypes = new Set(allCaseStudies.map(study => study.narrativeType));
  const industries = new Set(allCaseStudies.map(study => study.industry));
  const stages = new Set(allCaseStudies.map(study => study.stage).filter(Boolean));
  const lingoStyles = new Set(allCaseStudies.map(study => study.lingoStyle).filter(Boolean));
  const targetAudiences = new Set(allCaseStudies.map(study => study.targetAudience).filter(Boolean));
  
  return {
    narrativeTypes: Array.from(narrativeTypes),
    industries: Array.from(industries),
    stages: Array.from(stages),
    lingoStyles: Array.from(lingoStyles),
    targetAudiences: Array.from(targetAudiences)
  };
};
