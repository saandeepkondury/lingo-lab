
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Users, Lightbulb, Crown } from 'lucide-react';

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
    { 
      metric: "Valuation Growth", 
      value: narrative.metrics?.impact?.valuation || "$95B+",
      icon: TrendingUp,
      color: "text-green-600"
    },
    { 
      metric: "Market Share", 
      value: narrative.metrics?.impact?.market_share || "15%",
      icon: Target,
      color: "text-blue-600"
    },
    { 
      metric: "Customer Base", 
      value: narrative.metrics?.impact?.customers || "500K+",
      icon: Users,
      color: "text-purple-600"
    },
    { 
      metric: "Revenue ARR", 
      value: narrative.metrics?.impact?.arr || "$12B+",
      icon: Crown,
      color: "text-teal-600"
    },
    { 
      metric: "Global Reach", 
      value: narrative.metrics?.impact?.countries || "120+ countries",
      icon: Target,
      color: "text-orange-600"
    }
  ];

  const marketsImpacted = narrative.businesses_benefit || [
    "E-commerce platforms seeking streamlined payment infrastructure and growth acceleration",
    "SaaS companies requiring sophisticated subscription billing and customer retention models",
    "Marketplace businesses with complex multi-party transactions and revenue optimization",
    "Fintech startups building on established payment rails for competitive advantage",
    "Enterprise companies modernizing legacy financial systems for digital transformation"
  ];

  const keyInsight = narrative.founder_insight || 
    "The breakthrough insight was recognizing that payments weren't just a feature—they were the economic infrastructure of the internet. By positioning as the foundation rather than a tool, Stripe expanded from a payment processor to the backbone of the digital economy, creating unprecedented platform value.";

  const strategicNarrativeInfluences = [
    {
      title: "Developer-First Market Positioning",
      description: "Revolutionized B2B sales by targeting builders instead of buyers"
    },
    {
      title: "Infrastructure Metaphor Adoption", 
      description: "Shifted perception from service provider to foundational platform"
    },
    {
      title: "API Economy Evangelism",
      description: "Created new market category around programmable business tools"
    },
    {
      title: "Economic Primitive Framing",
      description: "Positioned products as fundamental building blocks of commerce"
    },
    {
      title: "Platform Ecosystem Thinking",
      description: "Built network effects through developer community and partnerships"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-teal-950 py-16">
      <div className="container max-w-4xl mx-auto px-6">
        {/* Strategic Lingo Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Crown className="h-8 w-8 text-teal-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Strategic Language That Scales
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Key terminology and concepts that accelerated business growth and investor confidence
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {strategicLingo.map((item, index) => (
              <Badge 
                key={index} 
                className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-200 p-4 text-center justify-center hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-800/50 dark:hover:to-pink-800/50 transition-all duration-300 font-medium border border-purple-200/50"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>

        {/* Business Statistics Section */}
        <div className="mb-16">
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
            <CardHeader className="text-center pb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <TrendingUp className="h-6 w-6 text-teal-600" />
                <span className="text-sm font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                  VC Metrics
                </span>
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Strategic Business Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                {businessStats.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="text-center p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-transform duration-300">
                      <IconComponent className={`h-6 w-6 ${item.color} mx-auto mb-3`} />
                      <div className={`text-2xl font-bold ${item.color} mb-2`}>
                        {item.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {item.metric}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Markets Impacted Section */}
        <div className="mb-16">
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Target className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  Market Expansion
                </span>
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Markets Impacted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketsImpacted.map((market, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200/50 dark:border-blue-700/30">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold text-white">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {market}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Insight Section */}
        <div className="mb-16">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 backdrop-blur-lg">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Lightbulb className="h-6 w-6 text-yellow-600" />
                <span className="text-sm font-semibold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                  Founder Insight
                </span>
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Key Strategic Breakthrough
              </CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic text-center border-l-4 border-teal-500 pl-6 bg-white/50 dark:bg-gray-800/50 p-6 rounded-lg">
                {keyInsight}
              </blockquote>
            </CardContent>
          </Card>
        </div>

        {/* Strategic Narrative Influences */}
        <div>
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Crown className="h-6 w-6 text-purple-600" />
                <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  Strategic Framework
                </span>
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Strategic Narrative Influences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strategicNarrativeInfluences.map((influence, index) => (
                  <div key={index} className="group p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/30 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-800/30 dark:hover:to-pink-800/30 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-white">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {influence.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {influence.description}
                        </p>
                      </div>
                    </div>
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
