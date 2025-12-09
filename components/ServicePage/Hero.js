import { deco } from '@/app/layout';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = ({ serviceName, mediaUrl }) => {

    const [description, setDescription] = useState('');

    useEffect(() => {
        // Dynamically set serviceName based on params.slug
        switch (serviceName) {
            case 'Wedding':
                setDescription('Experience the elegance and grandeur of your special day with our meticulously designed wedding decor. We create a timeless atmosphere with stunning floral arrangements, luxurious drapery, and soft lighting that captures the essence of your love story. Let us transform your venue into a breathtaking celebration of your union.');
                break;
            case 'Reception':
                setDescription('Elevate your reception with our chic and sophisticated decor. From stylish lounges and exquisite table settings to ambient lighting and stunning centerpieces, we design spaces that encourage mingling, relaxation, and unforgettable moments, all while keeping the mood lively and elegant.');
                break;
            case 'Vidhi & Haldi':
                setDescription('Infuse your Vidhi and Haldi ceremonies with a burst of warmth and energy. The vibrant yellow tones and delicate floral accents capture the joyous spirit of these pre-wedding rituals. Our decor enhances the cultural richness of the ceremony, creating an atmosphere full of blessings, laughter, and heartfelt moments among family and friends.');
                break;
            case 'Sangeet & Garba':
                setDescription('Experience the magic of Sangeet & Garba with our expertly crafted decor. We bring the energy of traditional dance nights to life with vibrant colors, elegant lighting, and culturally inspired elements, creating a setting where family and friends can revel in joy and celebration.');
                break;
            case 'Centerpiece':
                setDescription("Transform your event tables into works of art with our exquisite centerpieces. Designed to captivate and elevate the overall ambiance, our centerpieces blend elegance with creativity. Whether its a romantic floral arrangement, a bold statement piece, or a unique cultural touch, each centerpiece serves as a focal point that enhances the theme and atmosphere of your celebration.");
                break;
            default:
                setDescription(''); // Fallback if none match
        }
    }, [serviceName]);

    // Define content for each service
    const serviceContent = {
        "Sangeet & Garba": {
            title: "A Celebration of Music and Dance",
            description: `At Nirali Decor, we understand that the Sangeet and Garba nights are vibrant and full of energy. We bring tradition, rhythm, and joy together with stunning decor, from colorful stage designs to beautiful, dance-friendly layouts. Let us help you create an unforgettable night where music and dance blend in perfect harmony.`,
        },
        "Wedding": {
            title: "Your Dream Wedding Comes to Life",
            description: `Make your wedding day as magical as your love story with our luxurious and elegant wedding decorations. From intricate floral setups to grand mandaps, Nirali Decor turns your vision into reality. Every detail is designed to create a romantic and enchanting atmosphere for your special day.`,
        },
        "Reception": {
            title: "A Grand Finale to Your Love Story",
            description: `Celebrate in style with our sophisticated reception decor. We design everything to impress, from elegant centerpieces to grand lighting arrangements. Nirali Decor ensures your reception is a beautiful, memorable event for you and your guests, marking the perfect ending to your wedding festivities.`,
        },
        "Vidhi & Haldi": {
            title: "Traditional Rituals, Beautiful Decor",
            description: `Honor your pre-wedding traditions with our Vidhi & Haldi decor. Using vibrant colors and traditional elements like marigold garlands and ethnic setups, we create a serene and culturally rich ambiance for your rituals. Our designs capture the essence of joy and heritage for these significant ceremonies.`,
        },
        "Centerpiece": {
            title: "Elegant Details That Make a Statement",
            description: `Our custom centerpieces add an element of elegance to your event. Whether it's lavish floral arrangements or minimalist chic designs, Nirali Decor ensures each centerpiece complements your overall theme. We pay attention to every detail, making your tablescapes truly captivating and memorable.`,
        },
    };

    // Get the specific content for the provided serviceName
    const content = serviceContent[serviceName];

    return (
        <>
            <div
                className="relative bg-cover bg-center object-cover h-[70vh]"
                style={{ backgroundImage: `url(${mediaUrl})` }}
                loading="lazy"
            >
                <div className="absolute inset-0 bg-black bg-opacity-[0.4] flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center text-white px-4 md:w-[60%] mx-auto"
                    >
                        {/* Any optional content goes here */}
                    </motion.div>
                </div>
            </div>

            <div className="lg:w-[75%] w-[90%] mx-auto flex flex-col my-5">
                {/* Animated Heading */}
                <motion.h1
                    className={`${deco.className} lg:text-[68px] text-[48px] text-[#96034f] text-center tracking-wide leading-tight`}
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    {serviceName}
                </motion.h1>

                <div className="">
                    {content ? (
                        <>
                            {/* Animated Title */}
                            <motion.h2
                                className={`lg:text-[26px] md:text-[24px] text-[16px] mb-8 text-center`}
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            >
                                {content.title}
                            </motion.h2>

                            {/* Animated Description */}
                            <motion.p
                                className="md:text-[20px] mb-8 text-center font-light"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                            >
                                {content.description}
                            </motion.p>
                        </>
                    ) : (
                        <p className="text-lg">Content not available for this service.</p>
                    )}
                </div>

                {/* Animated Paragraph */}
                <motion.p
                    className="text-center md:text-[20px] font-light"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                >
                    {description}
                </motion.p>

            </div>
        </>
    );
};

export default Hero;
