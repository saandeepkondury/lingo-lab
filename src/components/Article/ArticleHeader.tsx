
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, DollarSign } from 'lucide-react';

interface ArticleHeaderProps {
  narrative: any;
}

const ArticleHeader = ({ narrative }: ArticleHeaderProps) => {
  return (
    <header className="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container max-w-4xl mx-auto px-6 py-16">
        {/* Funding Badge */}
        <div className="mb-6">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-700">
            <DollarSign className="h-3 w-3 mr-1" />
            {narrative.fundingRaised} raised • {narrative.valuation} valuation
          </Badge>
        </div>
        
        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          How {narrative.company} is Reshaping {narrative.industry}
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          {narrative.founderName}, {narrative.founderTitle}, shares their strategic vision 
          for transforming the market and building the future of {narrative.industry.toLowerCase()}.
        </p>
        
        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {narrative.publishDate}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {narrative.readTime}
          </div>
          <Badge variant="outline" className="border-gray-300 dark:border-gray-600">
            {narrative.industry}
          </Badge>
        </div>
        
        {/* Founder Attribution */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
              {narrative.founderName.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {narrative.founderName}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {narrative.founderTitle}, {narrative.company}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ArticleHeader;
