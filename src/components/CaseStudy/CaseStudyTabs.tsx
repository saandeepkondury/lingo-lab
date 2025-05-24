
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, MessageSquare, Play, BarChart3, DollarSign, Target, Quote } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import AnalysisTab from './tabs/AnalysisTab';
import InterviewTab from './tabs/InterviewTab';
import VideoTab from './tabs/VideoTab';
import MarketInsightTab from './tabs/MarketInsightTab';
import FundingTab from './tabs/FundingTab';
import PositioningTab from './tabs/PositioningTab';
import LingoTab from './tabs/LingoTab';

interface CaseStudyTabsProps {
  caseStudy: any;
  isLoggedIn: boolean;
  showLockOverlay: boolean;
  contentRef: React.RefObject<HTMLDivElement>;
}

const CaseStudyTabs = ({ caseStudy, isLoggedIn, showLockOverlay, contentRef }: CaseStudyTabsProps) => {
  return (
    <TooltipProvider>
      <Tabs defaultValue="analysis" className="w-full">
        <TabsList className="grid w-full grid-cols-7 mb-8">
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analysis
          </TabsTrigger>
          <Tooltip>
            <TooltipTrigger asChild>
              <TabsTrigger value="lingo" className="flex items-center gap-2">
                <Quote className="h-4 w-4" />
                Lingo
              </TabsTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Track the unique language driving this startup's growth and market positioning.</p>
            </TooltipContent>
          </Tooltip>
          <TabsTrigger value="interview" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Interview
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            Video
          </TabsTrigger>
          <TabsTrigger value="market-insight" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Market Insight
          </TabsTrigger>
          <TabsTrigger value="funding" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Funding
          </TabsTrigger>
          <TabsTrigger value="positioning" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Positioning
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="analysis">
          <AnalysisTab 
            caseStudy={caseStudy}
            isLoggedIn={isLoggedIn}
            showLockOverlay={showLockOverlay}
            contentRef={contentRef}
          />
        </TabsContent>
        
        <TabsContent value="lingo">
          <LingoTab caseStudy={caseStudy} />
        </TabsContent>
        
        <TabsContent value="interview">
          <InterviewTab caseStudy={caseStudy} />
        </TabsContent>
        
        <TabsContent value="video">
          <VideoTab />
        </TabsContent>
        
        <TabsContent value="market-insight">
          <MarketInsightTab />
        </TabsContent>
        
        <TabsContent value="funding">
          <FundingTab />
        </TabsContent>
        
        <TabsContent value="positioning">
          <PositioningTab />
        </TabsContent>
      </Tabs>
    </TooltipProvider>
  );
};

export default CaseStudyTabs;
