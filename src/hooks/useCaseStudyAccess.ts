
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
    if (!isLoggedIn || !user) return false;

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

    // Non-subscribers (shouldn't happen with new system, but fallback)
    return false;
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
    if (!isLoggedIn) return true; // Allow anonymous access to content
    
    const canAccess = await checkAccessLimit();
    if (canAccess && subscription_tier === 'Basic') {
      await recordAccess(caseStudyId);
    }
    
    return canAccess;
  };

  return {
    hasAccess,
    accessCount,
    loading,
    checkAccessLimit,
    isBasicUser: subscription_tier === 'Basic',
    isProUser: subscription_tier === 'Pro' || subscription_tier === 'Lingo Strategy'
  };
};
