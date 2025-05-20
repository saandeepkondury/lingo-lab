
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
    story: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Submission successful",
        description: "Your lingo has been submitted for review.",
      });
    }, 1500);
  };
  
  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold mb-4">Submit Your Lingo</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your strategic narrative that helped your company grow. Get featured as a Lingo Leader.
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-10">
            <div className="md:col-span-2 space-y-6">
              <div className="apple-card p-6">
                <h3 className="text-lg font-medium mb-4">Why Submit Your Lingo?</h3>
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
                <h3 className="text-lg font-medium">What makes a great submission?</h3>
                <p className="text-muted-foreground">
                  The best submissions include specific phrases or terms you've created, how they've been used, and the measurable impact they've had on your business.
                </p>
                <p className="text-muted-foreground">
                  We're especially interested in language that has helped with fundraising, sales, hiring, or creating new market categories.
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
                  
                  <Button
                    type="submit"
                    className="w-full bg-teal-500 hover:bg-teal-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Your Lingo"}
                  </Button>
                  
                  <p className="text-center text-xs text-muted-foreground">
                    By submitting, you agree that your story may be featured in our case study library.
                    We'll contact you before publishing.
                  </p>
                </form>
              ) : (
                <div className="bg-muted/30 rounded-lg p-8 text-center space-y-6">
                  <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-semibold">Submission Received!</h3>
                  <p className="text-muted-foreground">
                    Thank you for sharing your lingo story. Our team will review your submission and may
                    reach out for additional details.
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
                        story: ''
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
