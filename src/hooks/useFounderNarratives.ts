
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface FounderNarrative {
  id: string;
  company: string;
  founder_name: string;
  founder_title: string;
  funding_raised: string | null;
  valuation: string | null;
  industry: string;
  founded_year: string | null;
  employee_count: string | null;
  headquarters: string | null;
  key_phrase: string;
  tagline: string | null;
  market_before: string;
  founder_insight: string;
  market_transformation: string;
  strategic_vision: string;
  competitive_advantage: string;
  market_themes: string[] | null;
  strategic_patterns: string[] | null;
  transformation_type: string | null;
  narrative_archetype: string | null;
  metrics: any;
  strategic_insights: string[] | null;
  market_landscape: any;
  published: boolean;
  slug: string | null;
  created_at: string;
  updated_at: string;
}

interface UseFounderNarrativesProps {
  industry?: string;
  transformationType?: string;
  narrativeArchetype?: string;
  marketThemes?: string[];
  strategicPatterns?: string[];
}

export const useFounderNarratives = (filters?: UseFounderNarrativesProps) => {
  return useQuery({
    queryKey: ['founder-narratives', filters],
    queryFn: async () => {
      console.log('Fetching founder narratives with filters:', filters);
      
      const { data, error } = await supabase.rpc('get_published_narratives', {
        industry_filter: filters?.industry || null,
        transformation_type_filter: filters?.transformationType || null,
        narrative_archetype_filter: filters?.narrativeArchetype || null,
        market_themes_filter: filters?.marketThemes || null,
        strategic_patterns_filter: filters?.strategicPatterns || null
      });

      if (error) {
        console.error('Error fetching founder narratives:', error);
        throw error;
      }

      console.log('Fetched founder narratives:', data);
      return data as FounderNarrative[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFounderNarrativeBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['founder-narrative', slug],
    queryFn: async () => {
      console.log('Fetching founder narrative by slug:', slug);
      
      const { data, error } = await supabase
        .from('founder_narratives')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (error) {
        console.error('Error fetching founder narrative by slug:', error);
        throw error;
      }

      console.log('Fetched founder narrative by slug:', data);
      return data as FounderNarrative | null;
    },
    enabled: !!slug,
  });
};

export const useSubmitFounderNarrative = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitNarrative = async (formData: any) => {
    setIsSubmitting(true);
    console.log('Submitting founder narrative:', formData);

    try {
      const { data, error } = await supabase
        .from('founder_narratives')
        .insert([formData])
        .select()
        .single();

      if (error) {
        console.error('Error submitting founder narrative:', error);
        throw error;
      }

      console.log('Successfully submitted founder narrative:', data);
      return data;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitNarrative, isSubmitting };
};
