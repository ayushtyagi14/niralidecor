import React from 'react'
import { motion } from 'framer-motion';
import { deco } from '@/lib/fonts';

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
                        Hello!
                    </h1>

                    <p>
                        We are Nirali and Pradip, the founders of Nirali Decor.
                    </p>
                    <p>
                        In 2011, we started this business from the ground up.
                    </p>
                    <p>
                        Nirali has a background in paralegal work but has always had a creative interest in design and a love for playing with colors. Initially, she considered pursuing clothing design, but an opportunity arose while we were planning our wedding decor, which shifted her focus. Pradip, on the other hand, has a background as an automotive mechanical technician and has always excelled in building and fabricating things.
                    </p>
                    <p>
                        Pradip is a dreamer by nature, while Nirali is practical. Both of us are visionaries with a shared philosophy: if you&apos;re going to do something, do it wholeheartedly. As Pradip often says, &quot;Just do the work, and the rest will follow.&quot;
                    </p>
                    <p>
                        Like many entrepreneurs, we faced countless challenges along the way. We didn&apos;t have a blueprint, but we possessed grit, creativity, and an unwavering belief that we could build something that would make a difference.
                    </p>
                    <p>
                        There were moments of doubt, numerous sleepless nights, and many lessons learned the hard way. Yet, our commitment to creating something meaningful kept us moving forward.
                    </p>
                    <p>
                        Over time, we grew both professionally and personally, developing the resilience to withstand any challenges that came our way.
                    </p>
                    <p>
                        Today, we are proud of what we have built over the years, but this is just the beginning of a much larger journey. Our story stands as a testament to the power of persistence, innovation, and the courage to take the first step—even when the path ahead is unclear.
                    </p>
                    <p>
                        We are forever grateful to our family, friends, and our dedicated team who have supported us in building Nirali Decor.
                    </p>
                    <p>
                        We also extend our heartfelt thanks to our past clients who took a chance on us and placed their trust in our vision.
                    </p>
                </motion.div>
            </motion.div>

        </motion.div>
    )
}

export default Founders
