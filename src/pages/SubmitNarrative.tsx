import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useSubmitFounderNarrative } from '@/hooks/useFounderNarratives';
import { FounderFormData, transformationTypes, narrativeArchetypes, marketThemeOptions, strategicPatternOptions } from '@/types/founderForm';
import { generateNarrativeFromForm, validateFormData, createSlug } from '@/utils/narrativeGenerator';

const SubmitNarrative = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { submitNarrative, isSubmitting } = useSubmitFounderNarrative();
  
  const [formData, setFormData] = useState<FounderFormData>({
    company: '',
    founderName: '',
    founderTitle: '',
    fundingRaised: '',
    valuation: '',
    industry: '',
    foundedYear: '',
    employeeCount: '',
    headquarters: '',
    keyPhrase: '',
    tagline: '',
    marketBefore: '',
    founderInsight: '',
    marketTransformation: '',
    strategicVision: '',
    competitiveAdvantage: '',
    marketThemes: [],
    strategicPatterns: [],
    transformationType: '',
    narrativeArchetype: '',
    metrics: {
      scale: {
        revenue: '',
        users: '',
        marketShare: '',
        geographicReach: ''
      },
      speed: {
        categoryDefinition: '',
        marketLeadership: '',
        globalExpansion: ''
      },
      adoption: {
        industryStandard: '',
        competitorResponse: '',
        marketEducation: ''
      }
    },
    strategicInsights: ['', '', ''],
    marketLandscape: {
      beforeCompany: '',
      companyPosition: '',
      competitorResponse: '',
      futureState: ''
    }
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof FounderFormData],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => {
      const array = [...(prev[field as keyof FounderFormData] as string[])];
      array[index] = value;
      return {
        ...prev,
        [field]: array
      };
    });
  };

  const handleMultiSelectChange = (field: string, option: string) => {
    setFormData(prev => {
      const currentValues = prev[field as keyof FounderFormData] as string[];
      const newValues = currentValues.includes(option)
        ? currentValues.filter(v => v !== option)
        : [...currentValues, option];
      
      return {
        ...prev,
        [field]: newValues
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const errors = validateFormData(formData);
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors[0],
        variant: "destructive"
      });
      return;
    }

    try {
      const slug = createSlug(formData.company);
      const narrativeData = generateNarrativeFromForm(formData, slug);
      
      // Convert to database format
      const dbData = {
        company: narrativeData.company,
        founder_name: narrativeData.founderName,
        founder_title: narrativeData.founderTitle,
        funding_raised: narrativeData.fundingRaised,
        valuation: narrativeData.valuation,
        industry: narrativeData.industry,
        founded_year: narrativeData.foundedYear,
        employee_count: narrativeData.employeeCount,
        headquarters: narrativeData.headquarters,
        key_phrase: narrativeData.keyPhrase,
        tagline: narrativeData.tagline,
        market_before: narrativeData.marketBefore,
        founder_insight: narrativeData.founderInsight,
        market_transformation: narrativeData.marketTransformation,
        strategic_vision: narrativeData.strategicVision,
        competitive_advantage: narrativeData.competitiveAdvantage,
        market_themes: narrativeData.marketThemes,
        strategic_patterns: narrativeData.strategicPatterns,
        transformation_type: narrativeData.transformationType,
        narrative_archetype: narrativeData.narrativeArchetype,
        metrics: narrativeData.metrics,
        strategic_insights: narrativeData.strategicInsights,
        market_landscape: narrativeData.marketLandscape,
        published: false, // Needs review before publishing
        slug: slug
      };

      await submitNarrative(dbData);
      
      toast({
        title: "Success!",
        description: "Your narrative has been submitted for review. We'll contact you soon!"
      });

      navigate('/submit');
    } catch (error) {
      console.error('Error submitting narrative:', error);
      toast({
        title: "Error",
        description: "Failed to submit your narrative. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <section className="py-12">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold mb-4">Submit Your Founder Narrative</h1>
            <p className="text-lg text-muted-foreground">
              Share your strategic narrative and get featured in our case study library
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Basics */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Company Basics</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company Name*</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="founderName">Your Name*</Label>
                  <Input
                    id="founderName"
                    value={formData.founderName}
                    onChange={(e) => handleInputChange('founderName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="founderTitle">Your Title*</Label>
                  <Input
                    id="founderTitle"
                    value={formData.founderTitle}
                    onChange={(e) => handleInputChange('founderTitle', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry*</Label>
                  <Input
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Key Narrative */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Key Narrative Elements</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="keyPhrase">Key Phrase/Lingo*</Label>
                  <Input
                    id="keyPhrase"
                    value={formData.keyPhrase}
                    onChange={(e) => handleInputChange('keyPhrase', e.target.value)}
                    placeholder="e.g., 'Financial Infrastructure'"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="tagline">Company Tagline</Label>
                  <Input
                    id="tagline"
                    value={formData.tagline}
                    onChange={(e) => handleInputChange('tagline', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Market Story */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Your Market Story</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="marketBefore">Market Before Your Company*</Label>
                  <Textarea
                    id="marketBefore"
                    value={formData.marketBefore}
                    onChange={(e) => handleInputChange('marketBefore', e.target.value)}
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="founderInsight">Your Key Insight*</Label>
                  <Textarea
                    id="founderInsight"
                    value={formData.founderInsight}
                    onChange={(e) => handleInputChange('founderInsight', e.target.value)}
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="marketTransformation">How You're Transforming the Market*</Label>
                  <Textarea
                    id="marketTransformation"
                    value={formData.marketTransformation}
                    onChange={(e) => handleInputChange('marketTransformation', e.target.value)}
                    rows={4}
                    required
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Narrative"}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default SubmitNarrative;
