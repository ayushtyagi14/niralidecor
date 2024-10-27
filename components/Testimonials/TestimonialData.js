import React from 'react';
import { motion } from 'framer-motion';
import { deco } from '@/app/layout';
import { useRouter } from 'next/navigation';

const testimonials = [
    {
        id: 1,
        name: "Sophia Brown",
        review: "The decor was absolutely stunning! Every detail was carefully thought out, making our day extra special. From the color scheme to the intricate flower arrangements, it was everything we hoped for and more. I couldn't believe the transformation of our space. The team truly has an eye for beauty, and we are so grateful!",
        image: "/assets/client1.jpg",
    },
    {
        id: 2,
        name: "Liam Wilson",
        review: "Unforgettable experience! The ambiance created was magical, and our guests loved it. The lights, the flowers, and the overall setup were beyond perfect. Every guest commented on how beautiful everything looked. We were especially impressed with the custom decorations they made to suit our theme, adding a unique touch.",
        image: "/assets/client2.jpg",
    },
    {
        id: 3,
        name: "Emma Garcia",
        review: "Incredible service and exquisite taste in decor. Thank you for making our event so memorable! The team went above and beyond to make sure every detail was in place. It was truly a dream come true. We felt like we were in a fairy tale, and our guests were equally mesmerized. Highly recommend!",
        image: "/assets/client3.jpg",
    },
    {
        id: 4,
        name: "Mason Patel",
        review: "The decor transformed our venue into a beautiful celebration of elegance and class. Highly recommend! We were blown away by the attention to detail, from the centerpieces to the lighting. They managed to create an ambiance that perfectly suited the mood we wanted. Amazing job by an amazing team!",
        image: "/assets/client1.jpg",
    },
    {
        id: 5,
        name: "Olivia Johnson",
        review: "Perfectly curated decor that matched our vision. Couldn't have asked for more! The decor was classy, stylish, and exactly what we wanted. We especially appreciated the personal touches they added based on our initial consultation. It’s rare to find a team that listens so well to your preferences and delivers with such flair!",
        image: "/assets/client2.jpg",
    },
    {
        id: 6,
        name: "Noah Martinez",
        review: "The team's creativity and dedication truly made our event stand out. Thank you! Each section of the venue was thoughtfully designed and executed. From the entrance to the table settings, everything was done to perfection. I would definitely recommend their services to anyone looking to make their event special.",
        image: "/assets/client3.jpg",
    }
];

const weddingWireUrl = "https://www.weddingwire.com/reviews/nirali-decor-piscataway/ff78627bd82a2ee0.html";

const TestimonialData = () => {
    const router = useRouter();

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
                {testimonials.map((testimonial) => (
                    <motion.div
                        key={testimonial.id}
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
                                src={testimonial.image}
                                alt={`${testimonial.name}'s event`}
                                className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-105"
                            />
                        </div>

                        {/* Text Content */}
                        <div>
                            <h3 className="text-[#96034f] text-lg font-semibold mb-2">
                                {testimonial.name}
                            </h3>
                            <p className="text-gray-700 text-sm">
                                {testimonial.review}
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
                    Contact Us
                </button>
            </div>
        </motion.div>
    );
};

export default TestimonialData;
