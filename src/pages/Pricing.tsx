
import { useState } from 'react';
import Layout from '@/components/Layout';
import PricingHeader from '@/components/pricing/PricingHeader';
import PricingPlan from '@/components/pricing/PricingPlan';
import FAQ from '@/components/pricing/FAQ';
import ContactSection from '@/components/pricing/ContactSection';
import { pricingPlansData } from '@/data/pricingPlansData';

const Pricing = () => {
  const [billingFrequency, setBillingFrequency] = useState<'month' | 'year'>('month');
  
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
