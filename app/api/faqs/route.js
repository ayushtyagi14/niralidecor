import { NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

// Default FAQs to seed when table is empty (same content as faq1/staticFaqs)
const DEFAULT_FAQS = [
    // Services & Locations
    {
        question: 'What type of events Nirali decor provides services for?',
        answer: 'Mehendi, Welcome Night Party, Haldi, Sathak, Grahshanti, Vidhi/Mandap muhrat, Sangeet, Garba, Weddings & Reception',
    },
    {
        question: 'Where is Nirali Decor located?',
        answer: 'Our primary location is located at 500 Lincoln Blvd, Middlesex NJ 08846. Our second location is located at 5305 Fulton Industrial Blvd SW suite c, Atlanta, GA 30336.',
    },
    {
        question: 'Do you serve areas outside New Jersey and Atlanta?',
        answer: 'Yes, we do travel to different states MA, CT, NY-Up state, PA, MD, DE, DC, VA, NC, SC, AL, FL, TN, OH & IL.',
    },
    {
        question: 'How long has Nirali Decor been in the wedding decor industry?',
        answer: 'Founded in 2011, with over a decade of experience in wedding décor.',
    },
    {
        question: 'What types of weddings do you specialize in?',
        answer: 'Specializes in South Asian weddings, receptions, and pre-wedding events.',
    },
    {
        question: 'Can you handle destination weddings?',
        answer: 'We do not handle anything out of country. We service only in USA.',
    },

    // Booking & Consultations
    {
        question: 'Do you provide consultations before booking?',
        answer: 'Yes, we do provide virtual & in person consultations before booking. This helps us understand your vision and execute your wedding design.',
    },
    {
        question: 'How can I contact you for a quote?',
        answer: 'The best way to contact us is to fill out the contact form on our website to get in touch with us.',
    },
    {
        question: 'Do you have a physical showroom I can visit?',
        answer: 'Yes, you can visit us at our studio/warehouse in New Jersey and Atlanta where you will see samples of designs.',
    },
    {
        question: 'Can I view a portfolio of your past work?',
        answer: 'You can visit our website and Instagram to view our past work. During your consultation, we will also be happy to show you more of our portfolio.',
    },
    {
        question: 'How far in advance should I book your services?',
        answer: 'We recommend booking as early as possible so we can secure your date in our calendar as take on multiple events.',
    },
    {
        question: 'Do you require a deposit to secure a date?',
        answer: 'Yes, in order to secure your date we do require a signed contract and a 10% deposit.',
    },

    // Design & Customization
    {
        question: 'What differentiates your decor services from others?',
        answer: 'We deliver exceptional service with an uncompromising commitment to our clients. To ensure complete confidence and peace of mind, each event is supported by a dedicated décor team, overseeing every detail for a seamless and flawless execution.',
    },
    {
        question: 'Can decor be customized based on my color pallet?',
        answer: 'Yes, we select and design the decor that best fits you color pallet which coordinates with your wedding outfits.',
    },
    {
        question: 'Do you offer 3D design visualizations?',
        answer: 'At this time, we do not offer 3D design visualizations.',
    },
    {
        question: 'What if the venue has restrictions?',
        answer: 'We work within venue guidelines.',
    },

    // Logistics, Pricing & Operations
    {
        question: 'Can you work around a tight timeline?',
        answer: 'Yes, we can work around a tight timeline by providing additional team members if needed. Please note that this may involve an added cost.',
    },
    {
        question: 'Who is our main point of contact for my wedding event?',
        answer: 'A dedicated wedding décor coordinator will be assigned to you who will intake your inquiry and walk you through the process of selecting your décor from start to finish.',
    },
    {
        question: 'How is pricing determined?',
        answer: 'Pricing is determined by the design you select, as well as the amount of labor required to complete your event.',
    },
    {
        question: 'What methods of payment are accepted?',
        answer: 'Payments can be made via Check, Credit card, ACH & Cash.',
    },
    {
        question: 'Are there hidden fees?',
        answer: 'Pricing is transparent with no hidden fees.',
    },
    {
        question: 'Do you handle teardown after the event?',
        answer: 'Yes, setup and breakdown are also included.',
    },
    {
        question: 'What time will your team arrive on the event day?',
        answer: 'Our team arrives according to the schedule agreed upon during planning with you and coordination with the venue.',
    },
    {
        question: 'Will there be a foreman or lead onsite?',
        answer: 'Yes, a lead is on-site for execution.',
    },
    {
        question: 'How many team members handle installation?',
        answer: 'Team size depends on event scale.',
    },
];

// GET all FAQs (with seeding when table is empty)
export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('faqs')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        // If table is empty, seed it with the default FAQs
        if (!data || data.length === 0) {
            const timestamp = new Date().toISOString();
            const rows = DEFAULT_FAQS.map((item) => ({
                question: item.question,
                answer: item.answer,
                seo_title: '',
                seo_description: '',
                seo_keywords: '',
                created_at: timestamp,
                updated_at: timestamp,
            }));

            const { data: seeded, error: seedError } = await supabaseAdmin
                .from('faqs')
                .insert(rows)
                .select('*')
                .order('created_at', { ascending: false });

            if (seedError) throw seedError;
            return NextResponse.json(seeded || []);
        }

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
