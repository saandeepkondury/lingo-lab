import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEmailSubmit } from '@/hooks/useEmailSubmit';
const HeroSection = () => {
  const [email, setEmail] = useState('');
  const {
    handleSubmit,
    isSubmitting
  } = useEmailSubmit();
  const handleHeroSubmit = (e: React.FormEvent) => {
    handleSubmit(e, email, setEmail);
  };
  return <section className="bg-gradient-to-b from-teal-50 to-white py-24 md:py-32">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center animate-fade-in mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight bg-gradient-to-r from-teal-600 via-teal-500 to-coral-500 bg-clip-text text-transparent pb-4 md:pb-6">Master Positioning to Secure Venture Capital 3x Faster</h1>
          <p className="text-xl md:text-2xl mt-8 text-zinc-700">
            Discover how top founders used strategic narrative to raise millions and shape markets.
          </p>
          <div className="pt-10 flex justify-center">
            <form onSubmit={handleHeroSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <Input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="h-12 px-4 text-base" required />
              <Button type="submit" className="h-12 rounded-md bg-teal-500 hover:bg-teal-600 text-white px-6 text-base" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Join Our Community"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;