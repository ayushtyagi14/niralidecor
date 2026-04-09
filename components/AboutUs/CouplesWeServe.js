"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { deco } from "@/lib/fonts";

const couplesData = [
  {
    id: 1,
    text: "Overwhelmed by unfiltered online inspiration",
    image: "/assets/overwhelmed-inspiration.jpg",
    position: "object-center",
  },
  {
    id: 2,
    text: "Uncertain how to unify multiple wedding events",
    image: "/assets/unify-events.jpg",
    position: "object-center",
  },
  {
    id: 3,
    text: "Torn between tradition and modern design",
    image: "/assets/torn-tradition.jpg",
    position: "object-center",
  },
  {
    id: 4,
    text: "Concerned about managing décor across venues",
    image: "/assets/managing-decor.jpg",
    position: "object-center",
  },
  {
    id: 5,
    text: "Seeking meaning rather than excess",
    image: "/assets/seeking-meaning.jpg",
    position: "object-center",
  },
];

export default function CouplesWeServe() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardIndex = useTransform(scrollYProgress, [0, 0.9], [0, 4]);

  useEffect(() => {
    const unsubscribe = cardIndex.on("change", (latest) => {
      const newIndex = Math.min(Math.max(Math.round(latest), 0), 4);
      setActiveIndex(newIndex);
    });
    return () => unsubscribe();
  }, [cardIndex]);

  const centerCard = couplesData[activeIndex];
  const rightCards = couplesData.filter((_, idx) => idx !== activeIndex);

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-b from-white via-[#fef7ff] to-white"
      style={{ height: "500vh" }}
    >
      <div className="sticky top-[80px] h-screen flex items-center pt-10">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-8">
          
          {/* 70/30 Layout */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 min-h-[80vh] py-4">
            
            {/* LEFT - Fluid space */}
            <div className="flex-1 flex flex-col min-h-full min-w-0">
              
              {/* Fixed Title */}
              <div className="mb-4 mt-2">
                <h2 className={`${deco.className} text-3xl md:text-4xl lg:text-5xl font-light text-[#96034f] tracking-wide`}>
                  The Couples We Serve
                </h2>
                <div className="w-24 h-1 bg-[#96034f] mt-3" />
              </div>

              {/* Large Center Card - Aligned Left */}
              <div className="flex-1 flex items-center justify-start py-2 flex-grow">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl h-[300px] md:h-[380px] lg:h-[450px]">
                    {/* Background Image */}
                    <Image
                      src={centerCard.image}
                      alt={centerCard.text}
                      fill
                      className={`object-cover ${centerCard.position}`}
                      priority
                      quality={100}
                      sizes="(max-width: 1024px) 100vw, 70vw"
                    />
                    {/* Neutral Gradient Overlay for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-8 z-20">
                      <p className="text-white text-lg md:text-2xl font-medium leading-relaxed drop-shadow-lg">
                        {centerCard.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Fixed Quote at Bottom */}
              <div className="mt-4 bg-white rounded-xl p-4 shadow-lg border-l-4 border-[#96034f] w-full">
                <p className="text-base text-gray-700 leading-relaxed italic break-words">
                  Indian weddings involve multiple functions, each with a distinct identity. Without a cohesive plan, they can feel fragmented. Our role is to bring clarity, structure, and calm.
                </p>
              </div>
            </div>

            {/* RIGHT - Fixed width sidebar */}
            <div className="lg:w-[320px] flex flex-col justify-center items-center flex-shrink-0">
              <div className="space-y-3">
                {rightCards.map((card, idx) => (
                  <motion.div
                    key={`${activeIndex}-${card.id}`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    onClick={() => setActiveIndex(card.id - 1)}
                    className="cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white flex h-[90px]"
                  >
                    {/* Image */}
                    <div className="w-[90px] h-full flex-shrink-0 relative">
                      <Image
                        src={card.image}
                        alt={card.text}
                        fill
                        className={`object-cover ${card.position}`}
                        sizes="90px"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                    {/* Text */}
                    <div className="flex-1 flex items-center p-3">
                      <p className="text-gray-800 text-sm font-medium leading-snug">
                        {card.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Progress Dots */}
              <div className="mt-5 flex justify-center gap-2">
                {couplesData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? "w-8 bg-[#96034f]"
                        : "w-2 bg-[#f4c7ff] hover:bg-[#96034f]/50"
                    }`}
                  />
                ))}
              </div>

              <p className="mt-2 text-center text-xs text-gray-500">
                Click to explore
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
