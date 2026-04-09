"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { deco } from "@/lib/fonts";

const approachSections = [
  {
    id: 1,
    image: "/assets/Our Approach.jpeg",
    title: "Our Approach",
    subtitle: "Where Vision Meets Precision",
    phases: [
      {
        phase: "Design Philosophy",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        ),
        title: "Creating Cohesive Experiences",
        description: "Creating a cohesive experience across each wedding event",
        highlight: "Unified design language throughout your celebration"
      },
      {
        phase: "Traditional Elegance",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        ),
        title: "Honoring Tradition",
        description: "Designing mandaps and stages that honor tradition while feeling current",
        highlight: "Timeless designs with contemporary touches"
      },
      {
        phase: "Natural Beauty",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        ),
        title: "Curated Palettes",
        description: "Curating floral and color palettes that feel natural and photograph beautifully",
        highlight: "Colors that capture beautifully on camera"
      },
      {
        phase: "Seamless Execution",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        title: "Family-Focused Service",
        description: "Managing installation and breakdown with care, so families can stay present",
        highlight: "You enjoy the moment, we handle the details"
      }
    ],
    result: "The result is a space that feels thoughtful, refined, and truly yours."
  },
  {
    id: 2,
    image: "/assets/More Than Décor.jpg",
    title: "Our Process",
    subtitle: "Here's what working with us looks like",
    phases: [
      {
        phase: "Step 1",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        ),
        title: "Discovery",
        description: "A detailed consultation to understand your vision, style, and priorities",
        highlight: "Personalized attention from day one"
      },
      {
        phase: "Step 2",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        ),
        title: "Design",
        description: "Personalized design concepts with curated colors, florals, and finishes",
        highlight: "Bespoke concepts tailored to your style"
      },
      {
        phase: "Step 3",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h2a2 2 0 002-2V8a2 2 0 00-2-2H9a2 2 0 00-2 2v2a2 2 0 002 2zm0 0h2a2 2 0 012 2v2a2 2 0 01-2 2H9a2 2 0 01-2-2v-2a2 2 0 012-2zm0 0V8m0 8h2m-2-4h2m7-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2" />
          </svg>
        ),
        title: "Planning",
        description: "Clear proposals with transparent pricing and open communication",
        highlight: "No surprises, complete transparency"
      },
      {
        phase: "Step 4",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        ),
        title: "Coordination",
        description: "Careful production planning and coordination with your venue and team",
        highlight: "Seamless collaboration with your vendors"
      },
      {
        phase: "Step 5",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        ),
        title: "Execution",
        description: "Professional installation and seamless execution on your event day",
        highlight: "Flawless execution for your perfect day"
      }
    ],
    result: "We handle both the creative and logistical details with precision and care, so you and your family can be fully present and enjoy the celebration."
  },
  {
    id: 3,
    image: "/assets/More Than Décor.jpg",
    title: "More Than Décor",
    content: `At Nirali Decor, our work is rooted in more than design, it's about creating the setting where your most meaningful moments unfold. We understand how much this celebration represents, and we approach each wedding with care, intention, and personal investment.
 
For couples who value thoughtful design and a seamless experience, it would be an honor to be part of your journey. Let's create a wedding that feels like you, beautiful, personal, and unforgettable.`,
  },
];

function PhaseCard({ phase, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-gradient-to-br from-[#fef7ff] to-white p-6 rounded-2xl border border-[#f4c7ff]/20 hover:border-[#96034f]/30 transition-all duration-300 hover:shadow-lg"
    >
      {/* Phase Number */}
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#96034f] text-white rounded-full flex items-center justify-center text-sm font-bold">
        {index + 1}
      </div>

      {/* Icon and Title */}
      <div className="flex items-start gap-4 mb-4">
        <div className="text-[#96034f] p-2 bg-[#96034f]/10 rounded-lg">
          {phase.icon}
        </div>
        <div className="flex-1">
          <h4 className={`${deco.className} text-xl font-semibold text-[#96034f] mb-1`}>{phase.title}</h4>
          <p className="text-sm text-gray-500 uppercase tracking-wide">{phase.phase}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed mb-4">{phase.description}</p>

      {/* Highlight */}
      <div className="bg-[#96034f]/5 border-l-4 border-[#96034f] px-4 py-2 rounded-r-lg">
        <p className="text-sm font-medium text-[#96034f] italic">{phase.highlight}</p>
      </div>
    </motion.div>
  );
}

function SectionContent({ section, index, onInViewChange }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });

  React.useEffect(() => {
    if (isInView) {
      onInViewChange(index);
    }
  }, [isInView, index, onInViewChange]);

  return (
    <div ref={ref} className="min-h-screen flex items-start pt-8 py-20">
      <div className="max-w-xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className={`${deco.className} text-4xl md:text-5xl font-light text-[#96034f] mb-3 tracking-wide`}>
            {section.title}
          </h3>
          {section.subtitle && (
            <p className="text-xl text-gray-600 mb-8 font-light">{section.subtitle}</p>
          )}
        </motion.div>

        {/* Phase Cards or Content */}
        {section.phases ? (
          <div className="space-y-4">
            {section.phases.map((phase, phaseIndex) => (
              <PhaseCard key={phase.phase} phase={phase} index={phaseIndex} />
            ))}
          </div>
        ) : section.content ? (
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
        ) : null}

        {/* Result Statement */}
        {section.result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 p-6 bg-gradient-to-r from-[#96034f]/5 to-[#f4c7ff]/5 rounded-2xl border border-[#96034f]/20"
          >
            <p className="text-lg text-[#96034f] font-medium leading-relaxed">
              {section.result}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function OurApproach() {
  const [activeImage, setActiveImage] = useState(0);
  const containerRef = useRef(null);

  const handleInViewChange = (index) => {
    setActiveImage(index);
  };

  return (
    <section ref={containerRef} className="bg-white py-20">
      {/* Two Column Layout - Text Left, Image Right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left Side - Scrolling Text Content */}
          <div className="lg:w-1/2">
            {approachSections.map((section, index) => (
              <SectionContent
                key={section.id}
                section={section}
                index={index}
                onInViewChange={handleInViewChange}
              />
            ))}
          </div>

          {/* Right Side - Sticky Image */}
          <div className="lg:w-1/2">
            <div className="lg:sticky lg:top-32 h-[60vh] lg:h-[70vh] relative rounded-2xl overflow-hidden shadow-2xl">
              {approachSections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeImage === index ? 1 : 0,
                    scale: activeImage === index ? 1 : 1.05,
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              ))}

              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
