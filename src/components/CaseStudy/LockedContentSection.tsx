
import { useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useCaseStudyAccess } from '@/hooks/useCaseStudyAccess';

interface LockedContentSectionProps {
  narrative: any;
  hasAccess?: (caseStudyId: string) => Promise<boolean>;
}

const LockedContentSection = ({ narrative, hasAccess }: LockedContentSectionProps) => {
  const { isLoggedIn } = useAuth();
  const { isBasicUser, isProUser, accessCount } = useCaseStudyAccess();
  const [userHasAccess, setUserHasAccess] = useState(false);

  // Check access when component mounts
  React.useEffect(() => {
    if (hasAccess && narrative.slug) {
      hasAccess(narrative.slug).then(setUserHasAccess);
    }
  }, [hasAccess, narrative.slug]);

  const shouldShowContent = isLoggedIn && (isProUser || userHasAccess);

  const commonLingoItems = narrative.common_lingo || [
    "Infrastructure-first thinking",
    "Developer experience priority", 
    "Economic primitives",
    "Platform ecosystem approach",
    "API-driven growth",
    "Financial rails metaphor"
  ];

  const marketImpactData = [
    { metric: "Market valuation", value: narrative.metrics?.impact?.valuation || "$95B+" },
    { metric: "Businesses served", value: narrative.metrics?.impact?.businesses_served || "4M+" },
    { metric: "Countries", value: narrative.metrics?.impact?.countries || "120+" },
    { metric: "Transaction volume", value: narrative.metrics?.impact?.transaction_volume || "$640B+" },
    { metric: "Developer ecosystem", value: narrative.metrics?.impact?.developer_ecosystem || "500K+" }
  ];

  const businessesBenefit = narrative.businesses_benefit || [
    "E-commerce platforms looking to streamline payments",
    "SaaS companies needing subscription billing infrastructure",
    "Marketplace businesses requiring complex payment flows",
    "Fintech startups building on reliable payment rails",
    "Enterprise companies modernizing payment systems"
  ];

  const similarCompanies = narrative.similar_companies || [
    "Plaid - Financial data infrastructure",
    "Twilio - Communications infrastructure", 
    "Auth0 - Identity infrastructure"
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container max-w-4xl mx-auto px-6">
        {/* Common Lingo Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Common Lingo</h2>
          
          {!shouldShowContent && (
            <div className="relative">
              <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                <Card className="max-w-md mx-auto text-center shadow-xl">
                  <CardContent className="p-6">
                    <Lock className="h-12 w-12 mx-auto mb-4 text-teal-500" />
                    <h3 className="text-xl font-bold mb-3">Unlock Premium Content</h3>
                    {!isLoggedIn ? (
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Sign in to access strategic patterns, market analysis, and exclusive insights
                      </p>
                    ) : isBasicUser ? (
                      <div className="mb-6">
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          You've used {accessCount}/10 case studies this month
                        </p>
                        <p className="text-sm text-gray-500">
                          Upgrade to Pro for unlimited access
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Get access to strategic patterns, market impact analysis, and similar companies
                      </p>
                    )}
                    <Button 
                      className="bg-teal-500 hover:bg-teal-600 text-white px-6"
                      onClick={() => window.location.href = isLoggedIn ? '/pricing' : '/join'}
                    >
                      {isLoggedIn ? 'Upgrade Plan' : 'Sign In'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="filter blur-sm">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                  {commonLingoItems.slice(0, 6).map((item, index) => (
                    <Badge 
                      key={index} 
                      className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 p-3 text-center justify-center"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {shouldShowContent && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {commonLingoItems.map((item, index) => (
                <Badge 
                  key={index} 
                  className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 p-3 text-center justify-center hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                >
                  {item}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Market/Impact Created Section */}
        <div className="mb-12">
          <div className={!shouldShowContent ? "filter blur-sm pointer-events-none" : ""}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Market / Impact Created</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {marketImpactData.map((item, index) => (
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
        </div>

        {/* Businesses That Will Benefit Section */}
        <div className="mb-12">
          <div className={!shouldShowContent ? "filter blur-sm pointer-events-none" : ""}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Businesses That Will Benefit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {businessesBenefit.map((benefit, index) => (
                    <p key={index} className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      {benefit}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Companies Section */}
        <div>
          <div className={!shouldShowContent ? "filter blur-sm pointer-events-none" : ""}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Similar Companies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {similarCompanies.map((company, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-white">{index + 1}</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{company}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockedContentSection;
