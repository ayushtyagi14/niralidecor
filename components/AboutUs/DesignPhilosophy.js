"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { deco } from "@/lib/fonts";

const designElements = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Listen",
    description: "Every celebration begins with listening"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Understand",
    description: "Your story, traditions, and priorities"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "Create",
    description: "Design that feels personal and intentional"
  }
];

export default function DesignPhilosophy() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative bg-white py-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y, opacity }}
          className="absolute -right-20 top-20 w-96 h-96 bg-[#fef7ff] rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]), opacity }}
          className="absolute -left-20 bottom-20 w-80 h-80 bg-[#f4c7ff]/30 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-0.5 bg-[#96034f] mx-auto mb-8"
          />
          <h2 className={`${deco.className} text-4xl md:text-5xl lg:text-6xl font-light text-[#96034f] tracking-wide mb-6`}>
            Our Design Philosophy
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual Element Cards */}
          <div className="space-y-6">
            {designElements.map((element, index) => (
              <motion.div
                key={element.title}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ x: 10, transition: { duration: 0.2 } }}
                className="group flex items-center gap-6 p-6 bg-gradient-to-r from-[#fef7ff] to-white rounded-2xl border border-[#f4c7ff]/20 hover:border-[#96034f]/30 transition-all duration-300 hover:shadow-lg cursor-default"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-[#96034f]/10 rounded-2xl flex items-center justify-center text-[#96034f] group-hover:bg-[#96034f] group-hover:text-white transition-all duration-300">
                  {element.icon}
                </div>
                <div>
                  <h3 className={`${deco.className} text-2xl font-light text-[#96034f] mb-1`}>
                    {element.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {element.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right - Main Statement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Large Quote Mark */}
            <div className="absolute -top-8 -left-4 text-[#96034f]/10 text-[200px] font-serif leading-none select-none">
              &quot;
            </div>

            <div className="relative z-10 p-8 lg:p-12">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-2xl md:text-3xl lg:text-4xl text-gray-800 leading-relaxed font-light"
              >
                Every celebration begins with{" "}
                <span className="text-[#96034f]">listening</span>.
                We take time to understand your{" "}
                <span className="text-[#96034f]">story</span>,{" "}
                <span className="text-[#96034f]">traditions</span>, and{" "}
                <span className="text-[#96034f]">priorities</span> so the design feels{" "}
                <span className="italic text-[#96034f]">personal</span> and{" "}
                <span className="italic text-[#96034f]">intentional</span>.
              </motion.p>

              {/* Decorative Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-10 w-32 h-1 bg-gradient-to-r from-[#96034f] to-[#f4c7ff] rounded-full origin-left"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
