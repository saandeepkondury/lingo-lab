
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import VoiceSearch from '@/components/VoiceSearch';
import CaseStudyCard from '@/components/CaseStudyCard';
import FiltersPanel from '@/components/FiltersPanel';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';

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
    name: "Industry",
    options: [
      { value: "saas", label: "SaaS" },
      { value: "fintech", label: "Fintech" },
      { value: "ai", label: "AI" },
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
];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  
  // Update search input when URL query param changes
  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };
  
  const handleFilterChange = (group: string, value: string) => {
    setActiveFilters(prev => {
      const currentGroupFilters = prev[group] || [];
      
      if (currentGroupFilters.includes(value)) {
        return {
          ...prev,
          [group]: currentGroupFilters.filter(filter => filter !== value)
        };
      }
      
      return {
        ...prev,
        [group]: [...currentGroupFilters, value]
      };
    });
  };
  
  const handleVoiceSearchResult = (transcript: string) => {
    setSearchQuery(transcript);
    setSearchParams({ q: transcript });
    setShowVoiceSearch(false);
  };
  
  // Filter case studies based on search query and filters
  const filteredCaseStudies = allCaseStudies.filter(study => {
    if (queryParam && !study.company.toLowerCase().includes(queryParam.toLowerCase()) && 
        !study.lingo.toLowerCase().includes(queryParam.toLowerCase()) &&
        !study.impact.toLowerCase().includes(queryParam.toLowerCase())) {
      return false;
    }
    
    // Apply additional filters (similar to CaseStudies page)
    for (const [group, values] of Object.entries(activeFilters)) {
      if (values.length === 0) continue;
      
      const fieldMap: Record<string, keyof typeof study> = {
        "Narrative Type": "narrativeType",
        "Industry": "industry",
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
  
  // Generate search suggestions
  const suggestions = queryParam 
    ? ["category creation", "product positioning", "brand storytelling"]
        .filter(s => s.includes(queryParam.toLowerCase()) && s !== queryParam.toLowerCase())
    : [];

  return (
    <Layout>
      <section className="py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold mb-4">Search Results</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {queryParam ? `Results for "${queryParam}"` : 'What would you like to explore?'}
            </p>
          </div>
          
          <div className="mb-10">
            {!showVoiceSearch ? (
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    type="search"
                    placeholder="Search case studies..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" className="bg-teal-500 hover:bg-teal-600">Search</Button>
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => setShowVoiceSearch(true)}
                >
                  Voice Search
                </Button>
              </form>
            ) : (
              <div className="flex flex-col items-center py-10 bg-muted/30 rounded-lg border border-border">
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
          
          {/* Did you mean suggestions */}
          {suggestions.length > 0 && (
            <div className="mb-8">
              <p className="text-sm mb-2">Did you mean:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map(suggestion => (
                  <Button 
                    key={suggestion} 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setSearchParams({ q: suggestion });
                    }}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row gap-8">
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
            
            {/* Results area */}
            <div className="flex-1">
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  {filteredCaseStudies.length} {filteredCaseStudies.length === 1 ? 'result' : 'results'} found
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {filteredCaseStudies.length > 0 ? (
                  filteredCaseStudies.map(study => (
                    <CaseStudyCard key={study.id} {...study} />
                  ))
                ) : (
                  <div className="col-span-2 py-20 text-center">
                    <p className="text-lg text-muted-foreground">No results found</p>
                    <div className="mt-6">
                      <p className="mb-2">Try:</p>
                      <ul className="space-y-2 text-teal-600">
                        <li>Different search terms</li>
                        <li>Checking for typos</li>
                        <li>Using more general keywords</li>
                        <li>Removing filters</li>
                      </ul>
                    </div>
                    <Button 
                      variant="outline" 
                      className="mt-6"
                      onClick={() => {
                        setSearchQuery('');
                        setSearchParams({});
                        setActiveFilters({});
                      }}
                    >
                      Clear Search
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

export default SearchPage;
