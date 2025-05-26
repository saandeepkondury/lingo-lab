
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Target } from 'lucide-react';
import { useNarrativeAnalytics } from '@/hooks/useNarrativeData';
import { Skeleton } from '@/components/ui/skeleton';

const InteractiveMarketMap = () => {
  const { data: analytics, isLoading } = useNarrativeAnalytics();

  const getPositionStyle = (originality: number, adoption: number) => {
    // Create a scatter plot effect using positioning
    const x = Math.min(originality * 80, 75); // Max 75% to stay in bounds
    const y = Math.min((adoption / 20) * 80, 75); // Normalize adoption velocity
    
    return {
      left: `${x}%`,
      top: `${y}%`,
    };
  };

  const getSizeClass = (density: number) => {
    if (density > 100) return 'w-4 h-4';
    if (density > 50) return 'w-3 h-3';
    return 'w-2 h-2';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'AI Technology': 'bg-blue-500',
      'Platform': 'bg-green-500',
      'Business Model': 'bg-purple-500',
      'Product Strategy': 'bg-orange-500',
      'Product Positioning': 'bg-pink-500',
    };
    return colors[category] || 'bg-gray-500';
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Market Narrative Map
          </CardTitle>
          <CardDescription>Visual clustering of narratives by originality and adoption</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-80 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Market Narrative Map
        </CardTitle>
        <CardDescription>Visual clustering of narratives by originality and adoption</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-200 overflow-hidden">
          {/* Axis Labels */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
            Originality Score →
          </div>
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-muted-foreground">
            ← Adoption Velocity
          </div>
          
          {/* Quadrant Labels */}
          <div className="absolute top-4 right-4 text-xs font-medium text-green-600">
            Rising Stars
          </div>
          <div className="absolute top-4 left-4 text-xs font-medium text-orange-600">
            Emerging
          </div>
          <div className="absolute bottom-4 right-4 text-xs font-medium text-blue-600">
            Established
          </div>
          <div className="absolute bottom-4 left-4 text-xs font-medium text-gray-600">
            Niche
          </div>

          {/* Narrative Points */}
          {analytics?.map((item) => (
            <div
              key={item.id}
              className="absolute group cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={getPositionStyle(item.originality_score, item.adoption_velocity)}
            >
              <div
                className={`
                  ${getSizeClass(item.competitive_density)} 
                  ${getCategoryColor(item.narrative?.category || '')}
                  rounded-full opacity-70 group-hover:opacity-100 transition-all duration-200
                  group-hover:scale-125
                `}
              />
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <div className="bg-black text-white text-xs rounded-lg p-2 whitespace-nowrap shadow-lg">
                  <div className="font-medium">{item.narrative?.term}</div>
                  <div className="text-gray-300">
                    Originality: {(item.originality_score * 100).toFixed(0)}%
                  </div>
                  <div className="text-gray-300">
                    Velocity: {item.adoption_velocity.toFixed(1)}/week
                  </div>
                  <div className="text-gray-300">
                    Competition: {item.competitive_density} companies
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-2">
          <div className="flex items-center gap-1 text-xs">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span>AI Technology</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Platform</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            <span>Business Model</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
            <span>Product Strategy</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveMarketMap;
