"use client";

import Navbar from "@/components/Navbar";
import Contact from "@/components/Homepage/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/AboutUs/Hero";
import Founders from "@/components/AboutUs/Founders";
import Gallery from "@/components/AboutUs/Gallery";
import Timeline from "@/components/Homepage/Timeline";

export default function Page() {
    return (
        <>
            <Navbar />
            <Hero />
            <Founders />
            <Timeline />
            <Gallery />
            <Contact />
            <Footer />
        </>
    );
}
