
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
  
  const planType = name.toLowerCase().replace(' ', '_') as 'basic' | 'pro' | 'lingo_strategy';
  const isCurrentPlan = subscribed && subscription_tier?.toLowerCase() === planType;
  const isLingoStrategy = name === 'Lingo Strategy';

  const handleButtonClick = () => {
    if (!isLoggedIn) {
      window.location.href = '/join';
      return;
    }

    if (isCurrentPlan) {
      openCustomerPortal();
    } else if (isLingoStrategy) {
      // For lingo strategy, open a contact form or booking link
      window.open('mailto:hello@lingolab.com?subject=Lingo Strategy Consultation&body=I\'m interested in the 3-month lingo strategy transformation program.', '_blank');
    } else {
      createCheckout(planType, billingFrequency);
    }
  };

  const getButtonText = () => {
    if (!isLoggedIn) return cta;
    if (isCurrentPlan) return 'Manage Subscription';
    if (isLingoStrategy) return 'Book Consultation';
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
        isLingoStrategy
          ? 'border-gold-500 dark:border-gold-400 shadow-2xl shadow-gold-100 dark:shadow-gold-900/50 bg-gradient-to-br from-gold-50 to-orange-50 dark:from-gold-900/30 dark:to-orange-900/30 transform scale-105' 
          : isCurrentPlan
          ? 'border-teal-500 dark:border-teal-400 shadow-lg shadow-teal-100 dark:shadow-teal-900/50 bg-teal-50 dark:bg-teal-900/20' 
          : popular 
          ? 'border-teal-200 dark:border-teal-700 shadow-lg shadow-teal-100 dark:shadow-teal-900/30 bg-card dark:bg-card' 
          : 'border-border dark:border-border bg-card dark:bg-card'
      }`}
    >
      {isLingoStrategy && (
        <div className="absolute -top-4 inset-x-0 flex justify-center">
          <Badge className="bg-gradient-to-r from-gold-500 to-orange-500 hover:from-gold-600 hover:to-orange-600 text-white font-bold">
            ✨ Complete Transformation
          </Badge>
        </div>
      )}

      {(popular && !isCurrentPlan && !isLingoStrategy) && (
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
        <h3 className={`text-2xl font-semibold ${isLingoStrategy ? 'text-gold-900 dark:text-gold-100' : 'text-foreground'}`}>
          {name}
        </h3>
        <p className={`${isLingoStrategy ? 'text-gold-700 dark:text-gold-300' : 'text-muted-foreground'}`}>
          {description}
        </p>
        
        <div className="mt-4 mb-6">
          <div className="flex items-baseline">
            <span className={`text-4xl font-bold ${isLingoStrategy ? 'text-gold-900 dark:text-gold-100' : 'text-foreground'}`}>
              ${oneTime ? price.toLocaleString() : getMonthlyPrice()}
            </span>
            {!oneTime && (
              <span className={`ml-1 ${isLingoStrategy ? 'text-gold-700 dark:text-gold-300' : 'text-muted-foreground'}`}>
                /month
              </span>
            )}
            {oneTime && (
              <span className={`ml-1 ${isLingoStrategy ? 'text-gold-700 dark:text-gold-300' : 'text-muted-foreground'}`}>
                one-time
              </span>
            )}
            {billingFrequency === 'year' && !oneTime && price > 0 && (
              <span className="ml-2 text-sm bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-1 rounded-full font-medium">
                10% OFF
              </span>
            )}
          </div>
          {!oneTime && price > 0 && billingFrequency === 'quarter' && (
            <p className={`text-sm mt-1 ${isLingoStrategy ? 'text-gold-600 dark:text-gold-400' : 'text-muted-foreground'}`}>
              Billed quarterly (${getDisplayPrice()})
            </p>
          )}
          {!oneTime && price > 0 && billingFrequency === 'year' && (
            <div className="mt-1">
              <p className={`text-sm ${isLingoStrategy ? 'text-gold-600 dark:text-gold-400' : 'text-muted-foreground'}`}>
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
                <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${isLingoStrategy ? 'text-gold-600 dark:text-gold-400' : 'text-teal-500 dark:text-teal-400'}`} />
              ) : (
                <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              )}
              <span className={!feature.included ? 'text-muted-foreground' : isLingoStrategy ? 'text-gold-900 dark:text-gold-100' : 'text-foreground'}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        
        <Button 
          className={`w-full ${
            isLingoStrategy
              ? 'bg-gradient-to-r from-gold-500 to-orange-500 hover:from-gold-600 hover:to-orange-600 text-white font-bold text-lg py-3'
              : isCurrentPlan
              ? 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700'
              : popular 
              ? 'bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700'
              : ''
          }`} 
          variant={isCurrentPlan ? 'default' : popular || isLingoStrategy ? 'default' : 'outline'}
          onClick={handleButtonClick}
          disabled={loading}
          size={isLingoStrategy ? 'lg' : 'default'}
        >
          {loading ? 'Loading...' : getButtonText()}
        </Button>
        
        {isLingoStrategy && (
          <p className="text-xs text-gold-600 dark:text-gold-400 text-center mt-2">
            Limited spots available • Book a consultation to secure your spot
          </p>
        )}
      </div>
    </div>
  );
};

export default PricingPlan;
