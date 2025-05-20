
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CaseStudyCard from '@/components/CaseStudyCard';
import LockedCaseStudy from './LockedCaseStudy';

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
};

interface CaseStudiesListProps {
  visibleCaseStudies: CaseStudy[];
  lockedCaseStudies: CaseStudy[];
  handleLockedCaseStudyClick: () => void;
  clearFilters: () => void;
}

// Memoized CaseStudyCard component to prevent unnecessary re-renders
const MemoizedCaseStudyCard = memo(CaseStudyCard);

// Memoized LockedCaseStudy component
const MemoizedLockedCaseStudy = memo(LockedCaseStudy);

const CaseStudiesList = ({ 
  visibleCaseStudies, 
  lockedCaseStudies, 
  handleLockedCaseStudyClick, 
  clearFilters 
}: CaseStudiesListProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {visibleCaseStudies.length > 0 ? (
        <>
          {visibleCaseStudies.map((study) => (
            <MemoizedCaseStudyCard key={study.id} {...study} />
          ))}
          
          {/* Locked case studies */}
          {lockedCaseStudies.map((study) => (
            <MemoizedLockedCaseStudy 
              key={study.id}
              study={study}
              onClick={handleLockedCaseStudyClick}
            />
          ))}
        </>
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
