
import { useLocation } from 'react-router-dom';
import BillingFrequencySelector from './BillingFrequencySelector';

interface PricingHeaderProps {
  billingFrequency: 'quarter' | 'year';
  setBillingFrequency: (frequency: 'quarter' | 'year') => void;
}

const PricingHeader = ({ billingFrequency, setBillingFrequency }: PricingHeaderProps) => {
  const location = useLocation();
  const isFromSignup = location.state?.fromSignup || document.referrer.includes('/join');

  return (
    <div className="text-center mb-12">
      {isFromSignup && (
        <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-lg">
          <p className="text-teal-800 font-medium">
            🎉 Account created successfully! Choose a plan to complete your setup and start exploring case studies.
          </p>
        </div>
      )}
      <h1 className="text-4xl md:text-5xl font-semibold mb-6">
        {isFromSignup ? 'Complete Your Account Setup' : 'Pricing Plans'}
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        {isFromSignup 
          ? 'Choose the plan that fits your strategic narrative needs to activate your account'
          : 'Choose the plan that fits your strategic narrative needs'
        }
      </p>
      
      <BillingFrequencySelector 
        billingFrequency={billingFrequency}
        setBillingFrequency={setBillingFrequency}
      />
    </div>
  );
};

export default PricingHeader;
