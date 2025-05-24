
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

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

    const emailResponse = await resend.emails.send({
      from: "LingoLab <hello@lingolab.site>",
      to: [email],
      subject: "Welcome to LingoLab! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to LingoLab</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="color: #0f766e; font-size: 32px; margin-bottom: 10px;">
                Welcome to <span style="background: linear-gradient(to right, #0f766e, #f97316); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">LingoLab</span>! 🎉
              </h1>
              <p style="font-size: 18px; color: #666; margin: 0;">Thank you for joining our community</p>
            </div>
            
            <div style="background: #f8fafc; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
              <h2 style="color: #0f766e; margin-top: 0; margin-bottom: 20px;">What's Next?</h2>
              <ul style="padding-left: 20px; margin: 0;">
                <li style="margin-bottom: 12px;">
                  <strong>Explore Case Studies:</strong> Discover how the world's most successful startups used strategic narrative to drive growth
                </li>
                <li style="margin-bottom: 12px;">
                  <strong>Get Weekly Insights:</strong> You'll receive our newsletter "The Lingo Drop" with strategic narrative breakthroughs
                </li>
                <li style="margin-bottom: 12px;">
                  <strong>Access Premium Content:</strong> Unlock our full library of case studies and exclusive interviews
                </li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-bottom: 30px;">
              <a href="https://pnwakyibtpncjosghlbh.lovable.app/join" 
                 style="display: inline-block; background: #0f766e; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin-right: 12px;">
                Get Started →
              </a>
              <a href="https://pnwakyibtpncjosghlbh.lovable.app/case-studies" 
                 style="display: inline-block; border: 2px solid #0f766e; color: #0f766e; padding: 12px 26px; text-decoration: none; border-radius: 8px; font-weight: 600;">
                Browse Case Studies
              </a>
            </div>
            
            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
              <p style="margin: 0; font-size: 14px; color: #666;">
                Questions? Reply to this email or visit our 
                <a href="https://pnwakyibtpncjosghlbh.lovable.app" style="color: #0f766e;">website</a>
              </p>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">
                LingoLab - Strategic Narrative for Startups
              </p>
            </div>
          </body>
        </html>
      `,
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
