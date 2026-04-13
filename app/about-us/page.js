"use client";

import Navbar from "@/components/Navbar";
import Contact from "@/components/Homepage/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/AboutUs/Hero";
import MeetTheTeam from "@/components/AboutUs/MeetTheTeam";
import CouplesWeServe from "@/components/AboutUs/CouplesWeServe";
import DesignPhilosophy from "@/components/AboutUs/DesignPhilosophy";
import OurApproach from "@/components/AboutUs/OurApproach";
import Gallery from "@/components/AboutUs/Gallery";

import React, { useState, useEffect } from "react";
import Supabase from "@/lib/supabase";
import LoadingScreen from "@/components/LoadingScreen";

export default function Page() {
    const [data, setData] = useState({
        bannerUrl: null,
        mediaItems: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bannerRes, galleryRes] = await Promise.all([
                    Supabase.from("Banners")
                        .select("mediaUrl")
                        .eq("page", "about-us")
                        .maybeSingle(),
                    Supabase.from("Gallery")
                        .select("id, mediaUrl")
                        .eq("page", "about-us"),
                ]);

                if (bannerRes.error) throw bannerRes.error;
                if (galleryRes.error) throw galleryRes.error;

                const bannerUrl = bannerRes.data?.mediaUrl || null;
                const mediaItems = galleryRes.data || [];

                setData({
                    bannerUrl,
                    mediaItems,
                });
            } catch (err) {
                console.error("Error fetching data:", err.message || err);
                setError(err.message || "Failed to fetch data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    const { bannerUrl, mediaItems } = data;


    return (
        <>
            <Navbar />
            <Hero bannerUrl={bannerUrl} />
            <MeetTheTeam />
            <CouplesWeServe />
            <DesignPhilosophy />
            <OurApproach />
            <Gallery mediaItems={mediaItems} />
            <Contact />
            <Footer />
        </>
    );
}
