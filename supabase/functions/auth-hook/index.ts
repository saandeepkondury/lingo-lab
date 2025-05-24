
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Webhook } from 'https://esm.sh/standardwebhooks@1.0.0';
import { Resend } from 'npm:resend@4.0.0';
import { renderAsync } from 'npm:@react-email/components@0.0.22';
import React from 'npm:react@18.3.1';
import { SignupConfirmationEmail } from './_templates/signup-confirmation.tsx';
import { EmailChangeEmail } from './_templates/email-change.tsx';
import { PasswordResetEmail } from './_templates/password-reset.tsx';

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string);
const hookSecret = Deno.env.get('AUTH_HOOK_SECRET') as string;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders 
    });
  }

  try {
    console.log("[AUTH-HOOK] Function started");
    
    const payload = await req.text();
    const headers = Object.fromEntries(req.headers);
    
    // Verify webhook signature if hook secret is configured
    if (hookSecret) {
      const wh = new Webhook(hookSecret);
      try {
        wh.verify(payload, headers);
      } catch (error) {
        console.error("[AUTH-HOOK] Webhook verification failed:", error);
        return new Response('Unauthorized', { 
          status: 401,
          headers: corsHeaders 
        });
      }
    }

    const {
      user,
      email_data: { 
        token, 
        token_hash, 
        redirect_to, 
        email_action_type,
        site_url 
      },
    } = JSON.parse(payload) as {
      user: {
        email: string;
        new_email?: string;
      };
      email_data: {
        token: string;
        token_hash: string;
        redirect_to: string;
        email_action_type: string;
        site_url: string;
      };
    };

    console.log(`[AUTH-HOOK] Processing ${email_action_type} for: ${user.email}`);

    let html: string;
    let subject: string;
    let toEmail: string = user.email;

    switch (email_action_type) {
      case 'signup':
        html = await renderAsync(
          React.createElement(SignupConfirmationEmail, {
            email: user.email,
            token,
            token_hash,
            redirect_to,
            supabase_url: site_url,
          })
        );
        subject = 'Confirm your LingoLab account';
        break;

      case 'email_change':
        // For email change, send to the new email address
        toEmail = user.new_email || user.email;
        html = await renderAsync(
          React.createElement(EmailChangeEmail, {
            email: user.email,
            new_email: user.new_email || user.email,
            token,
            token_hash,
            redirect_to,
            supabase_url: site_url,
          })
        );
        subject = 'Confirm your new email address - LingoLab';
        break;

      case 'recovery':
        html = await renderAsync(
          React.createElement(PasswordResetEmail, {
            email: user.email,
            token,
            token_hash,
            redirect_to,
            supabase_url: site_url,
          })
        );
        subject = 'Reset your LingoLab password';
        break;

      default:
        console.error(`[AUTH-HOOK] Unknown email action type: ${email_action_type}`);
        return new Response(
          JSON.stringify({ error: 'Unknown email action type' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );
    }

    const emailResponse = await resend.emails.send({
      from: 'LingoLab <onboarding@resend.dev>',
      to: [toEmail],
      subject,
      html,
    });

    console.log(`[AUTH-HOOK] ${email_action_type} email sent successfully:`, emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `${email_action_type} email sent successfully`,
        emailId: emailResponse.data?.id 
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error(`[AUTH-HOOK] Error sending email:`, error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
