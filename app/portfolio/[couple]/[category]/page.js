import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Portfolio/Hero";
import CategoryGallery from "@/components/Portfolio/CategoryGallery";
import Supabase from "@/lib/supabase";

// Mock Fallback
const fallbackImages = [
  "/assets/couple1.JPG",
  "/assets/couple2.jpg",
  "/assets/couple3.jpg",
  "/assets/couple4.jpg",
  "/assets/couple5.jpg",
  "/assets/couple6.jpg"
];

const MOCK_COUPLE_DATA = {
  "arti-and-darshil": { name: "Arti & Darshil", coverImage: "/assets/couple1.JPG" },
  "riya-and-kishan": { name: "Riya & Kishan", coverImage: "/assets/couple2.jpg" },
  "krupa-and-bhavin": { name: "Krupa & Bhavin", coverImage: "/assets/couple4.jpg" },
  "shaina-and-niket": { name: "Shaina & Niket", coverImage: "/assets/couple5.jpg" },
  "ameya-and-zeel": { name: "Ameya & Zeel", coverImage: "/assets/couple6.jpg" }
};

export async function generateMetadata({ params }) {
  const { couple, category } = await params;
  const coupleInfo = MOCK_COUPLE_DATA[couple] || { name: "Wedding Story" };
  const formattedCategory = category.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase());

  return {
    title: `${formattedCategory} | ${coupleInfo.name} | Nirali Decor`,
    description: `View the ${formattedCategory} gallery for ${coupleInfo.name}.`,
  };
}

export default async function CategoryPage({ params }) {
  const { couple, category } = await params;
  const coupleInfo = MOCK_COUPLE_DATA[couple] || { name: couple.split("-").join(" "), coverImage: "/assets/couple1.JPG" };

  // Ideally, fetch all images specifically for this couple AND this category from your DB here!
  // e.g. Supabase.from("CoupleGallery").select("*").eq("couple_slug", couple).eq("category", category)

  // For now, let's fetch from Sections to see some rich DB images, or use fallbacks
  let galleryImages = [];
  
  try {
    const { data: dbGallery, error } = await Supabase.from("portfolio_couple_images")
      .select("media_url")
      .eq("couple_slug", couple)
      .eq("category", category);

    if (!error && dbGallery && dbGallery.length > 0) {
      galleryImages = dbGallery.map(img => img.media_url);
    } else {
        // Fallback to placeholders if no images uploaded yet
        galleryImages = fallbackImages;
    }
  } catch (err) {
    console.error("Gallery fetch error:", err);
    galleryImages = fallbackImages;
  }

  // Determine a hero banner for this category (we can use the couple's cover image)
  const heroImage = galleryImages[0] || coupleInfo.coverImage;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#fafafa]">
        {/* You can show a Hero or hide it depending on design. I'll include the Couple's cover banner */}
        <Hero mediaUrl={heroImage} />
        
        <CategoryGallery 
          coupleName={coupleInfo.name}
          categoryName={category}
          coverImage={heroImage}
          images={galleryImages}
        />
      </div>
      <Footer />
    </>
  );
}
