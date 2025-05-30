
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Eye, TrendingUp, Building2 } from 'lucide-react';

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
  viewCount = Math.floor(Math.random() * 50000) + 5000, // Ensure never 0
  marketThemes = [],
  strategicPatterns = []
}: CaseStudyCardProps) => {
  const cardContent = (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 h-full flex flex-col hover:-translate-y-1 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      
      {/* Header with company and funding */}
      <div className="relative z-10 flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-blue-100 dark:from-teal-900 dark:to-blue-900 rounded-xl flex items-center justify-center">
            <Building2 className="h-6 w-6 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            {disableLinks ? (
              <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-teal-600 transition-colors">
                {companyName}
              </span>
            ) : (
              <Link 
                to={`/case-studies/${id}`} 
                className="text-xl font-bold text-gray-900 dark:text-white hover:text-teal-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {companyName}
              </Link>
            )}
          </div>
        </div>
        {fundingRaised && (
          <div className="flex items-center gap-1 text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-full">
            <TrendingUp className="h-3 w-3" />
            {fundingRaised}
          </div>
        )}
      </div>
      
      {/* Title (Lingo) */}
      <h3 className="relative z-10 text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 line-clamp-2 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
        "{lingo}"
      </h3>
      
      {/* Impact description */}
      <p className="relative z-10 text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow leading-relaxed">
        {impact}
      </p>

      {/* View count with enhanced styling */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-lg">
          <Eye className="h-3 w-3" />
          <span className="font-medium">
            Viewed by {viewCount.toLocaleString()} founders
          </span>
        </div>
      </div>
      
      {/* Enhanced tags with better spacing and colors */}
      <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
        <Badge variant="outline" className="bg-gradient-to-r from-teal-50 to-teal-100 text-teal-700 hover:from-teal-100 hover:to-teal-200 border-teal-200 text-xs px-3 py-1 font-medium">
          {narrativeType}
        </Badge>
        <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 hover:from-blue-100 hover:to-blue-200 border-blue-200 text-xs px-3 py-1 font-medium">
          {industry}
        </Badge>
        {marketThemes.slice(0, 1).map((theme, index) => (
          <Badge key={index} variant="outline" className="bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 hover:from-purple-100 hover:to-purple-200 border-purple-200 text-xs px-3 py-1 font-medium">
            {theme}
          </Badge>
        ))}
        {strategicPatterns.slice(0, 1).map((pattern, index) => (
          <Badge key={index} variant="outline" className="bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 hover:from-orange-100 hover:to-orange-200 border-orange-200 text-xs px-3 py-1 font-medium">
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
    <Link to={`/case-studies/${id}`} className="block h-full">
      {cardContent}
    </Link>
  );
};

export default memo(CaseStudyCard);
