import { NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

// GET single FAQ by ID
export async function GET(request, { params }) {
    try {
        const { id } = params;

        const { data, error } = await supabaseAdmin
            .from('faqs')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching FAQ:', error);
        return NextResponse.json({ error: error.message }, { status: 404 });
    }
}

// PUT - Update FAQ by ID
export async function PUT(request, { params }) {
    try {
        const token = request.headers.get('x-admin-token');
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;
        const body = await request.json();

        const updateData = {
            question: body.question,
            answer: body.answer,
            seo_title: body.seoTitle,
            seo_description: body.seoDescription,
            seo_keywords: body.seoKeywords,
            updated_at: new Date().toISOString()
        };

        const { data, error } = await supabaseAdmin
            .from('faqs')
            .update(updateData)
            .eq('id', id)
            .select();

        if (error) throw error;

        if (!data || data.length === 0) {
            return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
        }

        return NextResponse.json(data[0]);
    } catch (error) {
        console.error('Error updating FAQ:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE - Delete FAQ by ID
export async function DELETE(request, { params }) {
    try {
        const token = request.headers.get('x-admin-token');
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;

        const { data, error } = await supabaseAdmin
            .from('faqs')
            .delete()
            .eq('id', id)
            .select();

        if (error) throw error;

        if (!data || data.length === 0) {
            return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
        }

        return NextResponse.json(data[0]);
    } catch (error) {
        console.error('Error deleting FAQ:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
