
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SearchableFilter from './SearchableFilter';
import NicheFilter from './NicheFilter';
import FilterCheckbox from './FilterCheckbox';

interface FilterGroupProps {
  group: {
    name: string;
    options: { value: string; label: string; }[];
  };
  isExpanded: boolean;
  activeFilters: string[];
  onToggleExpanded: () => void;
  onFilterChange: (value: string) => void;
}

const FilterGroup = ({ group, isExpanded, activeFilters, onToggleExpanded, onFilterChange }: FilterGroupProps) => {
  const renderFilterContent = () => {
    // Special handling for searchable filters
    if (group.name === "Company" || group.name === "Industry") {
      return (
        <SearchableFilter
          groupName={group.name}
          options={group.options}
          activeFilters={activeFilters}
          onFilterChange={onFilterChange}
        />
      );
    }

    // Special searchable text input for Niche
    if (group.name === "Niche") {
      return (
        <NicheFilter
          activeFilters={activeFilters}
          onFilterChange={onFilterChange}
        />
      );
    }

    // Regular checkbox filters for other filter categories
    return group.options.map((option) => (
      <FilterCheckbox
        key={option.value}
        option={option}
        isActive={activeFilters.includes(option.value)}
        onToggle={() => onFilterChange(option.value)}
      />
    ));
  };

  return (
    <div className="space-y-2">
      <Button 
        variant="ghost" 
        className="w-full flex justify-between items-center px-2 py-1 h-auto text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        onClick={onToggleExpanded}
      >
        <span className="font-medium">{group.name}</span>
        <ChevronDown 
          className={`h-4 w-4 transition-transform ${
            isExpanded ? 'transform rotate-180' : ''
          }`}
        />
      </Button>
      
      {isExpanded && (
        <div className="ml-2 space-y-1">
          {renderFilterContent()}
        </div>
      )}
      
      <Separator className="mt-2 bg-sidebar-border" />
    </div>
  );
};

export default FilterGroup;
