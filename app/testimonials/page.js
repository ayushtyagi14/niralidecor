"use client";

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Testimonials/Hero';
import TestimonialData from '@/components/Testimonials/TestimonialData';
import React from 'react'

const page = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <TestimonialData />
            <Footer />
        </>
    )
}

export default page
