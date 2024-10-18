import React from 'react'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { deco } from '@/app/layout';

const Contact = () => {
    return (
        <motion.div
            className='mb-16 mt-24 lg:w-[75%] w-[90%] mx-auto grid lg:grid-cols-2 grid-cols-1 gap-10'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className='flex flex-col justify-between'>
                <div>
                    <h1 className={`${deco.className} text-[24px] lg:text-[32px] text-[#96034f]`}>Studio Location</h1>
                    <p className='text-[18px] my-4'>500 Lincoln Blvd. <br /> Middlesex, NJ 08846</p>
                </div>
                <div>
                    <h1 className={`${deco.className} text-[24px] lg:text-[32px] text-[#96034f]`}>Connect With Us</h1>
                    <div className='flex flex-col gap-2 my-4'>
                        <div className='flex flex-row items-center gap-4'>
                            <img src="/assets/mail.png" alt="Email" />
                            <span>info@niralidecor.com</span>
                        </div>
                        <div className='flex flex-row items-center gap-4'>
                            <img src="/assets/call.png" alt="call" />
                            <span>(609) 703-5879</span>
                        </div>
                        <div className='flex flex-row items-center gap-4'>
                            <img src="/assets/instagram.png" alt="Email" />
                            <span>@niralidecor</span>
                        </div>
                    </div>
                </div>
                <button
                    className='border-2 rounded-[12px] py-2 border-[#96034f] hover:bg-[#96034f] hover:text-white text-[#96034f] transition-all duration-500 mx-auto w-full'
                >
                    Book an Appointment
                </button>
            </div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3030.738679007284!2d-74.50234262023575!3d40.569447697711865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3b8ca9c778ebb%3A0x2ad6ebf4ef475b2e!2sNirali%20Decor%20-Weddings%20%2BEvents%2BFloral%20Design!5e0!3m2!1sen!2sin!4v1729217912098!5m2!1sen!2sin"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                className="rounded-2xl shadow-xl w-full h-[380px]"
            ></iframe>
        </motion.div>
    )
}

export default Contact
