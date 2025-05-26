
interface CaseStudySEOData {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
}

export const useCaseStudySEO = (caseStudy: any, slug: string): CaseStudySEOData => {
  const seoTitle = `${caseStudy.company}: ${caseStudy.lingo} Case Study | LingoLab`;
  const seoDescription = `Learn how ${caseStudy.company} used "${caseStudy.lingo}" to ${caseStudy.tagline.toLowerCase()}. Strategic narrative case study with AI-powered insights.`;
  const seoKeywords = `${caseStudy.company}, ${caseStudy.lingo}, strategic narrative, case study, ${caseStudy.industry}, ${caseStudy.narrativeType}`;
  const canonicalUrl = `${window.location.origin}/case-studies/${slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    canonicalUrl
  };
};
