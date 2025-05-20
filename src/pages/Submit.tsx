
import { useState } from 'react';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import SubmitForm from '@/components/submit/SubmitForm';
import SubmitBenefits from '@/components/submit/SubmitBenefits';
import SubmitSuccess from '@/components/submit/SubmitSuccess';

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
  
  const handleReset = () => {
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
            <div className="md:col-span-2">
              <SubmitBenefits />
            </div>
            
            <div className="md:col-span-3">
              {!isSubmitted ? (
                <SubmitForm 
                  isSubmitting={isSubmitting}
                  onSubmit={handleSubmit}
                  formData={formData}
                  handleChange={handleChange}
                  handleCheckboxChange={handleCheckboxChange}
                />
              ) : (
                <SubmitSuccess onReset={handleReset} />
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Submit;
