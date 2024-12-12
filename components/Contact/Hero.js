import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ mediaUrl }) => {
    return (
        <div
            className="relative bg-cover bg-bottom object-cover h-[60vh]"
            style={{ backgroundImage: `url(${mediaUrl})` }}
            loading="lazy"
        >
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
