import { useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { allCaseStudies } from '@/data/caseStudiesData';
import { useFounderNarratives, FounderNarrative } from './useFounderNarratives';

// Transform founder narrative to case study format
const transformNarrativeToCase = (narrative: FounderNarrative) => ({
  id: narrative.slug || narrative.id,
  company: narrative.company.toLowerCase().replace(/\s+/g, '-'),
  companyName: narrative.company,
  lingo: narrative.key_phrase,
  impact: `${narrative.founder_name} shares how "${narrative.key_phrase}" helped transform ${narrative.industry.toLowerCase()}`,
  rating: 5,
  narrativeType: narrative.transformation_type || 'Market Creation',
  industry: narrative.industry,
  stage: 'Growth',
  lingoStyle: 'Strategic',
  year: narrative.founded_year ? parseInt(narrative.founded_year) : new Date().getFullYear(),
  targetAudience: 'Founders',
  marketThemes: narrative.market_themes || [],
  strategicPatterns: narrative.strategic_patterns || [],
  transformationType: narrative.transformation_type || '',
  narrativeArchetype: narrative.narrative_archetype || '',
  niche: narrative.tagline || '',
  revenue: 'Series B+',
  businessType: 'SaaS',
  country: narrative.headquarters || 'United States',
  startedAt: narrative.founded_year || '2020',
  growthMethod: 'Product-Led Growth',
  businessModel: 'Subscription',
  founders: '1-3',
  employees: narrative.employee_count || '50-200',
  funding: narrative.funding_raised || 'Series B',
  customer: 'B2B',
  involvement: 'High',
  narrativeFocus: 'Market Creation',
  fundingStrategy: 'VC-Backed'
});

export const useCaseStudiesFilter = (companyId?: string) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(
    companyId ? { 'Company': [companyId] } : {}
  );
  const { isLoggedIn } = useAuth();
  
  // Create filters for the founder narratives query
  const narrativeFilters = useMemo(() => {
    const filters: any = {};
    
    if (activeFilters['Industry']?.length) {
      filters.industry = activeFilters['Industry'][0];
    }
    if (activeFilters['Transformation Type']?.length) {
      filters.transformationType = activeFilters['Transformation Type'][0];
    }
    if (activeFilters['Narrative Archetype']?.length) {
      filters.narrativeArchetype = activeFilters['Narrative Archetype'][0];
    }
    if (activeFilters['Market Themes']?.length) {
      filters.marketThemes = activeFilters['Market Themes'];
    }
    if (activeFilters['Strategic Patterns']?.length) {
      filters.strategicPatterns = activeFilters['Strategic Patterns'];
    }
    
    return filters;
  }, [activeFilters]);

  // Fetch founder narratives with filters
  const { data: founderNarratives = [], isLoading } = useFounderNarratives(narrativeFilters);
  
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

  const clearFilters = () => {
    setSearchQuery('');
    setActiveFilters(companyId ? { 'Company': [companyId] } : {});
  };
  
  // Start with all case studies or just those for a specific company
  const initialCaseStudies = useMemo(() => {
    return companyId 
      ? allCaseStudies.filter(study => study.company === companyId)
      : allCaseStudies;
  }, [companyId]);
  
  // Transform founder narratives to case study format
  const narrativeBasedCaseStudies = useMemo(() => {
    return founderNarratives.map(transformNarrativeToCase);
  }, [founderNarratives]);
  
  // Combine traditional case studies with founder narratives
  const allAvailableCaseStudies = useMemo(() => {
    // If we're filtering by a specific company, only show traditional case studies
    if (companyId) {
      return initialCaseStudies;
    }
    
    // Otherwise, combine both traditional and narrative-based case studies
    return [...narrativeBasedCaseStudies, ...initialCaseStudies];
  }, [initialCaseStudies, narrativeBasedCaseStudies, companyId]);
  
  // Apply search and other filters
  const filteredCaseStudies = useMemo(() => {
    return allAvailableCaseStudies.filter(study => {
      // Search filter - check company name, lingo, and niche
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const searchableFields = [
          study.companyName,
          study.lingo,
          study.niche || '',
          ...(study.marketThemes || []),
          ...(study.strategicPatterns || [])
        ].join(' ').toLowerCase();
        
        if (!searchableFields.includes(searchLower)) {
          return false;
        }
      }
      
      // Check if all active filters match (excluding the ones we already handled in narrativeFilters)
      for (const [group, values] of Object.entries(activeFilters)) {
        if (values.length === 0) continue; // Skip if no filter in this group
        
        // Skip filters that are handled by the founder narratives query
        if (['Industry', 'Transformation Type', 'Narrative Archetype', 'Market Themes', 'Strategic Patterns'].includes(group)) {
          continue;
        }
        
        // Special handling for Company filter
        if (group === "Company") {
          if (!values.includes(study.company)) {
            return false;
          }
          continue;
        }

        // Special handling for Niche filter (searchable text field)
        if (group === "Niche") {
          const studyNiche = (study.niche || '').toLowerCase();
          const hasMatch = values.some(value => 
            studyNiche.includes(value.toLowerCase()) || value.toLowerCase().includes(studyNiche)
          );
          if (!hasMatch) return false;
          continue;
        }
        
        // Map the filter group names to the case study object properties
        const fieldMap: Record<string, keyof typeof study> = {
          "Revenue": "revenue",
          "Business Type": "businessType",
          "Country": "country",
          "Started At": "startedAt",
          "Growth Method": "growthMethod",
          "Business Model": "businessModel",
          "Founders": "founders",
          "Employees": "employees",
          "Funding": "funding",
          "Customer": "customer",
          "Involvement": "involvement",
          "Narrative Focus": "narrativeFocus",
          "Funding Strategy": "fundingStrategy",
          "Narrative Type": "narrativeType",
          "Stage": "stage",
          "Lingo Style": "lingoStyle",
          "Target Audience": "targetAudience"
        };
        
        const field = fieldMap[group];
        if (field && values.length > 0) {
          // Make sure the field exists on the study object
          if (study[field] === undefined) continue;
          
          const studyValue = String(study[field]).toLowerCase();
          const hasMatch = values.some(value => 
            studyValue === value.toLowerCase()
          );
          
          if (!hasMatch) return false;
        }
      }
      
      return true;
    });
  }, [allAvailableCaseStudies, searchQuery, activeFilters]);

  // Memoize the visible and locked case studies to prevent unnecessary calculations
  const visibleCaseStudies = useMemo(() => {
    return isLoggedIn ? filteredCaseStudies : filteredCaseStudies.slice(0, 4);
  }, [isLoggedIn, filteredCaseStudies]);

  const lockedCaseStudies = useMemo(() => {
    return !isLoggedIn ? filteredCaseStudies.slice(4) : [];
  }, [isLoggedIn, filteredCaseStudies]);
    
  return {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    visibleCaseStudies,
    lockedCaseStudies,
    isLoading
  };
};
