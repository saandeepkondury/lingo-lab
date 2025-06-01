
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
  const { checkSubscription, createCheckout, loading, subscription_tier } = useSubscription();
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
    if (planType === 'basic') {
      toast({
        title: "Welcome to LingoLab!",
        description: "You're already on our free Basic plan. Start exploring case studies!",
      });
      return;
    }
    createCheckout(planType, billingFrequency);
  };

  const plans = [
    {
      name: "BASIC",
      price: "0",
      yearlyPrice: "0",
      period: "forever",
      features: [
        "10 case studies per month",
        "Access to full case study library",
        "Advanced search functionality", 
        "Weekly narrative insights",
        "Community support",
      ],
      description: "Perfect for founders exploring strategic narratives",
      buttonText: subscription_tier === 'Basic' ? "Your Current Plan" : "Get Started Free",
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
      price: "500",
      yearlyPrice: "500",
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
      description: "For founders ready to transform their narrative",
      buttonText: loading ? "Processing..." : "Transform Your Narrative",
      isPopular: false,
      onSubscribe: () => handleSubscribe('investor')
    },
  ];

  const title = isFromSignup ? 'Start Your Narrative Journey' : 'Transform Your Strategic Narrative';
  const description = isFromSignup 
    ? 'Start with our free plan and upgrade when you need more\nFrom studying success stories to implementing your own winning narrative strategy'
    : 'Start with our free plan and upgrade when you need more\nFrom studying success stories to implementing your own winning narrative strategy';
  
  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background dark:bg-background">
        <div className="container max-w-6xl mx-auto px-6">
          {isFromSignup && (
            <div className="mb-6 p-4 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 rounded-lg text-center">
              <p className="text-teal-800 dark:text-teal-200 font-medium">
                🎉 Account created successfully! You're on our free Basic plan - start exploring case studies!
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
