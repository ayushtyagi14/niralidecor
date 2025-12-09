"use client";

import Footer from '@/components/Footer';
import Contact from '@/components/Homepage/Contact';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import Explore from '@/components/ServicePage/Explore';
import dynamic from 'next/dynamic';
import Supabase from '@/lib/supabase';
import React, { useState, useEffect } from 'react';

// Dynamically import components for better performance
const Hero = dynamic(() => import('@/components/ServicePage/Hero'));
const Gallery = dynamic(() => import('@/components/ServicePage/Gallery'));

export default function Page({ params }) {
    const [serviceName, setServiceName] = useState('');
    const [mediaUrl, setMediaUrl] = useState(null);
    const [mediaItems, setMediaItems] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMediaData = async (pageType) => {
        try {
            setIsLoading(true);
            const [bannerResponse, galleryResponse] = await Promise.all([
                Supabase.from('Banners').select('mediaUrl').eq('page', pageType).maybeSingle(),
                Supabase.from('Gallery').select('id, mediaUrl').eq('page', pageType)
            ]);

            if (bannerResponse.error || galleryResponse.error) {
                throw new Error('Error fetching data');
            }

            setMediaUrl(bannerResponse.data?.mediaUrl || null);
            setMediaItems(galleryResponse.data || []);
        } catch (error) {
            console.error('Error fetching media data:', error.message || error);
            setMediaUrl(null);
            setMediaItems([]);
        } finally {
            setIsLoading(false);
        }
    };

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
                setServiceName('');
        }
    }, [params.slug]);

    if (isLoading) {
        return <LoadingScreen />;
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
