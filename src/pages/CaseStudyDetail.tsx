
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { BookmarkPlus, Share2, MessageSquare, Star } from 'lucide-react';
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
      analystNotes: "Stripe's greatest narrative achievement was making payments seem like just the beginning of their TAM rather than its limitation. By positioning as infrastructure, they justifiably command SaaS multiples rather than financial services multiples."
    },
    rating: 5,
    narrativeType: "Market Creation",
    industry: "Fintech",
    relatedCaseStudies: [
      {
        id: "plaid-financial-connectivity",
        company: "Plaid",
        lingo: "Financial Connectivity",
        impact: "Grew to $13.4B valuation by positioning as the crucial connection layer for fintech",
        rating: 4.7,
        narrativeType: "Market Creation",
        industry: "Fintech"
      },
      {
        id: "square-economic-empowerment",
        company: "Square/Block",
        lingo: "Economic Empowerment",
        impact: "Expanded from payments to multiple financial products under a unified mission",
        rating: 4.6,
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
      <article className="py-12">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <div className="flex items-center text-sm text-muted-foreground">
              <Link to="/case-studies" className="hover:text-foreground">Case Studies</Link>
              <span className="mx-2">/</span>
              <span>{caseStudy.company}</span>
            </div>
          </div>
          
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">
              {caseStudy.tagline}
            </h1>
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-muted/50">
                  {caseStudy.narrativeType}
                </Badge>
                <Badge variant="outline" className="bg-muted/50">
                  {caseStudy.industry}
                </Badge>
                <Badge variant="outline" className="bg-muted/50">
                  {caseStudy.overview.stage}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <BookmarkPlus className="h-4 w-4" />
                  <span>Save</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>
          </header>
          
          {/* Overview Card */}
          <section className="mb-12">
            <div className="apple-card p-6">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-muted-foreground">Industry</span>
                    <p>{caseStudy.overview.industry}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Stage</span>
                    <p>{caseStudy.overview.stage}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Key Phrase</span>
                    <p className="font-medium text-primary">"{caseStudy.overview.keyPhrase}"</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-muted-foreground">Outcome</span>
                    <p>{caseStudy.overview.outcome}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Revenue</span>
                    <p>{caseStudy.overview.revenue}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Team Size</span>
                    <p>{caseStudy.overview.employees}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Main Content */}
          <section className="prose prose-teal max-w-none">
            <h2>The Lingo That Changed Everything</h2>
            <p className="lead">{caseStudy.content.lingoExplanation}</p>
            
            <h2>Origin Story of the Phrase</h2>
            <p>{caseStudy.content.originStory}</p>
            
            <h2>Channel Breakdown</h2>
            <p>{caseStudy.content.channelBreakdown}</p>
            
            <h2>Tipping Point</h2>
            <p>{caseStudy.content.tippingPoint}</p>
            
            {/* Founder Quote */}
            <div className="my-10 bg-muted p-6 rounded-xl border-l-4 border-teal-500">
              <blockquote className="text-lg italic">
                {caseStudy.content.founderQuote.split(' - ')[0]}
              </blockquote>
              <footer className="mt-2 text-right font-medium">
                - {caseStudy.content.founderQuote.split(' - ')[1]}
              </footer>
            </div>
            
            <h2>Narrative Architecture</h2>
            <div className="space-y-4">
              <div>
                <h4>The Problem</h4>
                <p>{caseStudy.content.narrativeArchitecture.problem}</p>
              </div>
              
              <div>
                <h4>The Promise</h4>
                <p>{caseStudy.content.narrativeArchitecture.promise}</p>
              </div>
              
              <div>
                <h4>The Proof</h4>
                <p>{caseStudy.content.narrativeArchitecture.proof}</p>
              </div>
            </div>
            
            <h2>Ripple Effects</h2>
            <p>{caseStudy.content.rippleEffects}</p>
          </section>
          
          {/* Expert Analysis */}
          <section className="my-12 p-6 bg-muted/30 rounded-xl border border-border">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                <span className="text-teal-600 font-semibold">S</span>
              </div>
              <div>
                <h3 className="font-medium">Sandeep's Notes</h3>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < caseStudy.rating ? 'fill-accent text-accent' : 'text-muted-foreground'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <p className="text-muted-foreground">
              {caseStudy.content.analystNotes}
            </p>
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
                <Button className="bg-teal-500 hover:bg-teal-600 flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Add Comment</span>
                </Button>
                <p className="text-sm text-muted-foreground">Login to join the conversation</p>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center">
                        <span className="text-teal-600 font-semibold text-sm">JD</span>
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
