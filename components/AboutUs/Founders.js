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
                className="grid grid-cols-1 lg:grid-cols-2 mt-12 gap-20"
            >
                <motion.img src={founderUrl} alt="Nirali Decor Founders" className="rounded-[24px] shadow-xl" />
                <motion.div
                    className="flex flex-col h-full justify-between font-light gap-4"
                >
                    <h1 className='text-[24px] font-medium'>
                        Hello! Namaste! Kemcho!
                    </h1>

                    <p>
                        We are Nirali & Pradip, founders of Nirali Decor.
                    </p>
                    <p>
                        In 2011, we started this business from scratch and have built it since from ground up.
                    </p>
                    <p>

                        Nirali has a background of Paralegal but always had the creative interest in designing and has always loved playing with colors. Initially she thought she would go into clothing design but came across this opportunity beforehand. Pradip has a background of auto technician and has always been good with building things.
                    </p>
                    <p>
                        Pradip is a dreamer by his nature. Nirali is practical by her nature. Both  visionary and have one philosophy- If you are going to do something, do it full whole heartedly.
                    </p>
                    <p>
                        Like many entrepreneurs, we faced countless challenges. We didn&apos;t have a blueprint, but we had grit, creativity, and the unwavering belief that we could build something that would make a difference.
                    </p>
                    <p>
                        There were moments of doubt, countless sleepless nights, and plenty of lessons learned the hard way. But through it all, our commitment to creating something meaningful  kept us moving forward.
                    </p>
                    <p>
                        Overtime, we have grown professionally and personally to withstand any challenges that may arise.
                    </p>
                    <p>
                        Today, we&apos;re proud of what we&apos;ve built over the years, but we know this is just the beginning of a much larger journey. Our story is a testament to the power of persistence, innovation, and the courage to take the first step—even when the path ahead isn&apos;t clear.
                    </p>
                    <p>
                        We are forever greatfull for all the past clients who have given us that one chance and put their trust in us. We will continue forward with the same grit and passion for our future clients as well!
                    </p>
                </motion.div>
            </motion.div>

        </motion.div>
    )
}

export default Founders
