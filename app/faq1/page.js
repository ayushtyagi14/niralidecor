'use client';

import { useState, useEffect, useRef } from 'react';
import Accordion from '@/components/Blog/Accordion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './faq1.css';

// Grouped FAQ Configuration
const faqSections = [
    {
        id: 'services',
        title: 'Services & Locations',
        image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80', // Mandap/Ceremony
        items: [
            {
                id: 1,
                question: 'What type of events Nirali decor provides services for?',
                answer: 'Mehendi, Welcome Night Party, Haldi, Sathak, Grahshanti, Vidhi/Mandap muhrat, Sangeet, Garba, Weddings & Reception'
            },
            {
                id: 2,
                question: 'Where is Nirali Decor located?',
                answer: 'Our primary location is located at 500 Lincoln Blvd, Middlesex NJ 08846. Our second location is located at 5305 Fulton Industrial Blvd SW suite c, Atlanta, GA 30336.'
            },
            {
                id: 3,
                question: 'Do you serve areas outside New Jersey and Atlanta?',
                answer: 'Yes, we do travel to different states MA, CT, NY-Up state, PA, MD, DE, DC, VA, NC, SC, AL, FL, TN, OH & IL.'
            },
            {
                id: 4,
                question: 'How long has Nirali Decor been in the wedding decor industry?',
                answer: 'Founded in 2011, with over a decade of experience in wedding décor.'
            },
            {
                id: 5,
                question: 'What types of weddings do you specialize in?',
                answer: 'Specializes in South Asian weddings, receptions, and pre-wedding events.'
            },
            {
                id: 6,
                question: 'Can you handle destination weddings?',
                answer: 'We do not handle anything out of country. We service only in USA.'
            }
        ]
    },
    {
        id: 'booking',
        title: 'Booking & Consultations',
        image: 'https://images.unsplash.com/photo-1520342868574-5fa3804e551c?w=800&q=80', // Consultation/Planning vibe
        items: [
            {
                id: 8,
                question: 'Do you provide consultations before booking?',
                answer: 'Yes, we do provide virtual & in person consultations before booking. This helps us understand your vision and execute your wedding design.'
            },
            {
                id: 9,
                question: 'How can I contact you for a quote?',
                answer: 'The best way to contact us is to fill out the contact form on our website to get in touch with us.'
            },
            {
                id: 10,
                question: 'Do you have a physical showroom I can visit?',
                answer: 'Yes, you can visit us at our studio/warehouse in New Jersey and Atlanta where you will see samples of designs.'
            },
            {
                id: 11,
                question: 'Can I view a portfolio of your past work?',
                answer: 'You can visit our website and Instagram to view our past work. During your consultation, we will also be happy to show you more of our portfolio.'
            },
            {
                id: 12,
                question: 'How far in advance should I book your services?',
                answer: 'We recommend booking as early as possible so we can secure your date in our calendar as take on multiple events.'
            },
            {
                id: 13,
                question: 'Do you require a deposit to secure a date?',
                answer: 'Yes, in order to secure your date we do require a signed contract and a 10% deposit.'
            }
        ]
    },
    {
        id: 'design',
        title: 'Design & Customization',
        image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80', // Wedding Details/Flowers
        items: [
            {
                id: 7,
                question: 'What differentiates your decor services from others?',
                answer: 'We deliver exceptional service with an uncompromising commitment to our clients. To ensure complete confidence and peace of mind, each event is supported by a dedicated décor team, overseeing every detail for a seamless and flawless execution.'
            },
            {
                id: 14,
                question: 'Can decor be customized based on my color pallet?',
                answer: 'Yes, we select and design the decor that best fits you color pallet which coordinates with your wedding outfits.'
            },
            {
                id: 15,
                question: 'Do you offer 3D design visualizations?',
                answer: 'At this time, we do not offer 3D design visualizations.'
            },
            {
                id: 25,
                question: 'What if the venue has restrictions?',
                answer: 'We work within venue guidelines.'
            }
        ]
    },
    {
        id: 'logistics',
        title: 'Logistics, Pricing & Operations',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80', // Reception Hall/Setup
        items: [
            {
                id: 16,
                question: 'Can you work around a tight timeline?',
                answer: 'Yes, we can work around a tight timeline by providing additional team members if needed. Please note that this may involve an added cost.'
            },
            {
                id: 17,
                question: 'Who is our main point of contact for my wedding event?',
                answer: 'A dedicated wedding décor coordinator will be assigned to you who will intake your inquiry and walk you through the process of selecting your décor from start to finish.'
            },
            {
                id: 18,
                question: 'How is pricing determined?',
                answer: 'Pricing is determined by the design you select, as well as the amount of labor required to complete your event.'
            },
            {
                id: 19,
                question: 'What methods of payment are accepted?',
                answer: 'Payments can be made via Check, Credit card, ACH & Cash.'
            },
            {
                id: 20,
                question: 'Are there hidden fees?',
                answer: 'Pricing is transparent with no hidden fees.'
            },
            {
                id: 21,
                question: 'Do you handle teardown after the event?',
                answer: 'Yes, setup and breakdown are also included.'
            },
            {
                id: 22,
                question: 'What time will your team arrive on the event day?',
                answer: 'Our team arrives according to the schedule agreed upon during planning with you and coordination with the venue.'
            },
            {
                id: 23,
                question: 'Will there be a foreman or lead onsite?',
                answer: 'Yes, a lead is on-site for execution.'
            },
            {
                id: 24,
                question: 'How many team members handle installation?',
                answer: 'Team size depends on event scale.'
            }
        ]
    }
];

export default function FAQ1Page() {
    const [activeSection, setActiveSection] = useState(faqSections[0].id);
    const observerRef = useRef(null);
    const sectionRefs = useRef({});

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '-20% 0px -60% 0px', // Trigger when section is near center/top
            threshold: 0
        };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, options);

        // Observe all sections
        Object.values(sectionRefs.current).forEach((el) => {
            if (el) observerRef.current.observe(el);
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    const activeImage = faqSections.find(s => s.id === activeSection)?.image || faqSections[0].image;

    return (
        <>
            <Navbar />
            <section className="faq-page">
                <div className="page-banner">
                    <Image
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80"
                        alt="FAQ Banner"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        unoptimized
                    />
                </div>

                <div className="page-header">
                    <h2 className="headline">Frequently Asked Questions</h2>
                    <p className="lead">Here is a collection of common questions and answers about our services, process, and logistics.</p>
                </div>

                <div className="faq-container">
                    {/* Left Side: Scrollable Content */}
                    <div className="faq-content">
                        {faqSections.map((section) => (
                            <div
                                key={section.id}
                                id={section.id}
                                ref={el => sectionRefs.current[section.id] = el}
                                className="faq-section-group"
                            >
                                <h3 className="section-title">{section.title}</h3>
                                <Accordion items={section.items} />
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Sticky Changing Image */}
                    <div className="faq-sticky-container">
                        <div className="faq-image-wrapper">
                            <Image
                                key={activeImage} // Key forces re-render for clean transition
                                src={activeImage}
                                alt="FAQ Category Image"
                                width={800}
                                height={1000}
                                className="faq-dynamic-image"
                                priority
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
