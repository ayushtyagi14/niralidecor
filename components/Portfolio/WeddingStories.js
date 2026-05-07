"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { deco } from "@/lib/fonts";

// MOCK DATA: To be replaced by Supabase fetching
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

export default function WeddingStories() {
  const [couples, setCouples] = useState([]);
  const [activeIndex, setActiveIndex] = useState(2); // Set a middle one as active initially

  useEffect(() => {
    const fetchCouples = async () => {
      try {
        const res = await fetch('/api/couples?featured=true');
        const data = await res.json();
        
        // If they haven't set up the DB yet or no couples added, fallback to mock
        if (data && data.length > 0) {
            // Map the DB schema (cover_image) to what this component expects (coverImage)
            const mappedData = data.map(c => ({
                slug: c.slug,
                name: c.name,
                location: c.location,
                coverImage: c.cover_image,
                date: c.date
            }));
            setCouples(mappedData.slice(0, 6)); 
        } else {
            setCouples(MOCK_COUPLES.slice(0, 6));
        }
      } catch (err) {
        setCouples(MOCK_COUPLES.slice(0, 6));
      }
    };
    fetchCouples();
  }, []);

  const displayCouples = couples.length > 0 ? couples : MOCK_COUPLES.slice(0, 6);


  return (
    <section className="pt-20 pb-4 bg-white">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="flex flex-col items-center mb-12 lg:mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={`${deco.className} lg:text-[48px] text-[30px] text-center text-[#96034f]`}>
            Real Weddings
          </h1>
          <p className="lg:text-[18px] text-center text-gray-700">
            A collection of beautiful moments
          </p>
        </motion.div>

        {/* Accordion Carousel */}
        <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] flex gap-2 sm:gap-4 mb-16">


          {/* Cards */}
          {displayCouples.map((couple, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={couple.slug}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`relative h-full overflow-hidden rounded-2xl cursor-pointer transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive
                    ? "flex-[4] sm:flex-[5] lg:flex-[6] shadow-2xl"
                    : "flex-1 shadow-md hover:flex-[1.2]"
                  }`}
              >
                {/* Background Image */}
                <Image
                  src={couple.coverImage}
                  alt={couple.name}
                  fill
                  className="object-cover h-full w-full"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />

                {/* Overlays */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-60'} to-transparent`} />

                {/* Active State Content */}
                <div
                  className={`absolute inset-0 p-6 flex flex-col justify-end items-center text-center transition-opacity ${isActive ? "opacity-100 duration-500 delay-300" : "opacity-0 duration-200 pointer-events-none"
                    }`}
                >
                  <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-serif mb-2 font-medium drop-shadow-md whitespace-nowrap">
                    {couple.name}
                  </h3>
                  <p className="text-gray-200 text-sm sm:text-base font-light mb-6 drop-shadow">
                    {couple.location}
                  </p>
                  <Link
                    href={`/portfolio/${couple.slug}`}
                    className="border border-white/70 text-white px-6 py-2 rounded-full text-sm tracking-wide backdrop-blur-sm hover:bg-white hover:text-black transition-all"
                  >
                    View Portfolio
                  </Link>
                </div>

                {/* Inactive State Vertical Text */}
                <div
                  className={`absolute inset-x-0 bottom-10 flex flex-col items-center transition-opacity ${isActive ? "opacity-0 duration-200 pointer-events-none" : "opacity-100 duration-500 delay-300"
                    }`}
                >
                  <span className="text-white font-medium text-lg tracking-wider transform -rotate-90 origin-center whitespace-nowrap -translate-y-16">
                    {couple.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All CTA */}
        <section className="mt-10 flex justify-center">
          <Link
            href="/portfolio/all-stories"
            className="border-2 rounded-[12px] py-2 border-[#96034f] hover:bg-[#96034f] hover:text-white text-[#96034f] transition-all duration-500 w-64 md:w-80 flex items-center justify-center font-medium"
          >
            Show More
          </Link>
        </section>

      </div>
    </section>
  );
}
