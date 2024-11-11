import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { deco } from "@/app/layout";

const Gallery = () => {
    const [width, setWidth] = useState(null);
    let mobile = false;

    useEffect(() => {
        setWidth(window.innerWidth);
        window.addEventListener("resize", () => setWidth(window.innerWidth));
        return () => {
            window.removeEventListener("resize", () => setWidth(window.innerWidth));
        };
    }, []);

    if (width < 1000) {
        mobile = true;
    } else {
        mobile = false;
    }

    const imgGallery = [
        { id: 1, src: '/assets/gallery1.jpg' },
        { id: 2, src: '/assets/gallery2.jpg' },
        { id: 3, src: '/assets/gallery8.jpg' },
        { id: 4, src: '/assets/gallery4.jpg' },
        { id: 5, src: '/assets/gallery5.jpg' },
        { id: 6, src: '/assets/gallery6.jpg' },
        { id: 7, src: '/assets/gallery7.jpg' },
        { id: 8, src: '/assets/gallery3.jpg' },
        { id: 9, src: '/assets/gallery1.jpg' },
        { id: 10, src: '/assets/gallery2.jpg' },
        { id: 11, src: '/assets/gallery8.jpg' },
        { id: 12, src: '/assets/gallery4.jpg' },
    ];

    const slidesToShow = mobile ? 2.5 : 4.5;

    const settings = {
        infinite: true,
        speed: 2000,
        slidesToShow: slidesToShow, // Use the conditional value
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: false,
        prevArrow: false,
        nextArrow: false,
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
                {imgGallery.map((item) => (
                    <div key={item.id} className="px-1.5 mt-10">
                        <img
                            src={item.src}
                            alt={`Image ${item.id}`}
                            className="mx-0 rounded-xl"
                        />
                    </div>
                ))}
            </Slider>
        </motion.div>
    );
};

export default Gallery;
