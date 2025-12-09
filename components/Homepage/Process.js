import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { deco } from '@/lib/fonts';

const Process = () => {
    return (
        <motion.div
            className='mb-16 -mt-32 lg:w-[75%] w-[90%] mx-auto'
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
                    The Art Behind the Magic
                </h1>
                <p className='lg:text-[18px] text-center'>
                    Step-by-Step Guide to Planning Your Event
                </p>
            </motion.div>

            <motion.div
                className='mt-16 flex flex-col items-center gap-10'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.div
                    className='grid lg:grid-cols-2 grid-cols-1 gap-10'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <img src="/assets/consultation.webp" alt="consultation" className='rounded-[8px] lg:block hidden' />
                    <div className='flex flex-col justify-between h-[95%] my-auto'>
                        <h1 className={`${deco.className} text-[52px] text-[#96034f]`}>01</h1>
                        <h1 className={`text-[24px] text-[#96034f] uppercase`}>Consultation</h1>
                        <p className='font-light'>
                            Sagittis adipiscing quis elementum turpis egestas pellentesque libero faucibus. Lectus ullamcorper porttitor sit molestie lectus in. Auctor donec interdum etiam potenti blandit interdum a posuere.Lorem ipsum dolor sit amet consectetur. Egestas odio nisl etiam orci nibh ut quis.
                        </p>
                    </div>
                    <img src="/assets/consultation.webp" alt="consultation" className='rounded-[8px] lg:hidden block' />
                </motion.div>

                <motion.div
                    className='grid lg:grid-cols-2 grid-cols-1 gap-10'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className='flex flex-col justify-between h-[95%] my-auto'>
                        <h1 className={`${deco.className} text-[52px] text-[#96034f]`}>02</h1>
                        <h1 className={`text-[24px] text-[#96034f] uppercase`}>Design & Planning</h1>
                        <p className='font-light'>
                            Sagittis adipiscing quis elementum turpis egestas pellentesque libero faucibus. Lectus ullamcorper porttitor sit molestie lectus in. Auctor donec interdum etiam potenti blandit interdum a posuere.Lorem ipsum dolor sit amet consectetur. Egestas odio nisl etiam orci nibh ut quis.
                        </p>
                    </div>
                    <img src="/assets/design.webp" alt="consultation" className='rounded-[8px]' />
                </motion.div>

                <motion.div
                    className='grid lg:grid-cols-2 grid-cols-1 gap-10'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <img src="/assets/venue.webp" alt="consultation" className='rounded-[8px] lg:block hidden' />
                    <div className='flex flex-col justify-between h-[95%] my-auto'>
                        <h1 className={`${deco.className} text-[52px] text-[#96034f]`}>03</h1>
                        <h1 className={`text-[24px] text-[#96034f] uppercase`}>Venue Selection</h1>
                        <p className='font-light'>
                            Sagittis adipiscing quis elementum turpis egestas pellentesque libero faucibus. Lectus ullamcorper porttitor sit molestie lectus in. Auctor donec interdum etiam potenti blandit interdum a posuere.Lorem ipsum dolor sit amet consectetur. Egestas odio nisl etiam orci nibh ut quis.
                        </p>
                    </div>
                    <img src="/assets/venue.webp" alt="consultation" className='rounded-[8px] lg:hidden block' />
                </motion.div>

                <motion.div
                    className='grid lg:grid-cols-2 grid-cols-1 gap-10'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className='flex flex-col justify-between h-[95%] my-auto'>
                        <h1 className={`${deco.className} text-[52px] text-[#96034f]`}>04</h1>
                        <h1 className={`text-[24px] text-[#96034f] uppercase`}>Theme Development</h1>
                        <p className='font-light'>
                            Sagittis adipiscing quis elementum turpis egestas pellentesque libero faucibus. Lectus ullamcorper porttitor sit molestie lectus in. Auctor donec interdum etiam potenti blandit interdum a posuere.Lorem ipsum dolor sit amet consectetur. Egestas odio nisl etiam orci nibh ut quis.
                        </p>
                    </div>
                    <img src="/assets/theme.avif" alt="consultation" className='rounded-[8px]' />
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default Process
