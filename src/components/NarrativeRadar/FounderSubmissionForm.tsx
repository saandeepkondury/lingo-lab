
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const FounderSubmissionForm = () => {
  const [formData, setFormData] = useState({
    founder_name: '',
    founder_email: '',
    company_name: '',
    company_website: '',
    current_positioning: '',
    industry: '',
    stage: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('founder_submissions')
        .insert([formData]);

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Submission received!",
        description: "We'll analyze your narrative and send insights to your email within 24 hours.",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
            <h3 className="text-lg font-semibold">Submission Received!</h3>
            <p className="text-muted-foreground">
              We'll analyze your narrative positioning and send insights to your email within 24 hours.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  founder_name: '',
                  founder_email: '',
                  company_name: '',
                  company_website: '',
                  current_positioning: '',
                  industry: '',
                  stage: '',
                });
              }}
            >
              Submit Another
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Submit Your Narrative
        </CardTitle>
        <CardDescription>
          Get AI-powered analysis of your positioning and see how you rank on the Narrative Radar™
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="founder_name">Founder Name*</Label>
              <Input
                id="founder_name"
                value={formData.founder_name}
                onChange={(e) => handleInputChange('founder_name', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="founder_email">Email*</Label>
              <Input
                id="founder_email"
                type="email"
                value={formData.founder_email}
                onChange={(e) => handleInputChange('founder_email', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name*</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => handleInputChange('company_name', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company_website">Company Website</Label>
              <Input
                id="company_website"
                type="url"
                value={formData.company_website}
                onChange={(e) => handleInputChange('company_website', e.target.value)}
                placeholder="https://"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select onValueChange={(value) => handleInputChange('industry', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AI">AI</SelectItem>
                  <SelectItem value="Fintech">Fintech</SelectItem>
                  <SelectItem value="SaaS">SaaS</SelectItem>
                  <SelectItem value="Developer Tools">Developer Tools</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stage">Company Stage</Label>
              <Select onValueChange={(value) => handleInputChange('stage', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pre-seed">Pre-seed</SelectItem>
                  <SelectItem value="Seed">Seed</SelectItem>
                  <SelectItem value="Series A">Series A</SelectItem>
                  <SelectItem value="Series B">Series B</SelectItem>
                  <SelectItem value="Series C+">Series C+</SelectItem>
                  <SelectItem value="Public">Public</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="current_positioning">Current Positioning/Narrative*</Label>
            <Textarea
              id="current_positioning"
              value={formData.current_positioning}
              onChange={(e) => handleInputChange('current_positioning', e.target.value)}
              placeholder="Describe how you currently position your company. What key terms or phrases do you use? How do you differentiate from competitors?"
              rows={4}
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Analyzing...' : 'Submit for Analysis'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FounderSubmissionForm;
