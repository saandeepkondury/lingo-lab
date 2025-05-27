
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FounderFormData } from '@/types/founderForm';

interface MarketStorySectionProps {
  formData: FounderFormData;
  handleInputChange: (field: string, value: any) => void;
}

const MarketStorySection = ({ formData, handleInputChange }: MarketStorySectionProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Your Market Story</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="marketBefore">Market Before Your Company*</Label>
          <Textarea
            id="marketBefore"
            value={formData.marketBefore}
            onChange={(e) => handleInputChange('marketBefore', e.target.value)}
            rows={4}
            required
          />
        </div>
        <div>
          <Label htmlFor="founderInsight">Your Key Insight*</Label>
          <Textarea
            id="founderInsight"
            value={formData.founderInsight}
            onChange={(e) => handleInputChange('founderInsight', e.target.value)}
            rows={4}
            required
          />
        </div>
        <div>
          <Label htmlFor="marketTransformation">How You're Transforming the Market*</Label>
          <Textarea
            id="marketTransformation"
            value={formData.marketTransformation}
            onChange={(e) => handleInputChange('marketTransformation', e.target.value)}
            rows={4}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default MarketStorySection;
