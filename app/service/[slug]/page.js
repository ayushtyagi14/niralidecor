"use client";

import Footer from '@/components/Footer';
import Contact from '@/components/Homepage/Contact';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import Explore from '@/components/ServicePage/Explore';
import Gallery from '@/components/ServicePage/Gallery';
import Hero from '@/components/ServicePage/Hero';
import Supabase from '@/lib/supabase';

import React, { useState, useEffect } from 'react';

export default function Page({ params }) {
    const [serviceName, setServiceName] = useState('');
    const [mediaUrl, setMediaUrl] = useState(null);
    const [mediaItems, setMediaItems] = useState(null);
    const [isLoading, setIsLoading] = useState(true);  // For loading state

    // Fetch banner and gallery items for a given page type
    const fetchMediaData = async (pageType) => {
        try {
            setIsLoading(true);
            // Fetch both the banner and gallery items in parallel
            const [bannerResponse, galleryResponse] = await Promise.all([
                Supabase.from('Banners').select('mediaUrl').eq('page', pageType).maybeSingle(),
                Supabase.from('Gallery').select('id, mediaUrl').eq('page', pageType)
            ]);

            // Check if the banner data exists
            if (bannerResponse.error) throw bannerResponse.error;
            if (bannerResponse.data) {
                setMediaUrl(bannerResponse.data.mediaUrl);
            } else {
                setMediaUrl(null);
            }

            // Check if gallery data exists
            if (galleryResponse.error) throw galleryResponse.error;
            setMediaItems(galleryResponse.data || []);

        } catch (error) {
            console.error('Error fetching media data:', error.message || error);
            setMediaUrl(null);  // Reset the state in case of an error
            setMediaItems([]);
        } finally {
            setIsLoading(false);  // Set loading state to false when fetching is complete
        }
    };

    // Set the service name and fetch data based on params.slug
    useEffect(() => {
        switch (params.slug) {
            case 'wedding':
                setServiceName('Wedding');
                fetchMediaData('wedding');
                break;
            case 'reception':
                setServiceName('Reception');
                fetchMediaData('reception');
                break;
            case 'vidhi-and-haldi':
                setServiceName('Vidhi & Haldi');
                fetchMediaData('vidhi-haldi');
                break;
            case 'sangeet-and-garba':
                setServiceName('Sangeet & Garba');
                fetchMediaData('sangeet-garba');
                break;
            case 'centerpiece':
                setServiceName('Centerpiece');
                fetchMediaData('centerpiece');
                break;
            default:
                setServiceName('');  // Fallback if no match
        }
    }, [params.slug]);

    if (isLoading) {
        return <LoadingScreen />; // Show loading screen while fetching data
    }

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
