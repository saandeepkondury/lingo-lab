
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSavedCaseStudies } from '@/context/SavedCaseStudiesContext';
import { useToast } from '@/hooks/use-toast';

interface CaseStudyBreadcrumbsProps {
  caseStudy: any;
  slug: string;
}

const CaseStudyBreadcrumbs = ({ caseStudy, slug }: CaseStudyBreadcrumbsProps) => {
  const { isLoggedIn } = useAuth();
  const { isSaved, saveCaseStudy, removeCaseStudy } = useSavedCaseStudies();
  const { toast } = useToast();

  // Use the case study ID for saving
  const caseStudyId = caseStudy.id || slug;

  const handleSaveToggle = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to save case studies.",
        action: <Button className="bg-teal-500 hover:bg-teal-600 text-white" size="sm" asChild><Link to="/join">Login</Link></Button>
      });
      return;
    }

    if (isSaved(caseStudyId)) {
      removeCaseStudy(caseStudyId);
      toast({
        title: "Case study removed",
        description: "Removed from your saved case studies."
      });
    } else {
      saveCaseStudy(caseStudyId);
      toast({
        title: "Case study saved",
        description: "Added to your saved case studies."
      });
    }
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center text-sm text-muted-foreground">
        <Link to="/case-studies" className="hover:text-foreground">Case Studies</Link>
        <span className="mx-2">/</span>
        <span>{caseStudy.company}</span>
      </div>
      
      <Button 
        variant="outline" 
        onClick={handleSaveToggle}
        className="flex items-center gap-2"
      >
        {isSaved(caseStudyId) ? (
          <>
            <BookmarkCheck className="h-4 w-4" />
            Saved
          </>
        ) : (
          <>
            <Bookmark className="h-4 w-4" />
            Save
          </>
        )}
      </Button>
    </div>
  );
};

export default CaseStudyBreadcrumbs;
