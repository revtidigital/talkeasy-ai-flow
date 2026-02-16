import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

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

    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 465,
        tls: true,
        auth: {
          username: SMTP_USER,
          password: SMTP_PASS,
        },
      },
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

    // Also send data to Google Sheet via Apps Script
    try {
      const params = new URLSearchParams();
      params.append('fullName', fullName || '');
      params.append('email', email || '');
      params.append('phone', phone || '');
      params.append('product', product || '');
      params.append('subject', subject || '');
      params.append('message', message || '');
      params.append('utm_source', utm_source || '');
      params.append('utm_medium', utm_medium || '');
      params.append('utm_campaign', utm_campaign || '');

      await fetch(
        'https://script.google.com/macros/s/AKfycbxt6gYfBYRjGPkxsqfPmwIGI0Kkxx7EDZWreWISOIUt-RcRip09Khn01qUFDZMASBWCcA/exec',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
          redirect: 'follow',
        }
      );
    } catch (sheetError) {
      console.error('Google Sheet submission failed:', sheetError);
      // Don't fail the whole request if sheet fails
    }

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
