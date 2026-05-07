"use client";

import React from "react";
import { motion } from "framer-motion";
import { deco } from '@/lib/fonts';

export default function ClientCoupleIntro({ name, description }) {
  return (
    <section className="relative pt-24 pb-12 px-4 overflow-hidden bg-[#fafafa]">
      {/* Background Decorative Text - Large and subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none opacity-40">
        <span className="text-[15vw] font-bold text-[#96034f]/[0.03] tracking-tighter uppercase whitespace-nowrap">
          Our Special Story
        </span>
      </div>

      <div className="relative max-w-4xl mx-auto flex flex-col items-center">
        {/* Subtle Accent Label */}
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="flex items-center gap-4 mb-2"
        >
          <div className="w-10 h-[1px] bg-[#96034f]/30"></div>
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#96034f] font-semibold">
            Every Moment Captured
          </span>
          <div className="w-10 h-[1px] bg-[#96034f]/30"></div>
        </motion.div>

        {/* Main Name Heading */}
        <motion.h1 
          className={`${deco.className} lg:text-[84px] md:text-[64px] text-[42px] text-center text-[#96034f] leading-tight mb-8 drop-shadow-sm`}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {name}
        </motion.h1>

        {/* Description - Styled like a quote */}
        <motion.div 
          className="relative max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p className="lg:text-[18px] text-[16px] text-center text-gray-500 italic leading-relaxed font-light">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
