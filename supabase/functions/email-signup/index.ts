
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailSignupRequest {
  email: string;
  source: 'homepage' | 'newsletter';
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[EMAIL-SIGNUP] Function started");
    
    const { email, source }: EmailSignupRequest = await req.json();
    console.log(`[EMAIL-SIGNUP] Processing signup for: ${email} from ${source}`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get client info from headers
    const userAgent = req.headers.get('user-agent') || null;
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const ipAddress = forwardedFor?.split(',')[0]?.trim() || realIp || null;

    // Check if email already exists for this source
    const { data: existingSignup, error: checkError } = await supabase
      .from('email_signups')
      .select('id, email, source')
      .eq('email', email)
      .eq('source', source)
      .maybeSingle();

    if (checkError) {
      console.error('[EMAIL-SIGNUP] Database check error:', checkError);
      throw new Error(`Database error: ${checkError.message}`);
    }

    if (existingSignup) {
      console.log(`[EMAIL-SIGNUP] Email already signed up: ${email} for ${source}`);
      return new Response(JSON.stringify({ 
        success: true, 
        message: "You're already signed up!",
        alreadySignedUp: true 
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    // Insert new email signup
    const { data: signup, error: dbError } = await supabase
      .from('email_signups')
      .insert([{ 
        email: email,
        source: source,
        user_agent: userAgent,
        ip_address: ipAddress
      }])
      .select()
      .single();

    if (dbError) {
      console.error('[EMAIL-SIGNUP] Database insert error:', dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    console.log('[EMAIL-SIGNUP] Email signup added to database:', signup);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Successfully signed up! We'll be in touch soon.",
      signupId: signup.id
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("[EMAIL-SIGNUP] Error:", error);
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
