import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { deco } from '@/app/layout';

const AboutUs = () => {
    return (
        <motion.div
            className='my-16 lg:w-[75%] w-[90%] mx-auto'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                className='flex flex-col items-center'
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className={`${deco.className} lg:text-[48px] text-[30px] text-center text-[#96034f]`}>
                    The Art of Celebration
                </h1>
                <p className='lg:text-[18px] text-center'>
                    A Journey of Elegance, Passion, and Artistry
                </p>
            </motion.div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 my-8 font-light'>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    At Nirali Decor, we turn celebrations into unforgettable experiences, blending creativity, elegance, and meticulous detail to create magical settings. Our passion lies in crafting events that reflect the unique stories and dreams of our clients.
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Guided by a commitment to excellence, our team brings years of expertise in designing and executing events that captivate and inspire. From intimate gatherings to grand celebrations, we ensure that every detail is flawlessly planned.
                </motion.p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 mt-10 gap-10 items-center font-light'>
                <motion.img
                    src="/assets/about1.jpg"
                    alt="About Nirali Decor"
                    className='rounded-[24px] h-[450px] shadow-lg'
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                />
                <motion.div
                    className='flex flex-col lg:h-[90%] lg:justify-between gap-6 lg:gap-0'
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p>
                        Every love story is unique, and at Nirali Decor, we take pride in curating celebrations that beautifully capture the essence of each couple&apos;s journey. From our first meeting to the final flourish, we work closely with you to bring your vision to life, blending elegance, charm, and personal touches that make your day truly special. Our team carefully designs every detail, from the floral arrangements to the lighting, ensuring the atmosphere radiates with love, joy, and sophistication. With a passion for creating unforgettable moments, we aim to transform your celebration into a cherished memory that you and your loved ones will treasure forever.
                    </p>
                    <div className='grid grid-cols-2 gap-5'>
                        <button
                            className='border-2 rounded-[12px] py-2 border-[#96034f] hover:bg-[#96034f] hover:text-white text-[#96034f] transition-all duration-500'
                        >
                            Learn More
                        </button>
                        <button
                            className='border-2 rounded-[12px] py-2 border-[#96034f] hover:bg-[#96034f] hover:text-white text-[#96034f] transition-all duration-500'
                        >
                            Contact Us
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AboutUs;
