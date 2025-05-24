
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { useEmailSubmit } from '@/hooks/useEmailSubmit';
import TrustIndicator from '@/components/TrustIndicator';

const CTASection = () => {
  const [email, setEmail] = useState('');
  const { handleSubmit, isSubmitting } = useEmailSubmit('homepage');

  const handleCtaSubmit = (e: React.FormEvent) => {
    handleSubmit(e, email, setEmail);
  };

  return (
    <section className="py-20">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-3xl py-16 px-6 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Ready to master strategic narrative?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of founders using Lingo Lab to craft compelling company narratives.
          </p>
          <div className="flex flex-col items-center gap-4">
            <form onSubmit={handleCtaSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 px-4 text-base bg-white/20 border-white/40 text-white placeholder:text-white/70"
                required
              />
              <Button 
                type="submit" 
                className="h-12 rounded-md bg-white text-teal-600 hover:bg-teal-50 px-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Join Community"} <Mail className="ml-2 h-4 w-4" />
              </Button>
            </form>
            <TrustIndicator />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
