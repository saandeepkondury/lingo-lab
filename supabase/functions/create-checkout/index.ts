
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

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
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
      // One-time payment for Investor plan
      session = await stripe.checkout.sessions.create({
        customer: customerId,
        customer_email: customerId ? undefined : user.email,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: { name: "Investor Plan - LingoLab" },
              unit_amount: 499900, // $4999 in cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${origin}/pricing?success=true&plan=investor`,
        cancel_url: `${origin}/pricing?canceled=true`,
        metadata: {
          user_id: user.id,
          plan_type: planType,
          billing_frequency: billingFrequency,
        },
      });
      logStep("One-time payment session created", { sessionId: session.id });
    } else {
      // Recurring subscription for Basic/Pro plans
      const planPrices = {
        basic: billingFrequency === 'year' ? 4410 : 4900, // $44.10/month annually or $49/month quarterly
        pro: billingFrequency === 'year' ? 8910 : 9900,   // $89.10/month annually or $99/month quarterly
      };

      const planNames = {
        basic: "Basic Plan - LingoLab",
        pro: "Pro Plan - LingoLab",
      };

      const intervalCount = billingFrequency === 'year' ? 12 : 3;
      const unitAmount = billingFrequency === 'year' 
        ? planPrices[planType as keyof typeof planPrices] * 12
        : planPrices[planType as keyof typeof planPrices] * 3;

      session = await stripe.checkout.sessions.create({
        customer: customerId,
        customer_email: customerId ? undefined : user.email,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: { name: planNames[planType as keyof typeof planNames] },
              unit_amount: unitAmount,
              recurring: { interval: "month", interval_count: intervalCount },
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
