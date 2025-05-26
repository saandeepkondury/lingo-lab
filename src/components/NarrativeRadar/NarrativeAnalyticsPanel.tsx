
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, AlertTriangle, TrendingUp, Eye } from 'lucide-react';
import { useNarrativeAnalytics } from '@/hooks/useNarrativeData';
import { Skeleton } from '@/components/ui/skeleton';

const NarrativeAnalyticsPanel = () => {
  const { data: analytics, isLoading } = useNarrativeAnalytics();

  const getScoreLevel = (score: number) => {
    if (score >= 0.8) return { level: 'High', color: 'text-green-600' };
    if (score >= 0.6) return { level: 'Medium', color: 'text-yellow-600' };
    return { level: 'Low', color: 'text-red-600' };
  };

  const getDensityWarning = (density: number) => {
    if (density > 100) return { warning: 'Oversaturated', color: 'text-red-600' };
    if (density > 50) return { warning: 'Competitive', color: 'text-yellow-600' };
    return { warning: 'Open', color: 'text-green-600' };
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Narrative Analytics
          </CardTitle>
          <CardDescription>AI-powered insights on narrative performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  const topPerformers = analytics?.slice(0, 5) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Narrative Analytics
        </CardTitle>
        <CardDescription>AI-powered insights on narrative performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Top Performing Narratives */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Top Performing Narratives
          </h4>
          <div className="space-y-3">
            {topPerformers.map((item) => {
              const originalityLevel = getScoreLevel(item.originality_score);
              const vcResonanceLevel = getScoreLevel(item.vc_resonance_score);
              const densityWarning = getDensityWarning(item.competitive_density);
              
              return (
                <div key={item.id} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">{item.narrative?.term}</h5>
                    <Badge variant="outline" className={densityWarning.color}>
                      {densityWarning.warning}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-muted-foreground">Originality</span>
                        <span className={originalityLevel.color}>{originalityLevel.level}</span>
                      </div>
                      <Progress value={item.originality_score * 100} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-muted-foreground">VC Resonance</span>
                        <span className={vcResonanceLevel.color}>{vcResonanceLevel.level}</span>
                      </div>
                      <Progress value={item.vc_resonance_score * 100} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{item.competitive_density} competitors</span>
                    <span>+{item.adoption_velocity.toFixed(1)}/week</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Market Alerts */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Market Alerts
          </h4>
          <div className="space-y-2">
            {analytics?.filter(item => item.competitive_density > 80).slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span>
                  <strong>{item.narrative?.term}</strong> narrative is becoming oversaturated ({item.competitive_density} companies)
                </span>
              </div>
            ))}
            
            {analytics?.filter(item => item.trend_direction === 'rising' && item.originality_score > 0.8).slice(0, 2).map((item) => (
              <div key={`rising-${item.id}`} className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-lg text-sm">
                <Eye className="h-4 w-4 text-green-600" />
                <span>
                  <strong>{item.narrative?.term}</strong> is gaining momentum with high originality (+{item.adoption_velocity.toFixed(1)}/week)
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NarrativeAnalyticsPanel;
