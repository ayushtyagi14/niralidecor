'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Contact/Hero';
import ContactUs from '@/components/Contact/ContactUs';
import Contact from '@/components/Homepage/Contact';
import Footer from '@/components/Footer';
import Supabase from '@/lib/supabase';
import LoadingScreen from '@/components/LoadingScreen';

const Page = () => {
    const [mediaUrl, setMediaUrl] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                // Query the Banners table for the homepage banner
                const { data, error } = await Supabase
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
                    console.warn('No banner found for the contact-us page.');
                    setMediaUrl(null); // Clear the state if no data is found
                }
            } catch (error) {
                console.error('Error fetching banner:', error.message || error);
            } finally {
                setLoading(false); // Set loading to false after the data is fetched
            }
        };

        fetchBanner();
    }, []);

    if (loading) {
        return <LoadingScreen />; // Show loading spinner while data is being fetched
    }

    return (
        <>
            <Navbar />
            <Hero mediaUrl={mediaUrl} />
            <ContactUs />
            <Contact />
            <Footer />
        </>
    );
};

export default Page;
