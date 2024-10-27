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
        <div className="relative bg-cover bg-center object-cover h-[80vh]" style={{ backgroundImage: 'url(/assets/testimonials-hero.jpg)' }}>
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
