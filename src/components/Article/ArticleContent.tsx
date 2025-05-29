
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Clock, Zap } from 'lucide-react';

interface ArticleContentProps {
  narrative: any;
}

const ArticleContent = ({ narrative }: ArticleContentProps) => {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* Scale & Impact Metrics - Moved to top */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Scale & Impact Metrics
        </h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="h-5 w-5 text-teal-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Scale Achieved</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-1">
                  {narrative.metrics?.scale?.revenue || 'N/A'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Annual Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {narrative.metrics?.scale?.users || 'N/A'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Businesses Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  {narrative.metrics?.scale?.geographicReach || 'N/A'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Global Reach</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                  {narrative.metrics?.scale?.marketShare || 'N/A'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Market Position</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Market Intelligence Tags - Moved under scale metrics */}
      <section className="mb-12">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Market Intelligence</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Market Themes</div>
              <div className="flex flex-wrap gap-2">
                {(narrative.market_themes || []).map((theme: string, index: number) => 
                  <Badge key={index} variant="outline" className="text-xs">
                    {theme}
                  </Badge>
                )}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Strategic Patterns</div>
              <div className="flex flex-wrap gap-2">
                {(narrative.strategic_patterns || []).map((pattern: string, index: number) => 
                  <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    {pattern}
                  </Badge>
                )}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Transformation Type</div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {narrative.transformation_type || 'N/A'}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Closing section - Simplified */}
      <section className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900 p-8 rounded-xl border">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          The Narrative That Drives Success
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed m-0">
          {narrative.company}'s success isn't just about building great products—it's about 
          articulating a compelling vision of the future and consistently executing against that narrative. 
          As {narrative.founder_name} demonstrates, the most successful companies don't just participate 
          in their markets; they fundamentally reshape how those markets think about themselves.
        </p>
      </section>
    </div>
  );
};

export default ArticleContent;
