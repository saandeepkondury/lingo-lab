
// Sample case studies data
export const allCaseStudies = [
  {
    id: "stripe-financial-infrastructure",
    company: "Stripe",
    lingo: "Financial Infrastructure",
    impact: "Raised $600M at $95B valuation by positioning as infrastructure rather than payments",
    rating: 5,
    narrativeType: "Market Creation",
    industry: "Fintech"
  },
  {
    id: "notion-all-in-one-workspace",
    company: "Notion",
    lingo: "All-in-one Workspace",
    impact: "Grew to 20M+ users with a narrative that unified multiple product categories",
    rating: 4.8,
    narrativeType: "Product Positioning",
    industry: "SaaS"
  },
  {
    id: "figma-multiplayer-design",
    company: "Figma",
    lingo: "Multiplayer Design",
    impact: "Differentiated from Adobe by focusing on collaboration, acquired for $20B",
    rating: 4.9,
    narrativeType: "Competitive Positioning",
    industry: "Design"
  },
  {
    id: "open-ai-chatgpt",
    company: "OpenAI",
    lingo: "ChatGPT",
    impact: "Created a new product category that reached 100M users in 2 months",
    rating: 5,
    narrativeType: "Product Launch",
    industry: "AI"
  },
  {
    id: "airbnb-belong-anywhere",
    company: "Airbnb",
    lingo: "Belong Anywhere",
    impact: "Transformed from rental marketplace to global hospitality brand",
    rating: 4.7,
    narrativeType: "Brand Positioning",
    industry: "Consumer"
  },
  {
    id: "slack-where-work-happens",
    company: "Slack",
    lingo: "Where Work Happens",
    impact: "Grew to $27B valuation by positioning as the future of workplace communication",
    rating: 4.8,
    narrativeType: "Market Creation",
    industry: "SaaS"
  },
];

// Sample filter data
export const filterGroups = [
  {
    name: "Narrative Type",
    options: [
      { value: "fundraising", label: "Fundraising" },
      { value: "sales", label: "Sales" },
      { value: "hiring", label: "Hiring" },
      { value: "market-creation", label: "Market Creation" },
    ]
  },
  {
    name: "Lingo Style",
    options: [
      { value: "meme", label: "Meme" },
      { value: "metaphor", label: "Metaphor" },
      { value: "anti-villain", label: "Anti-villain" },
      { value: "scarcity", label: "Scarcity" },
      { value: "movement", label: "Movement" },
    ]
  },
  {
    name: "Stage",
    options: [
      { value: "pre-seed", label: "Pre-Seed" },
      { value: "seed", label: "Seed" },
      { value: "series-a", label: "Series A" },
      { value: "series-b-plus", label: "Series B+" },
    ]
  },
  {
    name: "Industry",
    options: [
      { value: "saas", label: "SaaS" },
      { value: "fintech", label: "Fintech" },
      { value: "ai", label: "AI" },
      { value: "healthtech", label: "HealthTech" },
      { value: "consumer", label: "Consumer" },
    ]
  },
];
