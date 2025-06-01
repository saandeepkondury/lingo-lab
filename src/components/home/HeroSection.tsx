
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEmailSubmit } from '@/hooks/useEmailSubmit';

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const { handleSubmit, isSubmitting } = useEmailSubmit('homepage');

  const handleHeroSubmit = (e: React.FormEvent) => {
    handleSubmit(e, email, setEmail);
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100 dark:from-gray-900 dark:via-emerald-950 dark:to-teal-950 py-20 md:py-32">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center animate-fade-in mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600 bg-clip-text text-transparent pb-6 md:pb-8 leading-tight">
            Craft the Language That Wins Investors, Customers, and Culture—Fast.
          </h1>
          <p className="text-xl md:text-2xl mt-8 text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Join the world's most strategic founders using narrative as leverage.<br />
            Your breakthrough lingo starts here — and spreads everywhere that matters.
          </p>
          <div className="pt-12 flex flex-col items-center gap-6">
            <form onSubmit={handleHeroSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="h-14 px-6 text-lg border-2 border-emerald-200 dark:border-emerald-800 focus:border-emerald-500" 
                required 
              />
              <Button 
                type="submit" 
                className="h-14 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 text-lg font-semibold whitespace-nowrap" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Joining..." : "📝 Sign up for the Lingo Spotlight"}
              </Button>
            </form>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Weekly founder stories + coined phrases driving venture-scale growth
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
