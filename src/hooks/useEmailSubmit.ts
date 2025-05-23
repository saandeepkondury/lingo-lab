
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const useEmailSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (
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

    // Simulate submission processing
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      
      // Navigate to pricing page after successful submission
      navigate('/pricing');
      
      toast({
        title: "Email submitted",
        description: "Thank you for your interest! Check out our pricing plans.",
      });
    }, 800);
  };

  return { handleSubmit, isSubmitting };
};
