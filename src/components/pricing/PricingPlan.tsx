
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';

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
  billingFrequency: 'month' | 'year';
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
          <Badge className="bg-teal-500 hover:bg-teal-600">Most Popular</Badge>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <p className="text-muted-foreground">{description}</p>
        
        <div className="mt-4 mb-6">
          <div className="flex items-baseline">
            <span className="text-4xl font-bold">
              ${oneTime 
                ? price 
                : billingFrequency === 'year' 
                  ? Math.round(price * 0.9) 
                  : price}
            </span>
            {!oneTime && (
              <span className="text-muted-foreground ml-1">
                /{billingFrequency}
              </span>
            )}
            {oneTime && (
              <span className="text-muted-foreground ml-1">one-time</span>
            )}
          </div>
          {!oneTime && price > 0 && billingFrequency === 'year' && (
            <p className="text-sm text-muted-foreground mt-1">
              ${Math.round(price * 12 * 0.9)} billed annually (10% off)
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
          asChild
        >
          <Link to="/join">
            {cta}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PricingPlan;
