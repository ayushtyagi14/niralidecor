"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { deco } from "@/lib/fonts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Portfolio/Hero";
import Supabase from "@/lib/supabase";
import LoadingScreen from "@/components/LoadingScreen";

// MOCK DATA: To be replaced by Supabase fetching later
const MOCK_COUPLES = [
  {
    slug: "arti-and-darshil",
    name: "Arti & Darshil",
    location: "Wedding Celebration",
    coverImage: "/assets/couple1.JPG",
  },
  {
    slug: "riya-and-kishan",
    name: "Riya & Kishan",
    location: "Wedding Celebration",
    coverImage: "/assets/couple2.jpg",
  },

  {
    slug: "krupa-and-bhavin",
    name: "Krupa & Bhavin",
    location: "Wedding Celebration",
    coverImage: "/assets/couple4.jpg",
  },
  {
    slug: "shaina-and-niket",
    name: "Shaina & Niket",
    location: "Wedding Celebration",
    coverImage: "/assets/couple5.jpg",
  },
  {
    slug: "ameya-and-zeel",
    name: "Ameya & Zeel",
    location: "Wedding Celebration",
    coverImage: "/assets/couple6.jpg",
  },
];

export default function AllStoriesPage() {
  const [mediaUrl, setMediaUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [couples, setCouples] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Banner
        const bannerRes = await Supabase.from("Banners")
          .select("mediaUrl")
          .eq("page", "portfolio")
          .maybeSingle();

        if (bannerRes.data) {
          setMediaUrl(bannerRes.data.mediaUrl);
        }

        // 2. Fetch All Couples (Real Weddings)
        const couplesRes = await fetch('/api/couples');
        const couplesData = await couplesRes.json();
        
        if (couplesData && couplesData.length > 0) {
            // Map keys just like in WeddingStories component
            const mapped = couplesData.map(c => ({
                slug: c.slug,
                name: c.name,
                location: c.location,
                coverImage: c.cover_image
            }));
            setCouples(mapped);
        } else {
            setCouples(MOCK_COUPLES);
        }

      } catch (err) {
        console.error("Error fetching data:", err);
        setCouples(MOCK_COUPLES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      
      {/* Dynamic Banner imported from the Portfolio schema */}
      <Hero mediaUrl={mediaUrl} />
      
      <div className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          
          {/* Header */}
          <motion.div
            className="flex flex-col items-center mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`${deco.className} lg:text-[48px] text-[36px] text-center text-[#96034f] mb-4`}>
              All Wedding Stories
            </h1>
            <p className="text-gray-600 text-center max-w-2xl mx-auto lg:text-[18px]">
              Explore our complete gallery of breathtaking celebrations, beautiful couples, and unforgettable moments.
            </p>
          </motion.div>

          {/* Grid Layout taking inspiration from the accordion's active state */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {couples.map((couple, index) => (
              <motion.div
                key={`${couple.slug}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-[450px] w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                {/* Background Image */}
                <Image
                  src={couple.coverImage}
                  alt={couple.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end items-center text-center">
                  <h3 className="text-white text-2xl lg:text-3xl font-serif font-medium drop-shadow-md whitespace-nowrap transition-transform duration-500">
                    {couple.name}
                  </h3>
                  
                  <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500 ease-in-out flex flex-col items-center w-full">
                    <p className="text-gray-200 text-sm font-light mt-2 mb-6 drop-shadow opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {couple.location}
                    </p>
                    <Link 
                      href={`/portfolio/${couple.slug}`}
                      className="border border-white/70 text-white px-6 py-2 rounded-full text-sm tracking-wide backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-white hover:text-black transition-all duration-500 delay-200 mb-2"
                    >
                      View Portfolio
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}
