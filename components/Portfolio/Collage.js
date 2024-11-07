import React from 'react';
import { motion } from 'framer-motion';
import { deco } from '@/app/layout';

const Collage = () => {
    return (
        <div>
            {/* Heading Section */}
            <motion.div
                className="flex flex-col items-center mt-24"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className={`${deco.className} lg:text-[48px] text-[30px] text-center text-[#96034f]`}>
                    Our Signature Events
                </h1>
                <p className="lg:text-[18px] text-center">
                    Unveiling our finest celebrations
                </p>
            </motion.div>

            <div className="flex flex-col-reverse gap-4 mt-16 lg:w-[75%] w-[90%] mx-auto">
                {/* Large Bottom Horizontal Image */}
                <motion.div
                    className="relative h-[300px] group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <img
                        src="/assets/centerpiece.jpg"
                        alt="Nirali Decor"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500 flex items-center justify-center hover:cursor-pointer">
                        <h1 className={`${deco.className} text-white text-center lg:text-[32px] font-bold`}>
                            Centerpiece
                        </h1>
                    </div>
                </motion.div>

                {/* Container for Images */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
                    {/* Left Vertical Image */}
                    <motion.div
                        className="relative h-[550px] w-full lg:w-[30%] group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <img
                            src="/assets/wedding.jpg"
                            alt="Nirali Decor"
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500 flex items-center justify-center hover:cursor-pointer">
                            <h1 className={`${deco.className} text-white text-center lg:text-[32px] font-bold`}>
                                Wedding
                            </h1>
                        </div>
                    </motion.div>

                    {/* Middle Container with 2 Horizontal Images */}
                    <div className="flex flex-col gap-4 w-full lg:w-[40%]">
                        {/* Top Horizontal Image */}
                        <motion.div
                            className="relative h-[267px] group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <img
                                src="/assets/sangeet.webp"
                                alt="Nirali Decor"
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500 flex items-center justify-center hover:cursor-pointer">
                                <h1 className={`${deco.className} text-white text-center lg:text-[32px] font-bold`}>
                                    Sangeet / Garba
                                </h1>
                            </div>
                        </motion.div>

                        {/* Bottom Horizontal Image */}
                        <motion.div
                            className="relative h-[267px] group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <img
                                src="/assets/haldi.jpg"
                                alt="Nirali Decor"
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500 flex items-center justify-center hover:cursor-pointer">
                                <h1 className={`${deco.className} text-white text-center lg:text-[32px] font-bold`}>
                                    Vidhi / Haldi
                                </h1>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Vertical Image */}
                    <motion.div
                        className="relative h-[550px] w-full lg:w-[30%] group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <img
                            src="/assets/reception.jpg"
                            alt="Nirali Decor"
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500 flex items-center justify-center hover:cursor-pointer">
                            <h1 className={`${deco.className} text-white text-center lg:text-[32px] font-bold`}>
                                Reception
                            </h1>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Collage;
