import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import VoiceSearch from '@/components/VoiceSearch';
interface SearchAreaProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}
const SearchArea = ({
  searchQuery,
  setSearchQuery
}: SearchAreaProps) => {
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const handleVoiceSearchResult = (transcript: string) => {
    setSearchQuery(transcript);
    setShowVoiceSearch(false);
  };
  return <div className="mb-8">
      {!showVoiceSearch ? <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input type="search" placeholder="Search case studies..." className="pl-10 pr-12" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          
        </div> : <div className="flex flex-col items-center py-8 bg-muted/30 rounded-lg border border-border">
          <VoiceSearch onSearchResult={handleVoiceSearchResult} redirectOnResult={false} />
          <Button variant="ghost" size="sm" onClick={() => setShowVoiceSearch(false)} className="mt-4">
            Cancel
          </Button>
        </div>}
    </div>;
};
export default SearchArea;