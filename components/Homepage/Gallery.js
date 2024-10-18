import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { deco } from '@/app/layout';

const Gallery = () => {
    const images = [
        {
            id: 1,
            src: '/assets/gallery1.jpg',
        },
        {
            id: 2,
            src: '/assets/gallery2.jpg',
        },
        {
            id: 3,
            src: '/assets/gallery8.jpg',
        },
        {
            id: 4,
            src: '/assets/gallery4.jpg',
        },
        {
            id: 5,
            src: '/assets/gallery5.jpg',
        },
        {
            id: 6,
            src: '/assets/gallery6.jpg',
        },
        {
            id: 7,
            src: '/assets/gallery7.jpg',
        },
        {
            id: 8,
            src: '/assets/gallery3.jpg',
        },
    ]

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
                <div className='grid lg:grid-cols-4 grid-cols-2 gap-5'>
                    {images.map((item) => (
                        <div className='lg:h-[400px] h-[300px] w-full overflow-hidden rounded-[12px]' key={item.id}>
                            <motion.img
                                src={item.src}
                                alt={item.id}
                                className='lg:h-[400px] h-[300px] w-full rounded-[12px] object-cover'
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 40 }}
                            />
                        </div>
                    ))}
                </div>
            </motion.div>
        </>
    )
}

export default Gallery
