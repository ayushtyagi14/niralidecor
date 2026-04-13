import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { deco } from '@/lib/fonts';

const Hero = ({ bannerUrl }) => {
    return (
        <div className="relative h-[60vh] w-full overflow-hidden bg-[#fef7ff]">
            {bannerUrl ? (
                <Image
                    src={bannerUrl}
                    alt="About Us Banner"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-r from-[#f4c7ff]/20 to-[#ffe4f3]/20 animate-pulse" />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-[0.4] flex flex-col items-center justify-center">

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center text-white px-4 md:w-[60%] mx-auto"
                >
                    {/* Any optional content goes here */}
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;

