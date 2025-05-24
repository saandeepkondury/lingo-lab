
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import FilterCheckbox from './FilterCheckbox';

interface SearchableFilterProps {
  groupName: string;
  options: { value: string; label: string; }[];
  activeFilters: string[];
  onFilterChange: (value: string) => void;
}

const SearchableFilter = ({ groupName, options, activeFilters, onFilterChange }: SearchableFilterProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-2 mb-2">
      <div className="relative">
        <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
          <Search className="h-3.5 w-3.5 text-sidebar-foreground/70" />
        </div>
        <Input 
          type="text"
          placeholder={`Search ${groupName.toLowerCase()}...`}
          className="pl-8 py-1 h-8 text-sm bg-sidebar-accent/50 border-sidebar-border"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div>
      {filteredOptions.map((option) => (
        <FilterCheckbox
          key={option.value}
          option={option}
          isActive={activeFilters.includes(option.value)}
          onToggle={() => onFilterChange(option.value)}
        />
      ))}
    </div>
  );
};

export default SearchableFilter;
