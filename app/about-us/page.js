import Navbar from "@/components/Navbar";
import Contact from "@/components/Homepage/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/AboutUs/Hero";
import MeetTheTeam from "@/components/AboutUs/MeetTheTeam";
import CouplesWeServe from "@/components/AboutUs/CouplesWeServe";
import DesignPhilosophy from "@/components/AboutUs/DesignPhilosophy";
import OurApproach from "@/components/AboutUs/OurApproach";
import Gallery from "@/components/AboutUs/Gallery";

import Supabase from "@/lib/supabase";

export const revalidate = 60; // Cache the data for 60 seconds

export default async function Page() {
    let bannerUrl = null;
    let mediaItems = [];
    let error = null;

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

        bannerUrl = bannerRes.data?.mediaUrl || null;
        mediaItems = galleryRes.data || [];
    } catch (err) {
        console.error("Error fetching data:", err.message || err);
        error = err.message || "Failed to fetch data.";
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

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
