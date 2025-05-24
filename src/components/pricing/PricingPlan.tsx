
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

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
  const { isLoggedIn } = useAuth();
  const { subscribed, subscription_tier, loading, createCheckout, openCustomerPortal } = useSubscription();
  const { toast } = useToast();
  const isFromSignup = location.state?.fromSignup || document.referrer.includes('/join');
  
  const planType = name.toLowerCase() as 'basic' | 'pro' | 'investor';
  const isCurrentPlan = subscribed && subscription_tier?.toLowerCase() === planType;
  const isSubscribed = subscribed && (planType === 'basic' || planType === 'pro');

  const handleButtonClick = () => {
    // Ensure user is logged in before any payment action
    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please sign in to continue with your subscription",
        variant: "destructive"
      });
      return;
    }

    if (isCurrentPlan) {
      openCustomerPortal();
    } else {
      createCheckout(planType);
    }
  };

  const getButtonText = () => {
    if (!isLoggedIn) return 'Sign In Required';
    if (isCurrentPlan) return 'Manage Subscription';
    if (isFromSignup) return `Activate ${name} Plan`;
    return cta;
  };

  const getDisplayPrice = () => {
    if (oneTime) return price;
    if (billingFrequency === 'year') {
      return Math.round(price * 12 * 0.9); // 10% discount for annual
    }
    return price * 3; // Quarterly
  };

  return (
    <div 
      className={`relative rounded-xl border ${
        isCurrentPlan
          ? 'border-teal-500 shadow-lg shadow-teal-100 bg-teal-50' 
          : popular 
          ? 'border-teal-200 shadow-lg shadow-teal-100' 
          : 'border-border'
      }`}
    >
      {(popular && !isCurrentPlan) && (
        <div className="absolute -top-4 inset-x-0 flex justify-center">
          <Badge className="bg-teal-500 hover:bg-teal-600">
            {isFromSignup ? 'Recommended' : 'Most Popular'}
          </Badge>
        </div>
      )}

      {isCurrentPlan && (
        <div className="absolute -top-4 inset-x-0 flex justify-center">
          <Badge className="bg-green-500 hover:bg-green-600">
            Your Plan
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
              Billed quarterly (${getDisplayPrice()})
            </p>
          )}
          {!oneTime && price > 0 && billingFrequency === 'year' && (
            <p className="text-sm text-muted-foreground mt-1">
              Billed annually with 10% discount (${getDisplayPrice()})
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
            isCurrentPlan
              ? 'bg-green-500 hover:bg-green-600'
              : popular 
              ? 'bg-teal-500 hover:bg-teal-600'
              : ''
          }`} 
          variant={isCurrentPlan ? 'default' : popular ? 'default' : 'outline'}
          onClick={handleButtonClick}
          disabled={loading || !isLoggedIn}
        >
          {loading ? 'Loading...' : getButtonText()}
        </Button>

        {!isLoggedIn && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Please sign in to subscribe
          </p>
        )}
      </div>
    </div>
  );
};

export default PricingPlan;
