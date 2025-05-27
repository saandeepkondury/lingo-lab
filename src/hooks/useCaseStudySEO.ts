
interface NarrativeSEOData {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
}

export const useCaseStudySEO = (narrative: any, slug: string): NarrativeSEOData => {
  const seoTitle = `${narrative.company} Founder Narrative: ${narrative.founderName} | LingoLab`;
  const seoDescription = `Discover how ${narrative.founderName} of ${narrative.company} is transforming ${narrative.industry} with their strategic vision and market insights.`;
  const seoKeywords = `${narrative.company}, ${narrative.founderName}, strategic narrative, ${narrative.industry}, founder insights, market transformation`;
  const canonicalUrl = `${window.location.origin}/case-studies/${slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    canonicalUrl
  };
};
