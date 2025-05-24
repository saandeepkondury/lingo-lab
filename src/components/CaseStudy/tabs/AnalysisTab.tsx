
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

interface AnalysisTabProps {
  caseStudy: any;
  isLoggedIn: boolean;
  showLockOverlay: boolean;
  contentRef: React.RefObject<HTMLDivElement>;
}

const AnalysisTab = ({ caseStudy, isLoggedIn, showLockOverlay, contentRef }: AnalysisTabProps) => {
  const { subscribed } = useSubscription();
  const hasPaidAccess = isLoggedIn && subscribed;

  return (
    <section className="prose prose-indigo dark:prose-invert max-w-none">
      <h2 className="text-2xl font-semibold">The Lingo That Changed Everything</h2>
      <p className="text-lg leading-relaxed mb-6">{caseStudy.content.lingoExplanation}</p>
      
      <h2 className="text-2xl font-semibold mt-10">Origin Story of the Phrase</h2>
      <p className="mb-6">{caseStudy.content.originStory}</p>
      
      {/* Reference point for locking content */}
      <div ref={contentRef} className="relative">
        {/* Lock overlay for non-subscribers */}
        {showLockOverlay && !hasPaidAccess && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
            <div className="text-center p-6 max-w-md">
              <Lock className="h-12 w-12 mx-auto mb-4 text-teal-500" />
              <h3 className="text-xl font-bold mb-3">Premium Content</h3>
              <p className="text-muted-foreground mb-6">
                Subscribe to unlock the full case study and get access to all premium content.
              </p>
              <Button 
                className="bg-teal-500 hover:bg-teal-600 text-white px-6"
                onClick={() => window.location.href = '/pricing'}
              >
                View Pricing Plans
              </Button>
            </div>
          </div>
        )}
        
        {/* Locked content - visible for subscribers only without blur */}
        <div className={!hasPaidAccess ? "filter blur-sm select-none pointer-events-none" : ""}>
          <h2 className="text-2xl font-semibold mt-10">Channel Breakdown</h2>
          <p className="mb-6">{caseStudy.content.channelBreakdown}</p>
          
          <h2 className="text-2xl font-semibold mt-10">Tipping Point</h2>
          <p className="mb-6">{caseStudy.content.tippingPoint}</p>
          
          {/* Founder Quote */}
          <div className="my-10 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border-l-4 border-indigo-500">
            <blockquote className="text-lg italic dark:text-gray-200">
              {caseStudy.content.founderQuote.split(' - ')[0]}
            </blockquote>
            <footer className="mt-2 text-right font-medium dark:text-gray-300">
              - {caseStudy.content.founderQuote.split(' - ')[1]}
            </footer>
          </div>
          
          <h2 className="text-2xl font-semibold mt-10">Narrative Architecture</h2>
          <Card className="my-6 border-none shadow-sm dark:bg-gray-800/50">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 divide-y dark:divide-gray-700">
                <div className="p-4">
                  <h4 className="font-semibold text-lg text-indigo-700 dark:text-indigo-300">The Problem</h4>
                  <p className="dark:text-gray-300">{caseStudy.content.narrativeArchitecture.problem}</p>
                </div>
                
                <div className="p-4">
                  <h4 className="font-semibold text-lg text-indigo-700 dark:text-indigo-300">The Promise</h4>
                  <p className="dark:text-gray-300">{caseStudy.content.narrativeArchitecture.promise}</p>
                </div>
                
                <div className="p-4">
                  <h4 className="font-semibold text-lg text-indigo-700 dark:text-indigo-300">The Proof</h4>
                  <p className="dark:text-gray-300">{caseStudy.content.narrativeArchitecture.proof}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-2xl font-semibold mt-10">Ripple Effects</h2>
          <p className="mb-6">{caseStudy.content.rippleEffects}</p>
          
          <h2 className="text-2xl font-semibold mt-10">Expert Summary</h2>
          <p className="mb-6">{caseStudy.content.expertSummary}</p>
        </div>
      </div>
    </section>
  );
};

export default AnalysisTab;
