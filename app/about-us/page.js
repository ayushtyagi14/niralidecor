"use client";

import Navbar from "@/components/Navbar";
import Contact from "@/components/Homepage/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/AboutUs/Hero";
import Founders from "@/components/AboutUs/Founders";
import Gallery from "@/components/AboutUs/Gallery";
import Timeline from "@/components/Homepage/Timeline";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Page() {
    const [mediaUrl, setMediaUrl] = useState(null);

    const [founderUrl, setFounderUrl] = useState(null);

    const [mediaItems, setMediaItems] = useState([]);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                // Query the Banners table for the homepage banner
                const { data, error } = await supabase
                    .from('Banners')
                    .select('mediaUrl')
                    .eq('page', 'about-us')
                    .maybeSingle(); // Allows for no results without throwing an error

                if (error) {
                    throw error;
                }

                if (data) {
                    setMediaUrl(data.mediaUrl);
                } else {
                    console.warn('No banner found for the about us.');
                    setMediaUrl(null); // Clear the state if no data is found
                }
            } catch (error) {
                console.error('Error fetching banner:', error.message || error);
            }
        };

        const fetchFounder = async () => {
            try {
                // Query the Banners table for the homepage banner
                const { data, error } = await supabase
                    .from('Sections')
                    .select('mediaUrl, title')
                    .eq('page', 'about-us');

                if (error) {
                    throw error;
                }

                if (data) {
                    const founder = data.find(item => item.title === 'about-founder-image');

                    if (founder) setFounderUrl(founder.mediaUrl);
                } else {
                    console.warn('No image found for the founders image.');
                    setFounderUrl(null); // Clear the state if no data is found
                }
            } catch (error) {
                console.error('Error fetching founder:', error.message || error);
            }
        };

        const fetchGalleryItems = async () => {
            try {
                const { data, error } = await supabase
                    .from('Gallery')
                    .select('id, mediaUrl') // Fetch `id` and `mediaUrl`
                    .eq('page', 'about-us'); // Filter where `page` is `homepage`

                if (error) {
                    console.error('Error fetching data:', error.message);
                    return;
                }

                setMediaItems(data); // Store fetched items in state
            } catch (error) {
                console.error('Error fetching gallery items:', error);
            }
        };

        fetchGalleryItems();
        fetchFounder();
        fetchBanner();
    }, []);

    return (
        <>
            <Navbar />
            <Hero bannerUrl={mediaUrl} />
            <Founders founderUrl={founderUrl} />
            <Timeline />
            <Gallery mediaItems={mediaItems} />
            <Contact />
            <Footer />
        </>
    );
}
