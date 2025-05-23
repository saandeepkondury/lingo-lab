
import BillingFrequencySelector from './BillingFrequencySelector';

interface PricingHeaderProps {
  billingFrequency: 'month' | 'year';
  setBillingFrequency: (frequency: 'month' | 'year') => void;
}

const PricingHeader = ({ billingFrequency, setBillingFrequency }: PricingHeaderProps) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-semibold mb-6">Pricing Plans</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Choose the plan that fits your strategic narrative needs
      </p>
      
      <BillingFrequencySelector 
        billingFrequency={billingFrequency}
        setBillingFrequency={setBillingFrequency}
      />
    </div>
  );
};

export default PricingHeader;
