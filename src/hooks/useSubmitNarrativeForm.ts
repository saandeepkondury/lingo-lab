
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useSubmitFounderNarrative } from '@/hooks/useFounderNarratives';
import { FounderFormData } from '@/types/founderForm';
import { generateNarrativeFromForm, validateFormData, createSlug } from '@/utils/narrativeGenerator';

const initialFormData: FounderFormData = {
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
};

export const useSubmitNarrativeForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { submitNarrative, isSubmitting } = useSubmitFounderNarrative();
  const [formData, setFormData] = useState<FounderFormData>(initialFormData);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (section: string, field: string, value: any) => {
    setFormData(prev => {
      const currentSection = prev[section as keyof FounderFormData];
      if (typeof currentSection === 'object' && currentSection !== null) {
        return {
          ...prev,
          [section]: {
            ...currentSection,
            [field]: value
          }
        };
      }
      return prev;
    });
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

  return {
    formData,
    handleInputChange,
    handleNestedChange,
    handleArrayChange,
    handleMultiSelectChange,
    handleSubmit,
    isSubmitting
  };
};
