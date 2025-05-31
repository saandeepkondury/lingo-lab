
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    logStep("Authenticating user with token");
    
    // Use anon key for authentication
    const authClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );
    
    const { data: userData, error: userError } = await authClient.auth.getUser(token);
    if (userError) {
      logStep("Authentication failed", { error: userError.message });
      throw new Error(`Authentication failed: ${userError.message}`);
    }
    
    const user = userData.user;
    if (!user?.email) {
      throw new Error("User not authenticated or email not available");
    }
    
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("Stripe configuration error");
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    if (customers.data.length === 0) {
      logStep("No customer found, updating unsubscribed state");
      
      // Use service role for database operations
      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
        { auth: { persistSession: false } }
      );
      
      await supabaseClient.from("subscribers").upsert({
        email: user.email,
        user_id: user.id,
        stripe_customer_id: null,
        subscribed: false,
        subscription_tier: null,
        subscription_end: null,
        plan_type: null,
        billing_frequency: null,
        monthly_case_study_limit: null,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email' });
      
      return new Response(JSON.stringify({ 
        subscribed: false, 
        subscription_tier: null, 
        subscription_end: null 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    // Check for active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 10,
    });
    
    let hasActiveSub = false;
    let subscriptionTier = null;
    let subscriptionEnd = null;
    let planType = null;
    let billingFrequency = null;
    let monthlyLimit = null;

    // Check for one-time payments (for Lingo Strategy plan)
    const payments = await stripe.paymentIntents.list({
      customer: customerId,
      limit: 10,
    });

    const successfulLingoStrategyPayment = payments.data.find(payment => 
      payment.status === 'succeeded' && 
      payment.amount === 499900 && 
      payment.created > (Date.now() / 1000) - (365 * 24 * 60 * 60) // Within last year
    );

    if (successfulLingoStrategyPayment) {
      hasActiveSub = true;
      subscriptionTier = "Lingo Strategy";
      planType = "investor";
      // Lingo Strategy is 3-month access
      subscriptionEnd = new Date(Date.now() + (90 * 24 * 60 * 60 * 1000)).toISOString(); // 3 months from now
      monthlyLimit = null; // Unlimited access
      logStep("Found successful Lingo Strategy payment", { paymentId: successfulLingoStrategyPayment.id });
    } else if (subscriptions.data.length > 0) {
      const subscription = subscriptions.data[0];
      const now = Math.floor(Date.now() / 1000);
      
      // Check if subscription is actually active and not expired
      if (subscription.current_period_end > now) {
        hasActiveSub = true;
        subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
        logStep("Active subscription found", { subscriptionId: subscription.id, endDate: subscriptionEnd });
        
        // Determine subscription tier from price
        const priceId = subscription.items.data[0].price.id;
        const price = await stripe.prices.retrieve(priceId);
        const amount = price.unit_amount || 0;
        const interval = price.recurring?.interval || 'month';
        const intervalCount = price.recurring?.interval_count || 1;
        
        // Determine billing frequency
        if (interval === 'year' || intervalCount >= 12) {
          billingFrequency = "year";
        } else {
          billingFrequency = "quarter";
        }
        
        // Determine tier based on amount
        // Basic: $147 quarterly ($14700 cents) or $528 annually ($52800 cents)
        // Pro: $297 quarterly ($29700 cents) or $1080 annually ($108000 cents)
        if (amount <= 52800) { // Basic plan (quarterly $14700 or annual $52800)
          subscriptionTier = "Basic";
          planType = "basic";
          monthlyLimit = 10; // 10 case studies per month
        } else if (amount <= 108000) { // Pro plan (quarterly $29700 or annual $108000)
          subscriptionTier = "Pro";
          planType = "pro";
          monthlyLimit = null; // Unlimited access
        } else {
          subscriptionTier = "Enterprise";
          planType = "enterprise";
          monthlyLimit = null; // Unlimited access
        }
        logStep("Determined subscription tier", { priceId, amount, subscriptionTier, billingFrequency, monthlyLimit });
      } else {
        logStep("Subscription found but expired", { 
          subscriptionId: subscription.id, 
          endDate: subscription.current_period_end,
          now: now 
        });
      }
    } else {
      logStep("No active subscription found");
    }

    // Use service role for database operations
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    await supabaseClient.from("subscribers").upsert({
      email: user.email,
      user_id: user.id,
      stripe_customer_id: customerId,
      subscribed: hasActiveSub,
      subscription_tier: subscriptionTier,
      subscription_end: subscriptionEnd,
      plan_type: planType,
      billing_frequency: billingFrequency,
      monthly_case_study_limit: monthlyLimit,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'email' });

    logStep("Updated database with subscription info", { subscribed: hasActiveSub, subscriptionTier, monthlyLimit });
    
    return new Response(JSON.stringify({
      subscribed: hasActiveSub,
      subscription_tier: subscriptionTier,
      subscription_end: subscriptionEnd
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
