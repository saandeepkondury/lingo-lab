
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Building2, Calendar, Rocket, TrendingUp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

// Modern components
import AIInsightsPanel from './modern/AIInsightsPanel';
import MarketNarrativeSection from './modern/MarketNarrativeSection';
import NarrativeEvolutionTimeline from './modern/NarrativeEvolutionTimeline';
import VentureScaleInsights from './modern/VentureScaleInsights';

interface CaseStudyTabsProps {
  caseStudy: any;
  isLoggedIn: boolean;
  showLockOverlay: boolean;
  contentRef: React.RefObject<HTMLDivElement>;
}

const CaseStudyTabs = ({ caseStudy, isLoggedIn, showLockOverlay, contentRef }: CaseStudyTabsProps) => {
  return (
    <TooltipProvider>
      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Insights
          </TabsTrigger>
          <Tooltip>
            <TooltipTrigger asChild>
              <TabsTrigger value="market" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Market
              </TabsTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Market analysis and competitive landscape insights</p>
            </TooltipContent>
          </Tooltip>
          <TabsTrigger value="evolution" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Evolution
          </TabsTrigger>
          <TabsTrigger value="venture" className="flex items-center gap-2">
            <Rocket className="h-4 w-4" />
            Venture Scale
          </TabsTrigger>
          <TabsTrigger value="competitive" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analysis
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="insights">
          <AIInsightsPanel caseStudy={caseStudy} />
        </TabsContent>
        
        <TabsContent value="market">
          <MarketNarrativeSection 
            industry={caseStudy.industry || caseStudy.overview?.industry}
            currentCompany={caseStudy.company}
          />
        </TabsContent>
        
        <TabsContent value="evolution">
          <NarrativeEvolutionTimeline caseStudy={caseStudy} />
        </TabsContent>
        
        <TabsContent value="venture">
          <VentureScaleInsights caseStudy={caseStudy} />
        </TabsContent>
        
        <TabsContent value="competitive">
          <div className="grid lg:grid-cols-2 gap-8">
            <MarketNarrativeSection 
              industry={caseStudy.industry || caseStudy.overview?.industry}
              currentCompany={caseStudy.company}
            />
            <AIInsightsPanel caseStudy={caseStudy} />
          </div>
        </TabsContent>
      </Tabs>
    </TooltipProvider>
  );
};

export default CaseStudyTabs;
