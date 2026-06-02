import { NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

export async function GET(request) {
  try {
    // Check admin auth
    const token = request.headers.get('x-admin-token');
    if (!token || token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get date range from query params
    const { searchParams } = new URL(request.url);
    const fromDate = searchParams.get('from');
    const toDate = searchParams.get('to');

    let query = supabaseAdmin
      .from('wedding_consultations')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply date filters if provided
    if (fromDate) {
      query = query.gte('created_at', `${fromDate}T00:00:00.000Z`);
    }
    if (toDate) {
      query = query.lte('created_at', `${toDate}T23:59:59.999Z`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch consultations' }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('GET consultations error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function sendAdminNotificationEmail({ name, email, contact, weddingDate, eventLocation }) {
  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) {
    console.warn('Email dispatch skipped: Missing RESEND_API_KEY or ADMIN_EMAIL in server environment.');
    return null;
  }

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Lead Notification</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f7f4f2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #e8d5d0;">
          <tr>
            <td style="background-color: #96034f; padding: 40px 20px; text-align: center;">
              <span style="font-size: 32px; display: block; margin-bottom: 5px;">🌸</span>
              <h1 style="color: #ffffff; font-size: 24px; font-weight: 300; margin: 0; letter-spacing: 1px; text-transform: uppercase;">
                New Lead Captured
              </h1>
              <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 5px 0 0 0; font-style: italic;">
                Wedding & Event Consultation Inquiry
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #5d4e37; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                Hello Team, <br/>
                You have received a new premium consultation request from the website popup. Here are the client details:
              </p>
              <table width="100%" style="border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #f3ece8;">
                  <td style="padding: 15px 0; font-size: 14px; font-weight: bold; color: #8B4513; text-transform: uppercase; width: 35%;">Client Name</td>
                  <td style="padding: 15px 0; font-size: 15px; color: #2c2520;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f3ece8;">
                  <td style="padding: 15px 0; font-size: 14px; font-weight: bold; color: #8B4513; text-transform: uppercase;">Email Address</td>
                  <td style="padding: 15px 0; font-size: 15px; color: #2c2520;">
                    <a href="mailto:${email}" style="color: #96034f; text-decoration: none; font-weight: 500;">${email}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #f3ece8;">
                  <td style="padding: 15px 0; font-size: 14px; font-weight: bold; color: #8B4513; text-transform: uppercase;">Phone Number</td>
                  <td style="padding: 15px 0; font-size: 15px; color: #2c2520;">
                    <a href="tel:${contact}" style="color: #96034f; text-decoration: none; font-weight: 500;">${contact}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #f3ece8;">
                  <td style="padding: 15px 0; font-size: 14px; font-weight: bold; color: #8B4513; text-transform: uppercase;">Wedding Date</td>
                  <td style="padding: 15px 0; font-size: 15px; color: #2c2520;">${weddingDate || 'Not provided'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f3ece8;">
                  <td style="padding: 15px 0; font-size: 14px; font-weight: bold; color: #8B4513; text-transform: uppercase;">Venue/City</td>
                  <td style="padding: 15px 0; font-size: 15px; color: #2c2520;">${eventLocation || 'Not provided'}</td>
                </tr>
              </table>
              <div style="margin-top: 40px; text-align: center;">
                <a href="mailto:${email}" style="background-color: #96034f; color: #ffffff; padding: 15px 30px; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 10px; display: inline-block; box-shadow: 0 4px 10px rgba(150,3,79,0.2);">
                  Reply Instantly
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #fcfaf8; padding: 30px; text-align: center; border-top: 1px solid #f3ece8;">
              <p style="margin: 0; font-size: 12px; color: #a09080; line-height: 1.5;">
                This inquiry was routed and secured using Next.js Server-Side Orchestration. <br/>
                © ${new Date().getFullYear()} Nirali Decor. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'Nirali Decor Website <onboarding@resend.dev>',
      to: [process.env.ADMIN_EMAIL],
      subject: `🌸 New Wedding Lead - ${name}`,
      html: emailHtml,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Resend API failed: ${errText}`);
  }

  return response.json();
}

export async function POST(request) {
  try {
    const { name, email, contact, weddingDate, eventLocation } = await request.json();

    if (!name || !email || !contact) {
      return NextResponse.json({ error: 'Missing required lead fields' }, { status: 400 });
    }

    // 1. Insert to Supabase securely
    const { data, error } = await supabaseAdmin
      .from('wedding_consultations')
      .insert([
        {
          name,
          email,
          contact,
          wedding_date: weddingDate,
          event_location: eventLocation,
          status: 'new',
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('Database insertion error:', error);
      return NextResponse.json({ error: 'Database save failed' }, { status: 500 });
    }

    // 2. Dispatch email notification securely using Resend
    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      try {
        await sendAdminNotificationEmail({ name, email, contact, weddingDate, eventLocation });
      } catch (err) {
        console.error('Email notification failed:', err);
      }
    }

    return NextResponse.json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('POST handler fatal error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    // Check admin auth
    const token = request.headers.get('x-admin-token');
    if (!token || token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('wedding_consultations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete error:', error);
      return NextResponse.json({ error: 'Failed to delete consultation' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('DELETE consultation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
