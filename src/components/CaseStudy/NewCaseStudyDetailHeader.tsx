
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Share, Bookmark, BookmarkCheck } from 'lucide-react';
import ShareOptions from '@/components/ShareOptions';
import { useSavedCaseStudies } from '@/hooks/useSavedCaseStudies';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface NewCaseStudyDetailHeaderProps {
  narrative: any;
  slug: string;
}

const NewCaseStudyDetailHeader = ({ narrative, slug }: NewCaseStudyDetailHeaderProps) => {
  const { isLoggedIn } = useAuth();
  const { isSaved, saveCaseStudy, removeCaseStudy } = useSavedCaseStudies();
  const { toast } = useToast();
  const saved = isSaved(slug);

  const handleSave = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please log in to save case studies",
        variant: "destructive"
      });
      return;
    }

    if (saved) {
      removeCaseStudy(slug);
      toast({
        title: "Removed from saved",
        description: "Case study removed from your saved list"
      });
    } else {
      saveCaseStudy(slug);
      toast({
        title: "Saved successfully",
        description: "Case study added to your saved list"
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-b">
      <div className="container max-w-4xl mx-auto px-6 py-8">
        {/* Header with founder info and action buttons */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-white">
                {narrative.founder_name?.charAt(0) || 'F'}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {narrative.founder_name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {narrative.founder_title} • {narrative.company}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={handleSave}
            >
              {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              {saved ? 'Saved' : 'Save'}
            </Button>
            
            <ShareOptions 
              caseStudy={{
                company: narrative.company,
                lingo: narrative.key_phrase,
                id: slug
              }}
              trigger={
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Share className="h-4 w-4" />
                  Share
                </Button>
              }
            />
          </div>
        </div>

        {/* Company and tags */}
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {narrative.industry}
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {narrative.transformation_type || 'Market Creation'}
          </Badge>
          {narrative.strategic_patterns?.slice(0, 2).map((pattern: string, index: number) => (
            <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              {pattern}
            </Badge>
          ))}
        </div>

        {/* Title and description */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          "{narrative.key_phrase}"
        </h2>
        
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          {narrative.tagline || `${narrative.company} transformed ${narrative.industry} with their revolutionary approach to strategic positioning...`}
        </p>

        {/* Metadata row */}
        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <span>📖 3 min read</span>
          <span>📅 {new Date(narrative.created_at).toLocaleDateString()}</span>
          <span>🏢 Founded {narrative.founded_year || '2010'}</span>
          <span className="font-semibold text-green-600 dark:text-green-400">
            💰 ${narrative.funding_raised || '600M'} raised
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewCaseStudyDetailHeader;
