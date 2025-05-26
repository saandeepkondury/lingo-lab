
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket, Target, DollarSign, Users, Zap, TrendingUp } from 'lucide-react';

interface VentureScaleInsightsProps {
  caseStudy: any;
}

const VentureScaleInsights = ({ caseStudy }: VentureScaleInsightsProps) => {
  const scalingFactors = [
    {
      factor: "Market Size Expansion",
      description: "Repositioning from payments ($50B) to financial infrastructure ($1.3T+)",
      impact: "26x TAM increase",
      score: 95,
      icon: Target
    },
    {
      factor: "Network Effects",
      description: "Developer adoption creates viral growth through integrations",
      impact: "Exponential user growth",
      score: 90,
      icon: Users
    },
    {
      factor: "Recurring Revenue",
      description: "Transaction-based model with high customer retention",
      impact: "Predictable cash flow",
      score: 85,
      icon: DollarSign
    },
    {
      factor: "Barrier to Exit",
      description: "Deep integration makes switching costs prohibitively high",
      impact: "Customer lock-in",
      score: 88,
      icon: Zap
    }
  ];

  const vcPerspective = {
    investmentThesis: "Infrastructure plays with network effects and high switching costs",
    riskFactors: ["Regulatory changes", "Competition from incumbents", "Economic downturn impact"],
    returnPotential: "10-100x returns through market category creation",
    timeHorizon: "7-10 years for full value realization"
  };

  const entrepreneurLessons = [
    "Language positioning precedes market positioning",
    "Developer community can be more valuable than traditional marketing",
    "Infrastructure narrative justifies premium valuations",
    "Timing narrative shifts with funding rounds maximizes impact"
  ];

  return (
    <div className="space-y-8">
      {/* Venture Scale Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-teal-500" />
            Venture Scale Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {scalingFactors.map((factor, index) => {
              const IconComponent = factor.icon;
              return (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded-lg">
                        <IconComponent className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{factor.factor}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{factor.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">{factor.score}</div>
                      <div className="text-xs text-gray-500">Scale Score</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">{factor.impact}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* VC Perspective */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardHeader>
            <CardTitle className="text-blue-700 dark:text-blue-300">VC Investment Perspective</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Investment Thesis</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">{vcPerspective.investmentThesis}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Return Potential</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">{vcPerspective.returnPotential}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Risk Factors</h4>
              <div className="space-y-1">
                {vcPerspective.riskFactors.map((risk, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {risk}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardHeader>
            <CardTitle className="text-purple-700 dark:text-purple-300">Entrepreneur Lessons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {entrepreneurLessons.map((lesson, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{lesson}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VentureScaleInsights;
