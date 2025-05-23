
import Layout from '@/components/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCaseStudies from '@/components/home/FeaturedCaseStudies';
import ValueProposition from '@/components/home/ValueProposition';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedCaseStudies />
      <ValueProposition />
      <CTASection />
    </Layout>
  );
};

export default Index;
