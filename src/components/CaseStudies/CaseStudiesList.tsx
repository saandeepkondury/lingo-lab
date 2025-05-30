
import { memo } from 'react';
import { Button } from '@/components/ui/button';
import CaseStudyCard from '@/components/CaseStudyCard';

// Create type for case study
type CaseStudy = {
  id: string;
  company: string;
  companyName: string;
  lingo: string;
  impact: string;
  rating: number;
  narrativeType: string;
  industry: string;
  stage?: string;
  lingoStyle?: string;
  year?: number;
  targetAudience?: string;
  fundingRaised?: string;
  viewCount?: number;
  marketThemes?: string[];
  strategicPatterns?: string[];
};

interface CaseStudiesListProps {
  caseStudies: CaseStudy[];
  clearFilters: () => void;
}

// Memoized CaseStudyCard component to prevent unnecessary re-renders
const MemoizedCaseStudyCard = memo(CaseStudyCard);

const CaseStudiesList = ({ 
  caseStudies, 
  clearFilters 
}: CaseStudiesListProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {caseStudies.length > 0 ? (
        caseStudies.map((study) => (
          <MemoizedCaseStudyCard 
            key={study.id} 
            {...study}
            fundingRaised={study.fundingRaised}
            viewCount={study.viewCount || Math.floor(Math.random() * 10000) + 1000}
            marketThemes={study.marketThemes}
            strategicPatterns={study.strategicPatterns}
          />
        ))
      ) : (
        <div className="col-span-2 py-20 text-center">
          <p className="text-lg text-muted-foreground">No case studies found matching your filters</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={clearFilters}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default memo(CaseStudiesList);
