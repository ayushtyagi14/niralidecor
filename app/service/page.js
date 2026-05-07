"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Homepage/Contact";
import Explore from '@/components/ServicePage/Explore';
import dynamic from 'next/dynamic';
import Image from "next/image";
import Supabase from "@/lib/supabase";
import { deco } from "@/lib/fonts";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Gallery = dynamic(() => import('@/components/ServicePage/Gallery'));

const IconCheck = () => (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="8" /><path d="M6.5 10.5l2.2 2.3L13.5 8" /></svg>
);

const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
    initial: {},
    whileInView: {
        transition: {
            staggerChildren: 0.15
        }
    }
};

const serviceData = {
    title: "Your Dream Wedding Comes to Life",
    description: "Experience the elegance and grandeur of your special day with our meticulously designed wedding decor. We create a timeless atmosphere with stunning floral arrangements, luxurious drapery, and soft lighting that captures the essence of your love story. Let us transform your venue into a breathtaking celebration of your union.",
    intro: "The wedding stage is the heart of your celebration. At Nirali Decor, we blend tradition with contemporary luxury to create stages that are as unique as your love story. Whether it's a grand royal mandap or a sleek, modern reception backdrop, every detail is crafted to perfection.",
};

const stats = [
    { label: "Indian Wedding Decorators", value: "Expert Stylists" },
    { label: "500+ Weddings Styled", value: "Proven Excellence" },
    { label: "Award Winning Designs", value: "Featured Industry Leaders" }
];

const specializations = [
    {
        title: "Indian Wedding Stage Decoration",
        desc: "Mandap & pheras stage design with floral, fabric & crystal backdrops. Traditional and contemporary styles tailored to your vision.",
        img: "/assets/indian-wedding-stage-decoration.jpg"
    },
    {
        title: "Reception Stage Decoration",
        desc: "Luxury concepts with LED walls, floral arches, and statement props. Elegant seating for the couple that makes a grand statement.",
        img: "/assets/reception-stage-decoration.jpg"
    },
    {
        title: "Custom Wedding Decor Themes",
        desc: "From Royal and Floral to Minimalist and Modern. Color-coordinated Indian wedding decoration designed for a unique atmosphere.",
        img: "/assets/custom-wedding-decor-themes.jpg"
    }
];

const processSteps = [
    { title: "Consultation", desc: "Understand your vision & rituals." },
    { title: "Design", desc: "Custom 3D concepts & mood boards." },
    { title: "Planning", desc: "Venue coordination & logistics." },
    { title: "Execution", desc: "Flawless setup on the wedding day." },
    { title: "Final Touches", desc: "Perfection in every detail." }
];

