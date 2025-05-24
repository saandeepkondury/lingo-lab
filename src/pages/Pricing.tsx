
import { useState, useEffect } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PricingHeader from '@/components/pricing/PricingHeader';
import PricingPlan from '@/components/pricing/PricingPlan';
import FAQ from '@/components/pricing/FAQ';
import ContactSection from '@/components/pricing/ContactSection';
import { pricingPlansData } from '@/data/pricingPlansData';
import { useToast } from '@/components/ui/use-toast';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/context/AuthContext';

const Pricing = () => {
  const [billingFrequency, setBillingFrequency] = useState<'quarter' | 'year'>('quarter');
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { checkSubscription } = useSubscription();
  const { isLoggedIn, isLoading } = useAuth();
  
  // Redirect to login if not authenticated
  if (!isLoading && !isLoggedIn) {
    return <Navigate to="/join" state={{ redirectTo: '/pricing' }} replace />;
  }

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
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
  
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-6">
          <PricingHeader 
            billingFrequency={billingFrequency}
            setBillingFrequency={setBillingFrequency}
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlansData.map((plan, index) => (
              <PricingPlan
                key={index}
                {...plan}
                billingFrequency={billingFrequency}
              />
            ))}
          </div>
          
          <FAQ />
          <ContactSection />
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
