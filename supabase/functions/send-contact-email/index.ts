import { SmtpClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SMTP_USER = Deno.env.get('SMTP_USER');
    const SMTP_PASS = Deno.env.get('SMTP_PASS');

    if (!SMTP_USER || !SMTP_PASS) {
      throw new Error('SMTP credentials not configured');
    }

    const { fullName, email, phone, product, subject, message, utm_source, utm_medium, utm_campaign } = await req.json();

    const client = new SmtpClient();

    await client.connectTLS({
      hostname: "smtp.gmail.com",
      port: 465,
      username: SMTP_USER,
      password: SMTP_PASS,
    });

    const emailBody = `
New Contact Form Submission
===========================

Name: ${fullName}
Email: ${email}
Phone: ${phone}
Product: ${product}
Subject: ${subject}

Message:
${message}

UTM Parameters:
- Source: ${utm_source || 'N/A'}
- Medium: ${utm_medium || 'N/A'}
- Campaign: ${utm_campaign || 'N/A'}
    `.trim();

    await client.send({
      from: SMTP_USER,
      to: SMTP_USER,
      subject: `Contact Form: ${subject}`,
      content: emailBody,
    });

    await client.close();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
