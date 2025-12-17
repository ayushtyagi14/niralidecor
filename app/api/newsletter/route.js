import { NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

// POST - Subscribe email to newsletter
export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body || {};

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const subscriberData = {
      email,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from('newsletter_subscribers')
      .insert([subscriberData])
      .select();

    if (error) {
      // Handle unique constraint or other DB errors more gracefully
      if (error.code === '23505') {
        // unique_violation (Postgres)
        return NextResponse.json({ message: 'You are already subscribed.' }, { status: 200 });
      }
      console.error('Error inserting newsletter subscriber:', error);
      return NextResponse.json({ error: 'Failed to subscribe. Please try again later.' }, { status: 500 });
    }

    return NextResponse.json(data?.[0] || { message: 'Subscribed successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error in newsletter subscribe handler:', error);
    return NextResponse.json({ error: 'Failed to subscribe. Please try again later.' }, { status: 500 });
  }
}
