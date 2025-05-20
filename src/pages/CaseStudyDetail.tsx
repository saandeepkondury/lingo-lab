
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BookmarkPlus, Share2, MessageSquare, TrendingUp } from 'lucide-react';
import CaseStudyCard from '@/components/CaseStudyCard';

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
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [slug]);
  
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
  
  return (
    <Layout>
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {caseStudy.tagline}
            </h1>
            <p className="text-gray-500">{caseStudy.publishDate}</p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge variant="outline" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-none">
              {caseStudy.narrativeType}
            </Badge>
            <Badge variant="outline" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-none">
              {caseStudy.industry}
            </Badge>
            <Badge variant="outline" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-none">
              {caseStudy.overview.stage}
            </Badge>
          </div>

          {/* Author card (similar to Starter Story) */}
          <div className="bg-indigo-100 rounded-lg p-6 mb-10">
            <div className="flex items-start justify-between">
              <div className="flex space-x-4">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-indigo-200 overflow-hidden">
                    <img 
                      src={caseStudy.author?.image || "/placeholder.svg"} 
                      alt={caseStudy.author?.name || "Author"} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{caseStudy.author?.name || "LingoLab Team"}</h3>
                  <p className="text-sm text-gray-600">{caseStudy.author?.role || "Narrative Analyst"}</p>
                  {caseStudy.author?.twitter && (
                    <a href="#" className="text-indigo-600 text-sm flex items-center mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                      {caseStudy.author?.twitter}
                    </a>
                  )}
                </div>
              </div>

              {/* Metrics */}
              <div className="hidden md:flex space-x-8 text-center">
                <div>
                  <p className="text-xl font-bold">{caseStudy.metrics?.revenue || caseStudy.overview.revenue}</p>
                  <p className="text-xs text-gray-600">REVENUE</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{caseStudy.metrics?.founders || "1"}</p>
                  <p className="text-xs text-gray-600">FOUNDERS</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{caseStudy.metrics?.employees || caseStudy.overview.employees}</p>
                  <p className="text-xs text-gray-600">EMPLOYEES</p>
                </div>
              </div>
            </div>

            {/* Social buttons */}
            <div className="flex justify-end mt-4 space-x-3">
              <Button variant="outline" size="sm" className="flex items-center space-x-1 bg-white">
                <BookmarkPlus className="h-4 w-4" />
                <span>Save</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-1 bg-white">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
          
          {/* Main Content */}
          <section className="prose prose-indigo max-w-none">
            <h2 className="text-2xl font-semibold">The Lingo That Changed Everything</h2>
            <p className="text-lg leading-relaxed mb-6">{caseStudy.content.lingoExplanation}</p>
            
            <h2 className="text-2xl font-semibold mt-10">Origin Story of the Phrase</h2>
            <p className="mb-6">{caseStudy.content.originStory}</p>
            
            <h2 className="text-2xl font-semibold mt-10">Channel Breakdown</h2>
            <p className="mb-6">{caseStudy.content.channelBreakdown}</p>
            
            <h2 className="text-2xl font-semibold mt-10">Tipping Point</h2>
            <p className="mb-6">{caseStudy.content.tippingPoint}</p>
            
            {/* Founder Quote */}
            <div className="my-10 bg-gray-50 p-6 rounded-xl border-l-4 border-indigo-500">
              <blockquote className="text-lg italic">
                {caseStudy.content.founderQuote.split(' - ')[0]}
              </blockquote>
              <footer className="mt-2 text-right font-medium">
                - {caseStudy.content.founderQuote.split(' - ')[1]}
              </footer>
            </div>
            
            <h2 className="text-2xl font-semibold mt-10">Narrative Architecture</h2>
            <Card className="my-6 border-none shadow-sm">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 divide-y">
                  <div className="p-4">
                    <h4 className="font-semibold text-lg text-indigo-700">The Problem</h4>
                    <p>{caseStudy.content.narrativeArchitecture.problem}</p>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-semibold text-lg text-indigo-700">The Promise</h4>
                    <p>{caseStudy.content.narrativeArchitecture.promise}</p>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-semibold text-lg text-indigo-700">The Proof</h4>
                    <p>{caseStudy.content.narrativeArchitecture.proof}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <h2 className="text-2xl font-semibold mt-10">Ripple Effects</h2>
            <p className="mb-6">{caseStudy.content.rippleEffects}</p>
            
            <h2 className="text-2xl font-semibold mt-10">Expert Summary</h2>
            <p className="mb-6">{caseStudy.content.expertSummary}</p>
          </section>
          
          <Separator className="my-12" />
          
          {/* Related Case Studies */}
          <section className="my-12">
            <h2 className="text-2xl font-semibold mb-6">Related Case Studies</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {caseStudy.relatedCaseStudies.map((study: any) => (
                <CaseStudyCard key={study.id} {...study} />
              ))}
            </div>
          </section>
          
          {/* Comment/Discussion Section */}
          <section className="my-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Discussion</h2>
              <span className="text-muted-foreground">2 comments</span>
            </div>
            
            <div className="p-6 border border-border rounded-xl">
              <div className="flex items-center space-x-4 mb-4">
                <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Add Comment</span>
                </Button>
                <p className="text-sm text-muted-foreground">Login to join the conversation</p>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-semibold text-sm">JD</span>
                      </div>
                      <span className="font-medium">Jane Doe</span>
                    </div>
                    <span className="text-xs text-muted-foreground">2 days ago</span>
                  </div>
                  <p className="mt-2 text-sm">
                    This case study was incredibly insightful. We're currently repositioning our fintech product and the narrative architecture breakdown is exactly what we needed.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>
    </Layout>
  );
};

export default CaseStudyDetail;
