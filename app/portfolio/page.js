'use client';

import Footer from '@/components/Footer'
import Contact from '@/components/Homepage/Contact';
import Navbar from '@/components/Navbar'
import Collage from '@/components/Portfolio/Collage';
import Hero from '@/components/Portfolio/Hero';
import React from 'react'

const page = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Collage />
            <Contact />
            <Footer />
        </>
    )
}

export default page
