
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CaseStudyCard from '@/components/CaseStudyCard';

interface LockedCaseStudyProps {
  study: {
    id: string;
    company: string;
    lingo: string;
    impact: string;
    rating: number;
    narrativeType: string;
    industry: string;
  };
  onClick: () => void;
}

const LockedCaseStudy = ({ study, onClick }: LockedCaseStudyProps) => {
  return (
    <div 
      className="relative rounded-lg border border-border bg-card/30 overflow-hidden group cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
        <div className="text-center p-6">
          <Lock className="h-10 w-10 mx-auto mb-4 text-teal-500" />
          <h3 className="font-semibold text-lg mb-2">{study.company}</h3>
          <p className="text-muted-foreground mb-4">Subscribe to unlock this case study</p>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white" asChild>
            <Link to="/pricing">View Plans</Link>
          </Button>
        </div>
      </div>
      <div className="opacity-50">
        <CaseStudyCard {...study} />
      </div>
    </div>
  );
};

export default LockedCaseStudy;
