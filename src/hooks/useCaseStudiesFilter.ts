import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { allCaseStudies } from '@/data/caseStudiesData';

export const useCaseStudiesFilter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
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
    setActiveFilters({});
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
