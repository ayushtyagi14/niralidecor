'use client';

import ContactUs from '@/components/Contact/ContactUs';
import Hero from '@/components/Contact/Hero';
import Footer from '@/components/Footer'
import Contact from '@/components/Homepage/Contact';
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <ContactUs />
            <Contact />
            <Footer />
        </>
    )
}

export default page
