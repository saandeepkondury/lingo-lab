
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
    <div className="w-full md:w-64 space-y-6">
      <div className="text-sm font-medium text-sidebar-foreground">Filter By</div>
      
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
        className="w-full mt-4 text-sidebar-foreground border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        onClick={clearFilters}
      >
        Clear all filters
      </Button>
    </div>
  );

  // Use drawer for mobile view with solid background
  if (isMobile) {
    return (
      <>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="mb-4 w-full flex items-center gap-2">
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
