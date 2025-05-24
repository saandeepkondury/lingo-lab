
import { useState } from 'react';
import { Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface NicheFilterProps {
  activeFilters: string[];
  onFilterChange: (value: string) => void;
}

const NicheFilter = ({ activeFilters, onFilterChange }: NicheFilterProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleNicheSearch = (query: string) => {
    if (query.trim()) {
      onFilterChange(query.trim());
    }
    setSearchQuery('');
  };

  return (
    <div className="px-2 mb-2">
      <div className="relative">
        <Input 
          type="text"
          placeholder="Enter niche keywords..."
          className="py-1 h-8 text-sm bg-sidebar-accent/50 border-sidebar-border"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleNicheSearch(searchQuery);
            }
          }}
        />
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="w-full mt-1 text-xs"
        onClick={() => handleNicheSearch(searchQuery)}
        disabled={!searchQuery.trim()}
      >
        Add Niche Filter
      </Button>
      {/* Show active niche filters */}
      {activeFilters.map((niche) => (
        <Button
          key={niche}
          variant="ghost"
          className="w-full justify-start px-2 py-1.5 h-auto text-sm font-medium text-sidebar-primary"
          onClick={() => onFilterChange(niche)}
        >
          <div className="flex items-center">
            <div className="flex h-4 w-4 items-center justify-center rounded-sm border border-sidebar-primary bg-sidebar-primary text-sidebar-primary-foreground mr-2">
              <Check className="h-3 w-3" />
            </div>
            {niche}
          </div>
        </Button>
      ))}
    </div>
  );
};

export default NicheFilter;
