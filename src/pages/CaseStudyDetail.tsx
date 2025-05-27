
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEOHead';
import { useAuth } from '@/context/AuthContext';
import ArticleHeader from '@/components/Article/ArticleHeader';
import ArticleContent from '@/components/Article/ArticleContent';
import ShareOptions from '@/components/ShareOptions';
import { useCaseStudySEO } from '@/hooks/useCaseStudySEO';

// Simplified narrative data structure designed for form input
const narrativeData: Record<string, any> = {
  "stripe-financial-infrastructure": {
    // Basic Company Information (from form)
    company: "Stripe",
    founderName: "Patrick Collison",
    founderTitle: "CEO & Co-founder",
    fundingRaised: "$2.2B",
    valuation: "$95B",
    industry: "Fintech",
    foundedYear: "2010",
    employeeCount: "4,000+",
    headquarters: "San Francisco, CA",
    
    // Publication Details
    publishDate: "October 15, 2024",
    readTime: "8 min read",
    
    // Core Narrative (from form responses)
    keyPhrase: "Financial Infrastructure",
    tagline: "Building the economic infrastructure for the internet",
    
    // Form Responses - Market Context
    marketBefore: "Before Stripe, online payments were fragmented and complex. Developers had to integrate with multiple payment processors, handle compliance manually, and deal with different APIs for different regions. The market treated payments as a necessary evil - a commodity service that businesses had to endure rather than leverage for growth.",
    
    founderInsight: "We realized that payments weren't just about moving money - they were about enabling commerce itself. Every online business needed the same foundational infrastructure, but they were all building it from scratch. We saw an opportunity to make payments as simple and powerful as cloud computing had made servers.",
    
    marketTransformation: "We're not just processing payments; we're building the economic infrastructure for the internet. Just as AWS abstracted away server management, we're abstracting away financial complexity. This means developers can focus on their core product while we handle everything from fraud detection to global compliance.",
    
    strategicVision: "The future of commerce is programmable. Every business will have financial services embedded directly into their product experience. We're building the rails that will power the next generation of internet businesses - from marketplaces to SaaS platforms to the creator economy.",
    
    competitiveAdvantage: "While others see payments as transactions, we see infrastructure. While they compete on pricing, we compete on enabling new business models. Our competitors are building payment processors; we're building the financial operating system for the internet.",
    
    // Market Intelligence (form checkboxes/dropdowns)
    marketThemes: ["API Economy", "Developer Experience", "Financial Infrastructure"],
    strategicPatterns: ["Platform Strategy", "Developer-First GTM", "Category Creation"],
    transformationType: "Market Redefinition",
    narrativeArchetype: "Infrastructure Play",
    
    // Metrics (from form)
    metrics: {
      scale: {
        revenue: "$7.4B annually",
        users: "7M+ businesses globally",
        marketShare: "Leading developer payment platform",
        geographicReach: "120+ countries"
      },
      speed: {
        categoryDefinition: "2 years to establish 'financial infrastructure' narrative",
        marketLeadership: "5 years to become category leader", 
        globalExpansion: "3 years to achieve global scale"
      },
      adoption: {
        industryStandard: "Infrastructure terminology now industry standard",
        competitorResponse: "Competitors adopted similar positioning within 18 months",
        marketEducation: "Transformed how developers think about payments"
      }
    },
    
    // Strategic Takeaways (from form)
    strategicInsights: [
      "Reframe commodity services as essential infrastructure to command premium valuations",
      "Target developers first to create viral adoption through superior technical experience", 
      "Expand TAM by positioning beyond core product into adjacent service categories",
      "Use narrative timing to establish category leadership before competitors catch up"
    ],
    
    // Market Landscape (from form)
    marketLandscape: {
      beforeCompany: "Fragmented payment processors competing on pricing",
      companyPosition: "Unified financial infrastructure platform",
      competitorResponse: "Industry shift toward developer-centric solutions",
      futureState: "Programmable financial services as standard"
    }
  }
};

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const narrative = slug ? narrativeData[slug] : null;
  const { isLoggedIn } = useAuth();
  const seoData = narrative && slug ? useCaseStudySEO(narrative, slug) : null;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (!narrative || !slug) {
    return (
      <Layout>
        <div className="container max-w-4xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Narrative not found</h1>
            <p className="mb-8">The founder narrative you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/case-studies">Back to Narratives</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      {seoData && (
        <SEOHead
          title={`${narrative.company} Founder Narrative: ${narrative.founderName} | LingoLab`}
          description={`Discover how ${narrative.founderName} of ${narrative.company} is transforming ${narrative.industry} with their strategic vision and market insights.`}
          keywords={`${narrative.company}, ${narrative.founderName}, strategic narrative, ${narrative.industry}, founder insights`}
          canonicalUrl={seoData.canonicalUrl}
          type="article"
        />
      )}
      
      <article className="bg-white dark:bg-gray-900">
        {/* Article Header */}
        <ArticleHeader narrative={narrative} />
        
        {/* Share Button - Fixed Position */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
          <ShareOptions 
            caseStudy={{
              company: narrative.company,
              lingo: `${narrative.founderName}'s Market Vision`,
              id: slug
            }}
          />
        </div>
        
        {/* Article Content */}
        <div className="container max-w-4xl mx-auto px-6 py-12">
          <ArticleContent narrative={narrative} />
          
          {/* Mobile Share Button */}
          <div className="lg:hidden mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-center">
              <ShareOptions 
                caseStudy={{
                  company: narrative.company,
                  lingo: `${narrative.founderName}'s Market Vision`,
                  id: slug
                }}
              />
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default CaseStudyDetail;
