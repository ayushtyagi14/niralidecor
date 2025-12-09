"use client";

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Testimonials/Hero';
import TestimonialData from '@/components/Testimonials/TestimonialData';
import LoadingScreen from '@/components/LoadingScreen'; // Make sure you have a loading screen component
import React, { useState, useEffect } from 'react';
import Supabase from '@/lib/supabase';

const Page = () => {
    const [mediaUrl, setMediaUrl] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch both banner and reviews in parallel using Promise.all
                const [bannerResponse, reviewsResponse] = await Promise.all([
                    Supabase
                        .from('Banners')
                        .select('mediaUrl')
                        .eq('page', 'testimonials')
                        .maybeSingle(),
                    Supabase
                        .from('Reviews')
                        .select('id, mediaUrl, name, review')
                        .eq('page', 'testimonials')
                ]);

                if (bannerResponse.error) {
                    throw new Error(bannerResponse.error.message);
                }

                if (reviewsResponse.error) {
                    throw new Error(reviewsResponse.error.message);
                }

                // Set banner and reviews data
                setMediaUrl(bannerResponse.data?.mediaUrl || null);
                setReviews(reviewsResponse.data || []);

            } catch (error) {
                console.error('Error fetching data:', error.message);
            } finally {
                setIsLoading(false); // Hide loading screen after data is fetched
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <LoadingScreen />; // Show loading screen while fetching data
    }

    return (
        <>
            <Navbar />
            <Hero mediaUrl={mediaUrl} />
            <TestimonialData reviews={reviews} />
            <Footer />
        </>
    );
};

export default Page;
