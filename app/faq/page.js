'use client';

import { useEffect, useState } from 'react';
import Accordion from '@/components/Blog/Accordion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './faq.css';

// Static FAQs copied from faq1/page.js (flattened)
const staticFaqs = [
    // Services & Locations
    {
        id: 1,
        question: 'What type of events Nirali decor provides services for?',
        answer: 'Mehendi, Welcome Night Party, Haldi, Sathak, Grahshanti, Vidhi/Mandap muhrat, Sangeet, Garba, Weddings & Reception',
    },
    {
        id: 2,
        question: 'Where is Nirali Decor located?',
        answer: 'Our primary location is located at 500 Lincoln Blvd, Middlesex NJ 08846. Our second location is located at 5305 Fulton Industrial Blvd SW suite c, Atlanta, GA 30336.',
    },
    {
        id: 3,
        question: 'Do you serve areas outside New Jersey and Atlanta?',
        answer: 'Yes, we do travel to different states MA, CT, NY-Up state, PA, MD, DE, DC, VA, NC, SC, AL, FL, TN, OH & IL.',
    },
    {
        id: 4,
        question: 'How long has Nirali Decor been in the wedding decor industry?',
        answer: 'Founded in 2011, with over a decade of experience in wedding décor.',
    },
    {
        id: 5,
        question: 'What types of weddings do you specialize in?',
        answer: 'Specializes in South Asian weddings, receptions, and pre-wedding events.',
    },
    {
        id: 6,
        question: 'Can you handle destination weddings?',
        answer: 'We do not handle anything out of country. We service only in USA.',
    },

    // Booking & Consultations
    {
        id: 8,
        question: 'Do you provide consultations before booking?',
        answer: 'Yes, we do provide virtual & in person consultations before booking. This helps us understand your vision and execute your wedding design.',
    },
    {
        id: 9,
        question: 'How can I contact you for a quote?',
        answer: 'The best way to contact us is to fill out the contact form on our website to get in touch with us.',
    },
    {
        id: 10,
        question: 'Do you have a physical showroom I can visit?',
        answer: 'Yes, you can visit us at our studio/warehouse in New Jersey and Atlanta where you will see samples of designs.',
    },
    {
        id: 11,
        question: 'Can I view a portfolio of your past work?',
        answer: 'You can visit our website and Instagram to view our past work. During your consultation, we will also be happy to show you more of our portfolio.',
    },
    {
        id: 12,
        question: 'How far in advance should I book your services?',
        answer: 'We recommend booking as early as possible so we can secure your date in our calendar as take on multiple events.',
    },
    {
        id: 13,
        question: 'Do you require a deposit to secure a date?',
        answer: 'Yes, in order to secure your date we do require a signed contract and a 10% deposit.',
    },

    // Design & Customization
    {
        id: 7,
        question: 'What differentiates your decor services from others?',
        answer: 'We deliver exceptional service with an uncompromising commitment to our clients. To ensure complete confidence and peace of mind, each event is supported by a dedicated décor team, overseeing every detail for a seamless and flawless execution.',
    },
    {
        id: 14,
        question: 'Can decor be customized based on my color pallet?',
        answer: 'Yes, we select and design the decor that best fits you color pallet which coordinates with your wedding outfits.',
    },
    {
        id: 15,
        question: 'Do you offer 3D design visualizations?',
        answer: 'At this time, we do not offer 3D design visualizations.',
    },
    {
        id: 25,
        question: 'What if the venue has restrictions?',
        answer: 'We work within venue guidelines.',
    },

    // Logistics, Pricing & Operations
    {
        id: 16,
        question: 'Can you work around a tight timeline?',
        answer: 'Yes, we can work around a tight timeline by providing additional team members if needed. Please note that this may involve an added cost.',
    },
    {
        id: 17,
        question: 'Who is our main point of contact for my wedding event?',
        answer: 'A dedicated wedding décor coordinator will be assigned to you who will intake your inquiry and walk you through the process of selecting your décor from start to finish.',
    },
    {
        id: 18,
        question: 'How is pricing determined?',
        answer: 'Pricing is determined by the design you select, as well as the amount of labor required to complete your event.',
    },
    {
        id: 19,
        question: 'What methods of payment are accepted?',
        answer: 'Payments can be made via Check, Credit card, ACH & Cash.',
    },
    {
        id: 20,
        question: 'Are there hidden fees?',
        answer: 'Pricing is transparent with no hidden fees.',
    },
    {
        id: 21,
        question: 'Do you handle teardown after the event?',
        answer: 'Yes, setup and breakdown are also included.',
    },
    {
        id: 22,
        question: 'What time will your team arrive on the event day?',
        answer: 'Our team arrives according to the schedule agreed upon during planning with you and coordination with the venue.',
    },
    {
        id: 23,
        question: 'Will there be a foreman or lead onsite?',
        answer: 'Yes, a lead is on-site for execution.',
    },
    {
        id: 24,
        question: 'How many team members handle installation?',
        answer: 'Team size depends on event scale.',
    },
];

// Section definitions for grouping static FAQs
const faqSections = [
    {
        id: 'services',
        title: 'Services & Locations',
        ids: [1, 2, 3, 4, 5, 6],
    },
    {
        id: 'booking',
        title: 'Booking & Consultations',
        ids: [8, 9, 10, 11, 12, 13],
    },
    {
        id: 'design',
        title: 'Design & Customization',
        ids: [7, 14, 15, 25],
    },
    {
        id: 'logistics',
        title: 'Logistics, Pricing & Operations',
        ids: [16, 17, 18, 19, 20, 21, 22, 23, 24],
    },
];

export default function FAQPage() {
    const [dbFaqs, setDbFaqs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/faqs')
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setDbFaqs(data);
                } else {
                    console.error('API did not return an array:', data);
                    setDbFaqs([]);
                }
            })
            .catch((err) => {
                console.error('Error fetching FAQs:', err);
                setDbFaqs([]);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <Navbar />
        <section className="faq-page">

            <div className="page-banner">
                <img
                    src="/assets/_PM40748 (1).jpg"
                    alt="FAQ Banner"
                />
            </div>

            <div className="page-header">
                <h2 className="headline">Frequently Asked Questions</h2>
                <div className="faq-cta-wrapper">
                    <Link href="/contact-us" className="faq-cta-button">
                        Book an Appointment
                    </Link>
                </div>
            </div>
            {loading ? (
                <div className="muted" style={{ textAlign: 'center', padding: '40px' }}>Loading…</div>
            ) : (
                <div className="faq-container">
                    <div className="faq-content">
                        {faqSections.map((section) => {
                            const sectionItems = staticFaqs.filter((f) => section.ids.includes(f.id));
                            if (!sectionItems.length) return null;
                            return (
                                <div key={section.id} className="faq-section-group">
                                    <h3 className="section-title">{section.title}</h3>
                                    <Accordion items={sectionItems} />
                                </div>
                            );
                        })}

                        {dbFaqs.length > 0 && (
                            <div className="faq-section-group">
                                <h3 className="section-title">Additional Questions</h3>
                                <Accordion items={dbFaqs} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
            <Footer />
        </>
    );
}
