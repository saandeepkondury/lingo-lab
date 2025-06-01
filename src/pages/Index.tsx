
import Layout from '@/components/Layout';
import HeroSection from '@/components/home/HeroSection';
import IntroSection from '@/components/home/IntroSection';
import DeliverablesSection from '@/components/home/DeliverablesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PricingSection from '@/components/home/PricingSection';
import VCFilterSection from '@/components/home/VCFilterSection';
import NewsletterSection from '@/components/home/NewsletterSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <IntroSection />
      <DeliverablesSection />
      <TestimonialsSection />
      <PricingSection />
      <VCFilterSection />
      <NewsletterSection />
    </Layout>
  );
};

export default Index;
