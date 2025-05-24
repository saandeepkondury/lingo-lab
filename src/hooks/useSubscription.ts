
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_end: string | null;
}

export const useSubscription = () => {
  const { user, session, isLoggedIn } = useAuth();
  const { toast } = useToast();
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({
    subscribed: false,
    subscription_tier: null,
    subscription_end: null,
  });
  const [loading, setLoading] = useState(false);

  const checkSubscription = async () => {
    if (!isLoggedIn || !user || !session) {
      console.log('No valid session for subscription check');
      setSubscriptionData({ subscribed: false, subscription_tier: null, subscription_end: null });
      return;
    }

    setLoading(true);
    try {
      console.log('Checking subscription for user:', user.email);
      
      // Get fresh session token before making the request
      const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !currentSession) {
        console.error('Session error during subscription check:', sessionError);
        setSubscriptionData({ subscribed: false, subscription_tier: null, subscription_end: null });
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`,
        },
      });
      
      if (error) {
        console.error('Subscription check error:', error);
        // Don't show error toast for session-related issues
        if (!error.message?.includes('Session') && !error.message?.includes('Authentication')) {
          toast({
            title: "Error checking subscription",
            description: "Please try again later",
            variant: "destructive"
          });
        }
        return;
      }

      console.log('Subscription check response:', data);
      setSubscriptionData(data);
    } catch (error) {
      console.error('Subscription check failed:', error);
      // Only show user-facing error for non-auth issues
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (!errorMessage.includes('Session') && !errorMessage.includes('Authentication')) {
        toast({
          title: "Error checking subscription",
          description: "Please try again later",
          variant: "destructive"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const createCheckout = async (planType: 'basic' | 'pro' | 'investor') => {
    if (!isLoggedIn || !session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to continue",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Get fresh session token
      const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !currentSession) {
        console.error('Session error during checkout:', sessionError);
        toast({
          title: "Authentication error",
          description: "Please sign in again",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planType },
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`,
        },
      });

      if (error) {
        console.error('Checkout error:', error);
        toast({
          title: "Payment error",
          description: "Failed to create checkout session",
          variant: "destructive"
        });
        return;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      toast({
        title: "Payment error",
        description: "Failed to create checkout session",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const openCustomerPortal = async () => {
    if (!isLoggedIn || !session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to continue",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Get fresh session token
      const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !currentSession) {
        console.error('Session error during portal access:', sessionError);
        toast({
          title: "Authentication error",
          description: "Please sign in again",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`,
        },
      });

      if (error) {
        console.error('Customer portal error:', error);
        toast({
          title: "Error",
          description: "Failed to open customer portal",
          variant: "destructive"
        });
        return;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Customer portal failed:', error);
      toast({
        title: "Error",
        description: "Failed to open customer portal",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only check subscription if we have a valid session
    if (isLoggedIn && session && user) {
      // Small delay to ensure session is fully established
      const timeoutId = setTimeout(() => {
        checkSubscription();
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [isLoggedIn, session?.access_token, user?.id]);

  return {
    ...subscriptionData,
    loading,
    checkSubscription,
    createCheckout,
    openCustomerPortal,
  };
};
