'use client';

import { useEffect, useState } from 'react';
import Accordion from '@/components/Blog/Accordion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './faq.css';

export default function FAQPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/faqs')
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setItems(data);
                } else {
                    console.error('API did not return an array:', data);
                    setItems([]);
                }
            })
            .catch((err) => console.error('Error fetching FAQs:', err))
            .finally(() => setLoading(false));
    }, []);

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
                />
            </div>

            <div className="page-header">
                <h2 className="headline">Frequently Asked Questions</h2>
                <p className="lead">Quick answers about the project and workflow.</p>
            </div>
            {loading ? (
                <div className="muted" style={{ textAlign: 'center', padding: '40px' }}>Loading…</div>
            ) : (
                <div className="faq-container">
                    <div className="faq-content">
                        <Accordion items={items} />
                    </div>
                    <div className="faq-image">
                        <Image
                            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80"
                            alt="FAQ Decorative Image"
                            width={800}
                            height={1000}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                </div>
            )}
        </section>
            <Footer />
        </>
    );
}
