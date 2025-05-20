
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';

const pricingPlans = [
  {
    name: "Free",
    description: "Basic access to case studies",
    price: 0,
    features: [
      { included: true, text: "10 case studies per month" },
      { included: true, text: "Basic search functionality" },
      { included: true, text: "Weekly newsletter" },
      { included: false, text: "Full case study library" },
      { included: false, text: "Downloadable content" },
      { included: false, text: "Founder interviews" },
      { included: false, text: "Advanced filters" },
      { included: false, text: "Private research" },
    ],
    cta: "Sign Up Free"
  },
  {
    name: "Pro",
    description: "For founders and marketers",
    price: 19,
    frequency: "month",
    popular: true,
    features: [
      { included: true, text: "Unlimited case studies" },
      { included: true, text: "Advanced search & filters" },
      { included: true, text: "Download pitch decks & assets" },
      { included: true, text: "Exclusive founder interviews" },
      { included: true, text: "Save to personal library" },
      { included: true, text: "Premium newsletter" },
      { included: false, text: "Investor-only insights" },
      { included: false, text: "Private research sessions" },
    ],
    cta: "Start Pro Trial"
  },
  {
    name: "Investor",
    description: "For VCs and strategic investors",
    price: 99,
    frequency: "month",
    features: [
      { included: true, text: "All Pro plan features" },
      { included: true, text: "Emerging narrative trends" },
      { included: true, text: "Market category analysis" },
      { included: true, text: "Dealflow narrative reporting" },
      { included: true, text: "Strategic narrative workshops" },
      { included: true, text: "Early access to new trends" },
      { included: true, text: "Founder matchmaking" },
      { included: true, text: "Private consulting sessions" },
    ],
    cta: "Contact Sales"
  }
];

const Pricing = () => {
  const [billingFrequency, setBillingFrequency] = useState<'month' | 'year'>('month');
  
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">Pricing Plans</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your strategic narrative needs
            </p>
            
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant={billingFrequency === 'month' ? 'default' : 'outline'}
                className={billingFrequency === 'month' ? 'bg-teal-500 hover:bg-teal-600' : ''}
                onClick={() => setBillingFrequency('month')}
              >
                Monthly Billing
              </Button>
              <Button
                variant={billingFrequency === 'year' ? 'default' : 'outline'}
                className={billingFrequency === 'year' ? 'bg-teal-500 hover:bg-teal-600' : ''}
                onClick={() => setBillingFrequency('year')}
              >
                Annual Billing
                <Badge variant="outline" className="ml-2 bg-coral-50 text-coral-500 border-coral-200">
                  Save 20%
                </Badge>
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                className={`relative rounded-xl border ${
                  plan.popular 
                    ? 'border-teal-200 shadow-lg shadow-teal-100' 
                    : 'border-border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 inset-x-0 flex justify-center">
                    <Badge className="bg-teal-500 hover:bg-teal-600">Most Popular</Badge>
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-2xl font-semibold">{plan.name}</h3>
                  <p className="text-muted-foreground">{plan.description}</p>
                  
                  <div className="mt-4 mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      {plan.price > 0 && (
                        <span className="text-muted-foreground ml-1">
                          /{billingFrequency === 'year' ? 'year' : plan.frequency}
                        </span>
                      )}
                    </div>
                    {plan.price > 0 && billingFrequency === 'year' && (
                      <p className="text-sm text-muted-foreground mt-1">
                        ${Math.round(plan.price * 12 * 0.8)} billed annually
                      </p>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                        <span className={!feature.included ? 'text-muted-foreground' : ''}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-teal-500 hover:bg-teal-600'
                        : ''
                    }`} 
                    variant={plan.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <Link to="/join">
                      {plan.cta}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-muted/30 rounded-xl p-8 mt-16">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              <div>
                <h3 className="font-medium mb-2">Can I switch plans later?</h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade, downgrade, or cancel your plan at any time from your account settings.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground">
                  We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, just let us know.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards, as well as PayPal for annual billing plans.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Can I request specific case studies?</h3>
                <p className="text-muted-foreground">
                  Pro and Investor plan members can submit case study requests, which our team will consider for future additions.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Do you offer team discounts?</h3>
                <p className="text-muted-foreground">
                  Yes, we offer special pricing for teams of 3 or more. Please contact us for details.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">How often is new content added?</h3>
                <p className="text-muted-foreground">
                  We add new case studies weekly and refresh existing content with new insights regularly.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              Need help choosing the right plan? Have special requirements?
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
