"use client";

import Navbar from "@/components/Navbar";
import Contact from "@/components/Homepage/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/AboutUs/Hero";
import Founders from "@/components/AboutUs/Founders";
import Gallery from "@/components/AboutUs/Gallery";
import Timeline from "@/components/Homepage/Timeline";

import React, { useState, useEffect } from "react";
import Supabase from "@/lib/supabase";
import LoadingScreen from "@/components/LoadingScreen";

export default function Page() {
    const [data, setData] = useState({
        bannerUrl: null,
        founderUrl: null,
        mediaItems: [],
    });
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all required data in parallel
                const [bannerRes, founderRes, galleryRes] = await Promise.all([
                    Supabase.from("Banners")
                        .select("mediaUrl")
                        .eq("page", "about-us")
                        .maybeSingle(),
                    Supabase.from("Sections")
                        .select("mediaUrl, title")
                        .eq("page", "about-us"),
                    Supabase.from("Gallery")
                        .select("id, mediaUrl")
                        .eq("page", "about-us"),
                ]);

                // Handle errors for each query
                if (bannerRes.error) throw bannerRes.error;
                if (founderRes.error) throw founderRes.error;
                if (galleryRes.error) throw galleryRes.error;

                // Extract data
                const bannerUrl = bannerRes.data?.mediaUrl || null;
                const founder = founderRes.data?.find(
                    (item) => item.title === "about-founder-image"
                );
                const founderUrl = founder ? founder.mediaUrl : null;
                const mediaItems = galleryRes.data || [];

                // Set data in state
                setData({
                    bannerUrl,
                    founderUrl,
                    mediaItems,
                });
            } catch (err) {
                console.error("Error fetching data:", err.message || err);
                setError(err.message || "Failed to fetch data.");
            } finally {
                setIsLoading(false); // Stop loading
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    const { bannerUrl, founderUrl, mediaItems } = data;

    return (
        <>
            <Navbar />
            <Hero bannerUrl={bannerUrl} />
            <Founders founderUrl={founderUrl} />
            <Timeline />
            <Gallery mediaItems={mediaItems} />
            <Contact />
            <Footer />
        </>
    );
}
