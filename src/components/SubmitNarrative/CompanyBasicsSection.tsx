
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FounderFormData } from '@/types/founderForm';

interface CompanyBasicsSectionProps {
  formData: FounderFormData;
  handleInputChange: (field: string, value: any) => void;
}

const CompanyBasicsSection = ({ formData, handleInputChange }: CompanyBasicsSectionProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Company Basics</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company">Company Name*</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="founderName">Your Name*</Label>
          <Input
            id="founderName"
            value={formData.founderName}
            onChange={(e) => handleInputChange('founderName', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="founderTitle">Your Title*</Label>
          <Input
            id="founderTitle"
            value={formData.founderTitle}
            onChange={(e) => handleInputChange('founderTitle', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="industry">Industry*</Label>
          <Input
            id="industry"
            value={formData.industry}
            onChange={(e) => handleInputChange('industry', e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyBasicsSection;
