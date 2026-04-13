"use client";

import Footer from '@/components/Footer';
import Contact from '@/components/Homepage/Contact';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import Explore from '@/components/ServicePage/Explore';
import dynamic from 'next/dynamic';
import Supabase from '@/lib/supabase';
import React, { useState, useEffect, use } from 'react';

// Dynamically import components for better performance
const Hero = dynamic(() => import('@/components/ServicePage/Hero'));
const Gallery = dynamic(() => import('@/components/ServicePage/Gallery'));

export default function Page({ params }) {
    const resolvedParams = use(params);
    const slug = resolvedParams.slug;
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

            setMediaUrl(bannerResponse.data?.mediaUrl || (pageType === 'couple' ? '/assets/couple%20banner.jpg' : null));

            let items = galleryResponse.data || [];
            if (pageType === 'couple' && items.length === 0) {
                items = [
                    { id: 'c1', mediaUrl: '/assets/couple1.JPG' },
                    { id: 'c2', mediaUrl: '/assets/couple2.JPG' },
                    { id: 'c3', mediaUrl: '/assets/couple3.JPG' },
                    { id: 'c4', mediaUrl: '/assets/couple4.JPG' },
                    { id: 'c5', mediaUrl: '/assets/couple5.JPG' },
                    { id: 'c6', mediaUrl: '/assets/couple6.JPG' },
                ];
            }
            setMediaItems(items);
        } catch (error) {
            console.error('Error fetching media data:', error.message || error);
            setMediaUrl(null);
            setMediaItems([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        switch (slug) {
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
            case 'couple':
                setServiceName('Couple');
                fetchMediaData('couple', '/assets/couple.jpg');
                break;
            default:
                setServiceName('');
        }
    }, [slug]);

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
