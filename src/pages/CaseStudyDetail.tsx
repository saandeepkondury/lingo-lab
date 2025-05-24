import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookmarkPlus, BookmarkCheck, MessageSquare, TrendingUp, Lock, Play, BarChart3, DollarSign, Target } from 'lucide-react';
import CaseStudyCard from '@/components/CaseStudyCard';
import ShareOptions from '@/components/ShareOptions';
import SEOHead from '@/components/SEOHead';
import PricingPopup from '@/components/PricingPopup';
import { useAuth } from '@/context/AuthContext';
import { useSavedCaseStudies } from '@/context/SavedCaseStudiesContext';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Sample case studies data (this would come from an API in a real app)
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
    metrics: {
      revenue: "$7.4B",
      founders: 2,
      employees: "7,000+"
    },
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
    narrativeType: "Market Creation",
    industry: "Fintech",
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
  },
  // More case studies would be defined here
};

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = slug ? caseStudiesData[slug] : null;
  const [showLockOverlay, setShowLockOverlay] = useState(false);
  const [showPricingPopup, setShowPricingPopup] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
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
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Add scroll event listener to detect when user scrolls to locked content
    const handleScroll = () => {
      if (!isLoggedIn && contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect();
        // If the locked content section is in view
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setShowPricingPopup(true);
          setShowLockOverlay(true);
        }
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
  const seoDescription = `Learn how ${caseStudy.company} used "${caseStudy.lingo}" to ${caseStudy.tagline.toLowerCase()}. Strategic narrative case study with detailed analysis.`;
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
      
      <article className="py-8">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <div className="flex items-center text-sm text-muted-foreground">
              <Link to="/case-studies" className="hover:text-foreground">Case Studies</Link>
              <span className="mx-2">/</span>
              <span>{caseStudy.company}</span>
            </div>
          </div>
          
          {/* Main title */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">
              {caseStudy.tagline}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">{caseStudy.publishDate}</p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge variant="outline" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-none dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-800">
              {caseStudy.narrativeType}
            </Badge>
            <Badge variant="outline" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-none dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-800">
              {caseStudy.industry}
            </Badge>
            <Badge variant="outline" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-none dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-800">
              {caseStudy.overview.stage}
            </Badge>
          </div>

          {/* Author card (similar to Starter Story) */}
          <div className="bg-indigo-100 dark:bg-indigo-900/70 rounded-lg p-6 mb-10">
            <div className="flex items-start justify-between">
              <div className="flex space-x-4">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-indigo-200 dark:bg-indigo-800 overflow-hidden">
                    <img 
                      src={caseStudy.author?.image || "/placeholder.svg"} 
                      alt={caseStudy.author?.name || "Author"} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg dark:text-white">{caseStudy.author?.name || "LingoLab Team"}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{caseStudy.author?.role || "Narrative Analyst"}</p>
                  {caseStudy.author?.twitter && (
                    <a href="#" className="text-indigo-600 dark:text-indigo-300 text-sm flex items-center mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                      {caseStudy.author?.twitter}
                    </a>
                  )}
                </div>
              </div>

              {/* Metrics */}
              <div className="hidden md:flex space-x-8 text-center">
                <div>
                  <p className="text-xl font-bold dark:text-white">{caseStudy.metrics?.revenue || caseStudy.overview.revenue}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">REVENUE</p>
                </div>
                <div>
                  <p className="text-xl font-bold dark:text-white">{caseStudy.metrics?.founders || "1"}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">FOUNDERS</p>
                </div>
                <div>
                  <p className="text-xl font-bold dark:text-white">{caseStudy.metrics?.employees || caseStudy.overview.employees}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">EMPLOYEES</p>
                </div>
              </div>
            </div>

            {/* Social buttons */}
            <div className="flex justify-end mt-4 space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center space-x-1 bg-white dark:bg-gray-800"
                onClick={handleSaveToggle}
              >
                {slug && isSaved(slug) ? <BookmarkCheck className="h-4 w-4" /> : <BookmarkPlus className="h-4 w-4" />}
                <span>{slug && isSaved(slug) ? 'Saved' : 'Save'}</span>
              </Button>
              
              <ShareOptions 
                caseStudy={{
                  company: caseStudy.company,
                  lingo: caseStudy.lingo,
                  id: slug || ''
                }}
              />
            </div>
          </div>
          
          {/* Tab Navigation */}
          <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="analysis" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Analysis
              </TabsTrigger>
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
            
            {/* Analysis Tab - Current Content */}
            <TabsContent value="analysis">
              {/* Main Content - First sections (always visible) */}
              <section className="prose prose-indigo dark:prose-invert max-w-none">
                <h2 className="text-2xl font-semibold">The Lingo That Changed Everything</h2>
                <p className="text-lg leading-relaxed mb-6">{caseStudy.content.lingoExplanation}</p>
                
                <h2 className="text-2xl font-semibold mt-10">Origin Story of the Phrase</h2>
                <p className="mb-6">{caseStudy.content.originStory}</p>
                
                {/* Reference point for locking content */}
                <div ref={contentRef} className="relative">
                  {/* Lock overlay for non-subscribers */}
                  {showLockOverlay && !isLoggedIn && (
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
                  <div className={!isLoggedIn ? "filter blur-sm select-none pointer-events-none" : ""}>
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
            </TabsContent>
            
            {/* Interview Tab */}
            <TabsContent value="interview">
              <div className="prose prose-indigo dark:prose-invert max-w-none">
                <h2 className="text-2xl font-semibold mb-6">Founder Interview</h2>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl mb-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-200 dark:bg-indigo-800 overflow-hidden">
                      <img 
                        src={caseStudy.author?.image || "/placeholder.svg"} 
                        alt="Founder" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">Patrick Collison</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">CEO & Co-founder, Stripe</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">How did you come up with the term "Financial Infrastructure"?</h3>
                    <p className="mb-4">
                      "We realized early on that calling ourselves a 'payments company' was limiting. When you say payments, 
                      people think of credit card processing - a commodity service with thin margins. But what we were building 
                      was much more fundamental. We were creating the economic plumbing for the internet."
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">What was the turning point for this narrative?</h3>
                    <p className="mb-4">
                      "It was around 2018 when we started consistently using 'infrastructure' in our messaging. 
                      The analogy to AWS was intentional - just as they made computing resources programmable, 
                      we wanted to make financial services programmable. That framing opened up entirely new product categories."
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">How did this impact your product roadmap?</h3>
                    <p className="mb-4">
                      "Once we positioned as infrastructure, products like Stripe Atlas, Treasury, and Issuing became 
                      logical extensions rather than random diversifications. Infrastructure companies build platforms, 
                      not just point solutions."
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Video Tab */}
            <TabsContent value="video">
              <div className="prose prose-indigo dark:prose-invert max-w-none">
                <h2 className="text-2xl font-semibold mb-6">Video Analysis</h2>
                
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center">
                    <Play className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">Video content coming soon</p>
                    <p className="text-sm text-gray-400 mt-2">Deep dive into Stripe's narrative evolution</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Key Video Moments</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded text-sm font-mono">2:34</span>
                    <span>Patrick Collison explains the infrastructure metaphor</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded text-sm font-mono">5:12</span>
                    <span>AWS comparison and platform strategy</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded text-sm font-mono">8:45</span>
                    <span>Impact on product development roadmap</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
            
            {/* Market Insight Tab */}
            <TabsContent value="market-insight">
              <div className="prose prose-indigo dark:prose-invert max-w-none">
                <h2 className="text-2xl font-semibold mb-6">Market Insight & Architecture</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Market Opportunity</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span>$1.3T global payments market</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          <span>Growing developer economy</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          <span>API-first business models</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                          <span>Global digital transformation</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Competitive Landscape</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                          <span>Legacy payment processors</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          <span>PayPal ecosystem dominance</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                          <span>Square's SMB focus</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                          <span>Banking-as-a-Service emergence</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Architecture Philosophy</h3>
                <p className="mb-4">
                  Stripe's technology stack reflects their "infrastructure" narrative. Rather than building a monolithic 
                  payments processor, they've created a distributed system of microservices that can be composed 
                  to solve different financial problems.
                </p>
                
                <p className="mb-4">
                  This architectural approach reinforces their positioning as infrastructure rather than a simple 
                  payment gateway - it's designed to be the foundation other companies build on top of.
                </p>
                
                <h3 className="text-xl font-semibold mb-4 mt-8">Market Dynamics</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold mb-2">Developer-First Movement</h4>
                    <p className="text-sm">
                      The rise of developer-centric tools and API-first companies created the perfect market 
                      conditions for Stripe's infrastructure narrative to resonate.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold mb-2">Digital Commerce Explosion</h4>
                    <p className="text-sm">
                      E-commerce growth, especially accelerated by COVID-19, validated the need for 
                      programmable financial infrastructure beyond simple payment processing.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold mb-2">Fintech Unbundling</h4>
                    <p className="text-sm">
                      Traditional financial services being disaggregated into specialized, API-accessible 
                      components that can be reassembled into new experiences.
                    </p>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-4 mt-8">TAM Expansion Strategy</h3>
                <p className="mb-4">
                  By positioning as "financial infrastructure," Stripe expanded their total addressable market 
                  from payments (~$50B) to the entire global financial services infrastructure (~$1.3T+).
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Banking services (Treasury, Issuing)</li>
                  <li>Business operations (Atlas, Tax)</li>
                  <li>Fraud prevention and risk management</li>
                  <li>Financial reporting and analytics</li>
                  <li>International expansion tools</li>
                </ul>
              </div>
            </TabsContent>
            
            {/* Funding Tab */}
            <TabsContent value="funding">
              <div className="prose prose-indigo dark:prose-invert max-w-none">
                <h2 className="text-2xl font-semibold mb-6">Funding Journey</h2>
                
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">Series H</h3>
                          <p className="text-gray-600 dark:text-gray-300">March 2021</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">$600M</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">$95B valuation</p>
                        </div>
                      </div>
                      <p className="text-sm mb-3">
                        <strong>Lead Investors:</strong> Allianz X, Axa, Baillie Gifford, Fidelity Management
                      </p>
                      <p className="text-sm">
                        This round solidified Stripe's position as financial infrastructure for the internet, 
                        with funds allocated to global expansion and product development.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">Series G</h3>
                          <p className="text-gray-600 dark:text-gray-300">April 2020</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">$600M</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">$36B valuation</p>
                        </div>
                      </div>
                      <p className="text-sm mb-3">
                        <strong>Lead Investors:</strong> Andreessen Horowitz, General Catalyst, Sequoia Capital
                      </p>
                      <p className="text-sm">
                        Raised during the pandemic to capitalize on the shift to digital commerce and 
                        expand Stripe's infrastructure offerings globally.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">Earlier Rounds</h3>
                          <p className="text-gray-600 dark:text-gray-300">2011-2019</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">$1.6B+</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Total raised</p>
                        </div>
                      </div>
                      <p className="text-sm">
                        Series A through F with notable investors including Sequoia Capital, Andreessen Horowitz, 
                        Thrive Capital, and General Catalyst, building from payments to full financial infrastructure.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <h3 className="text-xl font-semibold mb-4 mt-8">Funding Strategy Impact</h3>
                <p className="mb-4">
                  Stripe's "financial infrastructure" narrative was crucial in achieving premium valuations typically 
                  reserved for software companies rather than traditional financial services. This positioning 
                  allowed them to command SaaS-like multiples rather than fintech multiples.
                </p>
              </div>
            </TabsContent>
            
            {/* Positioning Tab */}
            <TabsContent value="positioning">
              <div className="prose prose-indigo dark:prose-invert max-w-none">
                <h2 className="text-2xl font-semibold mb-6">Strategic Positioning</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 text-red-600">Before: "Payments Company"</h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Commoditized service perception</li>
                        <li>• Limited to transaction processing</li>
                        <li>• Competing on pricing and features</li>
                        <li>• Traditional fintech multiples</li>
                        <li>• Single product category</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 text-green-600">After: "Financial Infrastructure"</h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Essential platform positioning</li>
                        <li>• Expanded total addressable market</li>
                        <li>• Platform strategy opportunities</li>
                        <li>• SaaS-like valuation multiples</li>
                        <li>• Multiple product categories</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Competitive Differentiation</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold mb-2">vs. PayPal</h4>
                    <p className="text-sm">
                      While PayPal focused on consumer wallets and marketplace payments, Stripe positioned 
                      as developer-first infrastructure for building custom financial experiences.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold mb-2">vs. Square</h4>
                    <p className="text-sm">
                      Square targeted physical retail with hardware-software bundles, while Stripe became 
                      the invisible infrastructure powering online businesses globally.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold mb-2">vs. Traditional Processors</h4>
                    <p className="text-sm">
                      Legacy processors offered basic transaction services, while Stripe provided 
                      programmable financial infrastructure with modern APIs and developer experience.
                    </p>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-4 mt-8">Market Creation Impact</h3>
                <p className="mb-4">
                  By positioning as "financial infrastructure," Stripe didn't just compete in the existing 
                  payments market - they created an entirely new category. This allowed them to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Set category definitions and standards</li>
                  <li>Attract talent wanting to build "infrastructure"</li>
                  <li>Justify premium pricing for platform capabilities</li>
                  <li>Expand into adjacent financial services naturally</li>
                  <li>Partner with other infrastructure companies (AWS, etc.)</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
          
          <Separator className="my-12" />
          
          {/* Related Case Studies */}
          <section className="my-12">
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">Related Case Studies</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {caseStudy.relatedCaseStudies.map((study: any) => (
                <CaseStudyCard key={study.id} {...study} />
              ))}
            </div>
          </section>
          
          {/* Comment/Discussion Section */}
          <section className="my-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold dark:text-white">Discussion</h2>
              <span className="text-muted-foreground">2 comments</span>
            </div>
            
            <div className="p-6 border border-border rounded-xl dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-4">
                <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Add Comment</span>
                </Button>
                <p className="text-sm text-muted-foreground">Login to join the conversation</p>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-muted/30 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center">
                        <span className="text-indigo-600 dark:text-indigo-200 font-semibold text-sm">JD</span>
                      </div>
                      <span className="font-medium dark:text-white">Jane Doe</span>
                    </div>
                    <span className="text-xs text-muted-foreground">2 days ago</span>
                  </div>
                  <p className="mt-2 text-sm dark:text-gray-300">
                    This case study was incredibly insightful. We're currently repositioning our fintech product and the narrative architecture breakdown is exactly what we needed.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>
      
      {/* Show pricing popup when the user scrolls to locked content or if showPricingPopup is true */}
      {showPricingPopup && !isLoggedIn && <PricingPopup forceShow={true} />}
    </Layout>
  );
};

export default CaseStudyDetail;
