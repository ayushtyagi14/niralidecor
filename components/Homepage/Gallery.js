import React from 'react';
import { motion } from 'framer-motion';
import { deco } from '@/app/layout';
import { useRouter } from 'next/navigation';

const Gallery = ({ mediaItems }) => {
    const router = useRouter();

    return (
        <>
            <motion.div
                className='flex flex-col w-full py-5'
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className={`uppercase font-extrabold lg:text-[78px] text-[58px] text-[#96034f] text-center`}>
                    The Magic is in the Details.
                </h1>
                <p className='text-end mr-10 italic'>
                    - Walt Disney
                </p>
            </motion.div>

            <motion.div
                className='mb-16 mt-12 lg:w-[75%] w-[90%] mx-auto'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-2 auto-rows-[300px]">
                    {mediaItems && mediaItems.map((item) => (
                        <div
                            key={item?.id}
                            className="overflow-hidden rounded-[12px] relative group cursor-pointer"
                            onClick={() => router.push('https://www.instagram.com/niralidecor')}
                        >
                            <motion.img
                                src={item?.mediaUrl}
                                alt={`Gallery item ${item?.id}`}
                                className="w-full h-[300px] object-cover rounded-[12px] transition-transform duration-500 group-hover:scale-105"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 40 }}
                            />
                            {/* Background overlay layer */}
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-[12px]"></div>

                            {/* Text layer with hover effect */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="text-white text-center flex flex-row items-center gap-2"> <img src="/assets/instagram-white.png" alt="instagram-new--v1" /> Instagram:</div>
                                <h1 className="text-white text-center lg:text-[28px] mt-2 tracking-wider">
                                    @niralidecor
                                </h1>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </>
    );
};

export default Gallery;
