
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BillingFrequencySelectorProps {
  billingFrequency: 'month' | 'year';
  setBillingFrequency: (frequency: 'month' | 'year') => void;
}

const BillingFrequencySelector = ({ 
  billingFrequency, 
  setBillingFrequency 
}: BillingFrequencySelectorProps) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <Button
        variant={billingFrequency === 'month' ? 'default' : 'outline'}
        className={billingFrequency === 'month' ? 'bg-teal-500 hover:bg-teal-600' : ''}
        onClick={() => setBillingFrequency('month')}
      >
        Monthly Billing
      </Button>
      <Button
        variant={billingFrequency === 'year' ? 'default' : 'outline'}
        className={billingFrequency === 'year' ? 'bg-teal-500 hover:bg-teal-600' : ''}
        onClick={() => setBillingFrequency('year')}
      >
        Annual Billing
        <Badge variant="outline" className="ml-2 bg-coral-50 text-coral-500 border-coral-200">
          Save 10%
        </Badge>
      </Button>
    </div>
  );
};

export default BillingFrequencySelector;
