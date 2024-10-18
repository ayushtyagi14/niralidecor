import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { deco } from '@/app/layout';

const faqs = [
    {
        question: "What services do you offer?",
        answer: "We provide a variety of services including wedding decor, event planning, and personalized design services to make your special day unforgettable."
    },
    {
        question: "How do I book your services?",
        answer: "You can easily book our services by contacting us through our website or directly via phone. We'll guide you through the process."
    },
    {
        question: "Do you offer custom packages?",
        answer: "Yes, we offer custom packages tailored to meet your specific needs and budget. Let's discuss your ideas!"
    },
    {
        question: "What is your cancellation policy?",
        answer: "Our cancellation policy allows you to cancel up to 30 days before the event for a full refund. Please refer to our terms for more details."
    },
];

const Faq = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleFAQ = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <motion.div
            className='mb-16 mt-24 lg:w-[75%] w-[90%] mx-auto'
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
                    We&apos;ve Got You Covered
                </h1>
                <p className='lg:text-[18px] text-center'>
                    Find Answers to Common Queries
                </p>
            </motion.div>

            <div className='mt-8'>
                {faqs.map((faq, index) => (
                    <div key={index} className='mb-4'>
                        <div className='bg-white shadow rounded-lg'>
                            <motion.div
                                className='flex justify-between items-center cursor-pointer p-4'
                                onClick={() => toggleFAQ(index)}
                            >
                                <h2 className='text-[18px] uppercase text-[#96034f]'>{faq.question}</h2>
                                <motion.span
                                    className={`${expandedIndex === index ? 'text-[#96034f]' : 'text-black'} text-2xl`}
                                    animate={{ rotate: expandedIndex === index ? 45 : 0 }} // Rotate on click
                                    transition={{ duration: 0.3 }}
                                >
                                    +
                                </motion.span>
                            </motion.div>

                            <AnimatePresence>
                                {expandedIndex === index && (
                                    <motion.div
                                        className='p-4'
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0 }}
                                    >
                                        <p className='font-light'>{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default Faq;
