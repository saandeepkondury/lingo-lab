
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import VoiceSearch from '@/components/VoiceSearch';

interface SearchAreaProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchArea = ({ searchQuery, setSearchQuery }: SearchAreaProps) => {
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  
  const handleVoiceSearchResult = (transcript: string) => {
    setSearchQuery(transcript);
    setShowVoiceSearch(false);
  };

  return (
    <div className="mb-8">
      {!showVoiceSearch ? (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder="Search case studies..."
            className="pl-10 pr-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowVoiceSearch(true)}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" x2="12" y1="19" y2="22"></line>
            </svg>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center py-8 bg-muted/30 rounded-lg border border-border">
          <VoiceSearch 
            onSearchResult={handleVoiceSearchResult}
            redirectOnResult={false}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowVoiceSearch(false)}
            className="mt-4"
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchArea;
