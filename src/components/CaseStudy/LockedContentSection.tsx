
import { useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';

interface LockedContentSectionProps {
  narrative: any;
}

const LockedContentSection = ({ narrative }: LockedContentSectionProps) => {
  const { isLoggedIn } = useAuth();
  const { subscribed } = useSubscription();
  const [showPreview, setShowPreview] = useState(false);

  const hasAccess = isLoggedIn && subscribed;

  const commonLingoItems = [
    "Infrastructure-first thinking",
    "Developer experience priority", 
    "Economic primitives",
    "Platform ecosystem approach",
    "API-driven growth",
    "Financial rails metaphor"
  ];

  const marketImpactData = [
    { metric: "Market valuation", value: "$95B+" },
    { metric: "Businesses served", value: "4M+" },
    { metric: "Countries", value: "120+" },
    { metric: "Transaction volume", value: "$640B+" },
    { metric: "Developer ecosystem", value: "500K+" }
  ];

  const similarCompanies = [
    "Plaid - Financial data infrastructure",
    "Twilio - Communications infrastructure", 
    "Auth0 - Identity infrastructure"
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container max-w-4xl mx-auto px-6">
        {/* Common Lingo Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Common Lingo</h2>
          
          {!hasAccess && (
            <div className="relative">
              <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                <Card className="max-w-md mx-auto text-center">
                  <CardContent className="p-6">
                    <Lock className="h-12 w-12 mx-auto mb-4 text-teal-500" />
                    <h3 className="text-xl font-bold mb-3">Unlock to Continue</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Get access to strategic patterns, market impact analysis, and similar companies
                    </p>
                    <Button 
                      className="bg-teal-500 hover:bg-teal-600 text-white px-6"
                      onClick={() => window.location.href = '/pricing'}
                    >
                      View Pricing Plans
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className={!hasAccess ? "filter blur-sm" : ""}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                  {commonLingoItems.map((item, index) => (
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

          {hasAccess && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {commonLingoItems.map((item, index) => (
                <Badge 
                  key={index} 
                  className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 p-3 text-center justify-center"
                >
                  {item}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Market/Impact Created Section */}
        <div className="mb-12">
          <div className={!hasAccess ? "filter blur-sm pointer-events-none" : ""}>
            <Card>
              <CardHeader>
                <CardTitle>Market / Impact Created</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {marketImpactData.map((item, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
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
          <div className={!hasAccess ? "filter blur-sm pointer-events-none" : ""}>
            <Card>
              <CardHeader>
                <CardTitle>Businesses That Will Benefit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-300">• E-commerce platforms looking to streamline payments</p>
                  <p className="text-gray-700 dark:text-gray-300">• SaaS companies needing subscription billing infrastructure</p>
                  <p className="text-gray-700 dark:text-gray-300">• Marketplace businesses requiring complex payment flows</p>
                  <p className="text-gray-700 dark:text-gray-300">• Fintech startups building on reliable payment rails</p>
                  <p className="text-gray-700 dark:text-gray-300">• Enterprise companies modernizing payment systems</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Companies Section */}
        <div>
          <div className={!hasAccess ? "filter blur-sm pointer-events-none" : ""}>
            <Card>
              <CardHeader>
                <CardTitle>Similar Companies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {similarCompanies.map((company, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">{index + 1}</span>
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
