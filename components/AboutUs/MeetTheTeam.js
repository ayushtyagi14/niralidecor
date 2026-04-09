"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { deco } from "@/lib/fonts";

const sections = [
  {
    id: 1,
    image: "/assets/founders.jpg",
    position: "object-[50%_25%]",
    title: "Meet the Founders",
    content: `Nirali Decor is led by Nirali and Pradip, a husband-and-wife team who believe your wedding should feel like you, authentic, elevated, and unforgettable. Nirali is the creative mind behind the designs. She loves turning your Pinterest boards, outfit colors, and ideas into cohesive, statement-worthy spaces that feel fresh, stylish, and personal. Pradip is the one who brings it all to life. He leads the builds and installations, making sure every detail, from the mandap to the stage, is executed flawlessly so you can be fully present and enjoy your moment.
 
Together, they blend creativity with precision to create wedding experiences that feel effortless, immersive, and true to your story.
They're not just designing your wedding, they're helping you create moments you'll never forget.`,
  },
  {
    id: 2,
    image: "/assets/experience.jpg",
    position: "object-center",
    title: "Our Experience",
    content: `Since 2011, Nirali Decor has designed Indian weddings across New Jersey and surrounding areas, creating celebrations in luxury hotel ballrooms, premier wedding venues, banquet halls, and outdoor ceremony spaces. Over the years, the team has designed more than 1,300 weddings and multi-day celebrations, each approached with the same care, creativity, and attention to detail. Much of Nirali Decor's work comes through referrals from past clients and families, something they consider their most meaningful accomplishment and greatest trust.`,
  },
  {
    id: 3,
    image: "/assets/why-we-chose-this.jpg",
    position: "object-center",
    title: "Why We Chose This Work",
    content: `Nirali was drawn to how design could completely change the feeling of a space, using florals, color, and texture to create something beautiful and personal. Pradip found his passion in bringing those ideas to life, building environments where families could gather and celebrate. What made it truly meaningful was seeing a couple's reaction when they walked into their wedding for the first time.

That moment is why they do what they do: to create spaces that feel like you.`,
  },
];

function SectionContent({ section, index, onInViewChange, isActive }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: false, margin: "-20% 0px -20% 0px" });

  useEffect(() => {
    if (isInView) {
      onInViewChange(index);
    }
  }, [isInView, index, onInViewChange]);

  return (
    <motion.div
      ref={ref}
      className="min-h-screen flex items-start pt-8 relative"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-xl relative z-10"
      >
        {/* Progress Indicator */}
        <motion.div
          className="absolute -left-8 top-8 w-1 h-16 bg-gradient-to-b from-[#96034f] to-[#f4c7ff] rounded-full"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isActive ? 1 : 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        <motion.h3
          className={`${deco.className} text-4xl md:text-5xl font-light text-[#96034f] mb-8 tracking-wide`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {section.title}
        </motion.h3>

        <motion.div
          className="text-lg leading-relaxed text-gray-700 whitespace-pre-line space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {section.content.split('\n\n').map((paragraph, pIndex) => (
            <motion.p
              key={pIndex}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 + pIndex * 0.1 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function MeetTheTeam() {
  const [activeImage, setActiveImage] = useState(0);
  const containerRef = useRef(null);

  const handleInViewChange = (index) => {
    setActiveImage(index);
  };

  return (
    <section ref={containerRef} className="bg-white py-20">
      {/* Centered Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className={`${deco.className} text-5xl md:text-6xl font-light text-[#96034f] tracking-wider`}>
          Meet the Team
        </h2>
        <div className="w-24 h-0.5 bg-[#96034f] mx-auto mt-6" />
      </motion.div>

      {/* Two Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left Side - Sticky Image with Enhanced Animations */}
          <div className="lg:w-1/2">
            <motion.div
              className="lg:sticky lg:top-32 h-[60vh] lg:h-[70vh] relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={sections[activeImage].image}
                    alt={sections[activeImage].title}
                    fill
                    className={`object-cover ${sections[activeImage].position}`}
                    priority={activeImage === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Enhanced gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Progress dots */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                {sections.map((_, index) => (
                  <motion.div
                    key={index}
                    className="w-2 h-2 bg-white/60 rounded-full cursor-pointer"
                    animate={{
                      scale: activeImage === index ? 1.5 : 1,
                      backgroundColor: activeImage === index ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)"
                    }}
                    whileHover={{ scale: 1.8 }}
                    onClick={() => handleInViewChange(index)}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side - Scrolling Text Content */}
          <div className="lg:w-1/2">
            {sections.map((section, index) => (
              <SectionContent
                key={section.id}
                section={section}
                index={index}
                onInViewChange={handleInViewChange}
                isActive={activeImage === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
