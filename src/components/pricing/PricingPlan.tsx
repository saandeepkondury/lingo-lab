import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export interface PlanFeature {
  included: boolean;
  text: string;
}

export interface PricingPlanProps {
  name: string;
  description: string;
  price: number;
  frequency?: string;
  oneTime?: boolean;
  popular?: boolean;
  features: PlanFeature[];
  cta: string;
  billingFrequency: 'quarter' | 'year';
}

const PricingPlan = ({ 
  name, 
  description, 
  price, 
  frequency, 
  oneTime, 
  popular, 
  features, 
  cta, 
  billingFrequency 
}: PricingPlanProps) => {
  const location = useLocation();
  const isFromSignup = location.state?.fromSignup || document.referrer.includes('/join');
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  const handlePlanSelection = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please log in to subscribe to a plan.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("No active session");
      }

      let functionName;
      let payload = {};

      if (oneTime) {
        // Investor plan - one-time payment
        functionName = 'create-payment-checkout';
      } else {
        // Basic/Pro plans - subscription
        functionName = 'create-subscription-checkout';
        payload = {
          planName: name,
          billingFrequency: billingFrequency
        };
      }

      const { data, error } = await supabase.functions.invoke(functionName, {
        body: payload,
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        throw error;
      }

      if (data.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Error",
        description: "Failed to start checkout process. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={`relative rounded-xl border ${
        popular 
          ? 'border-teal-200 shadow-lg shadow-teal-100' 
          : 'border-border'
      }`}
    >
      {popular && (
        <div className="absolute -top-4 inset-x-0 flex justify-center">
          <Badge className="bg-teal-500 hover:bg-teal-600">
            {isFromSignup ? 'Recommended' : 'Most Popular'}
          </Badge>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <p className="text-muted-foreground">{description}</p>
        
        <div className="mt-4 mb-6">
          <div className="flex items-baseline">
            <span className="text-4xl font-bold">
              ${oneTime ? price : price}
            </span>
            {!oneTime && (
              <span className="text-muted-foreground ml-1">
                /month
              </span>
            )}
            {oneTime && (
              <span className="text-muted-foreground ml-1">one-time</span>
            )}
          </div>
          {!oneTime && price > 0 && billingFrequency === 'quarter' && (
            <p className="text-sm text-muted-foreground mt-1">
              Billed quarterly (${price * 3})
            </p>
          )}
          {!oneTime && price > 0 && billingFrequency === 'year' && (
            <p className="text-sm text-muted-foreground mt-1">
              Billed annually with 10% discount (${Math.round(price * 12 * 0.9)})
            </p>
          )}
        </div>
        
        <ul className="space-y-3 mb-6">
          {features.map((feature, fIndex) => (
            <li key={fIndex} className="flex items-start gap-2">
              {feature.included ? (
                <Check className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              )}
              <span className={!feature.included ? 'text-muted-foreground' : ''}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        
        <Button 
          className={`w-full ${
            popular 
              ? 'bg-teal-500 hover:bg-teal-600'
              : ''
          }`} 
          variant={popular ? 'default' : 'outline'}
          onClick={handlePlanSelection}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : (isFromSignup ? `Activate ${name} Plan` : cta)}
        </Button>
      </div>
    </div>
  );
};

export default PricingPlan;
