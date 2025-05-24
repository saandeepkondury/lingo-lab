
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
  const { user, isLoggedIn, session } = useAuth();
  const { toast } = useToast();
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({
    subscribed: false,
    subscription_tier: null,
    subscription_end: null,
  });
  const [loading, setLoading] = useState(false);

  const checkSubscription = async () => {
    if (!isLoggedIn || !user || !session) {
      setSubscriptionData({ subscribed: false, subscription_tier: null, subscription_end: null });
      return;
    }

    setLoading(true);
    try {
      // Get a fresh session token
      const { data: { session: freshSession } } = await supabase.auth.getSession();
      
      if (!freshSession) {
        console.warn('No fresh session available for subscription check');
        setSubscriptionData({ subscribed: false, subscription_tier: null, subscription_end: null });
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${freshSession.access_token}`,
        },
      });
      
      if (error) {
        console.error('Subscription check error:', error);
        return;
      }

      setSubscriptionData(data);
    } catch (error) {
      console.error('Subscription check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const createCheckout = async (planType: 'basic' | 'pro' | 'investor', billingFrequency: 'quarter' | 'year' = 'quarter') => {
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
      // Get a fresh session token
      const { data: { session: freshSession } } = await supabase.auth.getSession();
      
      if (!freshSession) {
        throw new Error('No valid session found');
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planType, billingFrequency },
        headers: {
          Authorization: `Bearer ${freshSession.access_token}`,
        },
      });

      if (error) {
        console.error('Checkout error:', error);
        toast({
          title: "Payment error",
          description: error.message || "Failed to create checkout session",
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
        description: error instanceof Error ? error.message : "Failed to create checkout session",
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
      // Get a fresh session token
      const { data: { session: freshSession } } = await supabase.auth.getSession();
      
      if (!freshSession) {
        throw new Error('No valid session found');
      }

      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${freshSession.access_token}`,
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
    if (isLoggedIn && session) {
      checkSubscription();
    }
  }, [isLoggedIn, session]);

  return {
    ...subscriptionData,
    loading,
    checkSubscription,
    createCheckout,
    openCustomerPortal,
  };
};
