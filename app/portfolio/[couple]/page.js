import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Portfolio/Hero";
import CoupleFullGallery from "@/components/Portfolio/CoupleFullGallery";
import Supabase from "@/lib/supabase";
import ClientCoupleIntro from "@/components/Portfolio/ClientCoupleIntro";

// Local images fallback if fetch fails
const fallbackImages = [
  "/assets/couple1.JPG",
  "/assets/couple2.jpg",
  "/assets/couple3.jpg",
  "/assets/couple4.jpg",
  "/assets/couple5.jpg"
];

// MOCK DATA mapped exactly to the names and slugs requested
let MOCK_STORY_DATA = {
  "arti-and-darshil": {
    name: "Arti & Darshil",
    location: "Wedding Celebration",
    date: "October 12, 2025",
    coverImage: "/assets/couple1.JPG",
    description: "A beautiful celebration of love and joyous moments.",
  },
  "riya-and-kishan": {
    name: "Riya & Kishan",
    location: "Wedding Celebration",
    date: "November 5, 2025",
    coverImage: "/assets/couple2.jpg",
    description: "A playful morning and romantic evening.",
  },
  "krupa-and-bhavin": {
    name: "Krupa & Bhavin",
    location: "Wedding Celebration",
    date: "January 15, 2026",
    coverImage: "/assets/couple4.jpg",
    description: "A breathtaking floral celebration.",
  },
  "shaina-and-niket": {
    name: "Shaina & Niket",
    location: "Wedding Celebration",
    date: "February 22, 2026",
    coverImage: "/assets/couple5.jpg",
    description: "Dancing and joy all night long.",
  },
  "ameya-and-zeel": {
    name: "Ameya & Zeel",
    location: "Wedding Celebration",
    date: "March 10, 2026",
    coverImage: "/assets/couple6.jpg",
    description: "Vibrant colors and intimate moments.",
  }
};

// Generate Dynamic Metadata for SEO
export async function generateMetadata({ params }) {
  const { couple } = await params;

  const coupleData = MOCK_STORY_DATA[couple] || {
    name: "Wedding Story",
    description: "Explore this beautiful wedding story and design details."
  };

  return {
    title: `${coupleData.name} Wedding Story | Nirali Decor`,
    description: coupleData.description,
    openGraph: {
      title: `${coupleData.name} Wedding Story`,
      description: coupleData.description,
      images: coupleData.coverImage ? [coupleData.coverImage] : [],
    },
  };
}

export default async function CouplePage({ params }) {
  const { couple } = await params;

  let allImages = [];
  let storyData = null;

  try {
    // 1. Fetch specifically for this couple from our category images table
    const { data: dbGallery, error: galleryError } = await Supabase.from("portfolio_couple_images")
      .select("media_url, category")
      .eq("couple_slug", couple)
      .order("created_at", { ascending: false });

    if (!galleryError && dbGallery && dbGallery.length > 0) {
      allImages = dbGallery;
    } else {
        // Fallback images formatted correctly
        allImages = fallbackImages.map(img => ({ media_url: img, category: "wedding" }));
    }

    // 2. Fetch the REAL couple details
    const { data: dbCouple, error: coupleError } = await Supabase.from("portfolio_couples")
      .select("*")
      .eq("slug", couple)
      .maybeSingle();

    if (!coupleError && dbCouple) {
      storyData = {
        slug: dbCouple.slug,
        name: dbCouple.name,
        location: dbCouple.location,
        date: dbCouple.date,
        coverImage: dbCouple.banner_image || dbCouple.cover_image,
        description: dbCouple.description,
      };
    }
  } catch (err) {
    console.error("Database fetch error:", err);
    allImages = fallbackImages.map(img => ({ media_url: img, category: "wedding" }));
  }

  // 3. Fallback to MOCK data
  if (!storyData) {
    storyData = MOCK_STORY_DATA[couple] || MOCK_STORY_DATA["arti-and-darshil"];
    storyData.slug = couple;
  }

  return (
    <>
      <Navbar />
      <div className="bg-[#fafafa] pb-8">
        {/* Banner */}
        <Hero mediaUrl={storyData.coverImage} />

        {/* Intro */}
        <ClientCoupleIntro name={storyData.name} description={storyData.description} />

        {/* Full Image Gallery */}
        <CoupleFullGallery coupleName={storyData.name} images={allImages} />
      </div>
      <Footer />
    </>
  );
}
