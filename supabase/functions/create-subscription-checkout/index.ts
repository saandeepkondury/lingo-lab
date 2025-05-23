
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");

    const { planName, billingFrequency } = await req.json();
    
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Check if customer already exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Define pricing based on plan and billing frequency
    let unitAmount;
    let interval;
    
    if (planName === "Basic") {
      unitAmount = billingFrequency === "year" ? Math.round(49 * 12 * 0.9 * 100) : 49 * 100; // $49/month
      interval = billingFrequency === "year" ? "year" : "month";
    } else if (planName === "Pro") {
      unitAmount = billingFrequency === "year" ? Math.round(99 * 12 * 0.9 * 100) : 99 * 100; // $99/month
      interval = billingFrequency === "year" ? "year" : "month";
    } else {
      throw new Error("Invalid plan name for subscription");
    }

    // For quarterly billing, we'll use monthly subscription but charge 3 months upfront
    if (billingFrequency === "quarter") {
      unitAmount = unitAmount * 3;
      interval = "month";
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { 
              name: `${planName} Plan`,
              description: billingFrequency === "year" ? "Annual billing with 10% discount" : billingFrequency === "quarter" ? "Quarterly billing" : "Monthly billing"
            },
            unit_amount: unitAmount,
            recurring: { interval: interval as "month" | "year" },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/case-studies?payment=success`,
      cancel_url: `${req.headers.get("origin")}/pricing?payment=cancelled`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
