
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEOHead';
import PricingPopup from '@/components/PricingPopup';
import { useAuth } from '@/context/AuthContext';
import { useSavedCaseStudies } from '@/context/SavedCaseStudiesContext';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Building2, TrendingUp, Rocket, Calendar, Bookmark, BookmarkCheck } from 'lucide-react';

// Modern components
import CaseStudyHero from '@/components/CaseStudy/modern/CaseStudyHero';
import MarketNarrativeSection from '@/components/CaseStudy/modern/MarketNarrativeSection';
import AIInsightsPanel from '@/components/CaseStudy/modern/AIInsightsPanel';
import NarrativeEvolutionTimeline from '@/components/CaseStudy/modern/NarrativeEvolutionTimeline';
import VentureScaleInsights from '@/components/CaseStudy/modern/VentureScaleInsights';

// Sample case studies data (this would come from Supabase in a real app)
const caseStudiesData: Record<string, any> = {
  "stripe-financial-infrastructure": {
    company: "Stripe",
    lingo: "Financial Infrastructure",
    tagline: "How Stripe Coined 'Financial Infrastructure' and Raised $600M at $95B Valuation",
    overview: {
      industry: "Fintech",
      stage: "Series H",
      keyPhrase: "Financial Infrastructure",
      outcome: "$600M raised at $95B valuation",
      revenue: "$7.4B annual revenue",
      employees: "7,000+"
    },
    author: {
      name: "Jamie Smith",
      role: "Narrative Strategist",
      image: "/placeholder.svg",
      twitter: "@jamiesmith"
    },
    publishDate: "October 15, 2024",
    narrativeType: "Market Creation",
    industry: "Fintech",
    content: {
      lingoExplanation: "Stripe started as a simple payments API but strategically repositioned itself as 'Financial Infrastructure for the Internet'. This narrative shift away from 'payments' (commoditized, low-margin) to 'infrastructure' (essential, high-value) was pivotal to its massive valuation and market dominance.",
      originStory: "The term was first used in 2018 by Stripe CEO Patrick Collison in a blog post explaining their vision beyond payments. By 2020, it had become the central narrative throughout their fundraising, PR, and product launches.",
      channelBreakdown: "Stripe's repositioning was systematically deployed across: 1) Investor decks emphasizing total addressable market expansion, 2) Engineering blog posts about infrastructure challenges, 3) Executive interviews consistently using infrastructure framing, 4) Product launches aligned to infrastructure narrative.",
      tippingPoint: "When AWS and Microsoft partnered with Stripe for 'financial infrastructure' integrations, the market fully embraced the redefinition. Competitors were forced to respond to Stripe's strategic narrative rather than the other way around.",
      founderQuote: "\"We think of Stripe as building economic infrastructure for the internet. We help businesses of every size accept payments from anyone, in any currency.\" - Patrick Collison, CEO",
      narrativeArchitecture: {
        problem: "Businesses struggle with the complexity of global payment systems and financial operations.",
        promise: "Stripe provides the infrastructure layer that makes money movement as simple and programmable as computing resources.",
        proof: "Processing billions in payments annually for millions of businesses in 120+ countries."
      },
      rippleEffects: "The 'infrastructure' framing led to entirely new product categories (Stripe Treasury, Stripe Issuing) and forced competitors to reposition themselves. The narrative also attracted engineering talent who wanted to work on 'infrastructure' rather than 'payments'.",
      expertSummary: "Stripe's greatest narrative achievement was making payments seem like just the beginning of their TAM rather than its limitation. By positioning as infrastructure, they justifiably command SaaS multiples rather than financial services multiples."
    },
    relatedCaseStudies: [
      {
        id: "plaid-financial-connectivity",
        company: "Plaid",
        lingo: "Financial Connectivity",
        impact: "Grew to $13.4B valuation by positioning as the crucial connection layer for fintech",
        narrativeType: "Market Creation",
        industry: "Fintech"
      },
      {
        id: "square-economic-empowerment",
        company: "Square/Block",
        lingo: "Economic Empowerment",
        impact: "Expanded from payments to multiple financial products under a unified mission",
        narrativeType: "Mission Narrative",
        industry: "Fintech"
      }
    ]
  }
};

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = slug ? caseStudiesData[slug] : null;
  const [showPricingPopup, setShowPricingPopup] = useState(false);
  
  const { isLoggedIn } = useAuth();
  const { isSaved, saveCaseStudy, removeCaseStudy } = useSavedCaseStudies();
  const { toast } = useToast();
  
  const handleSaveToggle = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to save case studies.",
        action: <Button className="bg-teal-500 hover:bg-teal-600 text-white" size="sm" asChild><Link to="/join">Login</Link></Button>
      });
      return;
    }

    if (!slug) return;

    if (isSaved(slug)) {
      removeCaseStudy(slug);
      toast({
        title: "Case study removed",
        description: "Removed from your saved case studies."
      });
    } else {
      saveCaseStudy(slug);
      toast({
        title: "Case study saved",
        description: "Added to your saved case studies."
      });
    }
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Show pricing popup for non-logged in users after scrolling
    const handleScroll = () => {
      if (!isLoggedIn && window.scrollY > 800) {
        setShowPricingPopup(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug, isLoggedIn]);
  
  if (!caseStudy) {
    return (
      <Layout>
        <div className="container max-w-4xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Case study not found</h1>
            <p className="mb-8">The case study you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/case-studies">Back to Case Studies</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Prepare SEO metadata
  const seoTitle = `${caseStudy.company}: ${caseStudy.lingo} Case Study | LingoLab`;
  const seoDescription = `Learn how ${caseStudy.company} used "${caseStudy.lingo}" to ${caseStudy.tagline.toLowerCase()}. Strategic narrative case study with AI-powered insights.`;
  const seoKeywords = `${caseStudy.company}, ${caseStudy.lingo}, strategic narrative, case study, ${caseStudy.industry}, ${caseStudy.narrativeType}`;
  const canonicalUrl = `${window.location.origin}/case-studies/${slug}`;
  
  return (
    <Layout>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonicalUrl={canonicalUrl}
        type="article"
      />
      
      <article>
        {/* Hero Section */}
        <CaseStudyHero caseStudy={caseStudy} />
        
        {/* Main Content */}
        <div className="container max-w-7xl mx-auto px-6 py-12">
          {/* Breadcrumbs & Save Button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center text-sm text-muted-foreground">
              <Link to="/case-studies" className="hover:text-foreground">Case Studies</Link>
              <span className="mx-2">/</span>
              <span>{caseStudy.company}</span>
            </div>
            
            <Button 
              variant="outline" 
              onClick={handleSaveToggle}
              className="flex items-center gap-2"
            >
              {slug && isSaved(slug) ? (
                <>
                  <BookmarkCheck className="h-4 w-4" />
                  Saved
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4" />
                  Save
                </>
              )}
            </Button>
          </div>

          {/* Tabbed Content */}
          <Tabs defaultValue="insights" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                AI Insights
              </TabsTrigger>
              <TabsTrigger value="market" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Market Analysis
              </TabsTrigger>
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
                Competitive
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="insights" className="mt-8">
              <AIInsightsPanel caseStudy={caseStudy} />
            </TabsContent>
            
            <TabsContent value="market" className="mt-8">
              <MarketNarrativeSection 
                industry={caseStudy.industry}
                currentCompany={caseStudy.company}
              />
            </TabsContent>
            
            <TabsContent value="evolution" className="mt-8">
              <NarrativeEvolutionTimeline caseStudy={caseStudy} />
            </TabsContent>
            
            <TabsContent value="venture" className="mt-8">
              <VentureScaleInsights caseStudy={caseStudy} />
            </TabsContent>
            
            <TabsContent value="competitive" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <MarketNarrativeSection 
                  industry={caseStudy.industry}
                  currentCompany={caseStudy.company}
                />
                <AIInsightsPanel caseStudy={caseStudy} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </article>
      
      {/* Show pricing popup when user scrolls to locked content */}
      {showPricingPopup && !isLoggedIn && <PricingPopup forceShow={true} />}
    </Layout>
  );
};

export default CaseStudyDetail;
