
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";

interface CaseStudyCardProps {
  id: string;
  company: string;
  companyName: string;
  lingo: string;
  impact: string;
  rating?: number;
  narrativeType: string;
  industry: string;
  year?: number;
  disableLinks?: boolean;
  fundingRaised?: string;
  viewCount?: number;
  marketThemes?: string[];
  strategicPatterns?: string[];
}

const CaseStudyCard = ({
  id,
  company,
  companyName,
  lingo,
  impact,
  narrativeType,
  industry,
  year,
  disableLinks = false,
  fundingRaised,
  viewCount = 0,
  marketThemes = [],
  strategicPatterns = []
}: CaseStudyCardProps) => {
  const cardContent = (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      {/* Header with company name and funding */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          {disableLinks ? (
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {companyName}
            </span>
          ) : (
            <Link 
              to={`/case-studies/${id}`} 
              className="text-xl font-bold text-gray-900 dark:text-white hover:text-teal-600"
              onClick={(e) => e.stopPropagation()}
            >
              {companyName}
            </Link>
          )}
        </div>
        {fundingRaised && (
          <div className="text-sm font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
            {fundingRaised}
          </div>
        )}
      </div>
      
      {/* Title (Lingo) */}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2">
        "{lingo}"
      </h3>
      
      {/* One-liner */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
        {impact}
      </p>

      {/* View count */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 dark:text-gray-500">
          📊 Viewed by {viewCount.toLocaleString()} founders
        </p>
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        <Badge variant="outline" className="bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200 text-xs px-2 py-0.5">
          {narrativeType}
        </Badge>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 text-xs px-2 py-0.5">
          {industry}
        </Badge>
        {marketThemes.slice(0, 1).map((theme, index) => (
          <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200 text-xs px-2 py-0.5">
            {theme}
          </Badge>
        ))}
        {strategicPatterns.slice(0, 1).map((pattern, index) => (
          <Badge key={index} variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200 text-xs px-2 py-0.5">
            {pattern}
          </Badge>
        ))}
      </div>
    </div>
  );

  if (disableLinks) {
    return cardContent;
  }

  return (
    <Link to={`/case-studies/${id}`} className="block">
      {cardContent}
    </Link>
  );
};

export default memo(CaseStudyCard);
