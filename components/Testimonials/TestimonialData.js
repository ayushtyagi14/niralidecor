import React from 'react';
import { motion } from 'framer-motion';
import { deco } from '@/app/layout';
import { useRouter } from 'next/navigation';

const weddingWireUrl = "https://www.weddingwire.com/reviews/nirali-decor-piscataway/ff78627bd82a2ee0.html";

const TestimonialData = ({ reviews }) => {
    const router = useRouter();

    if (!reviews || reviews.length === 0) {
        return <p>Loading reviews...</p>; // Fallback if no reviews are available
    }

    return (
        <motion.div
            className="mb-16 mt-10 lg:w-[75%] w-[90%] mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Heading Section */}
            <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className={`${deco.className} lg:text-[48px] text-[30px] text-center text-[#96034f]`}>
                    Echoes of Joy
                </h1>
                <p className="lg:text-[18px] text-center">
                    Cherished Moments, Lasting Impressions
                </p>
            </motion.div>

            {/* Testimonials Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                {reviews && reviews.map((item) => (
                    <motion.div
                        key={item?.id}
                        className="group relative bg-white rounded-lg shadow-lg overflow-hidden p-6 cursor-pointer transition-all duration-300"
                        onClick={() => window.open(weddingWireUrl, "_blank")}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Animated Border */}
                        <div className="absolute inset-0 border-2 border-transparent rounded-lg group-hover:border-[#96034f] transition-all duration-700"></div>

                        {/* Testimonial Image */}
                        <div className="w-full h-[200px] mb-4 overflow-hidden rounded-md">
                            <img
                                src={item?.mediaUrl}
                                alt={`${item?.name}'s event`}
                                className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-105"
                            />
                        </div>

                        {/* Text Content */}
                        <div>
                            <h3 className="text-[#96034f] text-lg font-semibold mb-2">
                                {item?.name}
                            </h3>
                            <p className="text-gray-700 text-sm font-light">
                                {item?.review}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className='grid grid-cols-2 gap-5 mt-16 w-[80%] mx-auto'>
                <button
                    className='border-2 rounded-[12px] py-2 border-[#96034f] hover:bg-[#96034f] hover:text-white text-[#96034f] transition-all duration-500'
                    onClick={() => window.open(weddingWireUrl, "_blank")}
                >
                    View More
                </button>
                <button
                    className='border-2 rounded-[12px] py-2 border-[#96034f] hover:bg-[#96034f] hover:text-white text-[#96034f] transition-all duration-500'
                    onClick={() => router.push('/contact-us')}
                >
                    Connect With Us
                </button>
            </div>
        </motion.div>
    );
};

export default TestimonialData;
