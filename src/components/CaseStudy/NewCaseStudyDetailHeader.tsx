
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Share, Building2, TrendingUp, Calendar, Users } from 'lucide-react';
import ShareOptions from '@/components/ShareOptions';

interface NewCaseStudyDetailHeaderProps {
  narrative: any;
  slug: string;
}

const NewCaseStudyDetailHeader = ({ narrative, slug }: NewCaseStudyDetailHeaderProps) => {
  return (
    <div className="bg-gradient-to-br from-white via-teal-50/30 to-blue-50/30 dark:from-gray-900 dark:via-teal-950/20 dark:to-blue-950/20 border-b border-gray-200 dark:border-gray-700">
      <div className="container max-w-4xl mx-auto px-6 py-12">
        {/* Header with founder info and share button */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-blue-100 dark:from-teal-900 dark:to-blue-900 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                {narrative.founder_name?.charAt(0) || 'F'}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {narrative.founder_name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
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
              <Button variant="outline" size="sm" className="flex items-center gap-2 hover:bg-teal-50 hover:border-teal-200 dark:hover:bg-teal-900/20">
                <Share className="h-4 w-4" />
                Share
              </Button>
            }
          />
        </div>

        {/* Company logo and title section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="h-8 w-8 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {narrative.company}
              </h2>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200 px-3 py-1">
                  {narrative.industry}
                </Badge>
                <Badge variant="outline" className="bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200 px-3 py-1">
                  Fintech
                </Badge>
                {narrative.strategic_patterns?.slice(0, 2).map((pattern: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border-purple-200 px-3 py-1">
                    {pattern}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key phrase section */}
        <div className="mb-8">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            "{narrative.key_phrase}"
          </h3>
          
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {narrative.tagline || `${narrative.company} builds economic infrastructure for the internet...`}
          </p>
        </div>

        {/* Enhanced metadata row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-gray-500 dark:text-gray-400">Founded</div>
              <div className="font-semibold text-gray-900 dark:text-white">{narrative.founded_year || '2010'}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <div>
              <div className="text-gray-500 dark:text-gray-400">Funding</div>
              <div className="font-semibold text-green-600 dark:text-green-400">
                ${narrative.funding_raised || '600M'}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-blue-500" />
            <div>
              <div className="text-gray-500 dark:text-gray-400">Read time</div>
              <div className="font-semibold text-gray-900 dark:text-white">3 min</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Share className="h-4 w-4 text-purple-500" />
            <div>
              <div className="text-gray-500 dark:text-gray-400">Published</div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {new Date(narrative.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCaseStudyDetailHeader;
