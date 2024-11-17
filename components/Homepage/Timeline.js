import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import { deco } from '@/app/layout';

const TimelineData = [
    {
        id: 1,
        niraliTitle: "We Learn About You",
        niraliContent: "In our initial discussion, we get to learn all the gorgeous details about you, your event, and your vision.",
        clientTitle: "You Learn About Us",
        clientContent: "With your initial interest comes a meeting with a team who will work on capturing your vision and making it happen."
    },
    {
        id: 2,
        niraliTitle: "Planning and Designing",
        niraliContent: "We create a detailed design plan that reflects your vision and incorporates our expertise in event decor.",
        clientTitle: "Provide Your Input",
        clientContent: "You review our proposed designs, share your thoughts, and ensure everything aligns with your expectations."
    },
    {
        id: 3,
        niraliTitle: "Preparation and Setup",
        niraliContent: "Our team begins the preparation, from sourcing materials to setting up the decor, ensuring everything is perfect.",
        clientTitle: "Final Approvals",
        clientContent: "You give us the final go-ahead, and we take care of the rest, keeping you updated every step of the way."
    },
    {
        id: 4,
        niraliTitle: "The Grand Event",
        niraliContent: "We execute the plan seamlessly, creating a breathtaking experience for you and your guests.",
        clientTitle: "Enjoy Your Special Day",
        clientContent: "Relax and enjoy the beautiful event we have put together for you, making lasting memories."
    },
];

const Timeline = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);

    return (
        <motion.div
            className="mb-16 mt-24 lg:w-[75%] w-[90%] mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className={`${deco.className} lg:text-[48px] text-[30px] text-center text-[#96034f]`}>
                    Every Step of the Way
                </h1>
                <p className="lg:text-[18px] text-center">
                    Explore the Key Phases of Your Event Experience
                </p>
            </motion.div>

            <div className="relative mt-10">
                {/* Horizontal line in the middle */}
                <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-[2px] bg-gray-300 z-0"></div>

                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={1.3}
                    loop={false}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    navigation={{
                        prevEl: prevButtonRef.current,
                        nextEl: nextButtonRef.current,
                    }}
                    className="my-8"
                >
                    {TimelineData.map((phase, index) => (
                        <SwiperSlide key={phase.id} className="relative my-2 ml-1">
                            <div className="flex flex-col items-center py-6 bg-white shadow-md rounded-lg z-10">
                                {/* About Company */}
                                <div className="mb-4 text-left w-full px-6">
                                    <h2 className="text-[22px] font-medium text-[#96034f] uppercase">{phase.niraliTitle}</h2>
                                    <p className="text-sm font-light lg:w-[65%] mt-2">{phase.niraliContent}</p>
                                </div>
                                {/* Divider Line */}
                                <div className="w-full h-[2px] bg-gray-300 my-4"></div>
                                {/* About Client */}
                                <div className='text-left w-full px-6'>
                                    <h2 className="text-[22px] font-medium text-gray-800 uppercase">{phase.clientTitle}</h2>
                                    <p className="text-sm font-light lg:w-[65%] mt-2">{phase.clientContent}</p>
                                </div>
                            </div>

                            {/* Blur Overlay for Peek of the Next Slide */}
                            {index !== activeIndex && (
                                <div className="absolute right-[-40px] top-0 h-full w-[110%] bg-white opacity-70 backdrop-blur-md"></div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Navigation Buttons Positioned at the Bottom Center */}
                <div className="flex flex-row ml-4 gap-2">
                    <button
                        ref={prevButtonRef}
                        className={`${activeIndex === 0 && 'opacity-50'} custom-prev-button border-[1.5px] border-[#96034f] p-4 rounded-full ${activeIndex !== 0 && 'hover:bg-[#fed9fe]'} duration-300 transition`}
                    >
                        <img src="/assets/back.png" alt="Back Arrow" />
                    </button>
                    <button
                        ref={nextButtonRef}
                        className={`${activeIndex === 3 && 'opacity-50'} custom-next-button border-[1.5px] border-[#96034f] p-4 rounded-full ${activeIndex !== 3 && 'hover:bg-[#fed9fe]'} duration-300 transition`}
                    >
                        <img src="/assets/next.png" alt="Next Arrow" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Timeline;
