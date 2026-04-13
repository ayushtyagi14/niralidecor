"use client";

import Footer from "@/components/Footer";
import Contact from "@/components/Homepage/Contact";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Collage from "@/components/Portfolio/Collage";
import Hero from "@/components/Portfolio/Hero";
import Supabase from "@/lib/supabase";

import React, { useState, useEffect } from "react";

const Page = () => {
    const [data, setData] = useState({
        mediaUrl: null,
        centerpieceUrl: null,
        weddingUrl: null,
        receptionUrl: null,
        vidhiHaldiUrl: null,
        sangeetGarbaUrl: null,
    });

    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch banner and services data in parallel
                const [bannerRes, servicesRes] = await Promise.all([
                    Supabase.from("Banners")
                        .select("mediaUrl")
                        .eq("page", "portfolio")
                        .maybeSingle(),
                    Supabase.from("Sections")
                        .select("mediaUrl, title")
                        .eq("page", "portfolio"),
                ]);

                // Handle errors
                if (bannerRes.error) throw bannerRes.error;
                if (servicesRes.error) throw servicesRes.error;

                // Process fetched data
                const mediaUrl = bannerRes.data?.mediaUrl || null;
                const services = servicesRes.data || [];
                const findServiceImage = (title) =>
                    services.find((item) => item.title === title)?.mediaUrl || null;

                setData({
                    mediaUrl,
                    centerpieceUrl: findServiceImage("portfolio-centerpiece"),
                    weddingUrl: findServiceImage("portfolio-wedding"),
                    receptionUrl: findServiceImage("portfolio-reception"),
                    vidhiHaldiUrl: findServiceImage("portfolio-vidhi-haldi"),
                    sangeetGarbaUrl: findServiceImage("portfolio-sangeet-garba"),
                });
            } catch (err) {
                console.error("Error fetching data:", err.message || err);
                setError(err.message || "Failed to load data.");
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

    const {
        mediaUrl,
        weddingUrl,
        centerpieceUrl,
        receptionUrl,
        vidhiHaldiUrl,
        sangeetGarbaUrl,
    } = data;

    return (
        <>
            <Navbar />
            <Hero mediaUrl={mediaUrl} />
            <Collage
                weddingUrl={weddingUrl}
                centerpieceUrl={centerpieceUrl}
                receptionUrl={receptionUrl}
                vidhiHaldiUrl={vidhiHaldiUrl}
                sangeetGarbaUrl={sangeetGarbaUrl}
            />
            <Contact />
            <Footer />
        </>
    );
};

export default Page;
