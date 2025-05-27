
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Quote, ArrowRight, Lightbulb, Users } from 'lucide-react';

interface LingoDropsSectionProps {
  narrative: any;
}

const LingoDropsSection = ({ narrative }: LingoDropsSectionProps) => {
  const lingoDrop = {
    term: narrative.keyPhrase,
    founder: narrative.founderName,
    company: narrative.company,
    whatTheySaid: `"${narrative.founderInsight}"`,
    whyItWorked: narrative.competitiveAdvantage,
    evolution: {
      before: narrative.marketBefore,
      after: narrative.marketTransformation
    },
    marketResponse: {
      adoption: "Industry-wide adoption within 18 months",
      competitorShift: "Forced competitors to reframe their positioning",
      talentAttraction: "Attracted top engineering talent with infrastructure vision"
    }
  };

  return (
    <section className="py-12 bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Lightbulb className="h-4 w-4" />
            Lingo Drop
          </div>
          <h2 className="text-3xl font-bold mb-4">
            "{lingoDrop.term}"
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            How {lingoDrop.founder} coined a term that reshaped {narrative.industry} and created a new market category
          </p>
        </div>

        {/* What They Said */}
        <Card className="mb-8 border-l-4 border-l-indigo-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Quote className="h-5 w-5 text-indigo-500" />
              What {lingoDrop.founder} Said
            </CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 leading-relaxed">
              {lingoDrop.whatTheySaid}
            </blockquote>
            <footer className="mt-4 text-sm text-muted-foreground">
              — {lingoDrop.founder}, {narrative.founderTitle} at {lingoDrop.company}
            </footer>
          </CardContent>
        </Card>

        {/* Before vs After */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
            <CardHeader>
              <CardTitle className="text-red-700 dark:text-red-300">Before: Market Perception</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-800 dark:text-red-200 leading-relaxed">
                {lingoDrop.evolution.before}
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-700 dark:text-green-300">After: New Reality</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-800 dark:text-green-200 leading-relaxed">
                {lingoDrop.evolution.after}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Why It Worked */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-teal-500" />
              Why This Lingo Drop Worked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed mb-6">
              {lingoDrop.whyItWorked}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-teal-50 rounded-lg border border-teal-100 dark:bg-teal-900/20 dark:border-teal-800">
                <Users className="h-8 w-8 text-teal-500 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Market Adoption</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{lingoDrop.marketResponse.adoption}</p>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800">
                <ArrowRight className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Competitor Response</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{lingoDrop.marketResponse.competitorShift}</p>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100 dark:bg-purple-900/20 dark:border-purple-800">
                <Lightbulb className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Talent Impact</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{lingoDrop.marketResponse.talentAttraction}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Founder Ownership Banner */}
        <Card className="bg-gradient-to-r from-indigo-600 to-teal-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              {lingoDrop.founder} Created This Market Language
            </h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              This narrative didn't exist before {lingoDrop.company}. {lingoDrop.founder} identified a gap in market understanding and coined the exact language that the industry needed to embrace a new category.
            </p>
            <div className="flex justify-center gap-2 mt-6">
              <Badge variant="secondary" className="bg-white/20 text-white">
                First Mover Advantage
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                Category Creator
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                Market Definer
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LingoDropsSection;
