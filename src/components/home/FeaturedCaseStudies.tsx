
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, TrendingUp, Users } from 'lucide-react';
import CaseStudyCard from '@/components/CaseStudyCard';
import { useEmailSubmit } from '@/hooks/useEmailSubmit';

// Sample data for the homepage with mock view counts
const featuredCaseStudies = [{
  id: "stripe-financial-infrastructure",
  company: "stripe",
  companyName: "Stripe",
  lingo: "Financial Infrastructure for the Internet",
  impact: "Raised $600M at $95B valuation by positioning as infrastructure rather than payments",
  narrativeType: "Market Creation",
  industry: "Fintech",
  fundingRaised: "$600M",
  viewCount: 47893
}, {
  id: "notion-all-in-one-workspace",
  company: "notion",
  companyName: "Notion",
  lingo: "All-in-one Workspace",
  impact: "Grew to 20M+ users with a narrative that unified multiple product categories",
  narrativeType: "Product Positioning",
  industry: "SaaS",
  fundingRaised: "$343M",
  viewCount: 32156
}, {
  id: "figma-multiplayer-design",
  company: "figma",
  companyName: "Figma",
  lingo: "Multiplayer Design",
  impact: "Differentiated from Adobe by focusing on collaboration, acquired for $20B",
  narrativeType: "Competitive Positioning",
  industry: "Design",
  fundingRaised: "$333M",
  viewCount: 38472
}];

const FeaturedCaseStudies = () => {
  const [email, setEmail] = useState('');
  const {
    handleSubmit,
    isSubmitting
  } = useEmailSubmit();
  
  const handleFeaturedSubmit = (e: React.FormEvent) => {
    handleSubmit(e, email, setEmail);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-teal-50/50 to-white dark:from-teal-950/20 dark:to-gray-900">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="h-6 w-6 text-teal-600" />
            <span className="text-sm font-medium text-teal-600 uppercase tracking-wide">Success Stories</span>
          </div>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Featured Strategic Narratives
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover how the world's most successful startups used strategic narrative to transform their markets and drive exponential growth
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCaseStudies.map((study, index) => (
            <div key={study.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <CaseStudyCard 
                {...study} 
                disableLinks={true}
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-teal-100 dark:bg-teal-900/30 px-4 py-2 rounded-full mb-6">
            <Users className="h-4 w-4 text-teal-600" />
            <span className="text-sm font-medium text-teal-600">
              Join 12,000+ founders learning strategic narrative
            </span>
          </div>
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <a href="/case-studies">
              Explore All Case Studies
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudies;
