"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { deco } from "@/lib/fonts";

export default function CategoryGallery({ coupleName, categoryName, coverImage, images }) {
  const [lightboxImage, setLightboxImage] = useState(null);

  // Formatting strings
  const formattedCategory = categoryName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace("And", "&");

  return (
    <div className="w-full">
      {/* Gallery Header */}
      <motion.div
        className="flex flex-col items-center mt-32 mb-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl tracking-widest uppercase text-gray-500 mb-4">
          {coupleName}
        </h2>
        <h1 className={`${deco.className} lg:text-[56px] text-[36px] text-center text-[#96034f]`}>
          {formattedCategory} Gallery
        </h1>
      </motion.div>

      {/* Masonry Grid */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 pb-32">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              className="relative w-full overflow-hidden group cursor-zoom-in rounded-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => setLightboxImage(img)}
            >
              {/* Using standard img tag inside for Masonry effect to auto-adjust height, or next/image with layout responsive */}
              <img
                src={img}
                alt={`${formattedCategory} Gallery Image ${idx + 1}`}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 sm:p-12 cursor-zoom-out"
            onClick={() => setLightboxImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 sm:top-10 sm:right-10 text-white hover:text-gray-300 transition-colors z-[110]"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImage(null);
              }}
              aria-label="Close Lightbox"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative w-full max-w-5xl h-[80vh] sm:h-[90vh]">
              <Image
                src={lightboxImage}
                alt="Enlarged view"
                fill
                quality={100}
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
