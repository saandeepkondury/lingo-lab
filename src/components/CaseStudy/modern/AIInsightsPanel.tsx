
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Lightbulb, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface AIInsightsPanelProps {
  caseStudy: any;
}

const AIInsightsPanel = ({ caseStudy }: AIInsightsPanelProps) => {
  const aiInsights = {
    keyTakeaways: [
      "Positioning as 'infrastructure' rather than 'service' expanded TAM by 10x",
      "Developer-first approach created network effects and viral adoption",
      "Strategic language evolution preceded each funding round by 6-12 months"
    ],
    marketSignals: [
      {
        type: "strong",
        signal: "Infrastructure narrative adopted by 3+ competitors within 18 months",
        impact: "Market validation"
      },
      {
        type: "medium",
        signal: "Executive team consistently uses terminology in all communications",
        impact: "Internal alignment"
      },
      {
        type: "strong",
        signal: "Customer language shift: 'payment processor' → 'infrastructure partner'",
        impact: "Market repositioning success"
      }
    ],
    predictiveInsights: [
      "Companies using 'infrastructure' narrative 3x more likely to achieve unicorn status",
      "Average 18-month lag between narrative pivot and valuation impact",
      "85% of successful repositioning stories include developer community adoption"
    ],
    nextMoves: [
      "Monitor competitor response to narrative positioning",
      "Track customer language adoption in testimonials and case studies",
      "Identify emerging narratives in adjacent markets for early positioning"
    ]
  };

  return (
    <div className="space-y-6">
      {/* AI Key Takeaways */}
      <Card className="border-l-4 border-l-teal-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-teal-500" />
            AI-Generated Key Takeaways
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiInsights.keyTakeaways.map((takeaway, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">{takeaway}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Signals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-teal-500" />
            Market Signals Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.marketSignals.map((signal, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <Badge 
                    className={
                      signal.type === 'strong' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }
                  >
                    {signal.type === 'strong' ? 'Strong Signal' : 'Medium Signal'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{signal.signal}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{signal.impact}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Predictive Insights */}
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-purple-500" />
            Predictive Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiInsights.predictiveInsights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <AlertCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700 dark:text-gray-300">{insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strategic Next Moves */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-teal-500" />
            Strategic Next Moves
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiInsights.nextMoves.map((move, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="w-6 h-6 bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{move}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsightsPanel;
