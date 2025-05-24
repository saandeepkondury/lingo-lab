
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";
import { renderAsync } from 'npm:@react-email/components@0.0.22';
import React from 'npm:react@18.3.1';
import { WelcomeEmail } from './_templates/welcome-email.tsx';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  subscriber_id: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[WELCOME-EMAIL] Function started");
    
    const { email, subscriber_id }: WelcomeEmailRequest = await req.json();
    console.log(`[WELCOME-EMAIL] Sending welcome email to: ${email}`);

    // Render the React Email template
    const html = await renderAsync(
      React.createElement(WelcomeEmail, {
        email,
        subscriber_id,
      })
    );

    const emailResponse = await resend.emails.send({
      from: "LingoLab <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to LingoLab! 🎉",
      html,
    });

    console.log("[WELCOME-EMAIL] Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Welcome email sent successfully",
      emailId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("[WELCOME-EMAIL] Error sending welcome email:", error);
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
