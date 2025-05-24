
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/context/AuthContext';

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
  const isFromSignup = location.state?.fromSignup || document.referrer.includes('/join');
  
  const planType = name.toLowerCase() as 'basic' | 'pro' | 'investor';
  const isCurrentPlan = subscribed && subscription_tier?.toLowerCase() === planType;

  const handleButtonClick = () => {
    if (!isLoggedIn) {
      window.location.href = '/join';
      return;
    }

    if (isCurrentPlan) {
      openCustomerPortal();
    } else {
      createCheckout(planType, billingFrequency);
    }
  };

  const getButtonText = () => {
    if (!isLoggedIn) return cta;
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

  const getMonthlyPrice = () => {
    if (oneTime) return price;
    if (billingFrequency === 'year') {
      return Math.round(price * 0.9); // 10% discount applied to monthly price
    }
    return price;
  };

  const getSavingsText = () => {
    if (oneTime || price === 0) return null;
    if (billingFrequency === 'year') {
      const yearlySavings = Math.round(price * 12 * 0.1);
      return `Save $${yearlySavings}/year`;
    }
    return null;
  };

  return (
    <div 
      className={`relative rounded-xl border ${
        isCurrentPlan
          ? 'border-teal-500 dark:border-teal-400 shadow-lg shadow-teal-100 dark:shadow-teal-900/50 bg-teal-50 dark:bg-teal-900/20' 
          : popular 
          ? 'border-teal-200 dark:border-teal-700 shadow-lg shadow-teal-100 dark:shadow-teal-900/30 bg-card dark:bg-card' 
          : 'border-border dark:border-border bg-card dark:bg-card'
      }`}
    >
      {(popular && !isCurrentPlan) && (
        <div className="absolute -top-4 inset-x-0 flex justify-center">
          <Badge className="bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white">
            {isFromSignup ? 'Recommended' : 'Most Popular'}
          </Badge>
        </div>
      )}

      {isCurrentPlan && (
        <div className="absolute -top-4 inset-x-0 flex justify-center">
          <Badge className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white">
            Your Plan
          </Badge>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-foreground">{name}</h3>
        <p className="text-muted-foreground">{description}</p>
        
        <div className="mt-4 mb-6">
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-foreground">
              ${oneTime ? price : getMonthlyPrice()}
            </span>
            {!oneTime && (
              <span className="text-muted-foreground ml-1">
                /month
              </span>
            )}
            {oneTime && (
              <span className="text-muted-foreground ml-1">one-time</span>
            )}
            {billingFrequency === 'year' && !oneTime && price > 0 && (
              <span className="ml-2 text-sm bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-1 rounded-full font-medium">
                10% OFF
              </span>
            )}
          </div>
          {!oneTime && price > 0 && billingFrequency === 'quarter' && (
            <p className="text-sm text-muted-foreground mt-1">
              Billed quarterly (${getDisplayPrice()})
            </p>
          )}
          {!oneTime && price > 0 && billingFrequency === 'year' && (
            <div className="mt-1">
              <p className="text-sm text-muted-foreground">
                Billed annually (${getDisplayPrice()})
              </p>
              {getSavingsText() && (
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                  {getSavingsText()}
                </p>
              )}
            </div>
          )}
        </div>
        
        <ul className="space-y-3 mb-6">
          {features.map((feature, fIndex) => (
            <li key={fIndex} className="flex items-start gap-2">
              {feature.included ? (
                <Check className="h-5 w-5 text-teal-500 dark:text-teal-400 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              )}
              <span className={!feature.included ? 'text-muted-foreground' : 'text-foreground'}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        
        <Button 
          className={`w-full ${
            isCurrentPlan
              ? 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700'
              : popular 
              ? 'bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700'
              : ''
          }`} 
          variant={isCurrentPlan ? 'default' : popular ? 'default' : 'outline'}
          onClick={handleButtonClick}
          disabled={loading}
        >
          {loading ? 'Loading...' : getButtonText()}
        </Button>
      </div>
    </div>
  );
};

export default PricingPlan;
