
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'
import { Resend } from "npm:resend@2.0.0";
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import React from 'npm:react@18.3.1'
import { NewsletterConfirmation } from './_templates/newsletter-confirmation.tsx'

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NewsletterSignupRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[NEWSLETTER-SIGNUP] Function started");
    
    const { email }: NewsletterSignupRequest = await req.json();
    console.log(`[NEWSLETTER-SIGNUP] Processing signup for: ${email}`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check if subscriber already exists
    const { data: existingSubscriber, error: checkError } = await supabase
      .from('subscribers')
      .select('id, email')
      .eq('email', email)
      .maybeSingle();

    if (checkError) {
      console.error('[NEWSLETTER-SIGNUP] Database check error:', checkError);
      throw new Error(`Database error: ${checkError.message}`);
    }

    if (existingSubscriber) {
      console.log(`[NEWSLETTER-SIGNUP] Email already subscribed: ${email}`);
      return new Response(JSON.stringify({ 
        success: true, 
        message: "You're already subscribed to our newsletter!",
        alreadySubscribed: true 
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    // Insert new subscriber into database
    const { data: subscriber, error: dbError } = await supabase
      .from('subscribers')
      .insert([{ 
        email: email,
        subscribed: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (dbError) {
      console.error('[NEWSLETTER-SIGNUP] Database insert error:', dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    console.log('[NEWSLETTER-SIGNUP] Subscriber added to database:', subscriber);

    // Render the email template
    const emailHtml = await renderAsync(
      React.createElement(NewsletterConfirmation, { email })
    );

    // Send confirmation email
    const emailResponse = await resend.emails.send({
      from: "LingoLab <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to LingoLab's Newsletter! 🎉",
      html: emailHtml,
    });

    console.log("[NEWSLETTER-SIGNUP] Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Successfully subscribed! Check your email for confirmation.",
      subscriberId: subscriber.id,
      emailId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("[NEWSLETTER-SIGNUP] Error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
