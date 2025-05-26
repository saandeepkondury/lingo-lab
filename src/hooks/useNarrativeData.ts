
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Narrative {
  id: string;
  term: string;
  definition: string;
  category: string;
  industry: string;
  first_detected_at: string;
  created_at: string;
  updated_at: string;
}

export interface NarrativeAnalytics {
  id: string;
  narrative_id: string;
  originality_score: number;
  adoption_velocity: number;
  vc_resonance_score: number;
  competitive_density: number;
  trend_direction: 'rising' | 'stable' | 'declining';
  calculated_at: string;
  narrative?: Narrative;
}

export interface MarketSignal {
  id: string;
  narrative_id: string;
  signal_type: string;
  score: number;
  timeframe: string;
  calculated_at: string;
  metadata: any;
  narrative?: Narrative;
}

export const useNarratives = () => {
  return useQuery({
    queryKey: ['narratives'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('narratives')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Narrative[];
    },
  });
};

export const useNarrativeAnalytics = () => {
  return useQuery({
    queryKey: ['narrative-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('narrative_analytics')
        .select(`
          *,
          narrative:narratives(*)
        `)
        .order('calculated_at', { ascending: false });
      
      if (error) throw error;
      return data as NarrativeAnalytics[];
    },
  });
};

export const useMarketSignals = (timeframe: string = 'weekly') => {
  return useQuery({
    queryKey: ['market-signals', timeframe],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('market_signals')
        .select(`
          *,
          narrative:narratives(*)
        `)
        .eq('timeframe', timeframe)
        .order('calculated_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      return data as MarketSignal[];
    },
  });
};

export const useTrendingNarratives = () => {
  return useQuery({
    queryKey: ['trending-narratives'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('narrative_analytics')
        .select(`
          *,
          narrative:narratives(*)
        `)
        .eq('trend_direction', 'rising')
        .order('adoption_velocity', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data as NarrativeAnalytics[];
    },
  });
};