const fallbackReviews = [
    { review: "Our wedding stage was absolutely breathtaking. Every detail felt personal and so thoughtfully done.", name: "Priya & Raj", location: "New Jersey", mediaUrl: "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { review: "From consultation to reception, the decor transformed our venue into a fairytale. We still get compliments!", name: "Anjali & Sameer", location: "Atlanta, Georgia", mediaUrl: "https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { review: "Creative, organized and a joy to work with. They captured our style and made the space feel magical.", name: "Sara & David", location: "New York", mediaUrl: "https://images.pexels.com/photos/169203/pexels-photo-169203.jpeg?auto=compress&cs=tinysrgb&w=200" }
];

const regions = ["New York", "Atlanta, Georgia", "New Jersey", "Connecticut", "Maryland", "North Carolina", "South Carolina", "Tennessee", "Virginia", "Florida", "Delaware", "Alabama", "Boston, Massachusetts", "Pennsylvania", "Ohio"];

const galleryItems = [
    { id: 1, mediaUrl: "/assets/image-left.jpg" },
    { id: 2, mediaUrl: "/assets/image-center.jpg" },
    { id: 3, mediaUrl: "/assets/image-right.jpg" }
];

export default function ServicePage() {
    const [reviews, setReviews] = useState(fallbackReviews);
    const router = useRouter();

    useEffect(() => {
        const fetchReviews = async () => {
            const { data, error } = await Supabase
                .from("Reviews")
                .select("id, mediaUrl, name, review")
                .limit(20);

            if (!error && data && data.length > 0) {
                const uniqueReviews = Array.from(
                    new Map(data.map(item => [item.name.trim().toLowerCase(), item])).values()
                );
                setReviews(uniqueReviews.slice(0, 8));
            }
        };
        fetchReviews();
    }, []);

    return (
        <div className="bg-white overflow-x-hidden">
            <Navbar />

            <div className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden bg-black">
                <Image
                    src="/assets/service-banner.jpg"
                    alt="Wedding Decor Banner"
                    fill
                    priority
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black bg-opacity-[0.05] flex items-center justify-center transition-opacity duration-500 hover:bg-opacity-0" />
            </div>

            <div className="lg:w-[75%] w-[90%] mx-auto flex flex-col my-10">
                <motion.h1
                    className={`${deco.className} lg:text-[68px] text-[48px] text-[#96034f] text-center tracking-wide leading-tight`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    Wedding Stage Decorations
                </motion.h1>

                <motion.h2
                    className="lg:text-[26px] md:text-[24px] text-[16px] text-center mb-8 font-light"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {serviceData.title}
                </motion.h2>

                <motion.p
                    className="md:text-[20px] text-center font-light mb-12 text-gray-700 max-w-4xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    {serviceData.description}
                </motion.p>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-[#f3d4e5]"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            className="flex flex-col items-center group transition-transform duration-300 hover:scale-105"
                            variants={fadeIn}
                        >
                            <span className="text-sm uppercase tracking-widest text-[#96034f] font-semibold mb-2 group-hover:text-[#ff4f88] transition-colors">{stat.value}</span>
                            <p className="text-lg text-gray-800 text-center font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <div className="py-24 bg-[#fff9fd]">
                <div className="lg:w-[75%] w-[90%] mx-auto">
                    <motion.div className="text-center mb-16" {...fadeIn}>
                        <h2 className={`${deco.className} lg:text-[48px] text-[30px] text-[#96034f]`}>Our Expertise</h2>
                        <p className="text-lg font-light text-gray-600 italic text-center">Premium Decoration Services Tailored to You</p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                    >
                        {specializations.map((item, i) => (
                            <motion.div
                                key={i}
                                className="relative h-[250px] group rounded-[24px] overflow-hidden shadow-md cursor-pointer"
                                variants={fadeIn}
                                whileHover={{ y: -15, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <img src={item.img} className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-125" alt={item.title} />
                                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center p-6 text-center group-hover:bg-opacity-50 transition-all duration-700">
                                    <h3 className={`${deco.className} text-white text-2xl font-bold mb-2 transform group-hover:scale-110 transition-transform duration-500 uppercase`}>{item.title}</h3>
                                    <p className="text-white text-xs font-light opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className="py-24 lg:w-[75%] w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div {...fadeIn}>
                    <h2 className={`${deco.className} lg:text-[48px] text-[30px] text-[#96034f] mb-6`}>Crafting Your Vision</h2>
                    <p className="text-lg font-light leading-relaxed mb-6 text-gray-800">
                        {serviceData.intro}
                    </p>
                    <div className="space-y-4">
                        {["Customized mandap & backdrop designs", "Fresh & premium floral arrangements", "Seamless coordination with venues"].map((check, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 text-gray-700 font-medium hover:translate-x-3 transition-transform duration-300 cursor-default"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 * i }}
                            >
                                <span className="p-1 bg-[#96034f] text-white rounded-full shadow-lg"><IconCheck /></span>
                                {check}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
                <div className="relative group overflow-hidden rounded-[24px]">
                    <motion.img
                        src="/assets/crafting-your-vision.jpg"
                        className="rounded-[24px] shadow-2xl w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        alt="Vision"
                        {...fadeIn}
                    />
                    <motion.div
                        className="absolute -bottom-6 -left-6 bg-[#fed9fe] p-8 rounded-[24px] hidden lg:block shadow-xl border border-white"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <p className={`${deco.className} text-[#96034f] text-2xl`}>500+ Events Perfectly Styled</p>
                    </motion.div>
                </div>
            </div>

            <div className="pb-24 pt-4 bg-white">
                <div className="lg:w-[75%] w-[90%] mx-auto text-center">
                    <motion.h2 className={`${deco.className} lg:text-[48px] text-[30px] text-[#96034f] mb-16`} {...fadeIn}>Our Seamless Process</motion.h2>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-8"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                    >
                        {processSteps.map((s, i) => (
                            <motion.div
                                key={i}
                                className="relative py-10 px-4 rounded-[30px] bg-[#fff6fb] border border-[#f4c7ff]/30 text-center group h-full flex flex-col items-center"
                                whileHover={{ y: -10 }}
                                {...fadeIn}
                            >
                                <span className="inline-block px-4 py-1 rounded-full bg-[#96034f]/5 text-[#96034f] text-[10px] uppercase tracking-[0.2em] mb-6 font-semibold">Step {i + 1}</span>
                                <h3 className={`${deco.className} text-[18px] md:text-lg text-[#96034f] mb-4 uppercase tracking-[0.1em] px-2 leading-tight`}>{s.title}</h3>
                                <p className="text-gray-500 font-light text-[13px] md:text-sm italic leading-relaxed px-2">{s.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className="py-24 bg-[#fff9fd] border-y border-[#f3d4e5]">
                <div className="lg:w-[75%] w-[90%] mx-auto text-center">
                    <motion.h2 className={`${deco.className} lg:text-[48px] text-[30px] text-[#96034f] mb-8`} {...fadeIn}>Regions We Serve</motion.h2>
                    <motion.div
                        className="flex flex-wrap justify-center gap-3"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                    >
                        {regions.map((region, i) => (
                            <motion.span
                                key={i}
                                className="px-5 py-2.5 rounded-full border border-[#f3d4e5] bg-white text-sm text-gray-700 shadow-sm cursor-default"
                                variants={fadeIn}
                                whileHover={{ scale: 1.1, backgroundColor: "#fef1f7", color: "#96034f", border: "1px solid #96034f" }}
                            >
                                {region}
                            </motion.span>
                        ))}
                    </motion.div>
                    <motion.p className="mt-10 text-gray-500 font-light max-w-2xl mx-auto italic text-center" {...fadeIn}>
                        Based in New Jersey & Atlanta, we style weddings across the East Coast and select destination locations.
                    </motion.p>
                </div>
            </div>

            <div className="py-10">
                <Gallery mediaItems={galleryItems} />
            </div>

            <div className="pb-24 pt-4 bg-[#fff9fd] border-y border-[#f3d4e5]">
                <div className="lg:w-[85%] w-[95%] mx-auto">
                    <motion.div className="text-center mb-16" {...fadeIn}>
                        <h2 className={`${deco.className} lg:text-[48px] text-[30px] text-[#96034f] mb-4`}>Voices of Delight</h2>
                        <p className="text-gray-500 font-light tracking-widest uppercase text-xs">Stories from Our Couples</p>
                    </motion.div>

                    <div className="testimonial-swiper-container relative px-4">
                        <Swiper
                            modules={[Pagination, Autoplay, Navigation]}
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation={{
                                prevEl: '.prev-btn',
                                nextEl: '.next-btn',
                            }}
                            pagination={{ clickable: true, dynamicBullets: true }}
                            autoplay={{ delay: 6000, disableOnInteraction: false }}
                            breakpoints={{
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            className="pb-16"
                        >
                            {reviews.map((rev, i) => (
                                <SwiperSlide key={rev.id || i} className="h-full">
                                    <motion.div
                                        className="bg-white p-8 rounded-[30px] shadow-sm border border-[#f3d4e5] h-[450px] flex flex-col relative group hover:shadow-md transition-all duration-500"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <div className="absolute top-6 right-8 text-[#96034f]/10 group-hover:text-[#96034f]/20 transition-colors">
                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H12.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H7.017C6.46472 8 6.017 8.44772 6.017 9V12C6.017 12.5523 5.56926 13 5.017 13H3.017V21H5.017Z" />
                                            </svg>
                                        </div>

                                        <div className="flex items-center mb-8">
                                            <div className="relative w-16 h-16 mr-4">
                                                <img
                                                    src={rev.mediaUrl}
                                                    className="w-full h-full rounded-full object-cover border-2 border-[#96034f]/10 p-1"
                                                    alt={rev.name}
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-gray-900 font-bold text-sm tracking-widest uppercase">{rev.name}</h4>
                                                <div className="flex text-amber-400 text-xs mt-1">
                                                    {"★".repeat(5)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                            <p className="text-gray-600 font-light leading-relaxed italic text-[15px]">
                                                &quot;{rev.review}&quot;
                                            </p>
                                        </div>
                                    </motion.div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className="flex justify-center gap-6 mt-4">
                            <button className="prev-btn w-12 h-12 rounded-full border border-[#f3d4e5] flex items-center justify-center text-[#96034f] hover:bg-[#96034f] hover:text-white transition-all duration-300 shadow-sm cursor-pointer">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button className="next-btn w-12 h-12 rounded-full border border-[#f3d4e5] flex items-center justify-center text-[#96034f] hover:bg-[#96034f] hover:text-white transition-all duration-300 shadow-sm cursor-pointer">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <div className="py-24 bg-[#fff9fd] border-t border-[#f3d4e5]">
                <div className="lg:w-[75%] w-[90%] mx-auto">
                    <motion.h2 className={`${deco.className} lg:text-[40px] text-[30px] text-center text-[#96034f] mb-12`} {...fadeIn}>Explore Our Other Services</motion.h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: 'Wedding', url: '/service/wedding', img: '/assets/wedding-service.jpg' },
                            { name: 'Reception', url: '/service/reception', img: '/assets/reception-service.jpg' },
                            { name: 'Vidhi & Haldi', url: '/service/vidhi-and-haldi', img: '/assets/vidhi-and-haldi.jpg' },
                            { name: 'Centerpiece', url: '/service/centerpiece', img: '/assets/centerpiece-service.jpg' },
                        ].map((s, i) => (
                            <Link href={s.url} key={i}>
                                <motion.div
                                    className="group cursor-pointer"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="h-[220px] overflow-hidden rounded-[20px] mb-4 shadow-sm">
                                        <img src={s.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={s.name} />
                                    </div>
                                    <h4 className={`${deco.className} text-center text-gray-700 group-hover:text-[#96034f] transition-colors uppercase text-sm tracking-widest`}>
                                        {s.name}
                                    </h4>
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    <div className="flex justify-center mt-12 pb-10">
                        <Link href="/portfolio" className="w-full flex justify-center">
                            <button
                                className="border-2 rounded-[12px] py-3 px-10 border-[#96034f] hover:bg-[#96034f] hover:text-white text-[#96034f] transition-all duration-500 w-[80%] md:w-[40%] font-medium uppercase tracking-widest text-sm"
                            >
                                View Full Portfolio
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <Contact />
            <Footer />

            <style jsx global>{`
                .italic { font-style: italic; }
                .testimonial-swiper-container .swiper-pagination-bullet-active {
                    background: #96034f !important;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #96034f20;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #96034f40;
                }
            `}</style>
        </div>
    );
}
