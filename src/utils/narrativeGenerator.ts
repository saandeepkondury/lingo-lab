
import { FounderFormData } from '@/types/founderForm';

// Utility function to convert form data into the narrative structure
export const generateNarrativeFromForm = (formData: FounderFormData, slug: string) => {
  return {
    // Basic Company Information
    company: formData.company,
    founderName: formData.founderName,
    founderTitle: formData.founderTitle,
    fundingRaised: formData.fundingRaised,
    valuation: formData.valuation,
    industry: formData.industry,
    foundedYear: formData.foundedYear,
    employeeCount: formData.employeeCount,
    headquarters: formData.headquarters,
    
    // Publication Details (auto-generated)
    publishDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    readTime: "8 min read", // Could be calculated based on content length
    
    // Core Narrative
    keyPhrase: formData.keyPhrase,
    tagline: formData.tagline,
    
    // Market Context (direct from form)
    marketBefore: formData.marketBefore,
    founderInsight: formData.founderInsight,
    marketTransformation: formData.marketTransformation,
    strategicVision: formData.strategicVision,
    competitiveAdvantage: formData.competitiveAdvantage,
    
    // Market Intelligence
    marketThemes: formData.marketThemes,
    strategicPatterns: formData.strategicPatterns,
    transformationType: formData.transformationType,
    narrativeArchetype: formData.narrativeArchetype,
    
    // Metrics
    metrics: formData.metrics,
    
    // Strategic Insights
    strategicInsights: formData.strategicInsights,
    
    // Market Landscape
    marketLandscape: formData.marketLandscape
  };
};

// Function to create a URL-friendly slug from company name
export const createSlug = (companyName: string): string => {
  return companyName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Validation function for form data
export const validateFormData = (formData: FounderFormData): string[] => {
  const errors: string[] = [];
  
  // Required fields validation
  if (!formData.company.trim()) errors.push("Company name is required");
  if (!formData.founderName.trim()) errors.push("Founder name is required");
  if (!formData.keyPhrase.trim()) errors.push("Key phrase is required");
  if (!formData.marketBefore.trim()) errors.push("Market before description is required");
  if (!formData.founderInsight.trim()) errors.push("Founder insight is required");
  if (!formData.marketTransformation.trim()) errors.push("Market transformation description is required");
  
  // Minimum content length validation
  if (formData.marketBefore.length < 100) errors.push("Market before description should be at least 100 characters");
  if (formData.founderInsight.length < 100) errors.push("Founder insight should be at least 100 characters");
  
  // Strategic insights validation
  if (formData.strategicInsights.length < 2) errors.push("At least 2 strategic insights are required");
  
  return errors;
};
