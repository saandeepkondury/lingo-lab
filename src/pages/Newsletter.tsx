import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';
const Newsletter = () => {
  const {
    toast
  } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate subscription process
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
      toast({
        title: "Successfully subscribed",
        description: "You've been added to our weekly newsletter."
      });
    }, 1500);
  };
  return <Layout>
      <section className="py-16 md:py-24 bg-gradient-to-b from-teal-50 to-white">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">The Lingo Drop</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our weekly newsletter featuring strategic narrative breakthroughs and language patterns that move markets.
            </p>
          </div>
          
          <div className="max-w-xl mx-auto">
            {!isSubscribed ? <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
                <Input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} required className="flex-1" />
                <Button type="submit" disabled={isSubmitting} className="bg-teal-500 hover:bg-teal-600">
                  {isSubmitting ? "Subscribing..." : "Subscribe Free"}
                </Button>
              </form> : <div className="bg-muted/30 rounded-lg p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold">You're subscribed!</h3>
                <p className="text-muted-foreground">
                  Check your inbox soon for the latest strategic narrative insights.
                </p>
              </div>}
            
            <p className="text-sm text-center text-muted-foreground mb-12">
              Join 10,000+ founders and marketers. Unsubscribe anytime.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="apple-card p-6">
              <h2 className="text-xl font-semibold mb-4">What You'll Get</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                    1
                  </div>
                  <span>Weekly breakdown of powerful strategic narratives</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                    2
                  </div>
                  <span>Case studies on how language shaped market categories</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                    3
                  </div>
                  <span>Exclusive interviews with founders and VCs on narrative strategy</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                    4
                  </div>
                  <span>Early access to new tools and frameworks</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">From Recent Issues</h2>
              <div className="space-y-4">
                <div className="border-l-2 border-teal-500 pl-4 py-1">
                  <h3 className="font-medium">How Notion Made "All-in-one Workspace" Stick</h3>
                  <p className="text-sm text-muted-foreground">
                    Breaking down how Notion unified multiple product categories with a single phrase...
                  </p>
                </div>
                <div className="border-l-2 border-teal-500 pl-4 py-1">
                  <h3 className="font-medium">Figma's "Multiplayer" Revolution</h3>
                  <p className="text-sm text-muted-foreground">
                    The language pattern that helped Figma win against Adobe and raise at a $20B valuation...
                  </p>
                </div>
                <div className="border-l-2 border-teal-500 pl-4 py-1">
                  <h3 className="font-medium">ChatGPT: Naming the Future</h3>
                  <p className="text-sm text-muted-foreground">
                    How OpenAI's branding decisions created a category-defining product name...
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 bg-white rounded-xl border border-border p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/4 flex-shrink-0">
                <div className="h-32 w-32 mx-auto rounded-full bg-teal-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-teal-600">S</span>
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-semibold mb-2">From Sandeep, Lingo Lab Founder</h3>
                <p className="text-muted-foreground mb-4">
                  "Every week, I analyze the most impactful narratives from the startup world. As an investor, I've seen
                  firsthand how strategic language can transform a company's trajectory. Join me to learn how
                  the best founders are using language to shape markets."
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    @sandeep on Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    Previous newsletters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>;
};
export default Newsletter;