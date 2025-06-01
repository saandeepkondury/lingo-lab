
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
    // Always allow access - no more pay locks
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
    // Always return true - no more restrictions
    return true;
  };

  const checkIfCaseStudyAccessed = async (caseStudyId: string) => {
    // Always return true - all content is accessible
    return true;
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
