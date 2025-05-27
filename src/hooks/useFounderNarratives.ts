
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
  lingo_evolution: string | null;
  why_it_worked: string | null;
  before_after_positioning: any;
  market_themes: string[] | null;
  strategic_patterns: string[] | null;
  transformation_type: string | null;
  narrative_archetype: string | null;
  metrics: any;
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
      
      // Return hardcoded data for Stripe case study
      if (slug === 'stripe-financial-infrastructure') {
        const stripeData: FounderNarrative = {
          id: 'stripe-hardcoded',
          company: 'Stripe',
          founder_name: 'Patrick Collison',
          founder_title: 'CEO & Co-founder',
          funding_raised: '$600M',
          valuation: '$95B',
          industry: 'Fintech',
          founded_year: '2010',
          employee_count: '4000+',
          headquarters: 'San Francisco, CA',
          key_phrase: 'Financial Infrastructure for the Internet',
          tagline: 'Building economic infrastructure for the internet to increase GDP globally',
          lingo_evolution: `Stripe's evolution from "payments company" to "financial infrastructure" represents one of the most successful narrative transformations in tech history. Initially positioned as a simple payment processor, the Collison brothers recognized that framing Stripe as infrastructure would unlock exponentially more value.

The shift began around 2015 when Patrick Collison started consistently using "infrastructure" in interviews and presentations. This wasn't just marketing speak - it fundamentally changed how developers, investors, and customers perceived Stripe's role in the ecosystem.

By positioning as infrastructure rather than a service, Stripe transformed from a commodity payment processor into an essential platform that enables entire business models. This narrative shift justified premium pricing, attracted top engineering talent, and enabled expansion into adjacent financial services.`,
          why_it_worked: `The "Financial Infrastructure" narrative worked because it solved a fundamental positioning problem. Traditional payment companies were seen as commoditized services competing on price and features. Infrastructure companies, however, are viewed as foundational platforms that enable innovation.

This positioning allowed Stripe to:

1. **Command Premium Pricing**: Infrastructure is mission-critical, justifying higher fees than commodity services
2. **Attract Developer Mindshare**: Developers choose infrastructure they can build on, not just integrate with
3. **Enable Platform Expansion**: Infrastructure companies naturally expand into adjacent services
4. **Justify Massive Valuation**: Infrastructure companies are valued on total addressable market, not transaction volume

The narrative also aligned perfectly with the broader "API Economy" trend, positioning Stripe as the AWS of payments - a comparison that resonated strongly with technical audiences and investors familiar with cloud infrastructure success stories.`,
          before_after_positioning: {
            before: "Payment processor competing on features and pricing with other payment companies",
            after: "Essential financial infrastructure that enables internet commerce and new business models"
          },
          market_themes: ['API Economy', 'Developer Experience', 'Financial Infrastructure', 'Platform Strategy'],
          strategic_patterns: ['Platform Strategy', 'Developer-First GTM', 'Category Creation', 'Infrastructure Play'],
          transformation_type: 'Market Redefinition',
          narrative_archetype: 'Infrastructure Play',
          metrics: {
            scale: {
              users: '4M+ businesses',
              revenue: '$12B+ processed annually',
              market_share: '30% of online payments',
              geographic_reach: '46 countries'
            },
            impact: {
              users: 'Enabled millions of businesses to accept payments',
              revenue: 'Generated billions in economic activity',
              market_share: 'Redefined payment infrastructure category',
              geographic_reach: 'Global expansion of internet commerce'
            }
          },
          published: true,
          slug: 'stripe-financial-infrastructure',
          created_at: '2024-01-15T10:00:00Z',
          updated_at: '2024-01-15T10:00:00Z'
        };
        
        console.log('Returning hardcoded Stripe data:', stripeData);
        return stripeData;
      }
      
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
