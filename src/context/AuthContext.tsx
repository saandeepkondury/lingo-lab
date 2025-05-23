
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

interface AuthContextType {
  isLoggedIn: boolean;
  isPaidUser: boolean;
  subscriptionTier: string | null;
  login: () => void;
  logout: () => void;
  checkSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const savedLoginState = localStorage.getItem('isLoggedIn');
    return savedLoginState === 'true';
  });
  
  const [isPaidUser, setIsPaidUser] = useState<boolean>(false);
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);

  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  const checkSubscription = async () => {
    if (!isLoggedIn) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Error checking subscription:', error);
        return;
      }

      setIsPaidUser(data.subscribed || false);
      setSubscriptionTier(data.subscription_tier || null);
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const login = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setIsPaidUser(false);
    setSubscriptionTier(null);
  };

  useEffect(() => {
    if (isLoggedIn) {
      checkSubscription();
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      isPaidUser, 
      subscriptionTier, 
      login, 
      logout, 
      checkSubscription 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
