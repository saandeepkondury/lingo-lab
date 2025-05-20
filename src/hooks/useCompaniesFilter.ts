
import { useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { allCompanies } from '@/data/companiesData';

export const useCompaniesFilter = () => {
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
  
  // Apply filters and search - memoized to prevent unnecessary recalculations
  const filteredCompanies = useMemo(() => {
    return allCompanies.filter(company => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        if (!company.name.toLowerCase().includes(searchLower) && 
            !company.description.toLowerCase().includes(searchLower)) {
          return false;
        }
      }
      
      // Check if all active filters match
      for (const [group, values] of Object.entries(activeFilters)) {
        if (values.length === 0) continue; // Skip if no filter in this group
        
        // Simple matching for this demo
        const fieldMap: Record<string, keyof typeof company> = {
          "Industry": "industry",
          // Add other mappings as needed
        };
        
        const field = fieldMap[group];
        if (field && values.length > 0) {
          const companyValue = String(company[field]).toLowerCase();
          const hasMatch = values.some(value => 
            companyValue.includes(value.toLowerCase())
          );
          
          if (!hasMatch) return false;
        }
      }
      
      return true;
    });
  }, [searchQuery, activeFilters]);

  // Memoize visibleCompanies to prevent unnecessary re-renders
  const visibleCompanies = useMemo(() => {
    return filteredCompanies;
  }, [filteredCompanies]);
    
  return {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    visibleCompanies
  };
};
