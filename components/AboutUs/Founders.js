import React from 'react'
import { motion } from 'framer-motion';
import { deco } from '@/app/layout';

const Founders = ({ founderUrl }) => {
    return (
        <motion.div
            className='mb-16 mt-10 lg:w-[75%] w-[90%] mx-auto'
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
                <h1 className={`${deco.className} lg:text-[68px] text-[48px] text-center text-[#96034f]`}>
                    Meet Our Team
                </h1>
                <p className='lg:text-[26px] md:text-[24px] text-[16px] text-center'>
                    From The Founders
                </p>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 mt-12 items-stretch"
            >
                <motion.img src={founderUrl} alt="Nirali Decor Founders" className="rounded-[24px] shadow-xl h-full" />
                <motion.div
                    className="flex flex-col h-full justify-between font-light"
                >
                    <p>
                        Since its establishment in 2011, Nirali Decor has been driven by a passion for turning dream celebrations into unforgettable experiences. Our journey began with a vision to redefine wedding and event decor by blending tradition, elegance, and innovation. Over the years, we have had the honor of bringing countless visions to life, from intimate ceremonies to grand celebrations, each crafted with an unwavering attention to detail.
                    </p>
                    <p>
                        As founders, our inspiration comes from the joy and smiles we see on our clients&apos; faces. We believe that the beauty of a celebration lies in the little details and the magic that happens when every element comes together perfectly. Our talented team is dedicated to creating decor that reflects the heart of your story, while elevating your special moments into memories that last a lifetime.
                    </p>
                    <p>
                        Thank you for entrusting us to be a part of your journey. We are excited to continue crafting meaningful celebrations with love, passion, and the artistry that defines Nirali Decor.
                    </p>
                </motion.div>
            </motion.div>

        </motion.div>
    )
}

export default Founders
