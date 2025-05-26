
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Building2, Target, Zap } from 'lucide-react';

interface MarketNarrativeSectionProps {
  industry: string;
  currentCompany: string;
}

const MarketNarrativeSection = ({ industry, currentCompany }: MarketNarrativeSectionProps) => {
  // This would come from Supabase in the real implementation
  const marketCompanies = [
    {
      company: "Stripe",
      narrative: "Financial Infrastructure",
      approach: "Developer-first payment processing",
      valuation: "$95B",
      stage: "Late Growth",
      differentiator: "API simplicity + global scale"
    },
    {
      company: "Plaid",
      narrative: "Financial Connectivity",
      approach: "Bank account linking for apps",
      valuation: "$13.4B",
      stage: "Growth",
      differentiator: "Universal banking API"
    },
    {
      company: "Square",
      narrative: "Economic Empowerment",
      approach: "SMB-focused payment ecosystem",
      valuation: "$120B",
      stage: "Public",
      differentiator: "Hardware + software integration"
    },
    {
      company: "Adyen",
      narrative: "Unified Commerce",
      approach: "Enterprise payment platform",
      valuation: "$50B",
      stage: "Public",
      differentiator: "Single platform, global reach"
    }
  ];

  const narrativeFrequency = [
    { narrative: "Infrastructure", count: 12, percentage: 35 },
    { narrative: "Platform", count: 8, percentage: 24 },
    { narrative: "Ecosystem", count: 6, percentage: 18 },
    { narrative: "Connectivity", count: 5, percentage: 15 },
    { narrative: "Empowerment", count: 3, percentage: 8 }
  ];

  return (
    <div className="space-y-8">
      {/* Market Narrative Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-teal-500" />
            Most Common Narratives in {industry}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {narrativeFrequency.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold">"{item.narrative}"</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {item.count} companies using this narrative
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">{item.percentage}%</div>
                  <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-teal-500 transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competitive Landscape */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-teal-500" />
            Market Players & Their Narratives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {marketCompanies.map((company, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                  company.company === currentCompany 
                    ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-700' 
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center font-semibold text-gray-700 dark:text-gray-300">
                      {company.company[0]}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {company.company}
                        {company.company === currentCompany && (
                          <Badge className="ml-2 bg-teal-500 text-white">Current</Badge>
                        )}
                      </h4>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{company.stage}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-white">{company.valuation}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-teal-500" />
                    <span className="font-medium text-teal-700 dark:text-teal-300">
                      "{company.narrative}"
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 ml-6">
                    {company.approach}
                  </div>
                  <div className="flex items-center gap-2 ml-6">
                    <Zap className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {company.differentiator}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketNarrativeSection;
