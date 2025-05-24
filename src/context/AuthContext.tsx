
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);

        // When a user signs up, update their subscriber record if it exists
        if (event === 'SIGNED_IN' && session?.user?.email) {
          setTimeout(async () => {
            try {
              // Update subscriber record to connect it with the user account
              const { error } = await supabase
                .from('subscribers')
                .update({ user_id: session.user.id })
                .eq('email', session.user.email)
                .is('user_id', null);

              if (error) {
                console.log('Failed to connect subscriber record:', error);
              } else {
                console.log('Successfully connected subscriber record to user');
              }

              await supabase.functions.invoke('check-subscription');
            } catch (error) {
              console.log('Error during post-signin operations:', error);
            }
          }, 1000);
        }
      }
    );

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Failed to get initial session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const logout = async () => {
    try {
      console.log('Logging out user...');
      // Clear local state immediately
      setUser(null);
      setSession(null);
      
      // Attempt to sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.warn('Logout error (but continuing):', error);
      }
      console.log('Logout completed');
    } catch (error) {
      console.warn('Logout failed, but clearing local state:', error);
      // Still clear local state even if Supabase call fails
      setUser(null);
      setSession(null);
    }
  };

  // Legacy functions for backward compatibility
  const login = () => {
    console.log('Use signIn instead of login');
  };

  const isLoggedIn = !!user && !!session;

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isLoggedIn, 
      login, 
      logout, 
      signUp, 
      signIn, 
      isLoading 
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
