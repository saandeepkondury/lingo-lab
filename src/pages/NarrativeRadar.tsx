
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import LiveNarrativeFeed from '@/components/NarrativeRadar/LiveNarrativeFeed';
import InteractiveMarketMap from '@/components/NarrativeRadar/InteractiveMarketMap';
import NarrativeAnalyticsPanel from '@/components/NarrativeRadar/NarrativeAnalyticsPanel';
import FounderSubmissionForm from '@/components/NarrativeRadar/FounderSubmissionForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Radar, Activity, Map, BarChart3, Send } from 'lucide-react';

const NarrativeRadar = () => {
  return (
    <Layout>
      <SEOHead
        title="Narrative Radar - Real-time Startup Narrative Intelligence | LingoLab"
        description="Track, analyze, and score emerging startup narratives in real-time. The Bloomberg Terminal for startup language and positioning intelligence."
        keywords="startup narratives, market intelligence, narrative analysis, positioning strategy, VC intelligence"
      />
      
      <div className="container max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Radar className="h-8 w-8 text-teal-500" />
            <h1 className="text-3xl font-bold">Narrative Radar</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Real-time intelligence on emerging startup narratives. Track adoption velocity, 
            identify market gaps, and position your company for maximum differentiation.
          </p>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Live Dashboard
            </TabsTrigger>
            <TabsTrigger value="market-map" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              Market Map
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="submit" className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Submit Narrative
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid lg:grid-cols-2 gap-6">
              <LiveNarrativeFeed />
              <NarrativeAnalyticsPanel />
            </div>
          </TabsContent>

          <TabsContent value="market-map">
            <InteractiveMarketMap />
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-1 gap-6">
              <NarrativeAnalyticsPanel />
            </div>
          </TabsContent>

          <TabsContent value="submit">
            <div className="max-w-2xl mx-auto">
              <FounderSubmissionForm />
            </div>
          </TabsContent>
        </Tabs>

        {/* Key Insights Section */}
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">Key Market Insights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Rising Stars</h3>
              <p className="text-blue-700 text-sm">
                Narratives with high originality and growing adoption velocity
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">White Space</h3>
              <p className="text-green-700 text-sm">
                Underutilized narrative territories with low competitive density
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
              <h3 className="font-semibold text-orange-900 mb-2">Saturation Alerts</h3>
              <p className="text-orange-700 text-sm">
                Overused narratives requiring strategic repositioning
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NarrativeRadar;
