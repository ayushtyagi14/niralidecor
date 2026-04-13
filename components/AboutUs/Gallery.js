import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import Image from "next/image";
import { deco } from "@/lib/fonts";

const Gallery = ({ mediaItems }) => {
    const settings = {
        infinite: true,
        speed: 3000,
        slidesToShow: 4.5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: false,
        prevArrow: false,
        nextArrow: false,
        lazyLoad: 'progressive',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3.5,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2.5,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1.5,
                }
            }
        ]
    };


    return (
        <motion.div
            className='mt-24 lg:w-[75%] w-[90%] mx-auto'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                className='flex flex-col items-center'
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className={`${deco.className} lg:text-[48px] text-[30px] text-center text-[#96034f]`}>
                    Behind The Scenes
                </h1>
            </motion.div>

            <Slider {...settings}>
                {mediaItems && mediaItems.map((item) => (
                    <div key={item?.id} className="px-1.5 mt-10">
                        <div className="relative h-[300px] w-full rounded-xl overflow-hidden">
                            <Image
                                src={item?.mediaUrl}
                                alt={`Behind the scenes gallery image ${item?.id}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 40vw, 20vw"
                            />
                        </div>
                    </div>
                ))}
            </Slider>
        </motion.div>
    );
};

export default Gallery;

