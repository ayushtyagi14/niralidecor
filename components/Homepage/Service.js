import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { deco } from '@/app/layout';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Service = ({ floralUrl, centerpieceUrl, customDesignUrl, stageSetupUrl }) => {
    const router = useRouter();

    return (
        <motion.div
            className='mt-24 lg:w-[75%] w-[90%] mx-auto'
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
                    Our Expertise, Your Moment
                </h1>
                <p className='lg:text-[18px] text-center'>
                    From Concept to Execution, We Make It Happen
                </p>
            </motion.div>

            <div className='grid grid-cols-2 grid-rows-2 gap-2 lg:gap-10 mt-10'>
                {/* Horizontal Image */}
                <motion.div
                    className='relative row-span-1 col-span-1 h-[250px] group'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Image
                        src={floralUrl}  // Use Image component from Next.js
                        alt="Nirali Decor"
                        className='object-cover w-full h-full rounded-[24px]'
                        fill
                        blurDataURL={`${floralUrl}?w=10&h=10&fit=crop`}  // Small version of the image for the blur effect
                        placeholder="blur"  // Use blur effect while loading
                        loading="lazy"
                    />
                    <div className='absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-500 rounded-[24px] flex items-center justify-center hover:cursor-pointer'>
                        <h1 className={`${deco.className} text-white text-center lg:text-[32px] font-bold`}>
                            Floral Decoration
                        </h1>
                    </div>
                </motion.div>

                {/* Vertical Video */}
                <motion.div
                    className='relative row-span-1 col-span-1 h-[450px] group'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className='object-cover w-full h-full rounded-[24px]'
                    >
                        {centerpieceUrl ? (
                            <source
                                src={centerpieceUrl}
                                type={
                                    centerpieceUrl.endsWith('.mp4')
                                        ? 'video/mp4'
                                        : centerpieceUrl.endsWith('.mov')
                                            ? 'video/quicktime'
                                            : 'video/mp4' // Default to mp4 if unknown
                                }
                            />
                        ) : (
                            <p>Loading video...</p> // Fallback if the URL is not available
                        )}
                    </video>
                    <div className='absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-500 rounded-[24px] flex items-center justify-center hover:cursor-pointer'>
                        <h1 className={`${deco.className} text-white text-center lg:text-[32px] font-bold`}>
                            Centerpieces
                        </h1>
                    </div>
                </motion.div>

                {/* Vertical Image */}
                <motion.div
                    className='relative row-span-2 col-span-1 h-[450px] -mt-[12.4rem] group'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Image
                        src={customDesignUrl}  // Use Image component from Next.js
                        alt="Nirali Decor"
                        className='object-cover w-full h-full rounded-[24px]'
                        fill
                        blurDataURL={`${customDesignUrl}?w=10&h=10&fit=crop`}  // Small version of the image for the blur effect
                        placeholder="blur"  // Use blur effect while loading
                        loading="lazy"
                    />
                    <div className='absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-500 rounded-[24px] flex items-center justify-center hover:cursor-pointer'>
                        <h1 className={`${deco.className} text-white text-center lg:text-[32px] font-bold`}>
                            Custom Design
                        </h1>
                    </div>
                </motion.div>

                {/* Horizontal Image */}
                <motion.div
                    className='relative row-span-2 col-span-1 h-[250px] group'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Image
                        src={stageSetupUrl}  // Use Image component from Next.js
                        alt="Nirali Decor"
                        className='object-cover w-full h-full rounded-[24px]'
                        fill
                        blurDataURL={`${stageSetupUrl}?w=10&h=10&fit=crop`}  // Small version of the image for the blur effect
                        placeholder="blur"  // Use blur effect while loading
                        loading="lazy"
                    />
                    <div className='absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-500 rounded-[24px] flex items-center justify-center hover:cursor-pointer'>
                        <h1 className={`${deco.className} text-white text-center lg:text-[32px] font-bold`}>
                            Stage Setup
                        </h1>
                    </div>
                </motion.div>

                <button
                    className='border-2 rounded-[12px] py-2 border-[#96034f] hover:bg-[#96034f] hover:text-white text-[#96034f] transition-all duration-500 mx-auto w-[35%] row-span-1 col-span-2 lg:-mt-[13rem] -mt-[10rem] mb-[13rem]'
                    onClick={() => router.push('/portfolio')}
                >
                    Our Portfolio
                </button>
            </div>
        </motion.div>
    );
};

export default Service;
