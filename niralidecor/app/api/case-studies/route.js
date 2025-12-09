import { NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

// GET all case studies
export async function GET(request) {
    try {
        const isAdmin = request.headers.get('x-admin-token') === process.env.ADMIN_TOKEN;

        let query = supabaseAdmin.from('case_studies').select('*').order('created_at', { ascending: false });

        // If not admin, only show published case studies
        if (!isAdmin) {
            query = query.eq('status', 'published');
        }

        const { data, error } = await query;

        if (error) throw error;

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Error fetching case studies:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST - Create new case study
export async function POST(request) {
    try {
        const token = request.headers.get('x-admin-token');
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { title, client, year, heroImage, summary, metrics, tags, category, status, seoTitle, seoDescription, seoKeywords } = body;

        if (!title || !client) {
            return NextResponse.json({ error: 'Title and client are required' }, { status: 400 });
        }

        const caseStudyData = {
            title,
            client,
            year: year || new Date().getFullYear(),
            hero_image: heroImage || '',
            summary: summary || '',
            metrics: metrics || [],
            tags: tags || [],
            category: category || 'General',
            status: status || 'published',
            seo_title: seoTitle || '',
            seo_description: seoDescription || '',
            seo_keywords: seoKeywords || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        const { data, error } = await supabaseAdmin.from('case_studies').insert([caseStudyData]).select();

        if (error) throw error;

        return NextResponse.json(data[0], { status: 201 });
    } catch (error) {
        console.error('Error creating case study:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
