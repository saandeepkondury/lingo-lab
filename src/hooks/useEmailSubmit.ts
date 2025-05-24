
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useEmailSubmit = () => {
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
      // Insert email into newsletter_subscriptions table (updated table name)
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([
          { 
            email, 
            source: 'homepage'
          }
        ]);

      if (error) {
        console.error('Error inserting email subscription:', error);
        // If it's a duplicate email, still show success message
        if (error.code === '23505') {
          toast({
            title: "Already subscribed!",
            description: "This email is already part of our community.",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Successfully subscribed!",
          description: "You've been added to our newsletter. Welcome to the community!",
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
