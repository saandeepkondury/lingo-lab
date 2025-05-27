
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ShareOptions from '@/components/ShareOptions';

interface CaseStudyDetailHeaderProps {
  narrative: any;
  slug: string;
}

const CaseStudyDetailHeader = ({ narrative, slug }: CaseStudyDetailHeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-indigo-900">
      <div className="container max-w-4xl mx-auto px-6 py-16">
        {/* Share Button at the top */}
        <div className="flex justify-end mb-6">
          <ShareOptions 
            caseStudy={{
              company: narrative.company,
              lingo: `${narrative.founder_name}'s Market Vision`,
              id: slug
            }}
          />
        </div>

        {/* Company and Key Phrase */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-indigo-600 text-white text-sm px-3 py-1">
              {narrative.company}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {narrative.industry}
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            "{narrative.key_phrase}"
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {narrative.tagline}
          </p>
        </div>

        {/* Founder Info */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-200 dark:bg-indigo-800 flex items-center justify-center">
            <span className="text-lg font-semibold text-indigo-800 dark:text-indigo-200">
              {narrative.founder_name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {narrative.founder_name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {narrative.founder_title}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CaseStudyDetailHeader;
