
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useCaseStudyAccess = () => {
  const { user, isLoggedIn } = useAuth();
  const { subscribed, subscription_tier } = useSubscription();
  const { toast } = useToast();
  const [accessCount, setAccessCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const checkAccessLimit = async () => {
    if (!isLoggedIn || !user) return true; // Allow anonymous access

    // Pro and Lingo Strategy users have unlimited access
    if (subscription_tier === 'Pro' || subscription_tier === 'Lingo Strategy') {
      return true;
    }

    // Basic users have 10 case studies per month
    if (subscription_tier === 'Basic') {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { data, error } = await supabase
        .from('user_case_study_access')
        .select('id')
        .eq('user_id', user.id)
        .gte('accessed_at', startOfMonth.toISOString());

      if (error) {
        console.error('Error checking access limit:', error);
        return false;
      }

      const currentCount = data?.length || 0;
      setAccessCount(currentCount);
      
      if (currentCount >= 10) {
        toast({
          title: "Monthly limit reached",
          description: "You've read 10 case studies this month. Upgrade to Pro for unlimited access!",
          variant: "destructive"
        });
        return false;
      }
      
      return true;
    }

    // Non-subscribers get limited access
    return true;
  };

  const recordAccess = async (caseStudyId: string) => {
    if (!isLoggedIn || !user) return;

    const { error } = await supabase
      .from('user_case_study_access')
      .insert({
        user_id: user.id,
        case_study_id: caseStudyId
      });

    if (error) {
      console.error('Error recording access:', error);
    }
  };

  const hasAccess = async (caseStudyId: string) => {
    if (!isLoggedIn) {
      // Show upgrade prompt for anonymous users
      toast({
        title: "Sign up required",
        description: "Create a free account to access case studies!",
        variant: "destructive"
      });
      return false;
    }
    
    const canAccess = await checkAccessLimit();
    if (canAccess && subscription_tier === 'Basic') {
      await recordAccess(caseStudyId);
    }
    
    return canAccess;
  };

  const checkIfCaseStudyAccessed = async (caseStudyId: string) => {
    if (!isLoggedIn || !user) return false;
    
    // Pro and Lingo Strategy users always have access
    if (subscription_tier === 'Pro' || subscription_tier === 'Lingo Strategy') {
      return true;
    }

    // For Basic users, check if they've already accessed this specific case study
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from('user_case_study_access')
      .select('id')
      .eq('user_id', user.id)
      .eq('case_study_id', caseStudyId)
      .gte('accessed_at', startOfMonth.toISOString());

    if (error) {
      console.error('Error checking case study access:', error);
      return false;
    }

    return data && data.length > 0;
  };

  return {
    hasAccess,
    accessCount,
    loading,
    checkAccessLimit,
    checkIfCaseStudyAccessed,
    isBasicUser: subscription_tier === 'Basic',
    isProUser: subscription_tier === 'Pro' || subscription_tier === 'Lingo Strategy'
  };
};
