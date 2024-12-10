"use client";

import Footer from '@/components/Footer';
import Contact from '@/components/Homepage/Contact';
import Navbar from '@/components/Navbar';
import Explore from '@/components/ServicePage/Explore';
import Gallery from '@/components/ServicePage/Gallery';
import Hero from '@/components/ServicePage/Hero';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Page({ params }) {
    const [serviceName, setServiceName] = useState('');

    const [mediaUrl, setMediaUrl] = useState(null);
    const [mediaItems, setMediaItems] = useState(null);

    const fetchWeddingBanner = async () => {
        try {
            // Query the Banners table for the homepage banner
            const { data, error } = await supabase
                .from('Banners')
                .select('mediaUrl')
                .eq('page', 'wedding')
                .maybeSingle(); // Allows for no results without throwing an error

            if (error) {
                throw error;
            }

            if (data) {
                setMediaUrl(data.mediaUrl);
            } else {
                console.warn('No banner found for the wedding.');
                setMediaUrl(null); // Clear the state if no data is found
            }
        } catch (error) {
            console.error('Error fetching banner:', error.message || error);
        }
    };

    const fetchWeddingGalleryItems = async () => {
        try {
            const { data, error } = await supabase
                .from('Gallery')
                .select('id, mediaUrl') // Fetch `id` and `mediaUrl`
                .eq('page', 'wedding'); // Filter where `page` is `homepage`

            if (error) {
                console.error('Error fetching data:', error.message);
                return;
            }

            setMediaItems(data); // Store fetched items in state
        } catch (error) {
            console.error('Error fetching gallery items:', error);
        }
    };

    const fetchReceptionBanner = async () => {
        try {
            // Query the Banners table for the homepage banner
            const { data, error } = await supabase
                .from('Banners')
                .select('mediaUrl')
                .eq('page', 'reception')
                .maybeSingle(); // Allows for no results without throwing an error

            if (error) {
                throw error;
            }

            if (data) {
                setMediaUrl(data.mediaUrl);
            } else {
                console.warn('No banner found for the reception.');
                setMediaUrl(null); // Clear the state if no data is found
            }
        } catch (error) {
            console.error('Error fetching banner:', error.message || error);
        }
    };

    const fetchReceptionGalleryItems = async () => {
        try {
            const { data, error } = await supabase
                .from('Gallery')
                .select('id, mediaUrl') // Fetch `id` and `mediaUrl`
                .eq('page', 'reception'); // Filter where `page` is `homepage`

            if (error) {
                console.error('Error fetching data:', error.message);
                return;
            }

            setMediaItems(data); // Store fetched items in state
        } catch (error) {
            console.error('Error fetching gallery items:', error);
        }
    };

    const fetchCenterpieceBanner = async () => {
        try {
            // Query the Banners table for the homepage banner
            const { data, error } = await supabase
                .from('Banners')
                .select('mediaUrl')
                .eq('page', 'centerpiece')
                .maybeSingle(); // Allows for no results without throwing an error

            if (error) {
                throw error;
            }

            if (data) {
                setMediaUrl(data.mediaUrl);
            } else {
                console.warn('No banner found for the centerpiece.');
                setMediaUrl(null); // Clear the state if no data is found
            }
        } catch (error) {
            console.error('Error fetching banner:', error.message || error);
        }
    };

    const fetchCenterpieceGalleryItems = async () => {
        try {
            const { data, error } = await supabase
                .from('Gallery')
                .select('id, mediaUrl') // Fetch `id` and `mediaUrl`
                .eq('page', 'centerpiece'); // Filter where `page` is `homepage`

            if (error) {
                console.error('Error fetching data:', error.message);
                return;
            }

            setMediaItems(data); // Store fetched items in state
        } catch (error) {
            console.error('Error fetching gallery items:', error);
        }
    };

    const fetchSangeetGarbaBanner = async () => {
        try {
            // Query the Banners table for the homepage banner
            const { data, error } = await supabase
                .from('Banners')
                .select('mediaUrl')
                .eq('page', 'sangeet-garba')
                .maybeSingle(); // Allows for no results without throwing an error

            if (error) {
                throw error;
            }

            if (data) {
                setMediaUrl(data.mediaUrl);
            } else {
                console.warn('No banner found for the sangeet-garba.');
                setMediaUrl(null); // Clear the state if no data is found
            }
        } catch (error) {
            console.error('Error fetching banner:', error.message || error);
        }
    };

    const fetchSangeetGarbaGalleryItems = async () => {
        try {
            const { data, error } = await supabase
                .from('Gallery')
                .select('id, mediaUrl') // Fetch `id` and `mediaUrl`
                .eq('page', 'sangeet-garba'); // Filter where `page` is `homepage`

            if (error) {
                console.error('Error fetching data:', error.message);
                return;
            }

            setMediaItems(data); // Store fetched items in state
        } catch (error) {
            console.error('Error fetching gallery items:', error);
        }
    };

    const fetchVidhiHaldiBanner = async () => {
        try {
            // Query the Banners table for the homepage banner
            const { data, error } = await supabase
                .from('Banners')
                .select('mediaUrl')
                .eq('page', 'vidhi-haldi')
                .maybeSingle(); // Allows for no results without throwing an error

            if (error) {
                throw error;
            }

            if (data) {
                setMediaUrl(data.mediaUrl);
            } else {
                console.warn('No banner found for the vidhi-haldi.');
                setMediaUrl(null); // Clear the state if no data is found
            }
        } catch (error) {
            console.error('Error fetching banner:', error.message || error);
        }
    };

    const fetchVidhiHaldiGalleryItems = async () => {
        try {
            const { data, error } = await supabase
                .from('Gallery')
                .select('id, mediaUrl') // Fetch `id` and `mediaUrl`
                .eq('page', 'vidhi-haldi'); // Filter where `page` is `homepage`

            if (error) {
                console.error('Error fetching data:', error.message);
                return;
            }

            setMediaItems(data); // Store fetched items in state
        } catch (error) {
            console.error('Error fetching gallery items:', error);
        }
    };


    useEffect(() => {
        // Dynamically set serviceName based on params.slug
        switch (params.slug) {
            case 'wedding':
                setServiceName('Wedding');
                fetchWeddingBanner();
                fetchWeddingGalleryItems();
                break;
            case 'reception':
                setServiceName('Reception');
                fetchReceptionBanner();
                fetchReceptionGalleryItems();
                break;
            case 'vidhi-and-haldi':
                setServiceName('Vidhi & Haldi');
                fetchVidhiHaldiBanner();
                fetchVidhiHaldiGalleryItems();
                break;
            case 'sangeet-and-garba':
                setServiceName('Sangeet & Garba');
                fetchSangeetGarbaBanner();
                fetchSangeetGarbaGalleryItems();
                break;
            case 'centerpiece':
                setServiceName('Centerpiece');
                fetchCenterpieceBanner();
                fetchCenterpieceGalleryItems();
                break;
            default:
                setServiceName(''); // Fallback if none match
        }
    }, [params.slug]);

    return (
        <div>
            <Navbar />
            <Hero serviceName={serviceName} mediaUrl={mediaUrl} />
            <Gallery mediaItems={mediaItems} />
            <Explore serviceName={serviceName} />
            <Contact />
            <Footer />
        </div>
    );
}
