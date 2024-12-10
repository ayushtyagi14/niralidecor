import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { deco } from '@/app/layout';
import { useRouter } from 'next/navigation';

const AboutUs = ({ aboutLeftUrl, aboutRightUrl }) => {
    const router = useRouter();

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
                    Your Love Story, Our Decor
                </h1>
                <p className='lg:text-[18px] text-center'>
                    We are thankful you are here and giving us the opportunity to be part of your big day!
                </p>
            </motion.div>

            <div className='grid grid-cols-1 lg:grid-cols-3 my-10 gap-10 items-center font-light'>
                <motion.img
                    src={aboutLeftUrl}
                    alt="About Nirali Decor"
                    className='rounded-[24px] w-[450px] object-cover h-[450px] shadow-lg'
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                />
                <div className='flex flex-col items-center gap-4 h-full justify-between'>
                    <p className='text-center font-medium uppercase'>
                        Little bit on how it all started
                    </p>
                    <p>
                        Nirali Décor was established in 2011 with a simple idea that perhaps couples should have the option to choose and select their wedding décor based on their own needs and preferences.
                    </p>
                    <p>
                        Just like how every love story is unique, your wedding day should reflect just that!
                    </p>
                    <p>
                        Therefore, over the years, we have crafted and collected designs with that in mind.
                    </p>
                    <p>
                        Let us connect and understand how we can assist in crafting your vision!
                    </p>
                </div>
                <motion.img
                    src={aboutRightUrl}
                    alt="About Nirali Decor"
                    className='rounded-[24px] w-[450px] object-cover h-[450px] shadow-lg'
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                />
            </div>
            <div className='grid grid-cols-2 gap-5 lg:w-[70%] mx-auto'>
                <button
                    onClick={() => router.push('/about-us')}
                    className='border-2 rounded-[12px] py-2 border-[#96034f] hover:bg-[#96034f] hover:text-white text-[#96034f] transition-all duration-500'
                >
                    Meet Our Team
                </button>
                <button
                    onClick={() => router.push('/contact-us')}
                    className='border-2 rounded-[12px] py-2 border-[#96034f] hover:bg-[#96034f] hover:text-white text-[#96034f] transition-all duration-500'
                >
                    Connect With Us
                </button>
            </div>
        </motion.div>
    );
};

export default AboutUs;
