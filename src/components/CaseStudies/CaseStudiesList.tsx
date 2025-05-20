
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CaseStudyCard from '@/components/CaseStudyCard';
import LockedCaseStudy from './LockedCaseStudy';

interface CaseStudiesListProps {
  visibleCaseStudies: Array<{
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
  }>;
  lockedCaseStudies: Array<{
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
  }>;
  handleLockedCaseStudyClick: () => void;
  clearFilters: () => void;
}

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
            <CaseStudyCard key={study.id} {...study} />
          ))}
          
          {/* Locked case studies */}
          {lockedCaseStudies.map((study) => (
            <LockedCaseStudy 
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

export default CaseStudiesList;
