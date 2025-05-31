
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Pricing } from '@/components/blocks/pricing';
import Testimonials from '@/components/pricing/Testimonials';
import FAQ from '@/components/pricing/FAQ';
import ContactSection from '@/components/pricing/ContactSection';
import { useToast } from '@/components/ui/use-toast';
import { useSubscription } from '@/hooks/useSubscription';
import { useLocation } from 'react-router-dom';

const PricingPage = () => {
  const [billingFrequency, setBillingFrequency] = useState<'quarter' | 'year'>('quarter');
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { checkSubscription, createCheckout, loading } = useSubscription();
  const location = useLocation();
  const isFromSignup = location.state?.fromSignup || document.referrer.includes('/join');
  
  useEffect(() => {
    const success = searchParams.get('success');
    const plan = searchParams.get('plan');
    const canceled = searchParams.get('canceled');

    if (success && plan) {
      toast({
        title: "Payment successful!",
        description: `Your ${plan} plan has been activated successfully.`,
      });
      // Refresh subscription status
      checkSubscription();
    } else if (canceled) {
      toast({
        title: "Payment canceled",
        description: "Your payment was canceled. You can try again anytime.",
        variant: "destructive"
      });
    }
  }, [searchParams, toast, checkSubscription]);

  const handleSubscribe = (planType: 'basic' | 'pro' | 'investor') => {
    createCheckout(planType, billingFrequency);
  };

  const plans = [
    {
      name: "BASIC",
      price: "49",
      yearlyPrice: "44", // 10% discount: $528/12 = $44/month
      period: "quarter",
      features: [
        "10 case studies per month",
        "Advanced search functionality", 
        "Weekly narrative insights",
        "Full case study library",
        "Community support",
      ],
      description: "Perfect for founders exploring strategic narratives",
      buttonText: loading ? "Processing..." : "Start Learning",
      isPopular: false,
      onSubscribe: () => handleSubscribe('basic')
    },
    {
      name: "PROFESSIONAL", 
      price: "99",
      yearlyPrice: "90", // 10% discount: $1080/12 = $90/month
      period: "quarter",
      features: [
        "Everything in Basic",
        "Unlimited case studies access",
        "Advanced search & filters",
        "Save to personal library", 
        "Exclusive founder interviews",
        "Monthly trend reports",
        "Narrative framework templates",
        "Priority support",
      ],
      description: "Ideal for serious founders building their narrative",
      buttonText: loading ? "Processing..." : "Start Building",
      isPopular: true,
      onSubscribe: () => handleSubscribe('pro')
    },
    {
      name: "LINGO STRATEGY",
      price: "4999",
      yearlyPrice: "4999",
      period: "one-time",
      features: [
        "Everything in Professional",
        "Complete lingo strategy overhaul",
        "3-month transformation program",
        "1-on-1 strategic narrative coaching",
        "Custom market positioning analysis", 
        "Narrative implementation roadmap",
        "Ongoing support & refinement",
        "Investor deck narrative review",
      ],
      description: "For large organizations with specific needs",
      buttonText: loading ? "Processing..." : "Transform Your Narrative",
      isPopular: false,
      onSubscribe: () => handleSubscribe('investor')
    },
  ];

  const title = isFromSignup ? 'Start Your Narrative Journey' : 'Transform Your Strategic Narrative';
  const description = isFromSignup 
    ? 'Learn from successful founders, then transform your own narrative with our proven methodology\nFrom studying success stories to implementing your own winning narrative strategy'
    : 'Learn from the best case studies, then work with us to completely transform your strategic narrative\nFrom studying success stories to implementing your own winning narrative strategy';
  
  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background dark:bg-background">
        <div className="container max-w-6xl mx-auto px-6">
          {isFromSignup && (
            <div className="mb-6 p-4 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 rounded-lg text-center">
              <p className="text-teal-800 dark:text-teal-200 font-medium">
                🎉 Account created successfully! Choose a plan to start your strategic narrative journey.
              </p>
            </div>
          )}
          
          <Pricing 
            plans={plans}
            title={title}
            description={description}
          />
          
          <Testimonials />
          <FAQ />
          <ContactSection />
        </div>
      </section>
    </Layout>
  );
};

export default PricingPage;
