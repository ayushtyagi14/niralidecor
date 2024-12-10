'use client';

import Footer from '@/components/Footer'
import Contact from '@/components/Homepage/Contact';
import Navbar from '@/components/Navbar'
import Collage from '@/components/Portfolio/Collage';
import Hero from '@/components/Portfolio/Hero';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Page = () => {
    const [mediaUrl, setMediaUrl] = useState(null);

    const [weddingUrl, setWeddingUrl] = useState(null);
    const [centerpieceUrl, setCenterpieceUrl] = useState(null);
    const [receptionUrl, setReceptionUrl] = useState(null);
    const [sangeetGarbaUrl, setSangeetGarbaUrl] = useState(null);
    const [vidhiHaldiUrl, setVidhiHaldiUrl] = useState(null);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                // Query the Banners table for the homepage banner
                const { data, error } = await supabase
                    .from('Banners')
                    .select('mediaUrl')
                    .eq('page', 'portfolio')
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

        const fetchServices = async () => {
            try {
                const { data, error } = await supabase
                    .from('Sections')
                    .select('mediaUrl, title')
                    .eq('page', 'portfolio');

                if (error) {
                    console.error('Error fetching data:', error.message);
                    return;
                }

                const centerpieceImage = data.find(item => item.title === 'portfolio-centerpiece');
                const weddingImage = data.find(item => item.title === 'portfolio-wedding');
                const receptionImage = data.find(item => item.title === 'portfolio-reception');
                const vidhiHaldiImage = data.find(item => item.title === 'portfolio-vidhi-haldi');
                const sangeetGarbaImage = data.find(item => item.title === 'portfolio-sangeet-garba');

                if (centerpieceImage) setCenterpieceUrl(centerpieceImage.mediaUrl);
                if (weddingImage) setWeddingUrl(weddingImage.mediaUrl);
                if (receptionImage) setReceptionUrl(receptionImage.mediaUrl);
                if (vidhiHaldiImage) setVidhiHaldiUrl(vidhiHaldiImage.mediaUrl);
                if (sangeetGarbaImage) setSangeetGarbaUrl(sangeetGarbaImage.mediaUrl);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchServices();
        fetchBanner();
    }, []);

    return (
        <>
            <Navbar />
            <Hero mediaUrl={mediaUrl} />
            <Collage weddingUrl={weddingUrl} centerpieceUrl={centerpieceUrl} receptionUrl={receptionUrl} sangeetGarbaUrl={sangeetGarbaUrl} vidhiHaldiUrl={vidhiHaldiUrl} />
            <Contact />
            <Footer />
        </>
    )
}

export default Page
