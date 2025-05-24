
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Calendar, Users, Zap, ArrowRight } from 'lucide-react';

interface LingoTabProps {
  caseStudy: any;
}

const LingoTab = ({ caseStudy }: LingoTabProps) => {
  // Sample data structure - in a real app this would come from the caseStudy prop
  const lingoData = {
    primaryTerm: caseStudy.lingo || "Financial Infrastructure",
    evolution: [
      {
        year: "2010",
        term: "Payment Processing",
        description: "Started as a simple payment API",
        adoption: "Developer community"
      },
      {
        year: "2016",
        term: "Payment Platform",
        description: "Expanded beyond basic processing",
        adoption: "Small businesses"
      },
      {
        year: "2018",
        term: "Financial Infrastructure",
        description: "Strategic repositioning as essential infrastructure",
        adoption: "Enterprise market"
      },
      {
        year: "2021",
        term: "Economic Infrastructure",
        description: "Broadened to entire economy narrative",
        adoption: "Global markets"
      }
    ],
    relatedTerms: [
      { term: "Developer-first", impact: "High", category: "Product" },
      { term: "Internet economy", impact: "Medium", category: "Market" },
      { term: "Programmable payments", impact: "High", category: "Technology" },
      { term: "Revenue acceleration", impact: "Medium", category: "Business" }
    ],
    marketImpact: {
      competitorResponse: "Forced competitors to adopt 'infrastructure' language",
      valuation: "Enabled SaaS multiples instead of fintech multiples",
      talentAttraction: "Attracted engineering talent with 'infrastructure' positioning"
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-green-100 text-green-800 border-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Primary Lingo Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-teal-500" />
            Core Lingo: "{lingoData.primaryTerm}"
          </CardTitle>
          <CardDescription>
            The strategic language that transformed {caseStudy.company} from a payment processor to essential infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-teal-50 rounded-lg border border-teal-100">
              <TrendingUp className="h-8 w-8 text-teal-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">Market Position</h4>
              <p className="text-sm text-gray-600 mt-1">Infrastructure provider vs. payment processor</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
              <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">Audience Shift</h4>
              <p className="text-sm text-gray-600 mt-1">From developers to C-suite executives</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
              <Calendar className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">Timeline</h4>
              <p className="text-sm text-gray-600 mt-1">8-year evolution to market dominance</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Evolution Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Language Evolution Timeline</CardTitle>
          <CardDescription>
            How {caseStudy.company}'s strategic language evolved to capture larger market opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lingoData.evolution.map((phase, index) => (
              <div key={phase.year} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center font-semibold">
                    {phase.year.slice(-2)}
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-lg text-gray-900">"{phase.term}"</h4>
                  <p className="text-gray-600 mt-1">{phase.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      Adopted by: {phase.adoption}
                    </Badge>
                  </div>
                </div>
                {index < lingoData.evolution.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-gray-400 mt-4" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Related Terms */}
      <Card>
        <CardHeader>
          <CardTitle>Related Strategic Terms</CardTitle>
          <CardDescription>
            Supporting language that reinforces the core narrative positioning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lingoData.relatedTerms.map((term, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">"{term.term}"</h4>
                  <p className="text-sm text-gray-500">{term.category}</p>
                </div>
                <Badge className={getImpactColor(term.impact)}>
                  {term.impact} Impact
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Impact */}
      <Card>
        <CardHeader>
          <CardTitle>Lingo Market Impact</CardTitle>
          <CardDescription>
            How strategic language positioning drove measurable business outcomes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Competitive Response</h4>
              <p className="text-green-800">{lingoData.marketImpact.competitorResponse}</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Valuation Impact</h4>
              <p className="text-blue-800">{lingoData.marketImpact.valuation}</p>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Talent Attraction</h4>
              <p className="text-purple-800">{lingoData.marketImpact.talentAttraction}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* LingoLab Value Proposition */}
      <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
        <CardHeader>
          <CardTitle className="text-teal-900">LingoLab Insight</CardTitle>
          <CardDescription className="text-teal-700">
            How monitoring strategic language evolution predicts startup success
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-teal-800 leading-relaxed">
            {caseStudy.company}'s evolution from "payment processing" to "financial infrastructure" demonstrates 
            how strategic language choices can expand addressable markets and justify premium valuations. 
            LingoLab helps founders and investors identify and track these linguistic signals that often 
            precede breakthrough growth and market repositioning.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LingoTab;
