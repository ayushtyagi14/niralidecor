"use client";

import Navbar from "@/components/Navbar";
import Contact from "@/components/Homepage/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/AboutUs/Hero";
import Founders from "@/components/AboutUs/Founders";
import Gallery from "@/components/AboutUs/Gallery";

export default function Page() {
    return (
        <>
            <Navbar />
            <Hero />
            <Founders />
            <Gallery />
            <Contact />
            <Footer />
        </>
    );
}
