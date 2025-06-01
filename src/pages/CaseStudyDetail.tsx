
import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFounderNarratives } from '@/hooks/useFounderNarratives';
import { useAuth } from '@/context/AuthContext';
import CaseStudyDetailHeader from '@/components/CaseStudy/CaseStudyDetailHeader';
import CaseStudyTabs from '@/components/CaseStudy/CaseStudyTabs';
import CaseStudyAccessGate from '@/components/CaseStudy/CaseStudyAccessGate';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Target, TrendingUp, Lightbulb, Zap, BarChart3 } from 'lucide-react';

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { narratives, loading } = useFounderNarratives();
  const { isLoggedIn } = useAuth();
  const contentRef = useRef<HTMLDivElement>(null);

  const narrative = narratives.find(n => n.slug === slug);

  useEffect(() => {
    if (!loading && !narrative) {
      navigate('/case-studies');
    }
  }, [narrative, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!narrative) {
    return null;
  }

  // Parse business metrics safely
  const businessMetrics = narrative.business_metrics || {};
  const strategicLanguage = narrative.strategic_language || [];
  const marketsImpacted = narrative.markets_impacted || [];
  const strategicInfluences = narrative.strategic_influences || [];

  return (
    <CaseStudyAccessGate caseStudyId={slug || ''}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
        <CaseStudyDetailHeader narrative={narrative} slug={slug || ''} />
        
        {/* Main Content */}
        <div className="container max-w-6xl mx-auto px-6 py-12" ref={contentRef}>
          
          {/* Strategic Overview */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="h-6 w-6 text-teal-600" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Strategic Vision</h2>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {narrative.strategic_vision || narrative.tagline || "Strategic vision and market positioning approach."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="h-6 w-6 text-amber-600" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Key Strategic Breakthrough</h2>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {narrative.key_strategic_breakthrough || narrative.founder_insight || "The critical insight that differentiated this company in the market."}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Strategic Language */}
          {strategicLanguage.length > 0 && (
            <Card className="mb-12 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="h-6 w-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Strategic Language & Terms</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  The key terminology and language patterns that spread throughout the industry
                </p>
                <div className="flex flex-wrap gap-3">
                  {strategicLanguage.map((term, index) => (
                    <Badge key={index} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm">
                      {term}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Strategic Business Impact */}
          <Card className="mb-12 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Strategic Business Impact</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Key metrics and business outcomes from their strategic narrative approach
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businessMetrics.revenue_growth && (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-6 rounded-xl">
                    <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Revenue Growth</h4>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-200">{businessMetrics.revenue_growth}</p>
                  </div>
                )}
                {businessMetrics.user_growth && (
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 p-6 rounded-xl">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">User Growth</h4>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">{businessMetrics.user_growth}</p>
                  </div>
                )}
                {businessMetrics.valuation_change && (
                  <div className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 p-6 rounded-xl">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Valuation Impact</h4>
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-200">{businessMetrics.valuation_change}</p>
                  </div>
                )}
                {businessMetrics.market_share && (
                  <div className="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 p-6 rounded-xl">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">Market Share</h4>
                    <p className="text-2xl font-bold text-orange-900 dark:text-orange-200">{businessMetrics.market_share}</p>
                  </div>
                )}
                {businessMetrics.funding_rounds && (
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 p-6 rounded-xl">
                    <h4 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-2">Funding Success</h4>
                    <p className="text-2xl font-bold text-indigo-900 dark:text-indigo-200">{businessMetrics.funding_rounds}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Markets Impacted */}
          {marketsImpacted.length > 0 && (
            <Card className="mb-12 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="h-6 w-6 text-teal-600" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Markets Impacted</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Industries and business sectors directly transformed by this strategic narrative
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {marketsImpacted.map((market, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-lg">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">{market}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Strategic Narrative Influences */}
          {strategicInfluences.length > 0 && (
            <Card className="mb-12 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="h-6 w-6 text-indigo-600" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Strategic Narrative Influences</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Key trends, movements, and strategic patterns that directly benefit from this transformation
                </p>
                <div className="flex flex-wrap gap-3">
                  {strategicInfluences.map((influence, index) => (
                    <Badge key={index} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 text-sm">
                      {influence}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Legacy Content & Tabs */}
          <div className="mt-12">
            <CaseStudyTabs 
              caseStudy={narrative} 
              isLoggedIn={isLoggedIn}
              showLockOverlay={false}
              contentRef={contentRef}
            />
          </div>
        </div>
      </div>
    </CaseStudyAccessGate>
  );
};

export default CaseStudyDetail;
