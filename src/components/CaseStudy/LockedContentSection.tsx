
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LockedContentSectionProps {
  narrative: any;
  hasAccess?: (caseStudyId: string) => Promise<boolean>;
}

const LockedContentSection = ({ narrative }: LockedContentSectionProps) => {
  const strategicLingo = narrative.common_lingo || [
    "Infrastructure-first thinking",
    "Developer experience priority", 
    "Economic primitives",
    "Platform ecosystem approach",
    "API-driven growth",
    "Financial rails metaphor"
  ];

  const businessStats = [
    { metric: "Market valuation", value: narrative.metrics?.impact?.valuation || "$95B+" },
    { metric: "Transaction volume", value: narrative.metrics?.impact?.transaction_volume || "$640B+" },
    { metric: "Developer ecosystem", value: narrative.metrics?.impact?.developer_ecosystem || "500K+" },
    { metric: "Global reach", value: narrative.metrics?.impact?.countries || "120+ countries" },
    { metric: "Market share", value: narrative.metrics?.impact?.market_share || "15% of online payments" }
  ];

  const marketsImpacted = narrative.businesses_benefit || [
    "E-commerce platforms seeking streamlined payment infrastructure",
    "SaaS companies requiring sophisticated subscription billing",
    "Marketplace businesses with complex multi-party transactions",
    "Fintech startups building on established payment rails",
    "Enterprise companies modernizing legacy financial systems"
  ];

  const keyInsight = narrative.founder_insight || 
    "The key insight was recognizing that payments weren't just a feature—they were infrastructure. By positioning as the 'economic infrastructure of the internet,' Stripe expanded from a payment processor to the foundation of the digital economy.";

  const strategicNarrativeInfluences = [
    "Developer-first positioning",
    "Infrastructure metaphor adoption",
    "API economy evangelism", 
    "Economic primitive framing",
    "Platform ecosystem thinking"
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container max-w-4xl mx-auto px-6">
        {/* Strategic Lingo Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Spread of Strategic Lingo</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Key terminology and concepts that will accelerate business growth</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {strategicLingo.map((item, index) => (
              <Badge 
                key={index} 
                className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 p-3 text-center justify-center hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>

        {/* Business Statistics Section */}
        <div className="mb-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Strategic Business Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {businessStats.map((item, index) => (
                  <div key={index} className="text-center p-4 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-lg border">
                    <div className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-1">
                      {item.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {item.metric}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Markets Impacted Section */}
        <div className="mb-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Markets Impacted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {marketsImpacted.map((market, index) => (
                  <p key={index} className="text-gray-700 dark:text-gray-300 flex items-start">
                    <span className="text-teal-500 mr-2">•</span>
                    {market}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Insight Section */}
        <div className="mb-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Key Strategic Insight</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {keyInsight}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Strategic Narrative Influences */}
        <div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Strategic Narrative Influences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {strategicNarrativeInfluences.map((influence, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{index + 1}</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{influence}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LockedContentSection;
