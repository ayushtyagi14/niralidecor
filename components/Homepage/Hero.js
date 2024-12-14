import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = ({ bannerUrl }) => {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const imageExtensions = [
        '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.tiff', '.svg', '.heic', '.heif', '.raw', '.cr2', '.nef', '.orf', '.sr2'
    ];

    const isImage = (url) => {
        return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
    };

    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => setVideoLoaded(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative h-[90vh] lg:min-h-screen overflow-hidden">
            {isImage(bannerUrl) ? (
                <img
                    src={bannerUrl}
                    alt="Hero Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            ) : (
                videoLoaded && (
                    <video
                        className="absolute inset-0 w-full h-full object-cover"
                        src={bannerUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        onLoadedData={() => setVideoLoaded(true)}
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

                <div
                    className="absolute bottom-12 left-[45%] md:left-[47%] 2xl:left-[49%] cursor-pointer"
                    onClick={scrollToContent}
                >
                    <img src="/assets/arrow-down.png" alt="arrow" className="scroll" />
                </div>
            </div>
        </div>
    );
};

export default Hero;
