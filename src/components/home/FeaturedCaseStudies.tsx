
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
import CaseStudyCard from '@/components/CaseStudyCard';
import { useEmailSubmit } from '@/hooks/useEmailSubmit';

// Sample data for the homepage
const featuredCaseStudies = [{
  id: "stripe-financial-infrastructure",
  company: "stripe",
  companyName: "Stripe",
  lingo: "Financial Infrastructure",
  impact: "Raised $600M at $95B valuation by positioning as infrastructure rather than payments",
  narrativeType: "Market Creation",
  industry: "Fintech"
}, {
  id: "notion-all-in-one-workspace",
  company: "notion",
  companyName: "Notion",
  lingo: "All-in-one Workspace",
  impact: "Grew to 20M+ users with a narrative that unified multiple product categories",
  narrativeType: "Product Positioning",
  industry: "SaaS"
}, {
  id: "figma-multiplayer-design",
  company: "figma",
  companyName: "Figma",
  lingo: "Multiplayer Design",
  impact: "Differentiated from Adobe by focusing on collaboration, acquired for $20B",
  narrativeType: "Competitive Positioning",
  industry: "Design"
}];

const FeaturedCaseStudies = () => {
  const [email, setEmail] = useState('');
  const { handleSubmit, isSubmitting } = useEmailSubmit();

  const handleFeaturedSubmit = (e: React.FormEvent) => {
    handleSubmit(e, email, setEmail);
  };

  return (
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
        
        <div className="flex flex-col items-center">
          <form onSubmit={handleFeaturedSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mb-6">
            <Input
              type="email"
              placeholder="Enter your email for access"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 px-4 text-base"
              required
            />
            <Button 
              type="submit" 
              className="h-12 rounded-md bg-teal-500 hover:bg-teal-600 text-white px-6 text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "View All Case Studies"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudies;
