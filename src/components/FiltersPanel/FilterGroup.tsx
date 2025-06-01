
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
        className="w-full flex justify-between items-center px-3 py-2 h-auto text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950 hover:text-teal-800 dark:hover:text-teal-200 font-medium"
        onClick={onToggleExpanded}
      >
        <span>{group.name}</span>
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
      
      <Separator className="mt-3 bg-teal-100 dark:bg-teal-800" />
    </div>
  );
};

export default FilterGroup;
