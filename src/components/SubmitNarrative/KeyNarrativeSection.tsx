
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FounderFormData } from '@/types/founderForm';

interface KeyNarrativeSectionProps {
  formData: FounderFormData;
  handleInputChange: (field: string, value: any) => void;
}

const KeyNarrativeSection = ({ formData, handleInputChange }: KeyNarrativeSectionProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Key Narrative Elements</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="keyPhrase">Key Phrase/Lingo*</Label>
          <Input
            id="keyPhrase"
            value={formData.keyPhrase}
            onChange={(e) => handleInputChange('keyPhrase', e.target.value)}
            placeholder="e.g., 'Financial Infrastructure'"
            required
          />
        </div>
        <div>
          <Label htmlFor="tagline">Company Tagline</Label>
          <Input
            id="tagline"
            value={formData.tagline}
            onChange={(e) => handleInputChange('tagline', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default KeyNarrativeSection;
