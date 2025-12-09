import { NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

// GET single case study by ID
export async function GET(request, { params }) {
    try {
        const { id } = params;
        const isAdmin = request.headers.get('x-admin-token') === process.env.ADMIN_TOKEN;

        const { data, error } = await supabaseAdmin
            .from('case_studies')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        // If not admin and case study is not published, return 404
        if (!isAdmin && data?.status !== 'published') {
            return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching case study:', error);
        return NextResponse.json({ error: error.message }, { status: 404 });
    }
}

// PUT - Update case study by ID
export async function PUT(request, { params }) {
    try {
        const token = request.headers.get('x-admin-token');
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;
        const body = await request.json();

        const updateData = {
            title: body.title,
            client: body.client,
            year: body.year,
            hero_image: body.heroImage,
            summary: body.summary,
            metrics: body.metrics,
            tags: body.tags,
            category: body.category,
            status: body.status,
            seo_title: body.seoTitle,
            seo_description: body.seoDescription,
            seo_keywords: body.seoKeywords,
            updated_at: new Date().toISOString()
        };

        const { data, error } = await supabaseAdmin
            .from('case_studies')
            .update(updateData)
            .eq('id', id)
            .select();

        if (error) throw error;

        if (!data || data.length === 0) {
            return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
        }

        return NextResponse.json(data[0]);
    } catch (error) {
        console.error('Error updating case study:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE - Delete case study by ID
export async function DELETE(request, { params }) {
    try {
        const token = request.headers.get('x-admin-token');
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;

        const { data, error } = await supabaseAdmin
            .from('case_studies')
            .delete()
            .eq('id', id)
            .select();

        if (error) throw error;

        if (!data || data.length === 0) {
            return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
        }

        return NextResponse.json(data[0]);
    } catch (error) {
        console.error('Error deleting case study:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
