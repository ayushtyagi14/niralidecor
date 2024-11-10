import { deco } from '@/app/layout';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = ({ serviceName }) => {

    const [description, setDescription] = useState('');
    const [mainImgUrl, setMainImgUrl] = useState('');

    useEffect(() => {
        // Dynamically set serviceName based on params.slug
        switch (serviceName) {
            case 'Wedding Decoration':
                setDescription('Experience the elegance and grandeur of your special day with our meticulously designed wedding decor. We create a timeless atmosphere with stunning floral arrangements, luxurious drapery, and soft lighting that captures the essence of your love story. Let us transform your venue into a breathtaking celebration of your union.');
                setMainImgUrl('/assets/wedding-main.jpg')
                break;
            case 'Reception':
                setDescription('Elevate your reception with our chic and sophisticated decor. From stylish lounges and exquisite table settings to ambient lighting and stunning centerpieces, we design spaces that encourage mingling, relaxation, and unforgettable moments, all while keeping the mood lively and elegant.');
                setMainImgUrl('/assets/reception-main.jpg')
                break;
            case 'Vidhi & Haldi':
                setDescription('Infuse your Vidhi and Haldi ceremonies with a burst of warmth and energy. The vibrant yellow tones and delicate floral accents capture the joyous spirit of these pre-wedding rituals. Our decor enhances the cultural richness of the ceremony, creating an atmosphere full of blessings, laughter, and heartfelt moments among family and friends.');
                setMainImgUrl('/assets/haldi-main.jpg')
                break;
            case 'Sangeet & Garba':
                setDescription('Experience the magic of Sangeet & Garba with our expertly crafted decor. We bring the energy of traditional dance nights to life with vibrant colors, elegant lighting, and culturally inspired elements, creating a setting where family and friends can revel in joy and celebration.');
                setMainImgUrl('/assets/sangeet-main.jpg')
                break;
            case 'Centerpiece':
                setDescription("Transform your event tables into works of art with our exquisite centerpieces. Designed to captivate and elevate the overall ambiance, our centerpieces blend elegance with creativity. Whether its a romantic floral arrangement, a bold statement piece, or a unique cultural touch, each centerpiece serves as a focal point that enhances the theme and atmosphere of your celebration.");
                setMainImgUrl('/assets/centerpiece-main.jpg')
                break;
            default:
                setDescription(''); // Fallback if none match
                setMainImgUrl('')
        }
    }, [serviceName]);

    return (
        <div className="lg:w-[75%] w-[90%] mx-auto flex flex-col gap-4 pt-24">
            {/* Animated Heading */}
            <motion.h1
                className={`${deco.className} lg:text-[94px] text-[48px] text-[#96034f] text-center tracking-wide leading-tight`}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                {serviceName}
            </motion.h1>

            {/* Animated Paragraph */}
            <motion.p
                className="text-center md:text-[20px]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            >
                {description}
            </motion.p>

            {/* Animated Image */}
            <motion.img
                src={mainImgUrl}
                alt="Sangeet Main Picture"
                className="w-full h-[600px] object-cover rounded-[24px] mt-5 shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
            />
        </div>
    );
};

export default Hero;
