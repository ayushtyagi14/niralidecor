import { NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

// GET all FAQs
export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('faqs')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST - Create new FAQ
export async function POST(request) {
    try {
        const token = request.headers.get('x-admin-token');
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { question, answer, seoTitle, seoDescription, seoKeywords } = body;

        if (!question || !answer) {
            return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 });
        }

        const faqData = {
            question,
            answer,
            seo_title: seoTitle || '',
            seo_description: seoDescription || '',
            seo_keywords: seoKeywords || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        const { data, error } = await supabaseAdmin.from('faqs').insert([faqData]).select();

        if (error) throw error;

        return NextResponse.json(data[0], { status: 201 });
    } catch (error) {
        console.error('Error creating FAQ:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
