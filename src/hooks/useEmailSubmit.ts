
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useEmailSubmit = (source: 'homepage' | 'newsletter' = 'homepage') => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (
    e: React.FormEvent,
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>
  ) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Submitting email signup:', email, 'from', source);
      
      const { data, error } = await supabase.functions.invoke('email-signup', {
        body: { email, source }
      });

      if (error) {
        console.error('Email signup error:', error);
        throw error;
      }

      console.log('Email signup response:', data);

      if (data.alreadySignedUp) {
        toast({
          title: "Already signed up!",
          description: data.message,
        });
      } else {
        toast({
          title: "Successfully signed up!",
          description: data.message,
        });
      }

      setEmail('');
      navigate('/join');
    } catch (error) {
      console.error('Error submitting email:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting };
};
