
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import CaseStudyCard from '@/components/CaseStudyCard';
import FiltersPanel from '@/components/FiltersPanel';
import VoiceSearch from '@/components/VoiceSearch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

// Sample filter data
const filterGroups = [
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

// Sample case studies data
const allCaseStudies = [
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

const CaseStudies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();
  
  const handleFilterChange = (group: string, value: string) => {
    setActiveFilters(prev => {
      const currentGroupFilters = prev[group] || [];
      
      // If the filter is already active, remove it
      if (currentGroupFilters.includes(value)) {
        return {
          ...prev,
          [group]: currentGroupFilters.filter(filter => filter !== value)
        };
      }
      
      // Otherwise add it
      return {
        ...prev,
        [group]: [...currentGroupFilters, value]
      };
    });
  };
  
  const handleVoiceSearchResult = (transcript: string) => {
    setSearchQuery(transcript);
    setShowVoiceSearch(false);
  };

  const handleLockedCaseStudyClick = () => {
    toast({
      title: "Premium Case Study",
      description: "Subscribe to access our full library of case studies.",
      action: <Button className="bg-teal-500 hover:bg-teal-600 text-white" size="sm" asChild><Link to="/pricing">View Plans</Link></Button>
    });
  };
  
  // Apply filters and search
  const filteredCaseStudies = allCaseStudies.filter(study => {
    // Search filter
    if (searchQuery && !study.company.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !study.lingo.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Check if all active filters match
    for (const [group, values] of Object.entries(activeFilters)) {
      if (values.length === 0) continue; // Skip if no filter in this group
      
      // Simple matching for this demo
      const fieldMap: Record<string, keyof typeof study> = {
        "Narrative Type": "narrativeType",
        "Industry": "industry",
        // Add other mappings as needed
      };
      
      const field = fieldMap[group];
      if (field && values.length > 0) {
        const studyValue = String(study[field]).toLowerCase();
        const hasMatch = values.some(value => 
          studyValue.includes(value.toLowerCase())
        );
        
        if (!hasMatch) return false;
      }
    }
    
    return true;
  });

  // Only show first 4 case studies for non-logged in users
  const visibleCaseStudies = isLoggedIn 
    ? filteredCaseStudies 
    : filteredCaseStudies.slice(0, 4);

  // Any additional case studies that are locked (filtered but beyond the visible limit)
  const lockedCaseStudies = !isLoggedIn 
    ? filteredCaseStudies.slice(4) 
    : [];

  return (
    <Layout>
      <section className="py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold mb-4">Case Study Library</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore how the world's most successful startups used strategic narrative to drive growth
            </p>
            {!isLoggedIn && (
              <div className="mt-4">
                <Button className="bg-teal-500 hover:bg-teal-600 text-white" asChild>
                  <Link to="/pricing">Subscribe to Unlock All Case Studies</Link>
                </Button>
              </div>
            )}
          </div>
          
          <div className="relative flex flex-col md:flex-row gap-8">
            {/* Filters sidebar */}
            <div className="md:w-64 flex-shrink-0">
              <div className="md:sticky md:top-20">
                <FiltersPanel 
                  filters={filterGroups}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              {/* Search area */}
              <div className="mb-8">
                {!showVoiceSearch ? (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      type="search"
                      placeholder="Search case studies..."
                      className="pl-10 pr-12"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setShowVoiceSearch(true)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" x2="12" y1="19" y2="22"></line>
                      </svg>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-8 bg-muted/30 rounded-lg border border-border">
                    <VoiceSearch 
                      onSearchResult={handleVoiceSearchResult}
                      redirectOnResult={false}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowVoiceSearch(false)}
                      className="mt-4"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Results count */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {visibleCaseStudies.length} case studies
                  {!isLoggedIn && lockedCaseStudies.length > 0 && ` (${lockedCaseStudies.length} locked)`}
                </p>
              </div>
              
              {/* Results grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {visibleCaseStudies.length > 0 ? (
                  <>
                    {visibleCaseStudies.map((study) => (
                      <CaseStudyCard key={study.id} {...study} />
                    ))}
                    
                    {/* Locked case studies */}
                    {lockedCaseStudies.map((study) => (
                      <div 
                        key={study.id} 
                        className="relative rounded-lg border border-border bg-card/30 overflow-hidden group cursor-pointer"
                        onClick={handleLockedCaseStudyClick}
                      >
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                          <div className="text-center p-6">
                            <Lock className="h-10 w-10 mx-auto mb-4 text-teal-500" />
                            <h3 className="font-semibold text-lg mb-2">{study.company}</h3>
                            <p className="text-muted-foreground mb-4">Subscribe to unlock this case study</p>
                            <Button className="bg-teal-500 hover:bg-teal-600 text-white" asChild>
                              <Link to="/pricing">View Plans</Link>
                            </Button>
                          </div>
                        </div>
                        <div className="opacity-50">
                          <CaseStudyCard {...study} />
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="col-span-2 py-20 text-center">
                    <p className="text-lg text-muted-foreground">No case studies found matching your filters</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        setSearchQuery('');
                        setActiveFilters({});
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudies;
