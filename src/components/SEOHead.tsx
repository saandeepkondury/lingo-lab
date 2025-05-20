
import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  imageUrl?: string;
  type?: string;
  canonicalUrl?: string;
}

const SEOHead = ({ 
  title, 
  description, 
  keywords = "", 
  imageUrl, 
  type = "article",
  canonicalUrl
}: SEOHeadProps) => {
  const url = canonicalUrl || window.location.href;
  
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
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
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
    
    // Open Graph meta tags
    updateMeta('og:title', title);
    updateMeta('og:description', description);
    updateMeta('og:url', url);
    updateMeta('og:type', type);
    if (imageUrl) updateMeta('og:image', imageUrl);
    
    // Twitter meta tags
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    if (imageUrl) updateMeta('twitter:image', imageUrl);
    
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
    
    // Cleanup function
    return () => {
      document.title = 'LingoLab - Strategic Narrative Case Studies';
    };
  }, [title, description, keywords, imageUrl, url, type, canonicalUrl]);
  
  return null; // This component doesn't render anything
};

export default SEOHead;
