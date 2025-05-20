
// Sample companies data
export const allCompanies = [
  {
    id: "stripe",
    name: "Stripe",
    logo: "/placeholder.svg",
    description: "Payments infrastructure for the internet",
    industry: "Fintech",
    founded: 2010,
    caseStudies: ["stripe-financial-infrastructure", "stripe-developer-experience", "stripe-economic-infrastructure"]
  },
  {
    id: "notion",
    name: "Notion",
    logo: "/placeholder.svg",
    description: "All-in-one workspace for notes, docs, wikis, and project management",
    industry: "SaaS",
    founded: 2016,
    caseStudies: ["notion-all-in-one-workspace", "notion-connected-workspace"]
  },
  {
    id: "figma",
    name: "Figma",
    logo: "/placeholder.svg", 
    description: "Collaborative interface design tool",
    industry: "Design",
    founded: 2012,
    caseStudies: ["figma-multiplayer-design"]
  },
  {
    id: "openai",
    name: "OpenAI",
    logo: "/placeholder.svg",
    description: "AI research and deployment company",
    industry: "AI",
    founded: 2015,
    caseStudies: ["open-ai-chatgpt"]
  },
  {
    id: "airbnb",
    name: "Airbnb",
    logo: "/placeholder.svg",
    description: "Online marketplace for lodging and tourism activities",
    industry: "Consumer",
    founded: 2008,
    caseStudies: ["airbnb-belong-anywhere"]
  },
  {
    id: "slack",
    name: "Slack",
    logo: "/placeholder.svg",
    description: "Business communication platform",
    industry: "SaaS",
    founded: 2009,
    caseStudies: ["slack-where-work-happens"]
  }
];

// Add more data to case studies
export const expandedCaseStudies = {
  "stripe-financial-infrastructure": {
    id: "stripe-financial-infrastructure",
    company: "stripe",
    companyName: "Stripe",
    lingo: "Financial Infrastructure",
    impact: "Raised $600M at $95B valuation by positioning as infrastructure rather than payments",
    summary: "By reframing their product as 'Financial Infrastructure' rather than just payments, Stripe expanded their perceived market size and value proposition.",
    year: 2020,
    rating: 5,
    narrativeType: "Market Creation",
    industry: "Fintech"
  },
  "stripe-developer-experience": {
    id: "stripe-developer-experience",
    company: "stripe",
    companyName: "Stripe",
    lingo: "Developer Experience",
    impact: "Gained industry-leading adoption by making API documentation and integration a core product feature",
    summary: "Stripe elevated developer documentation to a competitive advantage by treating it as a product, not an afterthought.",
    year: 2016,
    rating: 4.8,
    narrativeType: "Product Positioning",
    industry: "Fintech"
  },
  "stripe-economic-infrastructure": {
    id: "stripe-economic-infrastructure",
    company: "stripe",
    companyName: "Stripe",
    lingo: "Economic Infrastructure",
    impact: "Expanded TAM from payments to entire financial stack for modern businesses",
    summary: "Building on 'Financial Infrastructure,' Stripe positioned itself as the complete economic infrastructure for internet businesses.",
    year: 2022,
    rating: 4.9,
    narrativeType: "Market Expansion",
    industry: "Fintech"
  },
  "notion-all-in-one-workspace": {
    id: "notion-all-in-one-workspace",
    company: "notion",
    companyName: "Notion",
    lingo: "All-in-one Workspace",
    impact: "Grew to 20M+ users with a narrative that unified multiple product categories",
    summary: "Rather than competing as a notes app, wiki, or project management tool, Notion created a new category that encompassed all three.",
    year: 2019,
    rating: 4.8,
    narrativeType: "Product Positioning",
    industry: "SaaS"
  },
  "notion-connected-workspace": {
    id: "notion-connected-workspace",
    company: "notion",
    companyName: "Notion",
    lingo: "Connected Workspace",
    impact: "Shifted from individual productivity to team collaboration, increasing enterprise adoption",
    summary: "By emphasizing connection between teams and tools, Notion repositioned for larger enterprise contracts.",
    year: 2021,
    rating: 4.7,
    narrativeType: "Market Expansion",
    industry: "SaaS"
  },
  "figma-multiplayer-design": {
    id: "figma-multiplayer-design",
    company: "figma",
    companyName: "Figma",
    lingo: "Multiplayer Design",
    impact: "Differentiated from Adobe by focusing on collaboration, acquired for $20B",
    summary: "Figma reframed design as a team sport rather than a solo activity, creating a unique position against established competitors.",
    year: 2018,
    rating: 4.9,
    narrativeType: "Competitive Positioning",
    industry: "Design"
  },
  "open-ai-chatgpt": {
    id: "open-ai-chatgpt",
    company: "openai",
    companyName: "OpenAI",
    lingo: "ChatGPT",
    impact: "Created a new product category that reached 100M users in 2 months",
    summary: "By giving their AI a simple conversational interface, OpenAI created the fastest-growing consumer product in history.",
    year: 2022,
    rating: 5,
    narrativeType: "Product Launch",
    industry: "AI"
  },
  "airbnb-belong-anywhere": {
    id: "airbnb-belong-anywhere",
    company: "airbnb",
    companyName: "Airbnb",
    lingo: "Belong Anywhere",
    impact: "Transformed from rental marketplace to global hospitality brand",
    summary: "Airbnb elevated their story from transactions to human connection, increasing both host and guest retention.",
    year: 2014,
    rating: 4.7,
    narrativeType: "Brand Positioning",
    industry: "Consumer"
  },
  "slack-where-work-happens": {
    id: "slack-where-work-happens",
    company: "slack",
    companyName: "Slack",
    lingo: "Where Work Happens",
    impact: "Grew to $27B valuation by positioning as the future of workplace communication",
    summary: "Slack redefined office communication as a central hub rather than just a chat tool, expanding their perceived value.",
    year: 2017,
    rating: 4.8,
    narrativeType: "Market Creation",
    industry: "SaaS"
  }
};

// Get all case studies as an array
export const allCaseStudies = Object.values(expandedCaseStudies);

// Sample filter data
export const filterGroups = [
  {
    name: "Company",
    options: allCompanies.map(company => ({
      value: company.id,
      label: company.name
    }))
  },
  {
    name: "Narrative Type",
    options: [
      { value: "market-creation", label: "Market Creation" },
      { value: "product-positioning", label: "Product Positioning" },
      { value: "competitive-positioning", label: "Competitive Positioning" },
      { value: "market-expansion", label: "Market Expansion" },
      { value: "brand-positioning", label: "Brand Positioning" },
      { value: "product-launch", label: "Product Launch" },
    ]
  },
  {
    name: "Industry",
    options: [
      { value: "saas", label: "SaaS" },
      { value: "fintech", label: "Fintech" },
      { value: "ai", label: "AI" },
      { value: "design", label: "Design" },
      { value: "consumer", label: "Consumer" },
    ]
  },
  {
    name: "Year",
    options: [
      { value: "2014", label: "2014" },
      { value: "2016", label: "2016" },
      { value: "2017", label: "2017" },
      { value: "2018", label: "2018" },
      { value: "2019", label: "2019" },
      { value: "2020", label: "2020" },
      { value: "2021", label: "2021" },
      { value: "2022", label: "2022" },
    ]
  }
];
