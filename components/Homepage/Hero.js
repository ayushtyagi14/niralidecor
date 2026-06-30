"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = ({ bannerUrl }) => {
    const imageExtensions = [
        '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.tiff', '.svg', '.heic', '.heif', '.raw', '.cr2', '.nef', '.orf', '.sr2'
    ];

    const isImage = (url) => {
        if (!url || typeof url !== 'string') {
            console.error('Invalid banner URL:', url); // Debug log for invalid URLs
            return false;
        }
        return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
    };

    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
        });
    };

    return (
        <div className="relative h-[90vh] lg:min-h-screen overflow-hidden">
            {isImage(bannerUrl) ? (
                <Image
                    src={bannerUrl}
                    alt="Hero Banner"
                    fill
                    priority
                    className="absolute inset-0 object-cover"
                />
            ) : (
                bannerUrl && (
                    <video
                        className="absolute inset-0 w-full h-full object-cover"
                        src={bannerUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        fetchPriority="high"
                        aria-hidden="true"
                    ></video>
                )
            )}

            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center text-white px-4 md:w-[60%] mx-auto"
                >
                    {/* Optional Content */}
                </motion.div>

                <button
                    className="absolute bottom-12 left-[45%] md:left-[47%] 2xl:left-[49%] cursor-pointer border-none bg-transparent p-0"
                    onClick={scrollToContent}
                    aria-label="Scroll to content"
                >
                    <Image src="/assets/arrow-down.png" alt="Scroll down icon" width={40} height={40} className="scroll" />
                </button>
            </div>
        </div>
    );
};

export default Hero;
