
import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import FilterGroup from './FiltersPanel/FilterGroup';

interface FilterGroup {
  name: string;
  options: {
    value: string;
    label: string;
  }[];
}

interface FiltersPanelProps {
  filters: FilterGroup[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (group: string, value: string) => void;
  clearFilters: () => void;
}

const FiltersPanel = ({ filters, activeFilters, onFilterChange, clearFilters }: FiltersPanelProps) => {
  // Set specific groups to be expanded by default
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "Company": true,
    "Revenue": true,
    "Business Type": true,
    "Country": true
  });
  const isMobile = useIsMobile();

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };
  
  const FiltersPanelContent = () => (
    <div className="w-full md:w-64 space-y-4">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300 mb-4">Filter By</div>
      
      {filters.map((group) => (
        <FilterGroup
          key={group.name}
          group={group}
          isExpanded={expandedGroups[group.name]}
          activeFilters={activeFilters[group.name] || []}
          onToggleExpanded={() => toggleGroup(group.name)}
          onFilterChange={(value) => onFilterChange(group.name, value)}
        />
      ))}
      
      <Button 
        variant="outline" 
        className="w-full mt-6 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-700 hover:bg-teal-50 dark:hover:bg-teal-950 hover:text-teal-800 dark:hover:text-teal-200"
        onClick={clearFilters}
      >
        Clear all filters
      </Button>
    </div>
  );

  // Use drawer for mobile view
  if (isMobile) {
    return (
      <>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="mb-4 w-full flex items-center gap-2 border-teal-200 dark:border-teal-700 hover:bg-teal-50 dark:hover:bg-teal-950">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="p-4 max-h-[80vh] overflow-auto">
            <FiltersPanelContent />
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  // Regular sidebar for desktop view
  return <FiltersPanelContent />;
};

export default FiltersPanel;
