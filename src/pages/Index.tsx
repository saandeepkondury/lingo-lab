import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import CaseStudyCard from '@/components/CaseStudyCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

// Sample data for the homepage
const featuredCaseStudies = [{
  id: "stripe-financial-infrastructure",
  company: "stripe",
  companyName: "Stripe",
  // Add companyName property
  lingo: "Financial Infrastructure",
  impact: "Raised $600M at $95B valuation by positioning as infrastructure rather than payments",
  narrativeType: "Market Creation",
  industry: "Fintech"
}, {
  id: "notion-all-in-one-workspace",
  company: "notion",
  companyName: "Notion",
  // Add companyName property
  lingo: "All-in-one Workspace",
  impact: "Grew to 20M+ users with a narrative that unified multiple product categories",
  narrativeType: "Product Positioning",
  industry: "SaaS"
}, {
  id: "figma-multiplayer-design",
  company: "figma",
  companyName: "Figma",
  // Add companyName property
  lingo: "Multiplayer Design",
  impact: "Differentiated from Adobe by focusing on collaboration, acquired for $20B",
  narrativeType: "Competitive Positioning",
  industry: "Design"
}];
const Index = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission processing
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      
      // Navigate to pricing page after successful submission
      navigate('/pricing');
      
      toast({
        title: "Email submitted",
        description: "Thank you for your interest! Check out our pricing plans.",
      });
    }, 800);
  };

  return <Layout>
      {/* Hero Section - Updated with modern Apple-inspired design */}
      <section className="bg-gradient-to-b from-teal-50 to-white py-24 md:py-32">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center animate-fade-in mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight bg-gradient-to-r from-teal-600 via-teal-500 to-coral-500 bg-clip-text text-transparent pb-4 md:pb-6">
              Learn how successful venture backed founders leveraged Lingo
            </h1>
            <p className="text-xl md:text-2xl mt-8 text-zinc-700">
              Discover how top founders used strategic narrative to raise millions and shape markets.
            </p>
            <div className="pt-10 flex justify-center">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 px-4 text-base bg-teal-50 dark:bg-teal-900/30 border-teal-100 dark:border-teal-700/50 placeholder:text-teal-500/50 dark:placeholder:text-teal-300/50"
                  required
                />
                <Button 
                  type="submit" 
                  className="h-12 rounded-md bg-teal-500 hover:bg-teal-600 text-white px-6 text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Join Our Community"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Case Studies */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Featured Case Studies</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn from the most powerful strategic narratives that changed company trajectories
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {featuredCaseStudies.map(study => <CaseStudyCard key={study.id} {...study} />)}
          </div>
          
          <div className="flex justify-center">
            <Button variant="outline" size="lg" className="rounded-full" asChild>
              <Link to="/case-studies">
                View All Case Studies <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Value Proposition */}
      <section className="bg-muted py-20">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4 dark:text-white">Why Lingo Lab?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto dark:text-zinc-200">
              The smartest founders know language shapes markets. We've decoded their playbooks.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 dark:bg-teal-900/20 dark:border-teal-700/30">
              <div className="h-12 w-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mb-4 dark:bg-teal-700/40 dark:text-teal-300">
                1
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Deep Case Studies</h3>
              <p className="text-muted-foreground dark:text-zinc-300">
                Get inside successful narrative strategies with detailed breakdowns of what worked, why, and how.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 dark:bg-teal-900/20 dark:border-teal-700/30">
              <div className="h-12 w-12 rounded-full bg-coral-100 text-coral-600 flex items-center justify-center mb-4 dark:bg-coral-700/30 dark:text-coral-200">
                2
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">VC Insights</h3>
              <p className="text-muted-foreground dark:text-zinc-300">
                Every case study includes expert commentary from venture capitalists on why the narrative worked.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 dark:bg-teal-900/20 dark:border-teal-700/30">
              <div className="h-12 w-12 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center mb-4 dark:bg-gold-700/30 dark:text-gold-200">
                3
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Actionable Templates</h3>
              <p className="text-muted-foreground dark:text-zinc-300">
                Apply these frameworks to your own company with templates and step-by-step guides.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-3xl py-16 px-6 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Ready to master strategic narrative?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of founders using Lingo Lab to craft compelling company narratives.
            </p>
            <Button size="lg" className="rounded-full bg-white text-teal-600 hover:bg-teal-50 px-8" asChild>
              <Link to="/join">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>;
};
export default Index;
