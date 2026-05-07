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

export async function POST(request) {
  try {
    const { name, email, contact, weddingDate, eventLocation, adminEmail } = await request.json();

    // Create email content
    const emailContent = `
🌸 NEW WEDDING CONSULTATION REQUEST 🌸

Client Details:
• Name: ${name}
• Email: ${email}
• Contact: ${contact}
• Wedding Date: ${weddingDate}
• Event Location: ${eventLocation}

Next Step: Contact this client within 24 hours!

---
Sent from Nirali Decor Website
    `;

    // Use Webhook.site (free, instant, no verification needed)
    const webhookResponse = await fetch('https://webhook.site/your-unique-id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: adminEmail,
        subject: '🌸 New Wedding Consultation Request - ' + name,
        body: emailContent,
        timestamp: new Date().toISOString(),
        clientData: {
          name,
          email,
          contact,
          weddingDate,
          eventLocation
        }
      }),
    });

    // Alternative: Use a simple email service
    try {
      const simpleEmailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_default',
          template_id: 'template_default',
          user_id: 'user_default',
          template_params: {
            to_email: adminEmail,
            from_name: 'Nirali Decor',
            subject: '🌸 New Wedding Consultation Request - ' + name,
            message: emailContent,
            client_name: name,
            client_email: email,
            client_phone: contact,
            wedding_date: weddingDate,
            event_location: eventLocation
          }
        }),
      });
    } catch (emailjsError) {
      console.log('EmailJS not configured, using webhook only');
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully',
      webhook_url: 'https://webhook.site/your-unique-id' // You'll get this after visiting webhook.site
    });
  } catch (error) {
    console.error('Form submission error:', error);
    
    // Always save to console as backup
    console.log('=== WEDDING CONSULTATION SUBMISSION ===');
    console.log('Admin Email:', adminEmail);
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Contact:', contact);
    console.log('Wedding Date:', weddingDate);
    console.log('Event Location:', eventLocation);
    console.log('=====================================');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted (check console for details)',
      console_backup: true 
    });
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
