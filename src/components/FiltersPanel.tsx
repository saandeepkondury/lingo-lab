
import { useState } from 'react';
import { Check, ChevronDown, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(filters.map(filter => [filter.name, true]))
  );
  const isMobile = useIsMobile();
  const [companySearchQuery, setCompanySearchQuery] = useState('');

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };
  
  const FiltersPanelContent = () => (
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
              {/* Special handling for Company filter - show search input */}
              {group.name === "Company" ? (
                <div className="px-2 mb-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                      <Search className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <Input 
                      type="text"
                      placeholder="Search companies..." 
                      className="pl-8 py-1 h-8 text-sm"
                      value={companySearchQuery}
                      onChange={(e) => setCompanySearchQuery(e.target.value)} 
                    />
                  </div>
                  {group.options
                    .filter(option => option.label.toLowerCase().includes(companySearchQuery.toLowerCase()))
                    .map((option) => {
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
                    })
                  }
                </div>
              ) : (
                // Regular checkbox filters for other filter categories
                group.options.map((option) => {
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
                })
              )}
            </div>
          )}
          
          <Separator className="mt-2" />
        </div>
      ))}
      
      <Button 
        variant="outline" 
        className="w-full mt-4 text-muted-foreground"
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
            <Button variant="outline" className="mb-4 w-full flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="p-4 max-h-[80vh] overflow-auto bg-background">
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
