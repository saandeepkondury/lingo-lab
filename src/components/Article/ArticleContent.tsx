
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Target, Lightbulb, Rocket } from 'lucide-react';

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

      {/* Key Metrics */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Market Impact
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                {narrative.keyMetrics.revenue}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Annual Revenue
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {narrative.keyMetrics.customers}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Businesses Served
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {narrative.keyMetrics.countries}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Global Presence
              </div>
            </CardContent>
          </Card>
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
