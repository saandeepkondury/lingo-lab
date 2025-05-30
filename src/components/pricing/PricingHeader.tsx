
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
        <div className="mb-6 p-4 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 rounded-lg">
          <p className="text-teal-800 dark:text-teal-200 font-medium">
            🎉 Account created successfully! Choose a plan to start your strategic narrative journey.
          </p>
        </div>
      )}
      <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
        {isFromSignup ? 'Start Your Narrative Journey' : 'Transform Your Strategic Narrative'}
      </h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
        {isFromSignup 
          ? 'Learn from successful founders, then transform your own narrative with our proven methodology'
          : 'Learn from the best case studies, then work with us to completely transform your strategic narrative'
        }
      </p>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        From studying success stories to implementing your own winning narrative strategy
      </p>
      
      <BillingFrequencySelector 
        billingFrequency={billingFrequency}
        setBillingFrequency={setBillingFrequency}
      />
    </div>
  );
};

export default PricingHeader;
