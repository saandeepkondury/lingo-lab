
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import { useAuth } from '@/context/AuthContext';
import ArticleContent from '@/components/Article/ArticleContent';
import LingoDropsSection from '@/components/CaseStudy/LingoDropsSection';
import CaseStudyDetailHeader from '@/components/CaseStudy/CaseStudyDetailHeader';
import CaseStudyMetadata from '@/components/CaseStudy/CaseStudyMetadata';
import CaseStudyNotFound from '@/components/CaseStudy/CaseStudyNotFound';
import { useFounderNarrativeBySlug } from '@/hooks/useFounderNarratives';

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isLoggedIn } = useAuth();
  
  const { data: narrative, isLoading, error } = useFounderNarrativeBySlug(slug || '');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container max-w-4xl mx-auto px-6 py-20">
          <div className="text-center">Loading...</div>
        </div>
      </Layout>
    );
  }
  
  if (error || !narrative || !slug) {
    return <CaseStudyNotFound slug={slug} />;
  }

  // Generate structured data for the article
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${narrative.company} Strategic Narrative: ${narrative.key_phrase}`,
    "description": `Discover how ${narrative.founder_name} of ${narrative.company} transformed ${narrative.industry} with their "${narrative.key_phrase}" strategic narrative.`,
    "image": `${window.location.origin}/placeholder.svg`,
    "url": `${window.location.origin}/case-studies/${slug}`,
    "datePublished": narrative.created_at,
    "dateModified": narrative.updated_at,
    "author": {
      "@type": "Person",
      "name": narrative.founder_name,
      "jobTitle": narrative.founder_title,
      "worksFor": {
        "@type": "Organization",
        "name": narrative.company
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "LingoLab",
      "description": "Strategic narrative case studies and insights for startups",
      "url": window.location.origin,
      "logo": `${window.location.origin}/placeholder.svg`
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${window.location.origin}/case-studies/${slug}`
    },
    "articleSection": "Strategic Narrative",
    "keywords": `${narrative.company}, ${narrative.founder_name}, strategic narrative, ${narrative.industry}, ${narrative.key_phrase}`,
    "about": {
      "@type": "Organization",
      "name": narrative.company,
      "description": `${narrative.company} - ${narrative.tagline || ''}`,
      "foundingDate": narrative.founded_year,
      "industry": narrative.industry
    }
  };
  
  return (
    <Layout>
      <SEOHead
        title={`${narrative.company} Strategic Narrative: ${narrative.key_phrase} | LingoLab`}
        description={`Discover how ${narrative.founder_name} of ${narrative.company} transformed ${narrative.industry} with their "${narrative.key_phrase}" strategic narrative. Learn the market insights that drove their success.`}
        keywords={`${narrative.company}, ${narrative.founder_name}, strategic narrative, ${narrative.industry}, ${narrative.key_phrase}, market positioning, startup growth`}
        canonicalUrl={`${window.location.origin}/case-studies/${slug}`}
        type="article"
        author={{ name: narrative.founder_name }}
        publishDate={narrative.created_at}
        modifiedDate={narrative.updated_at}
        structuredData={structuredData}
      />
      
      <article className="bg-white dark:bg-gray-900">
        {/* Article Header */}
        <CaseStudyDetailHeader narrative={narrative} slug={slug} />
        
        {/* Metadata */}
        <CaseStudyMetadata narrative={narrative} />
        
        {/* Lingo Drops Section - Featured prominently */}
        <LingoDropsSection narrative={narrative} />
        
        {/* Article Content - Streamlined */}
        <div className="container max-w-4xl mx-auto px-6 py-12">
          <ArticleContent narrative={narrative} />
        </div>
      </article>
    </Layout>
  );
};

export default CaseStudyDetail;
