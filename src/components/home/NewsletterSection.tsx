
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEmailSubmit } from '@/hooks/useEmailSubmit';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const { handleSubmit, isSubmitting } = useEmailSubmit('newsletter');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    handleSubmit(e, email, setEmail);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full mb-8">
            <span className="text-2xl">📰</span>
            <h2 className="text-2xl font-bold">Weekly Lingo Spotlight</h2>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Get inspired by the language shaping tomorrow's biggest startups.
          </h3>
          
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Every week, we feature one founder, one coined lingo, and one bold narrative.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h4 className="text-2xl font-bold mb-6">📬 Sign up for the Lingo Spotlight</h4>
            <p className="text-lg mb-6 opacity-90">One email. One idea. One edge.</p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="h-12 px-4 bg-white/20 border-white/40 text-white placeholder:text-white/70 focus:bg-white/30" 
                required 
              />
              <Button 
                type="submit" 
                className="h-12 bg-white text-emerald-600 hover:bg-gray-100 px-8 font-semibold whitespace-nowrap" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "→ Subscribe now"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
