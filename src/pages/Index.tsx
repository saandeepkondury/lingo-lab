
import Layout from '@/components/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCaseStudies from '@/components/home/FeaturedCaseStudies';
import ValueProposition from '@/components/home/ValueProposition';
import CTASection from '@/components/home/CTASection';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  // If user is logged in, redirect to case studies page
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/case-studies');
    }
  }, [isLoggedIn, navigate]);

  // Always show the marketing homepage for non-logged-in users
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
