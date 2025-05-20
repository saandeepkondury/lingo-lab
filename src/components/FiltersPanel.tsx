
import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

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
}

const FiltersPanel = ({ filters, activeFilters, onFilterChange }: FiltersPanelProps) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(filters.map(filter => [filter.name, true]))
  );

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  return (
    <div className="w-full md:w-64 space-y-6">
      <div className="text-sm font-medium">Filter By</div>
      
      {filters.map((group) => (
        <div key={group.name} className="space-y-2">
          <Button 
            variant="ghost" 
            className="w-full flex justify-between items-center px-2 py-1 h-auto"
            onClick={() => toggleGroup(group.name)}
          >
            <span className="font-medium">{group.name}</span>
            <ChevronDown 
              className={`h-4 w-4 transition-transform ${
                expandedGroups[group.name] ? 'transform rotate-180' : ''
              }`}
            />
          </Button>
          
          {expandedGroups[group.name] && (
            <div className="ml-2 space-y-1">
              {group.options.map((option) => {
                const isActive = activeFilters[group.name]?.includes(option.value);
                
                return (
                  <Button
                    key={option.value}
                    variant="ghost"
                    className={`w-full justify-start px-2 py-1.5 h-auto text-sm ${
                      isActive ? 'font-medium text-primary' : 'font-normal text-muted-foreground'
                    }`}
                    onClick={() => onFilterChange(group.name, option.value)}
                  >
                    <div className="flex items-center">
                      <div className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                        isActive 
                          ? 'border-primary bg-primary text-white' 
                          : 'border-muted-foreground'
                      } mr-2`}>
                        {isActive && <Check className="h-3 w-3" />}
                      </div>
                      {option.label}
                    </div>
                  </Button>
                );
              })}
            </div>
          )}
          
          <Separator className="mt-2" />
        </div>
      ))}
      
      <Button 
        variant="outline" 
        className="w-full mt-4 text-muted-foreground"
        onClick={() => console.log('Clear all filters')}
      >
        Clear all filters
      </Button>
    </div>
  );
};

export default FiltersPanel;
