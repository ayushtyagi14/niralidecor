"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { deco } from '@/lib/fonts';
import Hero from "@/components/Portfolio/Hero";
import { useRouter } from 'next/navigation';

export default function CoupleStoryLayout({ data }) {
  const router = useRouter();

  // Fallback if no data is passed
  if (!data) return null;

  return (
    <article className="w-full">
      {/* 1. Hero Banner */}
      <Hero mediaUrl={data.coverImage} />

      {/* Intro Description -> Formatted like "Our Signature Events" heading */}
      <motion.div
        className="flex flex-col items-center mt-24 px-4"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className={`${deco.className} lg:text-[48px] text-[30px] text-center text-[#96034f]`}>
          {data.name}
        </h1>
        <p className="lg:text-[18px] text-center mt-2">
          {data.description}
        </p>
      </motion.div>

      {/* 2. Collage Layout matching Portfolio Signature Events exact layout */}
      <div className="w-full pb-32">
        {(() => {
          const allImages = data.events ? data.events.flatMap(e => e.images) : [];
          const getImg = (idx) => allImages[idx] || data.coverImage;

          return (
            <div className="flex flex-col-reverse gap-4 mt-16 lg:w-[75%] w-[90%] mx-auto">
              {/* Large Horizontal Image */}
              <motion.div
                className="relative h-[300px] w-full group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                onClick={() => router.push(`/portfolio/${data.slug}/centerpiece`)}
              >
                <Image
                  src={getImg(0)}
                  alt="Couple Collage Image"
                  className="object-cover w-full h-full"
                  fill
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500 flex items-center justify-center">
                    <h1 className={`${deco.className} text-white text-center lg:text-[32px] font-bold`}>
                        Centerpiece
                    </h1>
                </div>
              </motion.div>

              {/* Container for Images */}
              <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
                {/* Left Vertical Image */}
                <motion.div
                  className="relative h-[550px] w-full lg:w-[30%] group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  onClick={() => router.push(`/portfolio/${data.slug}/wedding`)}
                >
                  <Image
                    src={getImg(1)}
                    alt="Couple Collage Image"
                    className="object-cover w-full h-full"
                    fill
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500 flex items-center justify-center">
                      <h1 className={`${deco.className} text-white text-center lg:text-[32px] font-bold`}>
                          Wedding
                      </h1>
                  </div>
                </motion.div>

                {/* Middle Container with 2 Horizontal Images */}
                <div className="flex flex-col gap-4 w-full lg:w-[40%]">
                  {/* Top Horizontal Image */}
                  <motion.div
                    className="relative h-[267px] group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    onClick={() => router.push(`/portfolio/${data.slug}/sangeet-garba`)}
                  >
                    <Image
                      src={getImg(2)}
                      alt="Couple Collage Image"
                      className="object-cover w-full h-full"
                      fill
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500 flex items-center justify-center">
                        <h1 className={`${deco.className} text-white text-center lg:text-[32px] font-bold`}>
                            Sangeet / Garba
                        </h1>
                    </div>
                  </motion.div>

                  {/* Bottom Horizontal Image */}
                  <motion.div
                    className="relative h-[267px] group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    onClick={() => router.push(`/portfolio/${data.slug}/vidhi-haldi`)}
                  >
                    <Image
                      src={getImg(3)}
                      alt="Couple Collage Image"
                      className="object-cover w-full h-full"
                      fill
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500 flex items-center justify-center">
                        <h1 className={`${deco.className} text-white text-center lg:text-[32px] font-bold`}>
                            Vidhi / Haldi
                        </h1>
                    </div>
                  </motion.div>
                </div>

                {/* Right Vertical Image */}
                <motion.div
                  className="relative h-[550px] w-full lg:w-[30%] group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  onClick={() => router.push(`/portfolio/${data.slug}/reception`)}
                >
                  <Image
                    src={getImg(4)}
                    alt="Couple Collage Image"
                    className="object-cover w-full h-full"
                    fill
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500 flex items-center justify-center">
                      <h1 className={`${deco.className} text-white text-center lg:text-[32px] font-bold`}>
                          Reception
                      </h1>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })()}
      </div>


    </article>
  );
}
