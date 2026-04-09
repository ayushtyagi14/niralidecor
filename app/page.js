"use client";

import React, { useState, useEffect, Suspense } from "react";
import Supabase from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Homepage/Hero";
import AboutUs from "@/components/Homepage/AboutUs";
import Service from "@/components/Homepage/Service";
import Testimonials from "@/components/Homepage/Testimonials";
import Timeline from "@/components/Homepage/Timeline";
import Gallery from "@/components/Homepage/Gallery";
import Contact from "@/components/Homepage/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen"; // Create a loading screen component
import Script from "next/script";

export default function Home() {
  const [data, setData] = useState({
    bannerUrl: null,
    aboutLeftUrl: null,
    aboutRightUrl: null,
    services: {},
    reviews: [],
    galleryItems: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannerRes, sectionsRes, reviewsRes, galleryRes] = await Promise.all([
          Supabase.from("Banners").select("mediaUrl, page").eq("page", "homepage").maybeSingle(),
          Supabase.from("Sections").select("mediaUrl, title, page").eq("page", "homepage"),
          Supabase.from("Reviews").select("id, mediaUrl, name, review").eq("page", "homepage"),
          Supabase.from("Gallery").select("id, mediaUrl").eq("page", "homepage"),
        ]);

        if (bannerRes.error) throw bannerRes.error;
        if (sectionsRes.error) throw sectionsRes.error;
        if (reviewsRes.error) throw reviewsRes.error;
        if (galleryRes.error) throw galleryRes.error;

        const sections = sectionsRes.data || [];
        const services = {
          floral: sections.find((item) => item.title === "service-floral")?.mediaUrl || null,
          centerpiece: sections.find((item) => item.title === "service-centerpiece")?.mediaUrl || null,
          customDesign: sections.find((item) => item.title === "service-custom-design")?.mediaUrl || null,
          stageSetup: sections.find((item) => item.title === "service-stage-setup")?.mediaUrl || null,
        };

        setData({
          bannerUrl: bannerRes.data?.mediaUrl || null,
          aboutLeftUrl: sections.find((item) => item.title === "about-left")?.mediaUrl || null,
          aboutRightUrl: sections.find((item) => item.title === "about-right")?.mediaUrl || null,
          services,
          reviews: reviewsRes.data || [],
          galleryItems: galleryRes.data || [],
        });
      } catch (error) {
        console.error("Error fetching data:", error.message || error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Nirali Decor",
            "image": "https://www.niralidecor.com/assets/logo.png",
            "@id": "https://www.niralidecor.com/",
            "url": "https://www.niralidecor.com/",
            "telephone": "+1-609-703-5879",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "500 Lincoln Blvd",
              "addressLocality": "Middlesex",
              "addressRegion": "NJ",
              "postalCode": "08846",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 40.5694478,
              "longitude": -74.49747169999999
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "11:00",
              "closes": "18:00"
            },
            "sameAs": [
              "https://www.instagram.com/niralidecor/",
              "https://www.facebook.com/niraliweddingandeventdesigns/",
              "https://in.pinterest.com/Niralidecorweddings/",
              "https://www.youtube.com/@NiraliDecor",
              "https://www.niralidecor.com/"
            ]
          }),
        }}
      />
      <Navbar />
      <Hero bannerUrl={data.bannerUrl} />
      <AboutUs aboutLeftUrl={data.aboutLeftUrl} aboutRightUrl={data.aboutRightUrl} />
      <Service
        floralUrl={data.services.floral}
        centerpieceUrl={data.services.centerpiece}
        customDesignUrl={data.services.customDesign}
        stageSetupUrl={data.services.stageSetup}
      />
      <Testimonials reviews={data.reviews} />
      <Gallery mediaItems={data.galleryItems} />
      <Timeline />
      <Contact />
      <Footer />
    </>
  );
}
