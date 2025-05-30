
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Share } from 'lucide-react';
import ShareOptions from '@/components/ShareOptions';

interface NewCaseStudyDetailHeaderProps {
  narrative: any;
  slug: string;
}

const NewCaseStudyDetailHeader = ({ narrative, slug }: NewCaseStudyDetailHeaderProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 border-b">
      <div className="container max-w-4xl mx-auto px-6 py-8">
        {/* Header with founder info and share button */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-gray-600 dark:text-gray-300">
                {narrative.founder_name?.charAt(0) || 'F'}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {narrative.founder_name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {narrative.founder_title} • CEO
              </p>
            </div>
          </div>
          
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

        {/* Company and tags */}
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {narrative.industry}
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Fintech
          </Badge>
          {narrative.strategic_patterns?.slice(0, 2).map((pattern: string, index: number) => (
            <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              {pattern}
            </Badge>
          ))}
        </div>

        {/* Title and description */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          "{narrative.key_phrase}"
        </h2>
        
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          {narrative.tagline || `${narrative.company} builds economic infrastructure for the internet...`}
        </p>

        {/* Metadata row */}
        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <span>1 min read</span>
          <span>Published in {new Date(narrative.created_at).toLocaleDateString()}</span>
          <span>Founded in {narrative.founded_year || '2010'}</span>
          <span className="font-semibold text-green-600 dark:text-green-400">
            ${narrative.funding_raised || '600M'} raised
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewCaseStudyDetailHeader;
