"use client";

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Testimonials/Hero';
import TestimonialData from '@/components/Testimonials/TestimonialData';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Page = () => {
    const [mediaUrl, setMediaUrl] = useState(null);

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                // Query the Banners table for the homepage banner
                const { data, error } = await supabase
                    .from('Banners')
                    .select('mediaUrl')
                    .eq('page', 'testimonials')
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

        const fetchReviews = async () => {
            try {
                const { data, error } = await supabase
                    .from('Reviews')
                    .select('id, mediaUrl, name, review')
                    .eq('page', 'testimonials');

                if (error) {
                    console.error('Error fetching data:', error.message);
                    return;
                }

                setReviews(data); // Store reviews in state
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();

        fetchBanner();
    }, []);

    return (
        <>
            <Navbar />
            <Hero mediaUrl={mediaUrl} />
            <TestimonialData reviews={reviews} />
            <Footer />
        </>
    )
}

export default Page
