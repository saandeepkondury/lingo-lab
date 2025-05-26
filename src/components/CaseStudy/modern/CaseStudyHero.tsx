
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, DollarSign, Calendar, Sparkles } from 'lucide-react';

interface CaseStudyHeroProps {
  caseStudy: any;
}

const CaseStudyHero = ({ caseStudy }: CaseStudyHeroProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900/20 border-b">
      <div className="absolute inset-0 bg-grid-gray-100/50 dark:bg-grid-gray-800/50" />
      <div className="relative container max-w-6xl mx-auto px-6 py-12">
        {/* AI Badge */}
        <div className="flex items-center gap-2 mb-6">
          <Badge className="bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-700">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Generated Insights
          </Badge>
          <Badge variant="outline">{caseStudy.narrativeType}</Badge>
          <Badge variant="outline">{caseStudy.industry}</Badge>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
              {caseStudy.company}
            </h1>
            <div className="text-2xl lg:text-3xl font-semibold text-teal-600 dark:text-teal-400 mb-4">
              "{caseStudy.lingo}"
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {caseStudy.tagline}
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <DollarSign className="h-4 w-4" />
                {caseStudy.overview.outcome}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <TrendingUp className="h-4 w-4" />
                {caseStudy.overview.revenue}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Users className="h-4 w-4" />
                {caseStudy.overview.employees}
              </div>
            </div>
          </div>

          {/* Impact Card */}
          <div className="lg:col-span-1">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Market Impact</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Stage</div>
                    <div className="font-medium">{caseStudy.overview.stage}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Industry</div>
                    <div className="font-medium">{caseStudy.overview.industry}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Key Innovation</div>
                    <div className="font-medium">{caseStudy.overview.keyPhrase}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyHero;
