
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';

const StripeExample = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleOneTimePayment = async () => {
    setIsLoading(true);
    try {
      // Hardcoded response simulation
      const mockUrl = 'https://checkout.stripe.com/pay/cs_test_example123';
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Open mock Stripe checkout in a new tab
      window.open(mockUrl, '_blank');
      
      toast({
        title: "Redirecting to Stripe",
        description: "Opening payment checkout in a new tab..."
      });
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment failed",
        description: "Failed to create payment session. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscription = async (planType: string, amount: number) => {
    setIsLoading(true);
    try {
      // Hardcoded response simulation
      const mockUrl = `https://checkout.stripe.com/pay/cs_test_subscription_${planType}_example123`;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Open mock Stripe checkout in a new tab
      window.open(mockUrl, '_blank');
      
      toast({
        title: "Redirecting to Stripe",
        description: `Opening ${planType} subscription checkout in a new tab...`
      });
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription failed",
        description: "Failed to create subscription session. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Stripe Integration Examples</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Demonstration of Stripe payment integration with both one-time payments and subscription functionality.
          </p>
        </div>

        <Card className="mb-8 border-amber-200 bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
                Demo Mode
              </Badge>
              <span className="text-amber-800">
                This is a demonstration with hardcoded data. No actual payments will be processed.
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* One-time Payment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                One-Time Payment
                <Badge variant="secondary">Payment</Badge>
              </CardTitle>
              <CardDescription>
                Single payment example using Stripe Checkout
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold text-center py-4">
                $49.99
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• One-time purchase</li>
                <li>• Immediate payment processing</li>
                <li>• No recurring charges</li>
                <li>• Secure Stripe checkout</li>
              </ul>
              <Button 
                onClick={handleOneTimePayment}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Processing..." : "Buy Now"}
              </Button>
            </CardContent>
          </Card>

          {/* Subscription */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Monthly Subscription
                <Badge variant="secondary">Recurring</Badge>
              </CardTitle>
              <CardDescription>
                Recurring subscription example using Stripe Checkout
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold text-center py-4">
                $9.99<span className="text-lg font-normal text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Monthly billing cycle</li>
                <li>• Automatic renewals</li>
                <li>• Cancel anytime</li>
                <li>• Stripe customer portal</li>
              </ul>
              <Button 
                onClick={() => handleSubscription('basic', 999)}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Processing..." : "Subscribe"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Implementation Details */}
        <Card>
          <CardHeader>
            <CardTitle>Implementation Details</CardTitle>
            <CardDescription>
              Technical information about the Stripe integration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Edge Functions</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• <code>create-payment</code> - Handles one-time payments</li>
                <li>• <code>create-checkout</code> - Handles subscription creation</li>
                <li>• <code>check-subscription</code> - Verifies subscription status</li>
                <li>• <code>customer-portal</code> - Manages subscription settings</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Security</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Server-side payment processing</li>
                <li>• Secure API key management</li>
                <li>• User authentication required</li>
                <li>• CORS protection enabled</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Features</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Opens Stripe checkout in new tab</li>
                <li>• Automatic customer creation</li>
                <li>• Success/cancel URL handling</li>
                <li>• Error handling and user feedback</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StripeExample;
