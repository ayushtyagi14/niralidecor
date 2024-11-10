import { deco } from '@/app/layout';
import React from 'react';
import { motion } from 'framer-motion';

const Content = ({ serviceName }) => {
    // Define content for each service
    const serviceContent = {
        "Sangeet & Garba": {
            title: "Sangeet & Garba: A Celebration of Music and Dance",
            description: `At Nirali Decor, we understand that the Sangeet and Garba nights are vibrant and full of energy. We bring tradition, rhythm, and joy together with stunning decor, from colorful stage designs to beautiful, dance-friendly layouts. Let us help you create an unforgettable night where music and dance blend in perfect harmony.`,
            cards: [
                { heading: "Vibrant Stage Decor", content: "Our stage designs are bursting with colors and traditional elements, creating a lively atmosphere for performances." },
                { heading: "Custom Dance Floors", content: "We design custom dance floors that are both stylish and practical, perfect for endless Garba and Sangeet dances." },
                { heading: "Lighting Effects", content: "From twinkling fairy lights to bold spotlights, our lighting setups amplify the energy of the night." },
                { heading: "Themed Props", content: "We provide themed props like dandiya sticks and musical instruments, enhancing the overall experience for guests." },
            ],
        },
        "Wedding Decoration": {
            title: "Wedding Decoration: Your Dream Wedding Comes to Life",
            description: `Make your wedding day as magical as your love story with our luxurious and elegant wedding decorations. From intricate floral setups to grand mandaps, Nirali Decor turns your vision into reality. Every detail is designed to create a romantic and enchanting atmosphere for your special day.`,
            cards: [
                { heading: "Exquisite Floral Arrangements", content: "We create breathtaking floral installations that transform your venue into a fairytale setting." },
                { heading: "Grand Mandap Designs", content: "Our mandap designs are inspired by tradition and luxury, offering a stunning backdrop for your vows." },
                { heading: "Elegant Aisle Decor", content: "Walk down an aisle adorned with delicate flowers, candles, or custom elements that suit your theme." },
                { heading: "Personalized Touches", content: "From monogrammed details to thematic accents, we personalize every aspect to reflect your unique love story." },
            ],
        },
        "Reception": {
            title: "Reception: A Grand Finale to Your Love Story",
            description: `Celebrate in style with our sophisticated reception decor. We design everything to impress, from elegant centerpieces to grand lighting arrangements. Nirali Decor ensures your reception is a beautiful, memorable event for you and your guests, marking the perfect ending to your wedding festivities.`,
            cards: [
                { heading: "Luxurious Centerpieces", content: "Our centerpieces, ranging from lush floral arrangements to minimalist chic designs, elevate your tablescapes." },
                { heading: "Stunning Lighting", content: "We use creative lighting setups to set the perfect ambiance, from romantic candlelight to dramatic uplighting." },
                { heading: "Photobooth Areas", content: "Create fun memories with stylish photobooth setups that guests will love and remember." },
                { heading: "Grand Entrance Decor", content: "Welcome your guests with a grand entrance that sets the tone for a sophisticated evening." },
            ],
        },
        "Vidhi & Haldi": {
            title: "Vidhi & Haldi: Traditional Rituals, Beautiful Decor",
            description: `Honor your pre-wedding traditions with our Vidhi & Haldi decor. Using vibrant colors and traditional elements like marigold garlands and ethnic setups, we create a serene and culturally rich ambiance for your rituals. Our designs capture the essence of joy and heritage for these significant ceremonies.`,
            cards: [
                { heading: "Traditional Marigold Decor", content: "We use marigold garlands and floral rangoli to add a touch of cultural beauty to your ceremony." },
                { heading: "Rustic Backdrops", content: "Our rustic backdrops, made from natural materials, provide the perfect setting for Haldi rituals." },
                { heading: "Custom Seating Arrangements", content: "We design comfortable and traditional seating setups for family and friends to witness the rituals." },
                { heading: "Colorful Draping", content: "Bright and cheerful drapes add a festive and joyful vibe to your Vidhi and Haldi ceremonies." },
            ],
        },
        "Centerpiece": {
            title: "Centerpiece: Elegant Details That Make a Statement",
            description: `Our custom centerpieces add an element of elegance to your event. Whether it's lavish floral arrangements or minimalist chic designs, Nirali Decor ensures each centerpiece complements your overall theme. We pay attention to every detail, making your tablescapes truly captivating and memorable.`,
            cards: [
                { heading: "Floral Centerpieces", content: "Our floral centerpieces feature a variety of blooms arranged to create stunning visual impact." },
                { heading: "Candlelit Elegance", content: "Candles of different heights and styles add a romantic glow to your event." },
                { heading: "Modern Minimalism", content: "Simple yet sophisticated designs that provide a clean and elegant look." },
                { heading: "Themed Accents", content: "We incorporate elements that align with your event's theme, making each table unique." },
            ],
        },
    };

    // Get the specific content for the provided serviceName
    const content = serviceContent[serviceName];

    return (
        <div className="bg-[#96034f] text-white w-full py-10 -mt-[14rem] mb-[8rem] pt-[16rem]">
            <div className="lg:w-[75%] w-[90%] mx-auto">
                <div className="p-8">
                    {content ? (
                        <>
                            {/* Animated Title */}
                            <motion.h2
                                className={`${deco.className} lg:text-[28px] md:text-[24px] text-[22px] font-bold mb-4`}
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            >
                                {content.title}
                            </motion.h2>

                            {/* Animated Description */}
                            <motion.p
                                className="text-lg mb-6"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                            >
                                {content.description}
                            </motion.p>

                            {/* Animated Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {content.cards.map((card, index) => (
                                    <motion.div
                                        key={index}
                                        className="border bg-white text-[#96034f] border-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 * index }}
                                    >
                                        <h3 className="text-xl font-semibold mb-2">{card.heading}</h3>
                                        <p className="text-base">{card.content}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p className="text-lg">Content not available for this service.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Content;
