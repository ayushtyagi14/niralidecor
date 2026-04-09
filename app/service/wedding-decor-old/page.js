"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Homepage/Contact";
import { deco } from "@/lib/fonts";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const IconStar = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 3.25l2.62 5.31 5.86.85-4.24 4.13 1 5.81L12 16.98l-5.24 2.77 1-5.81-4.24-4.13 5.86-.85L12 3.25z" />
  </svg>
);

const IconClock = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l2.5 1.5" />
  </svg>
);

const IconAward = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M9.5 11.5L8 21l4-2 4 2-1.5-9.5" />
  </svg>
);

const IconCheck = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="10" cy="10" r="8" />
    <path d="M6.5 10.5l2.2 2.3L13.5 8" />
  </svg>
);

const faqItems = [
  {
    question: "What is included in wedding stage decoration services?",
    answer:
      "Besides the stage design, mandap or reception backdrop, floral décor, draping, seating setup, lighting, and final styling are all part of the wedding stage decoration package. These offerings are tailored to suit Indian wedding customs, the size of the venue, and the couple's theme.",
  },
  {
    question: "Do you provide custom wedding stage decor for Indian weddings?",
    answer:
      "Absolutely, we provide custom wedding stage decor from start to finish. Your rituals, color scheme, venue, and wedding theme are the bases on which each design is customized to craft a distinct and deeply personal Indian wedding decoration.",
  },
  {
    question: "Can you handle both wedding and reception decoration?",
    answer:
      "Certainly, we offer the whole range of wedding and reception decoration services. Among these are ceremony décor, reception stage setup, floral arrangements, lighting, and coordinated décor for multi-event Indian weddings.",
  },
  {
    question: "Which locations do you serve for wedding decoration services?",
    answer:
      "Our wedding decoration services are available in New Jersey, New York, Georgia, North Carolina, South Carolina, Virginia, Florida, Pennsylvania, Ohio, and the nearby areas, where we also host Indian weddings and destination events.",
  },
  {
    question: "How early should we book a wedding decorator?",
    answer:
      "Booking a wedding decorator 4 to 6 months ahead is advised. Early reservation guarantees better design planning, venue coordination, and availability at the time of the Indian wedding peak seasons.",
  },
  {
    question: "Do you offer themed Indian wedding stage decoration?",
    answer:
      "Indeed, we are the experts when it comes to theme-based Indian wedding stage decoration that embraces the likes of royal, floral, traditional, modern, minimalist, and fusion décor styles in line with your wedding and cultural preferences.",
  },
  {
    question: "Do you provide décor for destination and multi-day Indian weddings?",
    answer:
      "Yes, we provide décor services for destination and multi-day Indian weddings. Our team handles the logistics, setup, and smooth running of all the events that make up your celebration.",
  },
  {
    question: "Do you coordinate with venues and other wedding vendors?",
    answer:
      "Definitely, we work closely with venues, planners, and vendors to coordinate the execution of wedding stage decor, lighting, and overall wedding decoration services.",
  },
  {
    question: "How much does an Indian wedding stage decoration cost?",
    answer:
      "The cost of Indian wedding stage decoration depends on factors such as design complexity, floral requirements, stage size, and location. A price is set after a thorough discussion of your décor needs and budget for the wedding.",
  },
  {
    question: "Do you provide on-site support on the wedding day?",
    answer:
      "Absolutely, on the wedding day, our team is fully present with the on-site support needed to ensure that the stage decoration, reception décor, and final styling are carried out without a hitch.",
  },
];

