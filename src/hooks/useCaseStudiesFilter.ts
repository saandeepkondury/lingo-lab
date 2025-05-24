
import { useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { allCaseStudies } from '@/data/caseStudiesData';

export const useCaseStudiesFilter = (companyId?: string) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(
    companyId ? { 'Company': [companyId] } : {}
  );
  const { isLoggedIn } = useAuth();
  
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
  
  // Apply filters and search - memoized to prevent unnecessary recalculations
  const filteredCaseStudies = useMemo(() => {
    return initialCaseStudies.filter(study => {
      // Search filter - check company name, lingo, and niche
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const searchableFields = [
          study.companyName,
          study.lingo,
          study.niche || ''
        ].join(' ').toLowerCase();
        
        if (!searchableFields.includes(searchLower)) {
          return false;
        }
      }
      
      // Check if all active filters match
      for (const [group, values] of Object.entries(activeFilters)) {
        if (values.length === 0) continue; // Skip if no filter in this group
        
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
          "Industry": "industry",
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
  }, [initialCaseStudies, searchQuery, activeFilters]);

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
    lockedCaseStudies
  };
};
