
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import CaseStudyCard from '@/components/CaseStudyCard';
import VoiceSearch from '@/components/VoiceSearch';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Sample data for the homepage
const featuredCaseStudies = [
  {
    id: "stripe-financial-infrastructure",
    company: "Stripe",
    lingo: "Financial Infrastructure",
    impact: "Raised $600M at $95B valuation by positioning as infrastructure rather than payments",
    rating: 5,
    narrativeType: "Market Creation",
    industry: "Fintech"
  },
  {
    id: "notion-all-in-one-workspace",
    company: "Notion",
    lingo: "All-in-one Workspace",
    impact: "Grew to 20M+ users with a narrative that unified multiple product categories",
    rating: 4.8,
    narrativeType: "Product Positioning",
    industry: "SaaS"
  },
  {
    id: "figma-multiplayer-design",
    company: "Figma",
    lingo: "Multiplayer Design",
    impact: "Differentiated from Adobe by focusing on collaboration, acquired for $20B",
    rating: 4.9,
    narrativeType: "Competitive Positioning",
    industry: "Design"
  }
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-50 to-white py-20 md:py-32">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-semibold tracking-tight bg-gradient-to-r from-teal-600 via-teal-500 to-coral-500 bg-clip-text text-transparent">
                Turn Language Into Leverage
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-xl">
                Discover how top founders used strategic narrative to raise millions and shape markets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                <Button size="lg" className="rounded-full bg-teal-500 hover:bg-teal-600 text-white px-8" asChild>
                  <Link to="/join">Join to Read Case Studies</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full" asChild>
                  <Link to="/submit">Submit Your Lingo</Link>
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-coral-400 rounded-3xl blur opacity-30"></div>
                <div className="relative bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-border/50">
                  <VoiceSearch redirectOnResult={true} className="py-8" />
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Try searching "category creation" or "meme marketing"
                  </p>
                </div>
              </div>
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
            {featuredCaseStudies.map((study) => (
              <CaseStudyCard key={study.id} {...study} />
            ))}
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
            <h2 className="text-3xl font-semibold mb-4">Why Lingo Library?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The smartest founders know language shapes markets. We've decoded their playbooks.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50">
              <div className="h-12 w-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="text-lg font-medium mb-2">Deep Case Studies</h3>
              <p className="text-muted-foreground">
                Get inside successful narrative strategies with detailed breakdowns of what worked, why, and how.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50">
              <div className="h-12 w-12 rounded-full bg-coral-100 text-coral-600 flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="text-lg font-medium mb-2">VC Insights</h3>
              <p className="text-muted-foreground">
                Every case study includes expert commentary from venture capitalists on why the narrative worked.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50">
              <div className="h-12 w-12 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="text-lg font-medium mb-2">Actionable Templates</h3>
              <p className="text-muted-foreground">
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
              Join thousands of founders using Lingo Library to craft compelling company narratives.
            </p>
            <Button size="lg" className="rounded-full bg-white text-teal-600 hover:bg-teal-50 px-8" asChild>
              <Link to="/join">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
