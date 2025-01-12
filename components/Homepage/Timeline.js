import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import { deco } from '@/app/layout';

const TimelineData = [
    {
        id: 1,
        niraliTitle: "We Find Out About You",
        niraliContent: "Fill out the contact us form and provide information about your event.",
        clientTitle: "You Learn About Us",
        clientContent: "We schedule an initial session with you to help us understand your vision."
    },
    {
        id: 2,
        niraliTitle: "Planning and Designing",
        niraliContent: "After viewing our portfolio and previous work, we will provide assistance depending on your choices.",
        clientTitle: "Give Your Thoughts",
        clientContent: "You look over our portfolio and let us know what complements your concept."
    },
    {
        id: 3,
        niraliTitle: "Get Ready and Set Up",
        niraliContent: "Together, we create an estimate that breaks out all of your events and specifics.",
        clientTitle: "Finalize Approvals",
        clientContent: "After reviewing and providing input, the contract is finalized, bringing you closer to the big day."
    },
    {
        id: 4,
        niraliTitle: "Final Day",
        niraliContent: "A committed team and a point of contact will carry out every detail that was discussed.",
        clientTitle: "Cheers to Your Happy Day!",
        clientContent: "Take it easy and enjoy the lovely event we have planned for you, creating lifelong memories."
    },
];

const Timeline = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        // Check the screen width
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 800);
        };

        // Set initial screen size
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        // Assign navigation buttons to Swiper after component is mounted
        if (prevButtonRef.current && nextButtonRef.current) {
            // Manually initialize Swiper's navigation
            const swiperInstance = document.querySelector('.swiper').swiper;
            swiperInstance.params.navigation.prevEl = prevButtonRef.current;
            swiperInstance.params.navigation.nextEl = nextButtonRef.current;
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, [prevButtonRef, nextButtonRef]);

    return (
        <motion.div
            className="mb-16 mt-24 lg:w-[80%] w-[95%] mx-auto"
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

            <div className="relative">
                <div className='flex flex-row gap-5 items-center'>
                    <div className='w-[30%] flex flex-col gap-5 h-[240px] justify-between'>
                        <h1 className='-rotate-90 text-left text-[14px]'>We</h1>
                        <h1 className=' justify-center text-[12px] lg:text-[16px] bg-[#96034f] text-white lg:px-4 px-2 text-center py-1 rounded-[8px] lg:rounded-[24px] uppercase'>Phase {activeIndex + 1}</h1>
                        <h1 className='-rotate-90 text-right text-[14px]'>You</h1>
                    </div>
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={0}
                        slidesPerView={isSmallScreen ? 1 : 1.2}
                        loop={false}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        className="my-8"
                    >
                        {TimelineData.map((phase, index) => (
                            <SwiperSlide key={phase.id} className="relative lg:ml-4">
                                <div className="flex flex-col items-center py-6 bg-white rounded-lg z-10">
                                    {/* About Company */}
                                    <div className="mb-4 text-left w-full">
                                        <h2 className="text-[22px] font-medium text-[#96034f] uppercase">{phase.niraliTitle}</h2>
                                        <p className="text-[13px] lg:text-[16px] font-light lg:w-[65%] mt-2">{phase.niraliContent}</p>
                                    </div>
                                    {/* Divider Line */}
                                    <div className="w-full h-[2px] bg-black my-4 flex flex-row gap-10 items-center">
                                        <span className='bg-[#fed9fe] py-1 px-3 rounded-full text-[14px]'>{index + 1}</span>
                                        <img src="/assets/line.png" alt="Vertical line" />
                                        <img src="/assets/line.png" alt="Vertical line" />
                                        <img src="/assets/line.png" alt="Vertical line" />
                                        <img src="/assets/line.png" alt="Vertical line" />
                                        <img src="/assets/line.png" alt="Vertical line" />
                                        <img src="/assets/line.png" alt="Vertical line" />
                                        <img src="/assets/line.png" alt="Vertical line" />
                                        <img src="/assets/line.png" alt="Vertical line" />
                                        <img src="/assets/line.png" alt="Vertical line" />
                                        <img src="/assets/line.png" alt="Vertical line" />
                                        <img src="/assets/line.png" alt="Vertical line" />
                                        <img src="/assets/line.png" alt="Vertical line" />
                                        <img src="/assets/line.png" alt="Vertical line" />
                                        <img src="/assets/line.png" alt="Vertical line" />
                                        <img src="/assets/line.png" alt="Vertical line" />
                                    </div>
                                    {/* About Client */}
                                    <div className='text-left w-full mt-4'>
                                        <h2 className="text-[22px] font-medium text-gray-800 uppercase">{phase.clientTitle}</h2>
                                        <p className="text-[13px] lg:text-[16px] font-light lg:w-[65%] mt-2">{phase.clientContent}</p>
                                    </div>
                                </div>

                                {/* Blur Overlay for Peek of the Next Slide */}
                                {index !== activeIndex && (
                                    <div className="absolute right-[-40px] top-0 h-full w-[105%] bg-white opacity-70 backdrop-blur-md"></div>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Navigation Buttons Positioned at the Bottom Center */}
                <div className="flex flex-row ml-[8rem] gap-2">
                    <button
                        ref={prevButtonRef}
                        className={`${activeIndex === 0 && 'opacity-50'} custom-prev-button border-[1.5px] border-[#96034f] p-4 rounded-full ${activeIndex !== 0 && 'hover:bg-[#fed9fe]'} duration-300 transition`}
                    >
                        <img src="/assets/back.png" alt="Back Arrow" />
                    </button>
                    <button
                        ref={nextButtonRef}
                        className={`${activeIndex === TimelineData.length - 1 && 'opacity-50'} custom-next-button border-[1.5px] border-[#96034f] p-4 rounded-full ${activeIndex !== TimelineData.length - 1 && 'hover:bg-[#fed9fe]'} duration-300 transition`}
                    >
                        <img src="/assets/next.png" alt="Next Arrow" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Timeline;
