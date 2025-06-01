
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import { useAuth } from '@/context/AuthContext';
import CaseStudyNotFound from '@/components/CaseStudy/CaseStudyNotFound';
import NewCaseStudyDetailHeader from '@/components/CaseStudy/NewCaseStudyDetailHeader';
import BeforeAfterSection from '@/components/CaseStudy/BeforeAfterSection';
import StorySection from '@/components/CaseStudy/StorySection';
import LockedContentSection from '@/components/CaseStudy/LockedContentSection';
import CaseStudyAccessGate from '@/components/CaseStudy/CaseStudyAccessGate';
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-teal-950">
          <div className="container max-w-4xl mx-auto px-6 py-20">
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gradient-to-r from-teal-200 to-blue-200 rounded-lg w-64 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
              </div>
            </div>
          </div>
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
      "description": "Strategic narrative case studies and insights for VC-backed startups",
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
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-teal-950">
        <article className="bg-transparent">
          {/* New Header Format with Save Button */}
          <NewCaseStudyDetailHeader narrative={narrative} slug={slug} />
          
          {/* Before/After Section - Open to all */}
          <BeforeAfterSection narrative={narrative} />
          
          {/* Story Section - Open to all */}
          <StorySection narrative={narrative} />
          
          {/* Premium Content Section - Show with overlay for non-subscribers */}
          <CaseStudyAccessGate caseStudyId={narrative.id}>
            <LockedContentSection narrative={narrative} />
          </CaseStudyAccessGate>
        </article>
      </div>
    </Layout>
  );
};

export default CaseStudyDetail;
