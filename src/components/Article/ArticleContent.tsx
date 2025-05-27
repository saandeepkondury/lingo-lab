
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Lightbulb, Rocket, BarChart3, Clock, Zap, MapPin } from 'lucide-react';

interface ArticleContentProps {
  narrative: any;
}

const ArticleContent = ({ narrative }: ArticleContentProps) => {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* Introduction */}
      <div className="mb-12">
        <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
          In a world where {narrative.industry.toLowerCase()} is rapidly evolving, {narrative.company} stands 
          at the forefront of transformation. {narrative.founderName} shares the strategic vision 
          that's driving their mission to reshape how we think about {narrative.industry.toLowerCase()}.
        </p>
      </div>

      {/* Market Intelligence Tags */}
      <section className="mb-12">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Market Intelligence</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Market Themes</div>
              <div className="flex flex-wrap gap-2">
                {narrative.marketThemes.map((theme: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {theme}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Strategic Patterns</div>
              <div className="flex flex-wrap gap-2">
                {narrative.strategicPatterns.map((pattern: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    {pattern}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Transformation Type</div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {narrative.transformationType}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Market Before Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
            <TrendingUp className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">
            The Market Before {narrative.company}
          </h2>
        </div>
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed m-0">
              {narrative.marketBefore}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Founder Insight Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">
            The Breakthrough Insight
          </h2>
        </div>
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed m-0">
              {narrative.founderInsight}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Market Landscape Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">
            Market Landscape
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Market Position</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Before:</span>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">{narrative.marketLandscape.beforeStipe}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">{narrative.company}'s Position:</span>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">{narrative.marketLandscape.stripePosition}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Industry Response</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Competitive Response:</span>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">{narrative.marketLandscape.competitiveResponse}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Future State:</span>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">{narrative.marketLandscape.futureState}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Market Transformation Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">
            Transforming the Market
          </h2>
        </div>
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed m-0">
              {narrative.marketTransformation}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Strategic Vision Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <Rocket className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">
            The Strategic Vision
          </h2>
        </div>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed m-0">
              {narrative.strategicVision}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Universal Metrics Framework */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Scale & Impact Metrics
        </h2>
        <div className="grid gap-6">
          {/* Scale Achieved */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="h-5 w-5 text-teal-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Scale Achieved</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-1">
                    {narrative.scaleAchieved.revenue}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Annual Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {narrative.scaleAchieved.users}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Businesses Served</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                    {narrative.scaleAchieved.geographicReach}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Global Reach</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                    {narrative.scaleAchieved.marketShare}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Market Position</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Speed to Market */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-5 w-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Speed to Market</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Category Definition</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">{narrative.speedToMarket.categoryDefinition}</div>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Market Leadership</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">{narrative.speedToMarket.marketLeadership}</div>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Global Expansion</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">{narrative.speedToMarket.globalExpansion}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Narrative Adoption */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-5 w-5 text-indigo-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Narrative Adoption</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Industry Standard</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">{narrative.narrativeAdoption.industryStandard}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Competitive Response</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">{narrative.narrativeAdoption.competitorResponse}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Market Education</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">{narrative.narrativeAdoption.marketEducation}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Strategic Insights */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Strategic Insights for Founders
        </h2>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
          <div className="space-y-4">
            {narrative.strategicInsights.map((insight: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Narrative */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Redefining the Competitive Landscape
        </h2>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed m-0">
            {narrative.competitiveNarrative}
          </p>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900 p-8 rounded-xl border">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          The Narrative That Drives Success
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed m-0">
          {narrative.company}'s success isn't just about building great products—it's about 
          articulating a compelling vision of the future and consistently executing against that narrative. 
          As {narrative.founderName} demonstrates, the most successful companies don't just participate 
          in their markets; they fundamentally reshape how those markets think about themselves.
        </p>
      </section>
    </div>
  );
};

export default ArticleContent;
