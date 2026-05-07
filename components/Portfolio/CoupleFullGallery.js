"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { deco } from "@/lib/fonts";

export default function CoupleFullGallery({ coupleName, images }) {
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <div className="w-full">
      {/* Masonry Grid Container */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-12 pb-12 w-full">
        <div className="columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-3 gap-6 w-full">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              className="relative mb-6 break-inside-avoid w-full overflow-hidden group cursor-zoom-in rounded-sm shadow-sm hover:shadow-xl transition-shadow duration-500 bg-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1, duration: 0.5 }}
              onClick={() => setLightboxImage(img.media_url)}
            >
              <img
                src={img.media_url}
                alt={`${coupleName} Wedding Image ${idx + 1}`}
                className="w-full h-auto block transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                loading="lazy"
              />
              
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Category Tag on Hover (Optional) */}
              {img.category && (
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                   <span className="bg-white/90 backdrop-blur-sm text-[#96034f] text-[10px] uppercase tracking-widest px-3 py-1 font-medium rounded-full">
                     {img.category.replace("-", " ")}
                   </span>
                </div>
              )}
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

            <div className="relative w-full max-w-6xl h-[80vh] sm:h-[90vh]">
              <Image
                src={lightboxImage}
                alt="Enlarged view"
                fill
                quality={100}
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
