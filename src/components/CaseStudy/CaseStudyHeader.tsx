
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface CaseStudyHeaderProps {
  caseStudy: any;
  slug?: string;
}

const CaseStudyHeader = ({ caseStudy, slug }: CaseStudyHeaderProps) => {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="mb-8">
        <div className="flex items-center text-sm text-muted-foreground">
          <Link to="/case-studies" className="hover:text-foreground">Case Studies</Link>
          <span className="mx-2">/</span>
          <span>{caseStudy.company}</span>
        </div>
      </div>
      
      {/* Main title */}
      <div className="mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">
          {caseStudy.tagline}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">{caseStudy.publishDate}</p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Badge variant="outline" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-none dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-800">
          {caseStudy.narrativeType}
        </Badge>
        <Badge variant="outline" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-none dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-800">
          {caseStudy.industry}
        </Badge>
        <Badge variant="outline" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-none dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-800">
          {caseStudy.overview.stage}
        </Badge>
      </div>
    </>
  );
};

export default CaseStudyHeader;
