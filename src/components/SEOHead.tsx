
import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  imageUrl?: string;
  type?: string;
  canonicalUrl?: string;
  author?: {
    name: string;
    url?: string;
  };
  publishDate?: string;
  modifiedDate?: string;
  structuredData?: any;
}

const SEOHead = ({ 
  title, 
  description, 
  keywords = "", 
  imageUrl, 
  type = "website",
  canonicalUrl,
  author,
  publishDate,
  modifiedDate,
  structuredData
}: SEOHeadProps) => {
  const url = canonicalUrl || window.location.href;
  const defaultImage = imageUrl || `${window.location.origin}/placeholder.svg`;
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Find or create meta tags
    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) || 
                    document.querySelector(`meta[property="${name}"]`);
      
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:') || name.startsWith('article:')) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };
    
    // Basic meta tags
    updateMeta('description', description);
    if (keywords) updateMeta('keywords', keywords);
    updateMeta('robots', 'index, follow');
    updateMeta('viewport', 'width=device-width, initial-scale=1');
    
    // Open Graph meta tags
    updateMeta('og:title', title);
    updateMeta('og:description', description);
    updateMeta('og:url', url);
    updateMeta('og:type', type);
    updateMeta('og:image', defaultImage);
    updateMeta('og:image:alt', `${title} - LingoLab`);
    updateMeta('og:site_name', 'LingoLab');
    updateMeta('og:locale', 'en_US');
    
    // Article specific meta tags
    if (type === 'article' && author) {
      updateMeta('article:author', author.name);
      if (publishDate) updateMeta('article:published_time', publishDate);
      if (modifiedDate) updateMeta('article:modified_time', modifiedDate);
      updateMeta('article:section', 'Strategic Narrative');
      updateMeta('article:tag', keywords);
    }
    
    // Twitter meta tags
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', defaultImage);
    updateMeta('twitter:site', '@LingoLabSite');
    updateMeta('twitter:creator', '@LingoLabSite');
    
    // Canonical URL
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      if (canonicalElement) {
        canonicalElement.setAttribute('href', canonicalUrl);
      } else {
        canonicalElement = document.createElement('link');
        canonicalElement.setAttribute('rel', 'canonical');
        canonicalElement.setAttribute('href', canonicalUrl);
        document.head.appendChild(canonicalElement);
      }
    }
    
    // Structured Data (JSON-LD)
    const removeExistingStructuredData = () => {
      const existing = document.querySelector('script[type="application/ld+json"]');
      if (existing) {
        existing.remove();
      }
    };
    
    const addStructuredData = (data: any) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };
    
    // Remove existing structured data
    removeExistingStructuredData();
    
    // Add new structured data
    if (structuredData) {
      addStructuredData(structuredData);
    } else {
      // Default organization schema
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "LingoLab",
        "description": "Strategic narrative case studies and insights for startups",
        "url": window.location.origin,
        "logo": `${window.location.origin}/placeholder.svg`,
        "sameAs": [
          "https://x.com/LingoLabSite",
          "https://www.linkedin.com/company/lingolab-site/"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "hello@lingolab.site",
          "contactType": "customer service"
        }
      };
      
      if (type === 'article') {
        const articleSchema = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": title,
          "description": description,
          "image": defaultImage,
          "url": url,
          "datePublished": publishDate,
          "dateModified": modifiedDate || publishDate,
          "author": {
            "@type": "Person",
            "name": author?.name || "LingoLab Team"
          },
          "publisher": organizationSchema,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
          }
        };
        addStructuredData(articleSchema);
      } else {
        addStructuredData(organizationSchema);
      }
    }
    
    // Cleanup function
    return () => {
      document.title = 'LingoLab - Strategic Narrative Case Studies';
    };
  }, [title, description, keywords, imageUrl, url, type, canonicalUrl, author, publishDate, modifiedDate, structuredData]);
  
  return null; // This component doesn't render anything
};

export default SEOHead;
