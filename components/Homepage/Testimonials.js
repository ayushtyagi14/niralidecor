import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { deco } from '@/app/layout';
import { useRouter } from 'next/navigation';

const Testimonials = ({ reviews }) => {
    const [current, setCurrent] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (!reviews || reviews.length === 0) return; // Ensure reviews exist before starting interval
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
        }, 5000); // Change review every 5 seconds
        return () => clearInterval(interval);
    }, [reviews]);

    if (!reviews || reviews.length === 0) {
        return <p>Loading reviews...</p>; // Fallback if no reviews are available
    }

    return (
        <motion.div
            className='mb-16 -mt-28 w-full max-w-[1800px] mx-auto'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                className='flex flex-col items-center'
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className={`${deco.className} lg:text-[48px] text-[30px] text-center text-[#96034f]`}>
                    Voices of Delight
                </h1>
                <p className='lg:text-[18px] text-center'>
                    Real Stories from Our Happy Clients
                </p>
            </motion.div>

            <motion.div
                className='mt-8 flex flex-col items-center'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <AnimatePresence>
                    <div>
                        <motion.div
                            key={reviews[current].id}
                            className='flex flex-col lg:flex-row items-center p-6 shadow-lg bg-[#fed9fe]'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2 }}
                        >
                            <img
                                src={reviews[current].mediaUrl}
                                alt={reviews[current].name}
                                className='lg:w-[200px] w-full h-[200px] rounded-[12px] object-cover lg:mr-6 mb-4 lg:mb-0'
                            />
                            <div className='text-center lg:text-left'>
                                <p className='text-[#96034f] mb-2 font-light lg:text-center'>
                                    <span className='text-[24px]'>&quot;</span> {reviews[current].review} <span className='text-[24px]'>&quot;</span>
                                </p>
                                <p className='text-gray-600 text-end'>
                                    - {reviews[current].name}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </AnimatePresence>
            </motion.div>

            <button
                className='border-2 rounded-[12px] py-2 border-[#96034f] hover:bg-[#96034f] hover:text-white text-[#96034f] transition-all duration-500 mx-auto w-[35%] row-span-1 col-span-2 mt-10 flex justify-center'
                onClick={() => router.push('/testimonials')}
            >
                Testimonials
            </button>
        </motion.div>
    );
};

export default Testimonials;
