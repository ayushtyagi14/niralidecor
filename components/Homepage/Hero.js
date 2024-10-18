import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    // Function to scroll down when the button is clicked
    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight, // Scrolls down by one viewport height
            behavior: 'smooth' // Smooth scrolling effect
        });
    };

    return (
        <div className="relative bg-cover bg-center object-cover h-[90vh] lg:min-h-screen" style={{ backgroundImage: 'url(/assets/hero-img.jpg)' }}>
            <div className="absolute inset-0 bg-black bg-opacity-[0.4] flex flex-col items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center text-white px-4 md:w-[60%] mx-auto"
                >
                    {/* Any optional content goes here */}
                </motion.div>

                {/* Arrow Button */}
                <div
                    className="absolute lg:block hidden bottom-12 left-[47%] 2xl:left-[49%] cursor-pointer"
                    onClick={scrollToContent}
                >
                    <img src="/assets/arrow-down.png" alt="arrow" className="scroll" />
                </div>
            </div>
        </div>
    );
};

export default Hero;
