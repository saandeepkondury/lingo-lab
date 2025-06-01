
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      logStep("No authorization header provided");
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    logStep("Authenticating user");
    
    // Use anon key for user authentication
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );
    
    const { data, error: authError } = await supabaseClient.auth.getUser(token);
    if (authError) {
      logStep("Authentication failed", { error: authError.message });
      throw new Error(`Authentication failed: ${authError.message}`);
    }
    
    const user = data.user;
    if (!user?.email) {
      throw new Error("User not authenticated or email not available");
    }
    
    logStep("User authenticated", { userId: user.id, email: user.email });

    const { planType, billingFrequency = 'quarter' } = await req.json();
    logStep("Plan type and billing frequency received", { planType, billingFrequency });

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      logStep("Stripe secret key not found");
      throw new Error("Stripe configuration error");
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    } else {
      logStep("No existing customer found");
    }

    const origin = req.headers.get("origin") || "https://1b47a6d6-0bdb-47c2-88d9-152af9583ef3.lovableproject.com";

    let session;
    if (planType === "investor") {
      // One-time payment for Lingo Strategy plan at $500
      session = await stripe.checkout.sessions.create({
        customer: customerId,
        customer_email: customerId ? undefined : user.email,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: { name: "Lingo Strategy - 3 Month Program" },
              unit_amount: 50000, // $500 in cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${origin}/pricing?success=true&plan=lingo-strategy`,
        cancel_url: `${origin}/pricing?canceled=true`,
        metadata: {
          user_id: user.id,
          plan_type: planType,
          billing_frequency: billingFrequency,
        },
      });
      logStep("Lingo Strategy payment session created", { sessionId: session.id });
    } else if (planType === "basic") {
      // Basic is now free - no checkout needed
      logStep("Basic plan is free - no checkout needed");
      return new Response(JSON.stringify({ message: "Basic plan is free" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      // Recurring subscription for Pro plan only
      const planPrices = {
        // Pro: $99/quarter ($297) or $1080/year
        pro: billingFrequency === 'year' ? 108000 : 29700,   // $1080 annually or $297 quarterly
      };

      const planNames = {
        pro: "Pro Plan - LingoLab",
      };

      const interval = billingFrequency === 'year' ? "year" : "month";
      const intervalCount = billingFrequency === 'year' ? 1 : 3; // 3 months for quarterly
      const unitAmount = planPrices[planType as keyof typeof planPrices];

      session = await stripe.checkout.sessions.create({
        customer: customerId,
        customer_email: customerId ? undefined : user.email,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: { name: planNames[planType as keyof typeof planNames] },
              unit_amount: unitAmount,
              recurring: { interval: interval, interval_count: intervalCount },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${origin}/pricing?success=true&plan=${planType}`,
        cancel_url: `${origin}/pricing?canceled=true`,
        metadata: {
          user_id: user.id,
          plan_type: planType,
          billing_frequency: billingFrequency,
        },
      });
      logStep("Subscription session created", { sessionId: session.id, planType, billingFrequency });
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
