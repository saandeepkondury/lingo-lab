
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSubscription } from '@/hooks/useSubscription';

export interface PlanFeature {
  included: boolean;
  text: string;
}

interface PricingPlanProps {
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
  oneTime = false,
  popular = false,
  features,
  cta,
  billingFrequency
}: PricingPlanProps) => {
  const { createCheckout, loading } = useSubscription();

  const handleSubscribe = () => {
    if (name.toLowerCase() === 'basic') {
      createCheckout('basic', billingFrequency);
    } else if (name.toLowerCase() === 'pro') {
      createCheckout('pro', billingFrequency);
    } else if (name.toLowerCase().includes('lingo strategy')) {
      // Use investor plan for Lingo Strategy (one-time $4999)
      createCheckout('investor', billingFrequency);
    } else {
      // Fallback to contact
      window.open('mailto:hello@lingolab.com?subject=Lingo Strategy Consultation', '_blank');
    }
  };

  const displayPrice = oneTime ? price : (billingFrequency === 'year' ? price * 3.5 : price);
  const savings = Math.round(price * 4 - price * 3.5);

  return (
    <Card className={`relative ${popular ? 'border-2 border-teal-500 shadow-lg scale-105' : 'border border-gray-200'}`}>
      {popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-teal-500 text-white px-3 py-1">
          Most Popular
        </Badge>
      )}
      
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
        <p className="text-muted-foreground text-sm">{description}</p>
        
        <div className="mt-4">
          <span className="text-4xl font-bold">${displayPrice}</span>
          {!oneTime && <span className="text-muted-foreground">/{frequency}</span>}
          {oneTime && <span className="text-muted-foreground"> one-time</span>}
        </div>
        
        {!oneTime && billingFrequency === 'year' && (
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            Save ${savings} vs quarterly
          </p>
        )}
      </CardHeader>
      
      <CardContent>
        <Button 
          className={`w-full mb-6 ${popular ? 'bg-teal-500 hover:bg-teal-600' : ''}`}
          onClick={handleSubscribe}
          disabled={loading}
        >
          {loading ? 'Processing...' : cta}
        </Button>
        
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              {feature.included ? (
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              ) : (
                <X className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              )}
              <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PricingPlan;
