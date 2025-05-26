
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';
import { useTrendingNarratives, useMarketSignals } from '@/hooks/useNarrativeData';
import { Skeleton } from '@/components/ui/skeleton';

const LiveNarrativeFeed = () => {
  const { data: trending, isLoading: trendingLoading } = useTrendingNarratives();
  const { data: signals, isLoading: signalsLoading } = useMarketSignals();

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'rising':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declining':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (trendingLoading || signalsLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Live Narrative Feed
          </CardTitle>
          <CardDescription>Real-time tracking of emerging startup narratives</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Live Narrative Feed
        </CardTitle>
        <CardDescription>Real-time tracking of emerging startup narratives</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {trending?.slice(0, 5).map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              {getTrendIcon(item.trend_direction)}
              <div>
                <h4 className="font-medium">{item.narrative?.term}</h4>
                <p className="text-sm text-muted-foreground">{item.narrative?.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                +{item.adoption_velocity.toFixed(1)}/week
              </Badge>
              <div className={`w-2 h-2 rounded-full ${getScoreColor(item.vc_resonance_score * 100)}`} />
            </div>
          </div>
        ))}
        
        <div className="mt-6 pt-4 border-t">
          <h4 className="font-medium mb-3">Market Signals</h4>
          {signals?.slice(0, 3).map((signal) => (
            <div key={signal.id} className="flex items-center justify-between py-2 text-sm">
              <span className="text-muted-foreground">{signal.narrative?.term}</span>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {signal.signal_type}
                </Badge>
                <span className="font-medium">{signal.score.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveNarrativeFeed;
