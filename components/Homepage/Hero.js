import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = ({ bannerUrl }) => {
    const [videoLoaded, setVideoLoaded] = useState(false);

    // Function to scroll down when the button is clicked
    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight, // Scrolls down by one viewport height
            behavior: 'smooth' // Smooth scrolling effect
        });
    };

    useEffect(() => {
        // Optional: Lazy load the video by setting loaded state
        const timer = setTimeout(() => setVideoLoaded(true), 500); // Delay to improve initial load
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative h-[90vh] lg:min-h-screen overflow-hidden">
            {/* Video Background with fallback poster and preloading */}
            {videoLoaded && (
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={bannerUrl} // Use a compressed and optimized version
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onLoadedData={() => setVideoLoaded(true)}
                ></video>
            )}

            {/* Overlay and Content */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center text-white px-4 md:w-[60%] mx-auto"
                >
                    {/* Optional Content */}
                </motion.div>

                {/* Arrow Button */}
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
