
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

// Sample narrative data structure (this would come from Supabase)
const narrativeData: Record<string, any> = {
  "stripe-financial-infrastructure": {
    company: "Stripe",
    founderName: "Patrick Collison",
    founderTitle: "CEO & Co-founder",
    fundingRaised: "$2.2B",
    valuation: "$95B",
    industry: "Fintech",
    publishDate: "October 15, 2024",
    readTime: "8 min read",
    
    // Core narrative content
    marketBefore: "Before Stripe, online payments were fragmented and complex. Developers had to integrate with multiple payment processors, handle compliance manually, and deal with different APIs for different regions. The market treated payments as a necessary evil - a commodity service that businesses had to endure rather than leverage for growth.",
    
    founderInsight: "We realized that payments weren't just about moving money - they were about enabling commerce itself. Every online business needed the same foundational infrastructure, but they were all building it from scratch. We saw an opportunity to make payments as simple and powerful as cloud computing had made servers.",
    
    marketTransformation: "We're not just processing payments; we're building the economic infrastructure for the internet. Just as AWS abstracted away server management, we're abstracting away financial complexity. This means developers can focus on their core product while we handle everything from fraud detection to global compliance.",
    
    strategicVision: "The future of commerce is programmable. Every business will have financial services embedded directly into their product experience. We're building the rails that will power the next generation of internet businesses - from marketplaces to SaaS platforms to the creator economy.",
    
    competitiveNarrative: "While others see payments as transactions, we see infrastructure. While they compete on pricing, we compete on enabling new business models. Our competitors are building payment processors; we're building the financial operating system for the internet.",
    
    // Additional context
    keyMetrics: {
      revenue: "$7.4B annually",
      customers: "7M+ businesses",
      countries: "120+ countries"
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
