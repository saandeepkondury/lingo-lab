
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BillingFrequencySelectorProps {
  billingFrequency: 'quarter' | 'year';
  setBillingFrequency: (frequency: 'quarter' | 'year') => void;
}

const BillingFrequencySelector = ({ 
  billingFrequency, 
  setBillingFrequency 
}: BillingFrequencySelectorProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
      <Button
        variant={billingFrequency === 'quarter' ? 'default' : 'outline'}
        className={`w-full sm:w-auto ${billingFrequency === 'quarter' ? 'bg-teal-500 hover:bg-teal-600' : ''}`}
        onClick={() => setBillingFrequency('quarter')}
      >
        Quarterly Billing
      </Button>
      <Button
        variant={billingFrequency === 'year' ? 'default' : 'outline'}
        className={`w-full sm:w-auto ${billingFrequency === 'year' ? 'bg-teal-500 hover:bg-teal-600' : ''} relative`}
        onClick={() => setBillingFrequency('year')}
      >
        Annual Billing
        <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 border-green-200 font-semibold">
          Save 10%
        </Badge>
      </Button>
    </div>
  );
};

export default BillingFrequencySelector;
