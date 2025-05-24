
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

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    logStep("Function started");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    logStep("Authenticating user");
    
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

    const { planType } = await req.json();
    logStep("Plan type received", { planType });

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
      });
      logStep("One-time payment session created", { sessionId: session.id });
    } else {
      // Recurring subscription for Basic/Pro plans
      const planPrices = {
        basic: 4900, // $49 monthly, but billed quarterly
        pro: 9900,   // $99 monthly, but billed quarterly
      };

      const planNames = {
        basic: "Basic Plan - LingoLab",
        pro: "Pro Plan - LingoLab",
      };

      session = await stripe.checkout.sessions.create({
        customer: customerId,
        customer_email: customerId ? undefined : user.email,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: { name: planNames[planType as keyof typeof planNames] },
              unit_amount: planPrices[planType as keyof typeof planPrices] * 3, // Quarterly billing
              recurring: { interval: "month", interval_count: 3 },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${origin}/pricing?success=true&plan=${planType}`,
        cancel_url: `${origin}/pricing?canceled=true`,
      });
      logStep("Subscription session created", { sessionId: session.id, planType });
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