export default function WeddingDecorPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <div className="bg-white text-[#1b1311]">
      <Navbar />

      {/* HERO + STATS */}
      <section className="relative overflow-hidden pt-28 pb-10 lg:pb-12">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/169211/pexels-photo-169211.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/55" />

        <div className="relative max-w-5xl mx-auto px-4 lg:px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-5 lg:space-y-6"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#ffe4f1]">
              Stage Decoration Services
            </p>
            <h1
              className={`${deco.className} text-4xl sm:text-5xl lg:text-[52px] leading-tight drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]`}
            >
              Wedding Stage Decorations
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#fce7f4]">
              Bespoke wedding stage decor, reception decoration &amp; complete
              Indian.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-full bg-[#ff4f88] px-7 py-2.5 text-sm font-medium tracking-wide text-white shadow-lg shadow-[#ff4f88]/40 hover:bg-[#e63c74] transition-colors"
              >
                Get a Free Design Consultation
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-full bg-white/90 px-6 py-2.5 text-sm font-medium tracking-wide text-[#96034f] hover:bg-white transition-colors"
              >
                View Stage Decor Portfolio
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative mt-10 lg:mt-14"
        >
          <div className="max-w-5xl mx-auto px-4 lg:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-3xl bg-white/95 shadow-[0_18px_45px_rgba(0,0,0,0.16)] py-4 sm:py-5 px-5 sm:px-8 text-center text-sm text-[#3a2620]">
              <div className="space-y-1 flex flex-col items-center">
                <span className="inline-flex items-center justify-center rounded-full bg-[#fef1f7] text-[#96034f] mb-1 p-2">
                  <IconStar className="w-5 h-5" />
                </span>
                <p className="font-semibold">Indian Wedding Decorators</p>
              </div>
              <div className="space-y-1 border-t sm:border-t-0 sm:border-l sm:border-r border-[#f3d4e5] pt-3 sm:pt-0 sm:px-4 flex flex-col items-center">
                <span className="inline-flex items-center justify-center rounded-full bg-[#fef1f7] text-[#96034f] mb-1 p-2">
                  <IconClock className="w-5 h-5" />
                </span>
                <p className="font-semibold">500+ Weddings Styled</p>
              </div>
              <div className="space-y-1 flex flex-col items-center">
                <span className="inline-flex items-center justify-center rounded-full bg-[#fef1f7] text-[#96034f] mb-1 p-2">
                  <IconAward className="w-5 h-5" />
                </span>
                <p className="font-semibold">Featured in Wedding Blogs &amp; Industry Awards</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* INTRO COPY */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-16 lg:py-20 bg-gradient-to-b from-white via-[#fff8fc] to-white"
      >
        <div className="max-w-6xl mx-auto px-4 lg:px-6 flex flex-col lg:flex-row gap-10 lg:items-start">
          <div className="lg:w-[38%] flex justify-center lg:justify-start">
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.08)] border border-[#f3d4e5] bg-[#fff8fc]">
              <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
                <img
                  src="https://images.pexels.com/photos/3405875/pexels-photo-3405875.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Elegant Indian wedding stage decoration"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h2 className={`${deco.className} text-2xl sm:text-3xl text-[#2c1c17] mb-3`}>
              Stage Decoration for Indian Weddings
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#4e3b36] max-w-2xl">
              The wedding stage is the core of every party. Our stage decoration
              for Indian weddings combines the elements of a grand old
              tradition, sumptuousness and contemporary style to make the
              moments absolutely unforgettable. Whether you dream of a royal
              mandap stage or a chic reception backdrop, our team crafts premium
              wedding stage decor customised to your ceremonies, venue and the
              vision in your eyes.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 4 SERVICE CARDS */}
      <motion.section
        id="services"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-16 lg:py-20 bg-[#fdf6fa]"
      >
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <motion.div
            variants={fadeUp}
            className="text-center mb-10 space-y-3"
          >
            <h2
              className={`${deco.className} text-2xl sm:text-3xl lg:text-[30px] text-[#2c1c17]`}
            >
              Complete Wedding Stage Decor &amp; Reception Decoration Services
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="rounded-3xl bg-white shadow-[0_18px_40px_rgba(0,0,0,0.06)] px-5 py-6 flex flex-col gap-2 border border-[#f3d4e5]"
              >
                <p className="text-xl font-semibold text-[#f3a93a]">{item}.</p>
                {item === 1 && (
                  <>
                    <h3 className="text-sm font-semibold text-[#2c1c17]">
                      Indian Wedding Stage Decoration
                    </h3>
                    <ul className="text-xs text-[#4e3b36] space-y-1 list-disc list-inside">
                      <li>Mandap &amp; pheras stage design</li>
                      <li>Floral, fabric &amp; crystal backdrops</li>
                      <li>Traditional + contemporary stage decor</li>
                    </ul>
                  </>
                )}
                {item === 2 && (
                  <>
                    <h3 className="text-sm font-semibold text-[#2c1c17]">
                      Reception Stage Decoration
                    </h3>
                    <ul className="text-xs text-[#4e3b36] space-y-1 list-disc list-inside">
                      <li>Luxury reception decoration concepts</li>
                      <li>LED walls, floral arches &amp; statement props</li>
                      <li>Bride &amp; groom seating stage decor</li>
                    </ul>
                  </>
                )}
                {item === 3 && (
                  <>
                    <h3 className="text-sm font-semibold text-[#2c1c17]">
                      Custom Wedding Decor Themes
                    </h3>
                    <ul className="text-xs text-[#4e3b36] space-y-1 list-disc list-inside">
                      <li>Royal, floral, minimalist, modern &amp; fusion styles</li>
                      <li>Color‑coordinated Indian wedding decoration</li>
                    </ul>
                  </>
                )}
                {item === 4 && (
                  <>
                    <h3 className="text-sm font-semibold text-[#2c1c17]">
                      Full Wedding Decoration Services
                    </h3>
                    <ul className="text-xs text-[#4e3b36] space-y-1 list-disc list-inside">
                      <li>Venue styling &amp; draping</li>
                      <li>Aisle, entrance &amp; table décor</li>
                      <li>Lighting &amp; ambiance design</li>
                    </ul>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-10 max-w-3xl mx-auto text-center space-y-4">
            <p className="text-sm sm:text-base text-[#4e3b36]">
              Collaborate with a committed wedding decor team who guarantees
              smooth implementation from first idea to your wedding day
              celebrations.
            </p>
            <a
              href="/contact-us"
              className="inline-flex items-center justify-center rounded-full bg-[#ff4f88] px-7 py-2.5 text-sm font-medium tracking-wide text-white shadow-[0_16px_40px_rgba(255,79,136,0.45)] hover:bg-[#e63c74] transition-transform transition-colors hover:-translate-y-0.5"
            >
              Schedule a Decor Consultation
            </a>
          </div>
        </div>
      </motion.section>

      {/* TRUST FEATURES */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-16 lg:py-20 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 lg:px-6 flex flex-col lg:flex-row gap-10 lg:items-center">
          <div className="lg:w-[38%] w-full">
            <div className="relative overflow-hidden rounded-3xl bg-[#fff3f9] border border-[#f3d4e5] shadow-[0_18px_40px_rgba(0,0,0,0.06)]">
              <div className="h-64 bg-[url('https://images.pexels.com/photos/1805599/pexels-photo-1805599.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-cover bg-center" />
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h2 className={`${deco.className} text-2xl sm:text-3xl text-[#2c1c17]`}>
              Why Choose Nirali Decor
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#4e3b36] max-w-xl lg:max-w-none">
              Our​‍​‌‍​‍‌​‍​‌‍​‍‌ skilled Indian wedding decorators fashion grand stages and opulent reception décor, thereby making your wedding look stunningly styled and flawlessly carried out.

            </p>
            <div className="mt-7 flex flex-col gap-3 max-w-2xl">
              {["Decorating services team committed to your wedding needs","In‑house creative designers & implementation team","Top‑notch materials & fresh flowers","Unambiguous pricing & straightforward timelines","Reliable wedding decorators in New Jersey & Atlanta, Georgia"].map(
                (label) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-3 rounded-full border border-[#f3d4e5] bg-white/90 px-4 py-2.5 text-sm text-[#4e3b36] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="inline-flex items-center justify-center rounded-full bg-[#fef1f7] text-[#96034f] p-1.5">
                      <IconCheck />
                    </span>
                    <span className="font-medium text-left text-[#2c1c17]">
                      {label}
                    </span>
                  </div>
                )
              )}
            </div>

            <div className="mt-6">
              <a
                href="/about-us"
                className="inline-flex items-center justify-center rounded-full border border-[#96034f] px-6 py-2.5 text-sm font-medium tracking-wide text-[#96034f] hover:bg-[#fdf2f8] transition-colors"
              >
                Know More
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5-STEP PROCESS */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-16 lg:py-20 bg-[#fdf6fa]"
      >
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <motion.div
            variants={fadeUp}
            className="text-center mb-10 space-y-3"
          >
            <h2 className={`${deco.className} text-2xl sm:text-3xl text-[#2c1c17]`}>
              Stress‑Free Wedding Stage Decoration Process
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid gap-5 md:grid-cols-5"
          >
            {[
              {
                step: 1,
                title: "Consultation",
                desc: "Understand your vision & rituals.",
              },
              {
                step: 2,
                title: "Design",
                desc: "Custom 3D concepts & mood boards.",
              },
              {
                step: 3,
                title: "Planning",
                desc: "Venue coordination & logistics.",
              },
              {
                step: 4,
                title: "Execution",
                desc: "Flawless setup on the wedding day.",
              },
              {
                step: 5,
                title: "Final Touches",
                desc: "Perfection in every detail.",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="rounded-3xl bg-white shadow-[0_16px_35px_rgba(0,0,0,0.04)] px-4 py-6 text-center border border-[#f3d4e5] flex flex-col gap-2"
              >
                <p className="text-xl font-semibold text-[#f3a93a]">
                  {item.step}.
                </p>
                <h3 className="text-sm font-semibold text-[#2c1c17]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#4e3b36]">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* REGIONS WE SERVE */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-16 lg:py-20 bg-white"
      >
        <div className="max-w-5xl mx-auto px-4 lg:px-6 text-center">
          <h2 className={`${deco.className} text-2xl sm:text-3xl text-[#2c1c17]`}>
            Regions We Serve
          </h2>
          {/* <p className="mt-3 text-sm text-[#4e3b36]">
            Based in New Jersey &amp; Atlanta, we style weddings across the East
            Coast and select destination locations.
          </p> */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
            {["New York","Atlanta, Georgia","New Jersey","Connecticut","Maryland","North Carolina","South Carolina","Tennessee","Virginia","Florida","Delaware","Alabama","Boston, Massachusetts","Pennsylvania","Ohio"].map(
              (region) => {
                const isKeyRegion =
                  region === "New Jersey" || region === "Atlanta, Georgia";
                const baseClasses =
                  "inline-flex items-center rounded-full px-3 py-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border text-[#4e3b36]";
                const colorClasses = isKeyRegion
                  ? "bg-[#fff2f8] border-[#f4c7df] text-[#8a2b55]"
                  : "bg-[#fff9fd] border-[#f3d4e5]";

                return (
                  <span key={region} className={`${baseClasses} ${colorClasses}`}>
                    {region}
                  </span>
                );
              }
            )}
          </div>
          <p className="mt-6 text-xs sm:text-sm text-[#6b4e45] max-w-3xl mx-auto">
            Our​‍​‌‍​‍‌​‍​‌‍​‍‌ luxury Indian wedding decorations, stage, and reception décor services are available to clients all over the country. 
          </p>
        </div>
      </motion.section>

      {/* PORTFOLIO STRIP */}
      <motion.section
        id="portfolio-strip"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-16 lg:py-20 bg-[#fdf6fa]"
      >
        <div className="max-w-6xl mx-auto px-4 lg:px-6 text-center">
          <h2 className={`${deco.className} text-2xl sm:text-3xl text-[#2c1c17] mb-8`}>
            Our Wedding Stage Decor Portfolio
          </h2>
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            {[
              "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/3405875/pexels-photo-3405875.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/169203/pexels-photo-169203.jpeg?auto=compress&cs=tinysrgb&w=800",
            ].map((src) => (
              <motion.div
                key={src}
                whileHover={{ scale: 1.03 }}
                className="overflow-hidden rounded-3xl bg-gray-100"
              >
                <div
                  className="h-44 sm:h-52 bg-cover bg-center"
                  style={{ backgroundImage: `url(${src})` }}
                />
              </motion.div>
            ))}
          </div>
          <a
            href="/portfolio"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-medium tracking-wide text-[#96034f] shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:bg-[#fdf2f8] transition-colors"
          >
            View Full Portfolio
          </a>
        </div>
      </motion.section>

      {/* TESTIMONIALS */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-16 lg:py-20 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <motion.div
            variants={fadeUp}
            className="text-center mb-10 space-y-3"
          >
            <h2 className={`${deco.className} text-2xl sm:text-3xl text-[#2c1c17]`}>
              What Couples Say About Our Wedding Decor
            </h2>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-3"
          >
            {[
              {
                quote:
                  "Our wedding stage was absolutely breathtaking. Every detail felt personal and so thoughtfully done.",
                name: "Priya & Raj",
                location: "New Jersey",
              },
              {
                quote:
                  "From consultation to reception, the decor transformed our venue into a fairytale. We still get compliments!",
                name: "Anjali & Sameer",
                location: "Atlanta, Georgia",
              },
              {
                quote:
                  "Creative, organized and a joy to work with. They captured our style and made the space feel magical.",
                name: "Sara & David",
                location: "New York",
              },
            ].map((item) => (
              <motion.div
                key={item.name}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="rounded-3xl border border-[#f3d4e5] bg-[#fff9fd] p-6 flex flex-col gap-3 shadow-[0_16px_35px_rgba(0,0,0,0.04)]"
              >
                <p className="text-[#f3a93a] text-sm">★★★★★</p>
                <p className="text-sm text-[#3a2620]">{item.quote}</p>
                <p className="text-xs text-[#6b4e45]">
                  - {item.name}, {item.location}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-16 lg:py-20 bg-[#fdf6fa]"
      >
        <div className="max-w-4xl mx-auto px-4 lg:px-6">
          <h2
            className={`${deco.className} text-2xl sm:text-3xl text-center text-[#2c1c17] mb-8`}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={item.question}
                  className="overflow-hidden rounded-2xl bg-white border border-[#f3d4e5]"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaqIndex(isOpen ? -1 : index)
                    }
                    className="w-full flex items-center justify-between px-4 py-3 text-left text-sm text-[#2c1c17]"
                  >
                    <span>{item.question}</span>
                    <span className="text-lg text-[#96034f]">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-[#4e3b36]">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* FINAL CTA */}
      <motion.section
        id="consultation-cta"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-16 lg:py-20 bg-gradient-to-b from-[#fff8fc] via-white to-white"
      >
        <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
          <h2
            className={`${deco.className} text-2xl sm:text-3xl text-[#2c1c17] mb-3`}
          >
            Let&apos;s Design a Wedding Stage That Wows Your Guests
          </h2>
          <p className="text-sm sm:text-base text-[#4e3b36] mb-6 max-w-2xl mx-auto">
            By combining our luxury Indian wedding stage decoration services,
            your celebration becomes not only unforgettable, but also fabulous.
          </p>
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/contact-us"
              className="inline-flex items-center justify-center rounded-full bg-[#ff4f88] px-7 py-2.5 text-sm font-medium tracking-wide text-white shadow-[0_16px_40px_rgba(255,79,136,0.45)] hover:bg-[#e63c74] transition-transform transition-colors hover:-translate-y-0.5"
            >
              Book a Free Consultation
            </a>
            {/* <span className="text-[11px] uppercase tracking-[0.18em] text-[#6b4e45]">
              Response within 1–2 business days
            </span> */}
          </div>
        </div>
      </motion.section>

      {/* FOOTER (Existing Component) */}
      <Footer />
    </div>
  );
}
