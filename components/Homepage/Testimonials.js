import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { deco } from '@/app/layout';

const testimonials = [
    {
        id: 1,
        text: "Nirali Decor transformed our wedding into a fairytale. Every little detail was thoughtfully crafted, from the flowers to the lighting. The team went above and beyond to make sure everything was perfect, creating a magical atmosphere that left us and our guests speechless. We couldn't have asked for a better experience!",
        name: "Priya & Raj",
        image: "/assets/client1.jpg"
    },
    {
        id: 2,
        text: "From the initial planning stages to the final setup, Nirali Decor provided exceptional service. The team was attentive, professional, and incredibly creative. They truly brought our vision to life, turning our venue into a stunning spectacle that exceeded all expectations. Our guests were amazed by the attention to detail and the beauty of the arrangements.",
        name: "Ajay & Simran",
        image: "/assets/client2.jpg"
    },
    {
        id: 3,
        text: "Nirali Decor's creativity and professionalism made our anniversary celebration a remarkable experience. The ambiance they created was elegant, warm, and inviting. Every element was perfectly placed, and their dedication to making our event special was evident in every detail. Our friends and family still talk about how beautiful everything looked!",
        name: "Anjali & Veer",
        image: "/assets/client3.jpg"
    },
];

const Testimonials = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        }, 5000); // Change testimonial every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const nextTestimonial = () => {
        setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const prevTestimonial = () => {
        setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const goToTestimonial = (index) => {
        setCurrent(index);
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
                    Voices of Delight
                </h1>
                <p className='lg:text-[18px] text-center'>
                    Real Stories from Our Happy Clients
                </p>
            </motion.div>

            <motion.div
                className='mt-8 flex flex-col items-center'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <AnimatePresence>
                    <div>
                        <motion.div
                            key={testimonials[current].id}
                            className='flex flex-col lg:flex-row items-center p-6 rounded-[24px] shadow-lg bg-[#fed9fe]'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2 }}
                        >
                            <img
                                src={testimonials[current].image}
                                alt={testimonials[current].name}
                                className='lg:w-[200px] w-full h-[200px] rounded-[12px] object-cover lg:mr-6 mb-4 lg:mb-0'
                            />
                            <div className='text-center lg:text-left'>
                                <p className='text-[#96034f] mb-2 font-light lg:text-center'>
                                    <span className='text-[24px]'>&quot;</span> {testimonials[current].text} <span className='text-[24px]'>&quot;</span>
                                </p>
                                <p className='text-gray-600 text-end'>
                                    - {testimonials[current].name}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </AnimatePresence>

                <div className='flex justify-between mt-6 w-full'>
                    <button
                        onClick={prevTestimonial}
                        className='text-[#96034f] hover:text-[#c75b98] transition'
                    >
                        &lt; Previous
                    </button>

                    {/* Dot Navigation */}
                    <div className='flex justify-center space-x-2'>
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full ${index === current ? 'bg-[#96034f]' : 'bg-gray-300'
                                    }`}
                                onClick={() => goToTestimonial(index)}
                            />
                        ))}
                    </div>

                    <button
                        onClick={nextTestimonial}
                        className='text-[#96034f] hover:text-[#c75b98] transition'
                    >
                        Next &gt;
                    </button>
                </div>
            </motion.div>

            <button
                className='border-2 rounded-[12px] py-2 border-[#96034f] hover:bg-[#96034f] hover:text-white text-[#96034f] transition-all duration-500 mx-auto w-[35%] row-span-1 col-span-2 mt-10 flex justify-center'
            >
                Testimonials
            </button>
        </motion.div>
    );
};

export default Testimonials;
