
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
    <div className="apple-card h-full p-6 hover-scale border-t-4 border-t-teal-500 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
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
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Funds raised: {fundingRaised}
          </div>
        )}
      </div>
      
      <div className="space-y-3 mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          "{lingo}"
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {impact}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-500">
          📊 Viewed by {viewCount.toLocaleString()}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200 text-xs">
          {narrativeType}
        </Badge>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 text-xs">
          {industry}
        </Badge>
        {marketThemes.slice(0, 2).map((theme, index) => (
          <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200 text-xs">
            {theme}
          </Badge>
        ))}
        {strategicPatterns.slice(0, 1).map((pattern, index) => (
          <Badge key={index} variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200 text-xs">
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
