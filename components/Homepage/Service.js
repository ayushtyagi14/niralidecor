import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { deco } from '@/app/layout';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Service = ({ floralUrl, centerpieceUrl, customDesignUrl, stageSetupUrl }) => {
    const router = useRouter();

    // Helper function to determine if URL is an image
    const isImage = (url) => url?.match(/\.(jpg|jpeg|png|gif|webp)$/i);

    // Helper function to determine if URL is a video
    const isVideo = (url) => url?.match(/\.(mp4|mov|avi|webm)$/i);

    // Render media (image or video) dynamically
    const renderMedia = (url, altText) => {
        if (isImage(url)) {
            return (
                <Image
                    src={url}
                    alt={altText}
                    className="object-cover w-full h-full rounded-[24px]"
                    fill
                    blurDataURL={`${url}?w=10&h=10&fit=crop`}
                    placeholder="blur"
                    loading="lazy"
                />
            );
        } else if (isVideo(url)) {
            return (
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="object-cover w-full h-full rounded-[24px]"
                >
                    <source
                        src={url}
                        type={
                            url.endsWith('.mp4') ? 'video/mp4' :
                                url.endsWith('.mov') ? 'video/quicktime' :
                                    'video/mp4' // Default to mp4 if unknown
                        }
                    />
                    Your browser does not support the video tag.
                </video>
            );
        }
        return null; // Fallback if URL is not valid
    };

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
                {/* Floral Decoration */}
                <motion.div
                    className='relative row-span-1 col-span-1 h-[250px] group'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {renderMedia(floralUrl, "Floral Decoration")}
                    <div className='absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-500 rounded-[24px] flex items-center justify-center hover:cursor-pointer'>
                        <h1 className={`${deco.className} text-white text-center lg:text-[32px] font-bold`}>
                            Floral Decoration
                        </h1>
                    </div>
                </motion.div>

                {/* Centerpieces */}
                <motion.div
                    className='relative row-span-1 col-span-1 h-[450px] group'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {renderMedia(centerpieceUrl, "Centerpieces")}
                    <div className='absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-500 rounded-[24px] flex items-center justify-center hover:cursor-pointer'>
                        <h1 className={`${deco.className} text-white text-center lg:text-[32px] font-bold`}>
                            Centerpieces
                        </h1>
                    </div>
                </motion.div>

                {/* Custom Design */}
                <motion.div
                    className='relative row-span-2 col-span-1 h-[450px] -mt-[12.4rem] group'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {renderMedia(customDesignUrl, "Custom Design")}
                    <div className='absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-500 rounded-[24px] flex items-center justify-center hover:cursor-pointer'>
                        <h1 className={`${deco.className} text-white text-center lg:text-[32px] font-bold`}>
                            Custom Design
                        </h1>
                    </div>
                </motion.div>

                {/* Stage Setup */}
                <motion.div
                    className='relative row-span-2 col-span-1 h-[250px] group'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {renderMedia(stageSetupUrl, "Stage Setup")}
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
