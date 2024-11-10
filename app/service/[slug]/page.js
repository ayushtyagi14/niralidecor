"use client";

import Footer from '@/components/Footer';
import Contact from '@/components/Homepage/Contact';
import Content from '@/components/ServicePage/Content';
import Gallery from '@/components/ServicePage/Gallery';
import Hero from '@/components/ServicePage/Hero';
import Navbar from '@/components/ServicePage/Navbar';
import React, { useState, useEffect } from 'react';

export default function Page({ params }) {
    const [serviceName, setServiceName] = useState('');

    useEffect(() => {
        // Dynamically set serviceName based on params.slug
        switch (params.slug) {
            case 'wedding':
                setServiceName('Wedding Decoration');
                break;
            case 'reception':
                setServiceName('Reception');
                break;
            case 'vidhi-and-haldi':
                setServiceName('Vidhi & Haldi');
                break;
            case 'sangeet-and-garba':
                setServiceName('Sangeet & Garba');
                break;
            case 'centerpiece':
                setServiceName('Centerpiece');
                break;
            default:
                setServiceName(''); // Fallback if none match
        }
    }, [params.slug]);

    return (
        <div>
            <Navbar />
            <Hero serviceName={serviceName} />
            <Content serviceName={serviceName} />
            <Gallery />
            <Contact />
            <Footer />
        </div>
    );
}
