
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';

const Submit = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    lingo: '',
    url: '',
    story: '',
    role: '',
    availability: '',
    interviewWillingness: false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Request submitted",
        description: "We'll review your lingo submission and reach out for an interview soon.",
      });
    }, 1500);
  };
  
  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold mb-4">Request a Lingo Feature</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your strategic narrative that helped your company grow. Get featured as a Lingo Leader through our interview process.
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-10">
            <div className="md:col-span-2 space-y-6">
              <div className="apple-card p-6">
                <h3 className="text-lg font-medium mb-4">Why Request a Feature?</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                      1
                    </div>
                    <span>Get featured in our library and newsletter</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                      2
                    </div>
                    <span>Share your strategic communication wins</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                      3
                    </div>
                    <span>Connect with other narrative-minded founders</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                      4
                    </div>
                    <span>Receive expert analysis on your messaging</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Our Interview Process</h3>
                <p className="text-muted-foreground">
                  We carefully review all submissions and select the most compelling strategic narratives for a featured interview.
                </p>
                <p className="text-muted-foreground">
                  If selected, our team will reach out to schedule a 30-minute interview to dive deeper into your lingo story, discussing the strategy behind it and measuring its impact.
                </p>
                <p className="text-muted-foreground">
                  After the interview, we'll create a professionally written case study that highlights your company's strategic narrative success.
                </p>
              </div>
            </div>
            
            <div className="md:col-span-3">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Jane Smith"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="jane@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Acme Inc."
                        required
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Your Role</Label>
                      <Input
                        id="role"
                        name="role"
                        placeholder="Founder, CMO, Head of Marketing, etc."
                        required
                        value={formData.role}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lingo">Key Phrase or Lingo</Label>
                    <Input
                      id="lingo"
                      name="lingo"
                      placeholder="The phrase that made a difference (e.g., 'Financial Infrastructure')"
                      required
                      value={formData.lingo}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="url">URL to Example</Label>
                    <Input
                      id="url"
                      name="url"
                      type="url"
                      placeholder="Link to your pitch deck, website, social post, etc."
                      value={formData.url}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-muted-foreground">Optional, but helpful for our review process</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="story">Your Story</Label>
                    <Textarea
                      id="story"
                      name="story"
                      placeholder="How did this strategic language help your company? What impact did it have on fundraising, sales, hiring, etc?"
                      rows={5}
                      className="resize-none"
                      value={formData.story}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-muted-foreground">Tell us about the impact this language had on your business</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="availability">Interview Availability</Label>
                    <Input
                      id="availability"
                      name="availability"
                      placeholder="E.g., 'Weekday afternoons' or 'Tuesdays and Thursdays'"
                      value={formData.availability}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-muted-foreground">When would you generally be available for a 30-minute interview if selected?</p>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="interviewWillingness"
                      name="interviewWillingness"
                      checked={formData.interviewWillingness}
                      onChange={handleCheckboxChange}
                      className="mt-1"
                    />
                    <Label htmlFor="interviewWillingness" className="text-sm">
                      I'm willing to participate in an interview about my lingo story if selected
                    </Label>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-teal-500 hover:bg-teal-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Your Request"}
                  </Button>
                  
                  <p className="text-center text-xs text-muted-foreground">
                    By submitting, you agree that your story may be featured in our case study library.
                    We'll contact you before publishing any details about your company.
                  </p>
                </form>
              ) : (
                <div className="bg-muted/30 rounded-lg p-8 text-center space-y-6">
                  <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-semibold">Request Received!</h3>
                  <p className="text-muted-foreground">
                    Thank you for sharing your lingo story. Our team will review your submission and reach
                    out to schedule an interview if your narrative is selected for a feature.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        lingo: '',
                        url: '',
                        story: '',
                        role: '',
                        availability: '',
                        interviewWillingness: false
                      });
                    }}
                  >
                    Submit Another
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Submit;
