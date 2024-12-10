'use client';

import ContactUs from '@/components/Contact/ContactUs';
import Hero from '@/components/Contact/Hero';
import Footer from '@/components/Footer'
import Contact from '@/components/Homepage/Contact';
import Navbar from '@/components/Navbar'
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Page = () => {
    const [mediaUrl, setMediaUrl] = useState(null)

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                // Query the Banners table for the homepage banner
                const { data, error } = await supabase
                    .from('Banners')
                    .select('mediaUrl')
                    .eq('page', 'contact-us')
                    .maybeSingle(); // Allows for no results without throwing an error

                if (error) {
                    throw error;
                }

                if (data) {
                    setMediaUrl(data.mediaUrl);
                } else {
                    console.warn('No banner found for the portfolio page.');
                    setMediaUrl(null); // Clear the state if no data is found
                }
            } catch (error) {
                console.error('Error fetching banner:', error.message || error);
            }
        };

        fetchBanner();
    }, []);

    return (
        <>
            <Navbar />
            <Hero mediaUrl={mediaUrl} />
            <ContactUs />
            <Contact />
            <Footer />
        </>
    )
}

export default Page
